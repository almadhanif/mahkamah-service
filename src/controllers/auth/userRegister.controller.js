const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const { resErrorHandler } = require('../../utils/exceptions/resHandler');

const userRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    // Validasi email unik
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user dengan password yang sudah di-hash
    const userData = {
      name,
      email,
      password: hashedPassword, // Pastikan nama field ini sesuai dengan model
      phone_number: phone_number || null,
      role_code: 'USER', // atau role default lainnya
      uid: `U${Date.now().toString().substring(7)}`, // Generate simple UID jika diperlukan
    };

    const newUser = await User.create(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: newUser.user_id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    // Provide more detailed error message for debugging
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    return resErrorHandler(res, error);
  }
};

module.exports = userRegisterController;
