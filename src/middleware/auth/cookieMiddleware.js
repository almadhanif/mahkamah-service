const AuthenticationError = require('../../utils/exceptions/AuthenticationError');

const cookieAuthMiddleware = (req, res, next) => {
  try {
    // Get signed cookies
    const userId = req.signedCookies.userId;
    const role = req.signedCookies.role;
    const uid = req.signedCookies.uid;
    const token = req.signedCookies.token;
    const phoneNumber = req.signedCookies.phone_number;

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
