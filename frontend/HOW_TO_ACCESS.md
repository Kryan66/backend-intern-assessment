# How to Access the Application

## 🚀 Quick Access Guide

### Option 1: Local Development (Recommended)

1. **Open Terminal** and navigate to the frontend folder:
   ```bash
   cd /Users/aryanpatil/backend-intern-assessment/frontend
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   - The terminal will show a URL like: `http://localhost:3000`
   - **Copy and paste that URL into your browser**
   - Or simply click the link if your terminal supports it

### Option 2: If Already Running

If the server is already running, just:
- Open your browser
- Go to: **http://localhost:3000**

---

## 📍 Access URLs

### Local Development:
- **Frontend**: http://localhost:3000
- **Backend API**: http://127.0.0.1:4000

### Production (if deployed):
- **Frontend**: https://sparkling-melomakarona-68221f.netlify.app (your Netlify URL)
- **Backend**: Your deployed backend URL

---

## 🔧 Step-by-Step Instructions

### First Time Setup:

1. **Open Terminal** (Mac: Cmd+Space, type "Terminal")

2. **Navigate to frontend directory**:
   ```bash
   cd /Users/aryanpatil/backend-intern-assessment/frontend
   ```

3. **Install dependencies** (if not done):
   ```bash
   npm install
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

5. **Look for this output**:
   ```
   VITE v5.0.8  ready in 500 ms

   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

6. **Open your browser** and go to: **http://localhost:3000**

---

## 🌐 Access from Other Devices (Same Network)

If you want to access from your phone or another computer:

1. Start the server with network access:
   ```bash
   npm run dev -- --host
   ```

2. Look for the "Network" URL in the output (e.g., `http://192.168.1.100:3000`)

3. Use that URL on other devices connected to the same Wi-Fi

---

## ⚠️ Important Notes

1. **Keep Terminal Open**: Don't close the terminal while using the app. Press `Ctrl+C` to stop the server.

2. **Backend Must Be Running**: Make sure your backend is running on port 4000 for the frontend to work properly.

3. **Port Already in Use?**: If port 3000 is busy, Vite will automatically use 3001, 3002, etc. Check the terminal for the actual URL.

---

## 🐛 Troubleshooting

### "Cannot GET /" or "Page not found"
- Make sure you're running `npm run dev` (not opening the HTML file directly)
- Check that the terminal shows the server is running

### "Connection refused" or API errors
- Make sure your backend is running on port 4000
- Check backend URL in `src/utils/api.js`

### Port already in use
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or use a different port: `npm run dev -- --port 3001`

---

## 📱 Quick Access Commands

```bash
# Navigate to frontend
cd frontend

# Start server
npm run dev

# Stop server (in the terminal running the server)
Ctrl + C
```

---

## 🎯 Direct Access

**Right now, you can access it at:**
- **http://localhost:3000** (if server is running)
- Or start it with: `cd frontend && npm run dev`

