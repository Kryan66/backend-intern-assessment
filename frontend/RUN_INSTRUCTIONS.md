# How to Run the Frontend Application

## Step-by-Step Instructions

### 1. Open Terminal
Open your terminal application (Terminal on Mac, Command Prompt or PowerShell on Windows, or any terminal on Linux).

### 2. Navigate to the Frontend Directory
```bash
cd /Users/aryanpatil/backend-intern-assessment/frontend
```

Or if you're already in the project root:
```bash
cd frontend
```

### 3. Install Dependencies (First Time Only)
If you haven't installed dependencies yet, run:
```bash
npm install
```

This will install all required packages (React, React Router, Vite, etc.).

### 4. Start the Development Server
```bash
npm run dev
```

### 5. Open in Browser
After running `npm run dev`, you'll see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Open your browser and go to:** `http://localhost:3000`

## Quick Commands Reference

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Important Notes

1. **Keep the terminal open** - The dev server runs in the terminal. Don't close it while using the app.

2. **Stop the server** - Press `Ctrl + C` in the terminal to stop the server.

3. **Backend must be running** - Make sure your backend server is running on `http://127.0.0.1:4000` for the frontend to work properly.

4. **Hot Reload** - Any changes you make to the code will automatically refresh in the browser.

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically use the next available port (3001, 3002, etc.). Check the terminal output for the actual URL.

### Command Not Found: npm
If you see this error, you need to install Node.js:
- Download from: https://nodejs.org/
- Install it, then try again

### Module Not Found Errors
Run `npm install` again to ensure all dependencies are installed.

### Backend Connection Errors
Make sure:
- Backend is running on port 4000
- Backend CORS is configured correctly
- No firewall blocking connections

