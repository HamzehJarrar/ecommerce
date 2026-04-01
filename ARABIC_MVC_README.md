# MegaMart E-commerce - MVC Architecture with Arabic Support

## 🎯 Project Structure - Complete MVC Pattern

```
megamart-ecommerce/
├── server/                          # Backend (Node.js + Express)
│   ├── models/                      # Data Models (M in MVC)
│   │   ├── Product.js              # Product model with Arabic names
│   │   ├── Category.js             # Category model with Arabic names
│   │   ├── Cart.js                 # Shopping cart model
│   │   ├── Order.js                # Order management model
│   │   └── User.js                 # User authentication model
│   ├── controllers/                 # Business Logic (C in MVC)
│   │   ├── ProductController.js    # Product CRUD operations
│   │   ├── CategoryController.js   # Category management
│   │   ├── CartController.js       # Cart operations
│   │   ├── OrderController.js      # Order processing
│   │   └── UserController.js       # User management
│   ├── routes/                      # API Routes
│   │   ├── products.js             # /api/products
│   │   ├── categories.js           # /api/categories
│   │   ├── cart.js                 # /api/cart
│   │   ├── orders.js               # /api/orders
│   │   └── users.js                # /api/users
│   ├── middleware/                  # Custom Middleware
│   │   ├── errorHandler.js         # Global error handling
│   │   ├── validator.js            # Input validation
│   │   └── logger.js               # Request logging
│   ├── server.js                    # Main server file
│   ├── package.json
│   └── .env.example
│
├── client/                          # Frontend (React + MUI)
│   ├── src/
│   │   ├── components/             # Reusable Components
│   │   │   ├── layout/             # Layout components
│   │   │   │   ├── Header.jsx      # Header with language toggle
│   │   │   │   └── Footer.jsx      # Footer with translations
│   │   │   ├── home/               # Home page components
│   │   │   │   ├── HeroCarousel.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── CategorySection.jsx
│   │   │   │   ├── BrandSection.jsx
│   │   │   │   └── DailyEssentials.jsx
│   │   │   └── common/             # Shared components
│   │   │       └── ProductCard.jsx
│   │   ├── pages/                  # Page Components
│   │   │   ├── HomePage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── ProductDetailsPage.jsx
│   │   ├── contexts/               # React Context (State Management)
│   │   │   ├── LanguageContext.jsx # Language switching (AR/EN)
│   │   │   └── CartContext.jsx     # Global cart state
│   │   ├── services/               # API Services
│   │   │   └── api.js              # Axios instance + API calls
│   │   ├── locales/                # Translations
│   │   │   ├── ar.js               # Arabic translations
│   │   │   └── en.js               # English translations
│   │   ├── App.jsx                 # Main App component
│   │   ├── index.jsx               # Entry point
│   │   └── index.css               # Global styles
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── Dockerfile                       # Docker configuration
├── docker-compose.yml               # Multi-container setup
├── nginx.conf                       # Reverse proxy config
└── README.md
```

## 🌐 Arabic Language Support

### Backend
- All models include both `name` and `nameAr` fields
- API returns data in both languages
- No changes needed on backend for language switching

### Frontend  
- **LanguageContext**: Global language state (AR/EN)
- **Translations**: Complete Arabic and English translations in `/locales`
- **RTL Support**: Automatic right-to-left layout for Arabic
- **Language Toggle**: Button in header to switch languages

### Usage in Components:
```javascript
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t, language, isRTL, toggleLanguage } = useLanguage();
  
  return (
    <Typography>{t.header.signIn}</Typography>  // "تسجيل الدخول" or "Sign In"
  );
}
```

## 🏗️ MVC Pattern Explained

### Model (Data Layer)
- Located in: `server/models/`
- Responsibilities:
  - Data structure definition
  - Database operations (CRUD)
  - Business rules
  - Data validation

Example:
```javascript
// Product.js
class Product {
  async findAll(filters) { /* ... */ }
  async findById(id) { /* ... */ }
  async create(data) { /* ... */ }
}
```

### Controller (Logic Layer)
- Located in: `server/controllers/`
- Responsibilities:
  - Handle HTTP requests
  - Call appropriate model methods
  - Send HTTP responses
  - Error handling

Example:
```javascript
// ProductController.js
class ProductController {
  async getAllProducts(req, res) {
    const products = await Product.findAll(req.query);
    res.json({ success: true, data: products });
  }
}
```

### View (Presentation Layer)
- Located in: `client/src/`
- Responsibilities:
  - UI rendering
  - User interactions
  - Display data from API
  - Form submissions

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Install root dependencies
npm run install-all

# Or manually:
cd server && npm install
cd ../client && npm install
```

### 2. Environment Setup
```bash
cd server
cp .env.example .env
# Edit .env if needed
```

### 3. Run Development
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client  
cd client
npm start
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Default Language: Arabic (can toggle to English)

## 🐳 Docker Deployment

```bash
# Build and start
docker-compose up -d

# Scale for high traffic
docker-compose up -d --scale app=5

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products (supports filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/deals/today` - Get daily deals
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/slug/:slug` - Get by slug
- `GET /api/categories/:id` - Get by ID

### Cart
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/items` - Add item
- `PUT /api/cart/:sessionId/items/:productId` - Update quantity
- `DELETE /api/cart/:sessionId/items/:productId` - Remove item
- `DELETE /api/cart/:sessionId` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:orderId` - Get order details
- `PATCH /api/orders/:orderId/status` - Update status

### Users
- `POST /api/users/register` - Register
- `POST /api/users/login` - Login
- `GET /api/users/:userId` - Get profile
- `PUT /api/users/:userId` - Update profile

## 🎨 Adding New Features

### Add New Model:
1. Create model in `server/models/NewModel.js`
2. Export class with CRUD methods

### Add New Controller:
1. Create controller in `server/controllers/NewController.js`  
2. Import model
3. Implement request handlers

### Add New Route:
1. Create route in `server/routes/new.js`
2. Import controller
3. Define endpoints
4. Register in `server.js`

### Add New Translation:
1. Add key in `client/src/locales/ar.js`
2. Add same key in `client/src/locales/en.js`
3. Use in component: `{t.newSection.newKey}`

## 🔧 Configuration

### Change Default Language:
Edit `client/src/contexts/LanguageContext.jsx`:
```javascript
const [language, setLanguage] = useState('en'); // Change to 'en' for English
```

### Add New Language:
1. Create `client/src/locales/fr.js`
2. Add to LanguageContext translations object
3. Add language toggle option

## 📦 Production Build

```bash
# Build client
cd client
npm run build

# Start production server
cd ../server
NODE_ENV=production npm start
```

## 🌟 Key Features

✅ Complete MVC architecture
✅ Arabic and English support with RTL
✅ Responsive design (mobile, tablet, desktop)
✅ Shopping cart functionality
✅ Product search and filtering
✅ Order management
✅ User authentication ready
✅ Docker containerization
✅ Nginx load balancing
✅ Security best practices
✅ API rate limiting
✅ Error handling
✅ Request logging

## 📚 Tech Stack

**Backend:**
- Node.js
- Express.js
- MVC Pattern
- In-memory data (easily replaceable with MongoDB)

**Frontend:**
- React 18
- Material-UI (MUI)
- React Router
- Context API
- Axios
- RTL support

**DevOps:**
- Docker
- Docker Compose
- Nginx
- Multi-stage builds

## 🤝 Contributing

The project follows clean code principles:
- Each file has single responsibility
- Models handle data, Controllers handle logic, Views handle UI
- Reusable components in separate files
- Centralized state management with Context API
- Centralized translations for easy maintenance

---

Made with ❤️ supporting Arabic and English languages
