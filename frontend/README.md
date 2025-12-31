# Frontend - React Application

This is a React application built with Vite, React Router, and modern React Hooks.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Tech Stack

- **React 18** - UI library with Hooks
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **Context API** - State management

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── context/        # Context providers (Auth, Toast)
│   ├── utils/          # API utilities
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── styles.css      # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
└── vite.config.js     # Vite configuration
```

## Features

- Authentication (Login/Signup)
- Post Management (CRUD)
- User Profile Management
- Admin Dashboard
- Protected Routes
- Toast Notifications
- Responsive Design

