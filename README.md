# 🌟 GBPify — AI Google Business Profile Post Manager

A clean, full-stack web app that helps businesses and agencies create, preview, and manage **Google Business Profile (GBP)** posts in seconds using AI.

Instead of writing posts manually, enter a topic and GBPify gives you **3 AI-generated variations** alongside a **live mockup** of how the post will look on Google Search and Google Maps.

---

## ✨ Features

- **🤖 AI Post Studio**: Generates 3 distinct post styles (Engaging, Promotional, Educational) via OpenRouter AI.
- **📱 Live Google Preview**: Real-time mockup showing Google Search Knowledge Panel & Google Maps cards (with desktop & mobile toggle).
- **📍 Multi-Location Hub**: Add, view, and delete your physical business branches cleanly.
- **💾 Drafts & 1-Click Publishing**: Save drafts or mark posts as published right from the dashboard.
- **📊 Analytics Dashboard**: Quick stats on total locations, posts, drafts, and published content.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **AI**: OpenRouter API (`meta-llama/llama-3.3-70b-instruct:free`)
- **Auth**: JWT & bcryptjs

---

## 🚀 Running Locally

### 1. Clone & Install
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Configure `.env`
In `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gbp_post_manager
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_key
CLIENT_URL=http://localhost:3000
```

In `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Dev Servers
```bash
# Terminal 1 (Backend)
cd server && npm run dev

# Terminal 2 (Frontend)
cd client && npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel (Client + Server)

You can deploy both the frontend and backend to Vercel as two connected services from the same GitHub repository:

### 1. Deploy Backend (`gbpify-server`)
1. On Vercel, click **Add New Project** and import this repo.
2. Set **Root Directory** to `server`.
3. Set **Framework Preset** to `Other`.
4. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string.
   - `OPENROUTER_API_KEY`: Your OpenRouter API key.
5. Click **Deploy**. Copy your live backend URL (e.g. `https://gb-pify.vercel.app`).

### 2. Deploy Frontend (`gbpify-client`)
1. Click **Add New Project** and import the same repo again.
2. Set **Root Directory** to `client` (Next.js is detected automatically).
3. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL with `/api` (e.g. `https://gb-pify.vercel.app/api`).
4. Click **Deploy**.

*Tip: If you ever change `NEXT_PUBLIC_API_URL`, trigger a Redeploy on the frontend project so Next.js bakes the new URL into the build.*

---

## 📄 License

MIT License — feel free to customize and use for your own projects!
