import * as CartModel from '../models/CartModel.js';
import * as api from '../views/apiResponse.js';

export function get(req, res, next) {
  try {
    const cart = CartModel.getCart(req.params.sessionId);
    return api.success(res, cart);
  } catch (err) {
    return next(err);
  }
}

export function addItem(req, res, next) {
  try {
    const { sessionId } = req.params;
    const { productId, quantity = 1, price, name } = req.body;
    const cart = CartModel.addItem(sessionId, {
      productId,
      quantity,
      price,
      name,
    });
    return api.success(res, cart);
  } catch (err) {
    return next(err);
  }
}

export function updateItem(req, res, next) {
  try {
    const { sessionId, productId } = req.params;
    const { quantity } = req.body;
    const cart = CartModel.updateItemQuantity(sessionId, productId, quantity);
    if (!cart) {
      return api.fail(res, 'السلة أو المنتج غير موجود', 404);
    }
    return api.success(res, cart);
  } catch (err) {
    return next(err);
  }
}

export function removeItem(req, res, next) {
  try {
    const { sessionId, productId } = req.params;
    const cart = CartModel.removeItem(sessionId, productId);
    if (!cart) {
      return api.fail(res, 'السلة غير موجودة', 404);
    }
    return api.success(res, cart);
  } catch (err) {
    return next(err);
  }
}

export function clear(req, res, next) {
  try {
    CartModel.clear(req.params.sessionId);
    return api.message(res, 'تم تفريغ السلة بنجاح');
  } catch (err) {
    return next(err);
  }
}
