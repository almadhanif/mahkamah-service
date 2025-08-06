const jwt = require('jsonwebtoken');
const { User } = require('../../models'); // Adjust the path to your User model
const { resErrorHandler } = require('../../utils/exceptions/resHandler');
const AuthenticationError = require('../../utils/exceptions/AuthenticationError');

/**
 * Middleware to authenticate requests using a JWT.
 * It verifies the token and attaches user information to res.locals.
 */
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1. Try to get token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove "Bearer " prefix
    }
    // 2. If not in header, check signed cookies
    else if (req.signedCookies && req.signedCookies.token) {
      token = req.signedCookies.token;
    }
    // 3. If not in signed cookies, check regular cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // If token is not found anywhere
    if (!token) {
      throw new AuthenticationError('Authentication token is required.');
    }

    // 4. Verify the token
    // We use a try-catch block here specifically for JWT errors (like expiration)
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // This will catch errors like "jwt expired", "invalid signature", etc.
      throw new AuthenticationError('Invalid or expired token.');
    }

    // 5. Find the user in the database to ensure they still exist
    // This is a crucial security step
    const user = await User.findByPk(decoded.userId, {
      // You can include associations here if needed later
      // include: [{ model: Role, as: 'Role' }]
    });

    if (!user) {
      throw new AuthenticationError(
        'User associated with this token no longer exists.'
      );
    }

    // 6. Attach user information to both req.user and res.locals.user
    // This gives flexibility to downstream middlewares and controllers
    const userData = {
      userId: user.user_id,
      email: user.email,
      role: user.role_code,
      uid: user.uid,
    };

    req.user = userData;
    res.locals.user = userData;

    // 7. Log authentication success (optional, for debugging)
    console.log(`User ${user.email} authenticated successfully`);

    // 8. If everything is successful, proceed to the next controller/middleware
    return next();
  } catch (error) {
    // Use your global error handler to send a standardized error response
    return resErrorHandler(res, error);
  }
};

module.exports = authMiddleware;
