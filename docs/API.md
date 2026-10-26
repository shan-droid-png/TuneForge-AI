# TuneForge AI - API Documentation

Welcome to the TuneForge AI REST API documentation.

## Base URL Convention

All application endpoints are versioned with the `/api/v1` prefix.

- **Local Development URL:** `http://localhost:5000/api/v1`
- **Default Port:** `5000` (configurable via `PORT` in `.env`)

---

## 1. System Endpoints

### Health Check

Verify whether the API server is up and accepting HTTP connections.

- **URL:** `/api/v1/health`
- **Method:** `GET`
- **Auth Required:** No
- **Headers:**
  - `Accept: application/json`

#### Response

- **Status Code:** `200 OK`
- **Content-Type:** `application/json`

```json
{
  "success": true,
  "message": "TuneForge AI API is running",
  "timestamp": "2025-10-26T04:20:00.000Z",
  "uptime": 12.34
}
```

#### Example Usage

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/health
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/v1/health" -Method Get
```

**JavaScript (Fetch):**
```javascript
const res = await fetch('http://localhost:5000/api/v1/health');
const data = await res.json();
console.log(data);
```

---

## 2. Error Response Format

All error responses from the API adhere to a standard JSON schema:

```json
{
  "success": false,
  "error": {
    "message": "Error description here",
    "statusCode": 404
  }
}
```

In `NODE_ENV=development`, an additional `stack` trace field is included for debugging.

---

## 3. Future Roadmap Endpoints (Planned)

The following route groups will be introduced under the `/api/v1` prefix in upcoming development phases:

| Namespace | Path Prefix | Description | Planned Phase |
|---|---|---|---|
| **Authentication** | `/api/v1/auth` | User registration, login, JWT issuance, session refresh | Phase 2 |
| **Users** | `/api/v1/users` | Profile and developer preference settings | Phase 2 |
| **Lyrics** | `/api/v1/lyrics` | AI lyric drafting, rhyming engine, meter editor | Phase 3 |
| **Prompts** | `/api/v1/prompts` | Generation prompt creation, tagging, and templates | Phase 3 |
| **Generation** | `/api/v1/generate` | Dispatch audio synthesis tasks to music AI providers | Phase 4 |
| **Projects** | `/api/v1/projects` | CRUD project workspace, stems, tracks, and metadata | Phase 4 |
