#!/bin/bash

# === AUTO SETUP FOR NEW DEVICE ===
echo "Setting up Student Manager..."

# 1. Copy .env.example to .env (only if .env doesn't exist)
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo ".env created from template"
else
  echo ".env already exists – skipped"
fi

# 2. Generate random SESSION_SECRET if placeholder
if grep -q "change_me" .env; then
  NEW_SECRET=$(openssl rand -hex 16)
  sed -i "s/your_strong_secret_key_here_12345_change_me/$NEW_SECRET/" .env
  echo "Generated secure SESSION_SECRET"
fi

# 3. Install dependencies
npm install

# 4. Start MongoDB
sudo systemctl start mongod 2>/dev/null || echo "MongoDB already running or not installed"

echo ""
echo "Setup Complete!"
echo "Run: npm run dev"
echo "Open: http://localhost:3000"
