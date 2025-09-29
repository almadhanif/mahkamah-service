const userLogoutController = async (req, res) => {
  try {
    // Clear all authentication cookies
    res.clearCookie('userId');
    res.clearCookie('role');
    res.clearCookie('uid');
    res.clearCookie('token');
    res.clearCookie('phone_number');
    res.clearCookie('name');

    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    return resErrorHandler(res, error);
  }
};

module.exports = userLogoutController;
