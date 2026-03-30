import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { config } from '../config/index.js';

export function applySecurity(app) {
  app.use(helmet());
  app.use(mongoSanitize());

  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: { success: false, message: config.rateLimit.message },
  });
  app.use('/api/', limiter);

  app.use(compression());

  app.use(
    cors({
      origin: config.clientUrl,
      credentials: true,
    }),
  );
}
