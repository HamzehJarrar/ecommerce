import { config } from '../config/index.js';

export function notFound(req, res) {
  res.status(404).json({ message: 'المسار غير موجود' });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'خطأ في الخادم',
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
}
