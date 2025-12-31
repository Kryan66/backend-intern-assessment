# Quick Start Guide

## Why the page isn't loading?

The React app needs to be run through a development server. You cannot just open the HTML file in a browser.

## Steps to Run the Frontend:

### 1. Make sure you're in the frontend directory:
```bash
cd frontend
```

### 2. Install dependencies (if not already done):
```bash
npm install
```

### 3. Start the development server:
```bash
npm run dev
```

### 4. Open your browser:
The terminal will show you a URL (usually `http://localhost:3000`). Open that URL in your browser.

## Important Notes:

1. **Backend must be running**: Make sure your backend server is running on `http://127.0.0.1:4000` before using the frontend.

2. **Don't open index.html directly**: React apps need to be compiled and served by Vite. Opening the HTML file directly won't work.

3. **Development vs Production**:
   - Development: `npm run dev` (for development with hot reload)
   - Production: `npm run build` then `npm run preview` (for testing production build)

## Troubleshooting:

### Port already in use?
If port 3000 is busy, Vite will automatically use the next available port. Check the terminal output.

### Module not found errors?
Run `npm install` again to ensure all dependencies are installed.

### Backend connection errors?
Make sure:
- Backend is running on port 4000
- Backend CORS is configured correctly
- No firewall blocking the connection

