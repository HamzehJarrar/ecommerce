# MegaMart E-commerce Platform

A modern, responsive, and high-performance e-commerce platform built with React, Node.js, Material-UI, and Docker.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Material-UI (MUI) for a polished, professional look
- **High Performance**: Optimized for handling large traffic loads
- **RESTful API**: Well-structured backend API with Express.js
- **Docker Ready**: Easy deployment with Docker and Docker Compose
- **Security**: Implemented with Helmet, rate limiting, and security best practices
- **Scalable Architecture**: Built to scale horizontally

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd megamart-ecommerce
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../server
   cp .env.example .env
   # Edit .env file with your configuration
   ```

5. **Run the development servers**

   In one terminal (server):
   ```bash
   cd server
   npm run dev
   ```

   In another terminal (client):
   ```bash
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🐳 Docker Deployment

### Quick Start with Docker Compose

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Application: http://localhost:80
   - API: http://localhost:5000

3. **Stop the application**
   ```bash
   docker-compose down
   ```

### Manual Docker Build

1. **Build the Docker image**
   ```bash
   docker build -t megamart-ecommerce .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 megamart-ecommerce
   ```

## 📦 Production Deployment

### Building for Production

1. **Build the React app**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd ../server
   NODE_ENV=production npm start
   ```

### Deploy to Cloud (AWS, Azure, GCP)

#### Using Docker

1. **Push to container registry**
   ```bash
   docker tag megamart-ecommerce your-registry/megamart-ecommerce:latest
   docker push your-registry/megamart-ecommerce:latest
   ```

2. **Deploy to your cloud provider**
   - AWS: ECS, EKS, or Elastic Beanstalk
   - Azure: Container Instances or AKS
   - GCP: Cloud Run or GKE

#### Using Kubernetes

```bash
kubectl apply -f k8s/
```

## 🔧 Configuration

### Environment Variables

Server (.env):
```
NODE_ENV=production
PORT=5000
CLIENT_URL=http://localhost:3000
```

### Nginx Configuration

The nginx.conf file includes:
- Reverse proxy configuration
- Rate limiting
- Gzip compression
- Static file caching
- Security headers

## 📊 Performance Optimization

### Implemented Optimizations:

1. **Server-side**
   - Compression middleware for response compression
   - Rate limiting to prevent abuse
   - Efficient routing and middleware
   - Helmet for security headers
   - Request sanitization

2. **Client-side**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Minification and bundling

3. **Infrastructure**
   - Nginx reverse proxy with caching
   - Docker multi-stage builds for smaller images
   - Health checks for container orchestration

### Scaling for High Traffic

1. **Horizontal Scaling**
   ```bash
   docker-compose up --scale app=3
   ```

2. **Load Balancing**
   - Nginx handles load balancing across multiple app instances
   - Uses least_conn algorithm for optimal distribution

3. **Caching**
   - Static assets cached for 30 days
   - API responses can be cached with Redis

4. **Database Optimization** (when implemented)
   - Connection pooling
   - Indexing
   - Query optimization

## 🏗️ Project Structure

```
megamart-ecommerce/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── users.js
│   ├── server.js         # Main server file
│   └── package.json
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── nginx.conf           # Nginx configuration
└── README.md
```

## 🔐 Security Features

- Helmet for HTTP headers security
- Rate limiting to prevent DDoS
- Input sanitization
- CORS configuration
- Non-root Docker user
- Environment variable management

## 📱 API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/deals/today` - Get daily deals

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug

### Cart
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/items` - Add item to cart
- `PUT /api/cart/:sessionId/items/:productId` - Update cart item
- `DELETE /api/cart/:sessionId/items/:productId` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:orderId` - Get order details

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/:userId` - Get user profile

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📈 Monitoring

- Health check endpoint: `/api/health`
- Docker health checks configured
- Ready for integration with monitoring tools (Prometheus, Grafana, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For support, email support@megamart.com or create an issue in the repository.

## 🎯 Roadmap

- [ ] MongoDB integration
- [ ] Redis caching
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced search
- [ ] Product reviews
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] PWA support
- [ ] Multi-language support

---

Built with ❤️ using React, Node.js, and Material-UI
