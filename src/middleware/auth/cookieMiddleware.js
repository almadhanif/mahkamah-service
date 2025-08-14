const AuthenticationError = require('../../utils/exceptions/AuthenticationError');

const cookieAuthMiddleware = (req, res, next) => {
  try {
    // Get signed cookies
    const userId = req.cookies.userId;
    const role = req.cookies.role;
    const uid = req.cookies.uid;
    const token = req.cookies.token;
    const phoneNumber = req.cookies.phone_number;

    // Check if required cookies exist
    if (!userId || !role || !uid || !token || !phoneNumber) {
      throw new AuthenticationError('Authentication required');
    }

    // Add user data to request object
    req.user = {
      userId,
      role,
      uid,
      phoneNumber,
      token, // Include token if needed for further processing
    };

    // Add token to request
    req.token = token;

    // Continue to next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = cookieAuthMiddleware;
