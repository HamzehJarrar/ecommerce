import app from './app.js';
import { config } from './config/index.js';
import { connectDatabase } from './config/database.js';

async function start() {
  try {
    await connectDatabase();
    console.log('تم الاتصال بقاعدة بيانات MongoDB');
  } catch (err) {
    console.error('فشل الاتصال بـ MongoDB:', err.message);
    process.exit(1);
  }

  const server = app.listen(config.port, () => {
    console.log(
      `الخادم يعمل في وضع ${config.nodeEnv} على المنفذ ${config.port}`,
    );
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM: إغلاق الخادم');
    server.close(() => {
      console.log('تم إغلاق الخادم');
    });
  });
}

start();
