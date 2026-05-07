# SubsDay - Subscription Tracker

A modern, minimalist full-stack web application for tracking subscriptions, upcoming payments, and spending insights using a calendar-based interface.

![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Features

- **Subscription Management** - Add, edit, delete subscriptions with detailed info
- **Calendar View** - Visual monthly calendar showing upcoming payments
- **Multi-Currency Support** - Track subscriptions in 20+ currencies with auto-conversion
- **Statistics Dashboard** - Monthly spending, yearly projections, category breakdown with charts
- **CSV Import** - Import subscriptions from CSV files
- **Light/Dark Mode** - Beautiful theme with system preference detection
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **JWT Authentication** - Secure user authentication
- **Rate Limiting** - Arcjet-powered API protection

## Tech Stack

### Frontend
- React 18 + TypeScript
- Zustand (state management)
- React Query (server state & caching)
- React Router 6
- Tailwind CSS
- Recharts (data visualization)
- Lucide Icons
- date-fns

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Arcjet (rate limiting & bot protection)
- express-validator (input validation)

## Project Structure

```
SubsDay/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middlewares/     # Auth, rate limiting, validation
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic (currency conversion)
│   │   ├── types/           # TypeScript types
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # React Query hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client
│   │   ├── store/           # Zustand stores
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your values:
```env
MONGODB_URI=mongodb://localhost:27017/subsday
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
EXCHANGE_RATE_API_KEY=your-api-key (optional, fallback rates included)
ARCJET_KEY=your-arcjet-key (optional, rate limiting still works)
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Subscriptions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subscriptions` | Get all subscriptions |
| GET | `/api/subscriptions/:id` | Get subscription by ID |
| POST | `/api/subscriptions` | Create subscription |
| PUT | `/api/subscriptions/:id` | Update subscription |
| DELETE | `/api/subscriptions/:id` | Delete subscription |
| POST | `/api/subscriptions/import` | Import subscriptions from CSV data |

### Statistics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get user statistics |

## CSV Import Format

The import feature expects CSV files with the following columns:

```csv
name,price,currency,billingCycle,nextBillingDate,category
Netflix,15.99,USD,monthly,2024-02-01,Streaming
Spotify,9.99,USD,monthly,2024-02-15,Music
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `PORT` | Server port | No (default: 5000) |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | Token expiration | No (default: 7d) |
| `EXCHANGE_RATE_API_KEY` | Exchange rate API key | No (fallback included) |
| `ARCJET_KEY` | Arcjet API key | No (fails open) |
| `NODE_ENV` | Environment | No (default: development) |

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The built frontend files will be in `frontend/dist/`. Serve them with any static file server or configure the backend to serve them.

## Design

The UI is inspired by macOS-style minimal applications with:
- Clean typography (Inter font)
- Soft colors and subtle shadows
- Card-based layout
- Smooth transitions and hover states
- Focus on readability and clarity

## License

MIT
