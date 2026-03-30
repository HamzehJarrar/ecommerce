import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import * as api from '../views/apiResponse.js';

async function buildFilter(query) {
  const filter = {};
  const { category, minPrice, maxPrice, search, section } = query;

  if (section === 'limited') {
    filter.limitedTimeOffer = true;
  } else if (section === 'featured') {
    filter.featured = true;
  }

  if (category) {
    const cat = await Category.findOne({ slug: category });
    if (cat) {
      filter.category = cat._id;
    } else {
      filter.category = new mongoose.Types.ObjectId();
    }
  }

  if (minPrice) {
    filter.currentPrice = { ...filter.currentPrice, $gte: parseInt(minPrice, 10) };
  }
  if (maxPrice) {
    filter.currentPrice = {
      ...filter.currentPrice,
      $lte: parseInt(maxPrice, 10),
    };
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  return filter;
}

export async function list(req, res, next) {
  try {
    const { page = 1, limit = 10, sort = 'featured' } = req.query;

    const filter = await buildFilter(req.query);

    let sortQuery = { createdAt: -1 };
    switch (sort) {
      case 'price-low':
        sortQuery = { currentPrice: 1 };
        break;
      case 'price-high':
        sortQuery = { currentPrice: -1 };
        break;
      case 'rating':
        sortQuery = { rating: -1 };
        break;
      case 'discount':
        sortQuery = { discountPercent: -1 };
        break;
      default:
        break;
    }

    const p = Math.max(1, parseInt(page, 10));
    const l = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (p - 1) * l;

    const [items, totalProducts] = await Promise.all([
      Product.find(filter)
        .populate('category', 'slug nameAr icon')
        .sort(sortQuery)
        .skip(skip)
        .limit(l)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return api.paginated(res, items, {
      pagination: {
        currentPage: p,
        totalPages: Math.ceil(totalProducts / l) || 1,
        totalProducts,
        limit: l,
      },
    });
  } catch (err) {
    return next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return api.fail(res, 'معرّف المنتج غير صالح', 400);
    }
    const product = await Product.findById(id).populate(
      'category',
      'slug nameAr icon',
    );
    if (!product) {
      return api.fail(res, 'المنتج غير موجود', 404);
    }
    return api.success(res, product);
  } catch (err) {
    return next(err);
  }
}

export async function featured(req, res, next) {
  try {
    const limit = Math.min(50, parseInt(req.query.limit, 10) || 9);
    const data = await Product.find({ featured: true })
      .populate('category', 'slug nameAr icon')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return api.success(res, data);
  } catch (err) {
    return next(err);
  }
}

export async function dealsToday(req, res, next) {
  try {
    const limit = Math.min(100, parseInt(req.query.limit, 10) || 31);
    const data = await Product.find({ limitedTimeOffer: true })
      .populate('category', 'slug nameAr icon')
      .sort({ discountPercent: -1 })
      .limit(limit)
      .lean();
    return api.success(res, data);
  } catch (err) {
    return next(err);
  }
}
