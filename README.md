# Laravel + React with SWC Project

This project consists of a Laravel backend API and React frontend with SWC (a faster JavaScript compiler).

## Project Structure

- `backend/`: Laravel backend API
- `frontend/`: React frontend application with SWC

## Setup Instructions

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and npm
- MySQL or SQLite

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd <repository-name>
```

2. Install all dependencies at once:
```
npm run install:all
```

Or install them separately:

```
# Root dependencies
npm install

# Backend dependencies
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Configure your database in the .env file
php artisan migrate

# Frontend dependencies
cd ../frontend
npm install
```

### Development

To run both the backend and frontend concurrently:
```
npm run dev
```

This will start:
- Laravel backend at http://localhost:8000
- React frontend at http://localhost:5173


## Building for Production

To build the frontend:
```
npm run build
```

The build files will be available in the `frontend/dist` directory. 