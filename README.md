first please create a .env file

cd ~/new1.0

nano .env




MONGO_URI=mongodb://127.0.0.1:27017/studentdb

SESSION_SECRET=your_strong_secret_key_here_12345

PORT=3000

After paste on it , press Ctrl O, Enter, Ctrl X to save it


sudo systemctl start mongod

sudo systemctl status mongod




# Install MongoDB + Start + Run App
sudo apt update && \
sudo apt install -y gnupg curl && \
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor && \
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list && \
sudo apt update && \
sudo apt install -y mongodb-org && \
sudo systemctl start mongod && \
sudo systemctl enable mongod && \
cd ~/new1.0 && \
npm run dev


./setup.sh


# 1. Install mongosh (direct)
curl -L https://github.com/mongodb-js/mongosh/releases/latest/download/mongosh-2.5.9-linux-x64.tgz | tar -xz && \
sudo mv mongosh-2.5.9-linux-x64/bin/mongosh /usr/local/bin/ && \
sudo chmod +x /usr/local/bin/mongosh && \
rm -rf mongosh-2.5.9-linux-x64

# 2. Update .env (replace YOUR_PASSWORD is 123)
echo "MONGO_URI=mongodb+srv://wongyanho:123@cluster0.603b9e0.mongodb.net/studentmanager?retryWrites=true&w=majority
PORT=3000" > .env

# 3. Test connection
mongosh "mongodb+srv://wongyanho:YOUR_PASSWORD@cluster0.603b9e0.mongodb.net/studentmanager"

# 4. Run app
npm run dev
