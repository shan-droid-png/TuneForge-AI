# TuneForge AI 🎵⚡

> **Turn your ideas into music with AI.**  
> An intelligent, collaborative music creation platform designed for songwriters, producers, and audio experimenters.

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Project Goals](#-project-goals)
- [Technology Stack](#-technology-stack)
- [Repository Structure](#-repository-structure)
- [Team Responsibilities](#-team-responsibilities)
- [Prerequisites](#-prerequisites)
- [Environment Configuration](#-environment-configuration)
- [Quick Start Guide](#-quick-start-guide)
  - [1. Start Database (Docker Compose)](#1-start-database-docker-compose)
  - [2. Start Backend API](#2-start-backend-api)
  - [3. Start Frontend App](#3-start-frontend-app)
- [Testing the Health Endpoint](#-testing-the-health-endpoint)
- [Current Project Status & Future Milestones](#-current-project-status--future-milestones)
- [Documentation Links](#-documentation-links)
- [License](#-license)

---

## 🌟 Project Overview

**TuneForge AI** is an AI-powered music creation studio where users can brainstorm musical ideas, craft song lyrics with rhythmic and rhyming assistance, generate tailored music prompts, and synthesize songs using generative music AI models.

This repository contains the initialized, decoupled monorepo foundation. It is structured to allow two developers—one specializing in the frontend (React) and one specializing in the backend (Node.js/Express/PostgreSQL)—to develop, test, and ship features independently while maintaining a cohesive codebase.

---

## 🎯 Project Goals

1. **Conversational Studio Assistant**: Real-time AI chat for musical brainstorming, chord progressions, and stylistic exploration.
2. **Lyric Studio & Rhyme Engine**: Comprehensive lyric authoring interface with meter counting, syllable rhythm, and rhyme suggestion tools.
3. **Music Prompt Forge**: High-precision prompt engineering that maps user creative intent into optimized instructions for music AI generation models.
4. **AI Generation Pipeline**: Asynchronous song and stem generation with progress tracking and audio playback.
5. **Project & Asset Workspace**: Cloud-backed management for lyric drafts, generated stems, metadata, and exportable music assets.

---

## 🛠 Technology Stack

### Frontend
- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** JavaScript (ESNext)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom Dark Studio theme)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Web Framework:** [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL 16](https://www.postgresql.org/) (Containerized via Docker)
- **ORM:** [Prisma ORM](https://www.prisma.io/)
- **Middleware:** CORS, centralized error handling, 404 handler, JSON body parsing
- **Dev Watcher:** [Nodemon](https://nodemon.io/) / Native Node watch

### Development & DevOps
- **Containerization:** Docker & Docker Compose
- **Version Control:** Git & GitHub

---

## 📁 Repository Structure

```
tuneforge-ai/
├── frontend/                     # Frontend Single Page Application
│   ├── public/                   # Static assets & favicon
│   ├── src/
│   │   ├── assets/               # Local images, audio presets, graphics
│   │   ├── components/           # Reusable UI components
│   │   ├── context/              # React Context state providers
│   │   ├── hooks/                # Custom React hooks
│   │   ├── layouts/              # App layouts (RootLayout, StudioLayout)
│   │   ├── pages/                # Page components (LandingPage, Studio)
│   │   ├── services/             # API client & fetch services
│   │   ├── utils/                # Helper utilities
│   │   ├── App.jsx               # Route definitions
│   │   ├── index.css             # Tailwind CSS & global studio styling
│   │   └── main.jsx              # React DOM entry point
│   ├── .env.example              # Frontend environment variables template
│   ├── .gitignore                # Frontend-specific git exclusions
│   ├── index.html                # HTML entry template
│   ├── package.json              # Frontend scripts and dependencies
│   ├── postcss.config.js         # PostCSS config for Tailwind
│   ├── tailwind.config.js        # Tailwind studio theme extensions
│   └── vite.config.js            # Vite build configuration
│
├── backend/                      # Backend REST API Service
│   ├── prisma/
│   │   └── schema.prisma         # Prisma schema and PostgreSQL datasource
│   ├── src/
│   │   ├── controllers/          # Request handlers (health, future domains)
│   │   ├── middleware/           # Centralized error handler, 404 handler
│   │   ├── routes/               # API v1 route definitions
│   │   ├── services/             # Business logic & AI provider integrations
│   │   ├── utils/                # Logging and helper utilities
│   │   ├── validators/           # Request input schema validators
│   │   ├── app.js                # Express app setup, CORS, and middleware
│   │   └── server.js             # HTTP server entry point & shutdown handlers
│   ├── tests/                    # Backend unit & integration test suites
│   ├── .env.example              # Backend environment variables template
│   ├── .gitignore                # Backend-specific git exclusions
│   └── package.json              # Backend scripts and dependencies
│
├── docs/                         # Developer & Architecture Documentation
│   ├── API.md                    # REST API documentation & health check spec
│   └── DEVELOPMENT.md            # Detailed local setup and workflow guide
│
├── compose.yaml                  # Local PostgreSQL 16 Docker service
├── .env.example                  # Root Docker environment variables template
├── .gitignore                    # Safe root gitignore protecting secrets & builds
├── LICENSE                       # MIT Open-Source License
└── README.md                     # Project overview and reference guide
```

---

## 👥 Team Responsibilities

| Role | Developer | Key Deliverables & Focus |
|---|---|---|
| **Developer 1: Frontend** | React / UI Engineer | • Studio landing page and navigation<br>• Responsive dark studio UI with Tailwind CSS<br>• Interactive audio player and equalizer visualizers<br>• Chatbot dialogue interface<br>• Lyric editor and prompt builder forms<br>• Consuming `/api/v1` backend endpoints |
| **Developer 2: Backend** | Node.js / API Engineer | • Express server architecture and routing under `/api/v1`<br>• PostgreSQL schema design & Prisma migrations<br>• Authentication (JWT / sessions) and user management<br>• Music AI provider integration and task queueing<br>• Secure API key handling and rate limiting |

---

## 📋 Prerequisites

Before starting, make sure the following software is installed on your workstation:
- [Node.js](https://nodejs.org/) v18.11+ (v20+ or v22 LTS recommended)
- [npm](https://www.npmjs.com/) (bundled with Node)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
- [Git](https://git-scm.com/)

---

## ⚙️ Environment Configuration

TuneForge AI uses environment variable templates. Run the following commands from the repository root:

### 1. Root Docker Configuration
```bash
cp .env.example .env
```
*(PowerShell: `Copy-Item .env.example .env`)*

Configure PostgreSQL credentials in `.env`:
```env
POSTGRES_DB=tuneforge
POSTGRES_USER=tuneforge_user
POSTGRES_PASSWORD=replace_with_a_secure_local_password
POSTGRES_PORT=5432
```

### 2. Backend Configuration
```bash
cd backend
cp .env.example .env
cd ..
```
*(PowerShell: `Copy-Item backend/.env.example backend/.env`)*

Key backend environment variables:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL="postgresql://tuneforge_user:replace_with_a_secure_local_password@localhost:5432/tuneforge?schema=public"
JWT_SECRET=your_jwt_secret_key_placeholder
AI_API_KEY=your_ai_provider_api_key_placeholder
```

### 3. Frontend Configuration
```bash
cd frontend
cp .env.example .env
cd ..
```
*(PowerShell: `Copy-Item frontend/.env.example frontend/.env`)*

Key frontend environment variables:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

> **Security Note:** `.env` files are ignored by git. Never commit real credentials, database passwords, or third-party API keys.

---

## 🚀 Quick Start Guide

### Option A: Run Full Stack with Docker (Recommended)

Run the entire platform (PostgreSQL, Backend API, and Frontend SPA) with a single command:

```bash
# 1. Copy the environment configuration (first-time only)
cp .env.example .env

# 2. Build and launch all services in detached mode
docker compose up -d --build

# 3. Check health status of all containers
docker compose ps

# 4. View aggregated service logs
docker compose logs -f
```

All three services will be operational:
- **Frontend SPA:** [http://localhost](http://localhost) (or `http://localhost:80`)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API via Nginx Proxy:** [http://localhost/api/v1/health](http://localhost/api/v1/health)
- **PostgreSQL Database:** `localhost:5432` (bound to `127.0.0.1`)

To stop all containers:
```bash
docker compose down
```

---

### Option B: Local Development Workflow (Without Full Containerization)

If developing locally outside Docker, start PostgreSQL in Docker and run frontend/backend on the host:

#### 1. Start Database
```bash
docker compose up -d postgres
```

---

### 2. Start Backend API

In a new terminal window:
```bash
cd backend

# Install dependencies
npm install

# Start development server with file watching
npm run dev
```

The server will be accessible at `http://localhost:5000`.

---

### 3. Start Frontend App

In another terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser. The landing page includes an active status monitor that checks communication with the backend.

To build the frontend bundle:
```bash
cd frontend
npm run build
```

---

## 🩺 Testing the Health Endpoint

Verify that the backend is responding to incoming HTTP requests:

### Using cURL:
```bash
curl -X GET http://localhost:5000/api/v1/health
```

### Using PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/v1/health" -Method Get
```

### Expected Output:
```json
{
  "success": true,
  "message": "TuneForge AI API is running",
  "timestamp": "2026-10-26T04:28:58.771Z",
  "uptime": 38.52
}
```

---

## 🗺️ Current Project Status & Future Milestones

| Milestone | Status | Description |
|---|---|---|
| **Phase 1: Project Initialization** | ✅ **Completed** | Monorepo structure, React + Vite frontend, Express backend, PostgreSQL Docker Compose, health endpoint, base documentation. |
| **Phase 2: Database Schema & Auth** | ⏳ *Next Milestone* | Implement Prisma models (User, Project, Track, Lyric, Prompt), JWT authentication, user registration and login endpoints. |
| **Phase 3: Lyric Studio & Prompt Engine** | 📋 *Planned* | Conversational assistant interface, lyric rhyme & meter editor, music prompt engineering templates. |
| **Phase 4: Music Generation Engine** | 📋 *Planned* | Integration with external generative music API, background task processing, audio waveform player, stem downloads. |
| **Phase 5: Cloud Deployment & CI/CD** | 📋 *Planned* | GitHub Actions CI/CD pipelines, containerized deployment, staging and production cloud environments. |

---

## 📚 Documentation Links

- [Development Workflow Guide](docs/DEVELOPMENT.md)
- [REST API Specification](docs/API.md)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
