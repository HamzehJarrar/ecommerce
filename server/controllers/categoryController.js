import { Category } from '../models/Category.js';
import * as api from '../views/apiResponse.js';

export async function list(req, res, next) {
  try {
    const data = await Category.find().sort({ order: 1, nameAr: 1 }).lean();
    return api.success(res, data);
  } catch (err) {
    return next(err);
  }
}

export async function getBySlug(req, res, next) {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).lean();
    if (!category) {
      return api.fail(res, 'التصنيف غير موجود', 404);
    }
    return api.success(res, category);
  } catch (err) {
    return next(err);
  }
}

export async function addCategory(req, res, next) {
  try {
    const {slug,nameAr, icon, order} = req.body;
    if(!nameAr) return api.fail(res, 'اسم التصنيف مطلوب', 400);
    if(!slug) return api.fail(res, 'slug التصنيف مطلوب', 400);
    if(!icon) return api.fail(res, 'icon التصنيف مطلوب', 400);
    if(!order) return api.fail(res, 'order التصنيف مطلوب', 400);
    const category =  await Category.create({slug,nameAr, icon, order});
    return api.success(res, category);
  } catch (error) {
    return next(error);
  }
}
