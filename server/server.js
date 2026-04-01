import app from './app.js';
import { config } from './config/index.js';
import { connectDatabase } from './config/database.js';

async function start() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }

  const server = app.listen(5000, () => {
    console.log(
     `Server is running on port ${config.port}`,
    );
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM: Closing server');
    server.close(() => {
      console.log('Server closed');
    });
  });
}

start();
