# TuneForge AI - Local Development Guide

This guide details the development workflow for the TuneForge AI monorepo. It is designed for two developers collaborating via GitHub.

---

## 1. Architecture & Developer Roles

The project is structured as an decoupled monorepo allowing both developers to run and test their components independently or together.

| Developer | Domain | Core Tech Stack | Primary Directory |
|---|---|---|---|
| **Developer 1** | Frontend | React 18, Vite, Tailwind CSS, React Router | `/frontend` |
| **Developer 2** | Backend | Node.js, Express.js (ESM), PostgreSQL, Prisma ORM | `/backend` |

---

## 2. Prerequisites

Ensure you have the following installed locally:
- **Node.js**: v18.11+ (v20+ or v22 LTS recommended)
- **npm**: v9+ (or modern package manager)
- **Docker & Docker Compose**: v20+ / Docker Desktop (running)
- **Git**: v2.30+

---

## 3. First-Time Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd TuneForge-AI
```

### Step 2: Configure Environment Variables

TuneForge AI relies on environment files for local configuration. Copy the example templates:

**Root (Docker Compose):**
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

Update the root `.env` if desired (a safe local password placeholder is provided by default).

**Backend:**
```bash
cd backend
cp .env.example .env
cd ..
```
*(On Windows PowerShell: `Copy-Item backend/.env.example backend/.env`)*

**Frontend:**
```bash
cd frontend
cp .env.example .env
cd ..
```
*(On Windows PowerShell: `Copy-Item frontend/.env.example frontend/.env`)*

---

## 4. Starting the PostgreSQL Database

We manage local PostgreSQL via Docker Compose. The database port (5432) is bound to `127.0.0.1` only to prevent accidental public exposure.

### Start the Database Container
```bash
docker compose up -d
```

### Check Container Status & Health
```bash
docker compose ps
```
The status will display `(healthy)` once PostgreSQL has initialized.

### View Database Logs
```bash
docker compose logs -f postgres
```

### Stop the Database
```bash
docker compose down
```

### Reset Database Volume (Fresh Start)
```bash
docker compose down -v
```

---

## 5. Running the Backend Service

Open a terminal dedicated to the backend:

```bash
cd backend
npm install
npm run dev
```

The server starts by default on `http://localhost:5000` with hot-reloading active.

### Verify Backend Health
In another terminal, browser, or curl:
```bash
curl http://localhost:5000/api/v1/health
```

Expected output:
```json
{
  "success": true,
  "message": "TuneForge AI API is running",
  "timestamp": "...",
  "uptime": 1.2
}
```

---

## 6. Running the Frontend Application

Open a separate terminal dedicated to the frontend:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will start on `http://localhost:5173`. Open this URL in your browser. The landing page includes an active status card that automatically pings the backend health endpoint.

### Building for Production
```bash
cd frontend
npm run build
```
The production bundle will be output to `frontend/dist`.

---

## 7. Git & Collaboration Workflow

### Branching Strategy
- `main`: Protected production-ready branch.
- `develop`: Shared integration branch for active features.
- Feature branches:
  - Frontend: `feature/fe-<feature-name>` (e.g. `feature/fe-audio-player`)
  - Backend: `feature/be-<feature-name>` (e.g. `feature/be-prisma-schema`)

### Pull Request Rules
1. Never commit `.env` files or credentials (verified by root `.gitignore`).
2. Run `npm run build` in `/frontend` before submitting frontend PRs.
3. Verify `GET /api/v1/health` and test routes in `/backend` before submitting backend PRs.
4. Keep commits semantic and scoped:
   - `feat(fe): ...`
   - `feat(be): ...`
   - `fix: ...`
   - `docs: ...`
