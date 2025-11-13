first please create a .env file

cd ~/new1.0
nano .env

MONGO_URI=mongodb://127.0.0.1:27017/studentmanager
SESSION_SECRET=your_strong_secret_key_here_12345
PORT=3000

sudo systemctl start mongod
sudo systemctl status mongod


cd ~/new1.0

# 1. Create .env
cat > .env << 'EOF'
MONGO_URI=mongodb://127.0.0.1:27017/studentmanager
SESSION_SECRET=your_strong_secret_key_here_12345
PORT=3000
EOF

# 2. Start MongoDB
sudo systemctl start mongod

# 3. Run app
npm run dev
