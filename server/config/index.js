import dotenv from 'dotenv';

dotenv.config();

const defaultMongo =
  
export const config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  mongoUri: process.env.MONGODB_URI || defaultMongo,
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'طلبات كثيرة من هذا العنوان، حاول لاحقاً.',
  },
  jsonLimit: '10mb',
};
