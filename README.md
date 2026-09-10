# 🌟 GBPify (EdgeLink) — AI-Powered Google Business Profile Post Manager

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![OpenRouter AI](https://img.shields.io/badge/OpenRouter-AI-blue?style=flat&logo=openai)](https://openrouter.ai/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

**GBPify** is a simple, modern web application that helps businesses and marketing agencies create and manage **Google Business Profile (GBP)** posts in seconds using Artificial Intelligence.

Instead of spending hours brainstorming topics, writing copy, and wondering how the post will look on Google, **GBPify generates 3 tailored post variations with AI** and gives you a **real-time live preview of how it looks on Google Search & Google Maps** before you publish.

---

## 📌 Table of Contents

- [What Does This App Do?](#-what-does-this-app-do)
- [How It Works (5 Easy Steps)](#-how-it-works-5-easy-steps)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started Locally](#-getting-started-locally)
- [Environment Variables Explained](#-environment-variables-explained)
- [Backend API Endpoints](#-backend-api-endpoints)
- [How to Deploy](#-how-to-deploy)

---

## 💡 What Does This App Do?

Writing regular posts on Google Business Profile is essential for ranking higher in local search results and attracting nearby customers. However, managing multiple locations and coming up with fresh content every week is time-consuming.

**GBPify solves this by:**
1. Storing your business locations (store name, category, address, phone, website).
2. Generating 3 ready-to-use AI posts per prompt (Promotional, Community-focused, or Educational).
3. Displaying an exact replica of the Google Knowledge Panel and Google Maps post preview (with desktop and mobile views).
4. Letting you save drafts or publish posts with 1 click.

---

## 🔄 How It Works (5 Easy Steps)

```text
1. Register / Login
       ↓
2. Add your Business Location(s) (Store name, address, category)
       ↓
3. AI Post Studio (Type your topic, choose tone & language)
       ↓
4. Pick Your Favorite Variation & Customize Call-to-Action (Call Now, Book, Learn More, etc.)
       ↓
5. Live Google Mockup Preview ➔ Save as Draft or Mark as Published!
```

---

## ✨ Key Features

### 1. 🤖 AI Post Studio (Powered by OpenRouter AI)
- Enter any topic, offer, or announcement (e.g. *"20% discount on dental cleanings this Friday"*).
- Select your post type (*Update*, *Offer*, *Event*), tone (*Engaging*, *Professional*, *Urgent*), and language.
- AI instantly creates **3 unique variations**:
  - **Variation 1: Engaging & Community** — Friendly, relatable, and inviting.
  - **Variation 2: Promotional & High-Conversion** — Direct offer highlighting urgency and savings.
  - **Variation 3: Educational & Authority** — Helpful tips establishing your local expertise.

### 2. 📱 Pixel-Perfect Live Google Preview
- See how your post looks in real time before publishing.
- Switch between **Google Search Knowledge Panel** and **Google Maps** views.
- Toggle between **Desktop** and **Mobile** screen sizes.
- Interactive Call-To-Action (CTA) buttons (*Call Now*, *Book*, *Order Online*, *Learn More*, *Sign Up*, *Get Offer*).

### 3. 📍 Business Location Manager
- Add and manage multiple branches or franchises.
- Save each branch's name, category, address, city, phone number, and website.
- Clean and intuitive management: easily create, view, or delete branches anytime.
- Start with a clean slate — no unwanted test locations will reappear after deletion.

### 4. 💾 Drafts & One-Click Publishing
- Save works-in-progress as **Drafts** to edit later.
- Switch status to **Published** whenever you are ready.
- Edit existing posts or delete outdated ones with single-click actions.

### 5. 📊 Real-Time Dashboard
- Overview metrics: Total Locations, Total Posts, Drafts Count, and Published Count.
- Quick-access list of recent posts with direct actions to publish, view, or edit.

### 6. 🔒 Safe & Secure Authentication
- JWT-based login and registration.
- Password encryption with `bcryptjs`.
- 1-Click "Demo Login" button on the login screen for quick evaluation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (React 19, App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: Axios with JWT interceptors

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **AI Integration**: OpenRouter API (`meta-llama/llama-3.3-70b-instruct:free` or any preferred model)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`

---

## 📁 Folder Structure

```text
GBPify/
├── client/                     # Next.js Frontend
│   ├── src/
│   │   ├── app/                # App router pages
│   │   │   ├── login/          # Login page (with 1-click demo login)
│   │   │   ├── register/       # User registration
│   │   │   ├── dashboard/      # Main dashboard with statistics
│   │   │   ├── locations/      # Location management (add/delete)
│   │   │   ├── create-post/    # AI Studio + live editor
│   │   │   └── posts/          # All posts directory (search & filter)
│   │   ├── components/         # Reusable UI components
│   │   │   ├── auth/           # Protected routes
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── locations/      # Add location modal
│   │   │   ├── posts/          # Edit post modal, quick view
│   │   │   └── preview/        # Live Google Search & Maps card mockup
│   │   ├── context/            # Authentication context
│   │   └── lib/                # API client configuration
│   └── package.json
│
├── server/                     # Express.js Backend API
│   ├── src/
│   │   ├── config/             # MongoDB database connection
│   │   ├── controllers/        # Route controllers (Auth, AI, Locations, Posts)
│   │   ├── middleware/         # Auth verification middleware
│   │   ├── models/             # Mongoose schemas (User, Location, Post)
│   │   ├── routes/             # API routes
│   │   └── server.js           # Express app entry point
│   ├── .gitignore              # Server gitignore (ignores node_modules, .env)
│   └── package.json
│
├── .gitignore                  # Root gitignore
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started Locally

Follow these quick steps to run the project on your machine:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or 20+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- (Optional) Free API key from [OpenRouter](https://openrouter.ai/) for live AI generation

---

### Step 1: Install Dependencies

Open your terminal in the project root folder:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

### Step 2: Configure Environment Files

#### 1. Backend (`server/.env`):
Inside the `server` folder, create a file named `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gbp_post_manager
JWT_SECRET=super_secret_gbp_jwt_token_key_2026_secure
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free
CLIENT_URL=http://localhost:3000
```

> **Note**: If you don't have an OpenRouter key immediately, the server includes a smart fallback generator so you can still test post creation without breaking!

#### 2. Frontend (`client/.env.local`):
Inside the `client` folder, create a file named `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Step 3: Run the Application

Open two terminal windows:

#### Terminal 1 — Start the Server:
```bash
cd server
npm run dev
```
*Backend runs on: `http://localhost:5000`*

#### Terminal 2 — Start the Client:
```bash
cd client
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

Now open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 🔑 Environment Variables Explained

| Variable | Where It Goes | What It Does (In Easy Words) |
|---|---|---|
| `PORT` | `server/.env` | The local port where the Express server listens (default: `5000`). |
| `MONGODB_URI` | `server/.env` | Connection link to your local MongoDB or MongoDB Atlas database. |
| `JWT_SECRET` | `server/.env` | A secret password key used to sign and verify user login tokens. |
| `OPENROUTER_API_KEY` | `server/.env` | Your API key from [OpenRouter.ai](https://openrouter.ai/) to generate AI content. |
| `OPENROUTER_MODEL` | `server/.env` | Which AI model to use (default: `meta-llama/llama-3.3-70b-instruct:free`). |
| `CLIENT_URL` | `server/.env` | The address of your frontend app (used to allow secure CORS requests). |
| `NEXT_PUBLIC_API_URL` | `client/.env.local` | The backend API URL that the Next.js frontend sends requests to. |

---

## 📡 Backend API Endpoints

All protected endpoints require an `Authorization: Bearer <token>` header.

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Login with email and password |
| `GET` | `/api/auth/me` | Fetch logged-in user's profile |

### 📍 Locations (`/api/locations`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/locations` | Get all locations belonging to the current user |
| `POST` | `/api/locations` | Add a new business location |
| `GET` | `/api/locations/:id` | Get details of a single location |
| `DELETE` | `/api/locations/:id` | Delete a business location |

### 🤖 AI Generator (`/api/ai`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/generate-post` | Generate 3 distinct post variations using AI |

### 📝 Posts (`/api/posts`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/posts` | Get all posts (supports `search`, `status`, and `locationId` filters) |
| `GET` | `/api/posts/stats` | Get dashboard numbers (total locations, total posts, drafts, published) |
| `POST` | `/api/posts` | Create a new post (draft or published) |
| `GET` | `/api/posts/:id` | Get a specific post |
| `PUT` | `/api/posts/:id` | Update an existing post's text, CTA, or topic |
| `PATCH` | `/api/posts/:id/publish`| Instantly mark a draft post as published |
| `DELETE` | `/api/posts/:id` | Delete a post |

---

## 🌐 How to Deploy

### 1. Deploy Frontend to [Vercel](https://vercel.com)
1. Push your code to GitHub.
2. In Vercel, click **Add New Project** and select your repository.
3. Set **Root Directory** to `client`.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g. `https://your-backend.onrender.com/api`).
5. Click **Deploy**!

### 2. Deploy Backend to [Render](https://render.com)
1. In Render, create a new **Web Service** connected to your GitHub repository.
2. Set **Root Directory** to `server`.
3. Set **Build Command** to: `npm install`.
4. Set **Start Command** to: `npm start`.
5. Add your Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `OPENROUTER_API_KEY`, `CLIENT_URL`, `PORT=5000`).
6. Click **Create Web Service**!

---

## 🤝 Contributing & License

This project is built for educational, portfolio, and commercial use. Feel free to fork, customize, and build upon it!
