import mongoose from 'mongoose';
import { User, toPublicUser } from '../models/User.js';
import * as api from '../views/apiResponse.js';

export async function register(req, res, next) {
  try {
    const { email, password, name, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return api.fail(res, 'يوجد حساب بهذا البريد', 400);
    }
    const user = await User.create({ email, password, name, phone });
    return api.successWithMeta(
      res,
      toPublicUser(user),
      { message: 'تم التسجيل بنجاح' },
      201,
    );
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return api.fail(res, 'البريد أو كلمة المرور غير صحيحة', 401);
    }
    return api.successWithMeta(res, toPublicUser(user), {
      message: 'تم تسجيل الدخول بنجاح',
    });
  } catch (err) {
    return next(err);
  }
}

export async function profile(req, res, next) {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return api.fail(res, 'معرّف المستخدم غير صالح', 400);
    }
    const user = await User.findById(userId);
    if (!user) {
      return api.fail(res, 'المستخدم غير موجود', 404);
    }
    return api.success(res, toPublicUser(user));
  } catch (err) {
    return next(err);
  }
}
