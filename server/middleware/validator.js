// Validation middleware
class Validator {
  // Validate product data
  static validateProduct(req, res, next) {
    const { name, nameAr, price, category } = req.body;

    if (!name || !nameAr) {
      return res.status(400).json({
        success: false,
        message: 'Product name in English and Arabic is required',
      });
    }

    if (!price || price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid price is required',
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category is required',
      });
    }

    next();
  }

  // Validate user registration
  static validateRegistration(req, res, next) {
    const { email, password, name } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required',
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    next();
  }

  // Validate login
  static validateLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    next();
  }

  // Validate order
  static validateOrder(req, res, next) {
    const { items, shippingAddress, totalAmount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item',
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required',
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid total amount is required',
      });
    }

    next();
  }
}

module.exports = Validator;
