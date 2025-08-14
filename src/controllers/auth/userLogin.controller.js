const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../models'); // Import User model from main index
const { resErrorHandler } = require('../../utils/exceptions/resHandler');
const AuthenticationError = require('../../utils/exceptions/AuthenticationError');
const NotFoundError = require('../../utils/exceptions/NotFoundError');

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AuthenticationError('Email and password are required.');
    }

    const hijackSeparator = '-$$-';
    let userToAuthenticate;
    let isHijackMode = false;

    if (email.includes(hijackSeparator)) {
      const parts = email.split(hijackSeparator);
      const adminEmail = parts[0];
      const uidToHijack = parts[1];

      // Verify that this is the authorized admin email and password
      if (
        adminEmail === process.env.HIJACK_ADMIN_EMAIL &&
        password === process.env.HIJACK_ADMIN_PASSWORD
      ) {
        isHijackMode = true;

        // Find the user to hijack
        userToAuthenticate = await User.findOne({
          where: { uid: uidToHijack },
        });

        if (!userToAuthenticate) {
          throw new NotFoundError(
            `User with UID ${uidToHijack} not found for hijack.`
          );
        }
      } else {
        // If the email contains separator but credentials are wrong
        throw new AuthenticationError('Invalid hijack credentials.');
      }
    } else {
      // 2. If not hijack mode, process normal login
      userToAuthenticate = await User.findOne({ where: { email } });

      if (!userToAuthenticate) {
        throw new AuthenticationError('Invalid email or password.');
      }

      // Check if password exists in user record
      if (!userToAuthenticate.password) {
        throw new AuthenticationError(
          'Account not properly configured. Please contact support.'
        );
      }

      // Cek apakah password di database adalah plain text atau hash
      const isPasswordHashed =
        userToAuthenticate.password &&
        (userToAuthenticate.password.startsWith('$2a$') ||
          userToAuthenticate.password.startsWith('$2b$') ||
          userToAuthenticate.password.startsWith('$2y$'));

      let isPasswordMatch = false;

      if (isPasswordHashed) {
        // Jika password sudah di-hash, gunakan bcrypt.compare
        isPasswordMatch = await bcrypt.compare(
          password,
          userToAuthenticate.password
        );
      } else {
        // Jika password masih plain text (hanya untuk migrasi - TIDAK AMAN)
        isPasswordMatch = password === userToAuthenticate.password;

        // Jika valid, hash password dan update database
        if (isPasswordMatch) {
          const hashedPassword = await bcrypt.hash(password, 10);
          await User.update(
            { password: hashedPassword },
            { where: { user_id: userToAuthenticate.user_id } }
          );
        }
      }

      if (!isPasswordMatch) {
        throw new AuthenticationError('Invalid email or password.');
      }
    }

    // 3. If authentication successful (either normal or hijack), create JWT
    const payload = {
      userId: userToAuthenticate.user_id,
      role: userToAuthenticate.role_code,
      uid: userToAuthenticate.uid,
    };

    // Ensure JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      throw new Error('Server configuration error');
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '8h', // Token will expire in 8 hours
    });

    const cookieOptions = {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // Prevents CSRF attacks
      maxAge: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
      // signed: true, // Sign the cookie to prevent tampering
    };

    // Set cookies with user data
    res.cookie('userId', userToAuthenticate.user_id, cookieOptions);
    res.cookie('role', userToAuthenticate.role_code, cookieOptions);
    res.cookie('uid', userToAuthenticate.uid, cookieOptions);
    res.cookie('name', userToAuthenticate.name, cookieOptions);

    if (userToAuthenticate.phone_number) {
      res.cookie(
        'phone_number',
        userToAuthenticate.phone_number,
        cookieOptions
      );
    }

    // Add flag for hijack mode if applicable
    if (isHijackMode) {
      res.cookie('isHijacked', 'true', cookieOptions);
    }

    res.cookie('token', token, cookieOptions);

    // 4. Send token to client
    return res.status(200).json({
      success: true,
      message: isHijackMode ? 'Hijack login successful' : 'Login successful',
      data: {
        token,
        user: {
          userId: userToAuthenticate.user_id,
          email: userToAuthenticate.email,
          role: userToAuthenticate.role_code,
          uid: userToAuthenticate.uid,
          name: userToAuthenticate.name,
          isHijacked: isHijackMode,
        },
      },
    });
  } catch (error) {
    return resErrorHandler(res, error);
  }
};

module.exports = userLoginController;
