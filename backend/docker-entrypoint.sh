#!/bin/sh
set -e

echo "[TuneForge Backend] Running database migrations..."
if [ -n "$DATABASE_URL" ]; then
  npx prisma migrate deploy || echo "[TuneForge Backend] Warning: Migration deploy encountered an issue, continuing..."
fi

echo "[TuneForge Backend] Starting server..."
exec "$@"
