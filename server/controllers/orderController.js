import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import * as api from '../views/apiResponse.js';

export async function create(req, res, next) {
  try {
    const order = await Order.create(req.body);
    return api.successWithMeta(
      res,
      order,
      { message: 'تم إنشاء الطلب بنجاح' },
      201,
    );
  } catch (err) {
    return next(err);
  }
}

export async function listByUser(req, res, next) {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return api.fail(res, 'معرّف المستخدم غير صالح', 400);
    }
    const data = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    return api.success(res, data);
  } catch (err) {
    return next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return api.fail(res, 'معرّف الطلب غير صالح', 400);
    }
    const order = await Order.findById(orderId).lean();
    if (!order) {
      return api.fail(res, 'الطلب غير موجود', 404);
    }
    return api.success(res, order);
  } catch (err) {
    return next(err);
  }
}

export async function patchStatus(req, res, next) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return api.fail(res, 'معرّف الطلب غير صالح', 400);
    }
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    ).lean();
    if (!order) {
      return api.fail(res, 'الطلب غير موجود', 404);
    }
    return api.success(res, order);
  } catch (err) {
    return next(err);
  }
}
