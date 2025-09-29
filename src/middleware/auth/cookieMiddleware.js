const AuthenticationError = require('../../utils/exceptions/AuthenticationError');

const cookieAuthMiddleware = (req, res, next) => {
  try {
    // Get signed cookies
    const userId = req.cookies.userId;
    const role = req.cookies.role;
    const uid = req.cookies.uid;
    const token = req.cookies.token;

    // Check if required cookies exist
    if (!userId || !role || !uid || !token) {
      throw new AuthenticationError('Authentication required');
    }

    // Add user data to request object
    req.user = {
      userId,
      role,
      uid,
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
