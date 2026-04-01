# 1. Use the official Node.js image
FROM node:18-alpine

# 2. Set the folder inside the container where our code will live
WORKDIR /usr/src/app

# 3. Copy only the 'package.json' first (to make building faster)
COPY package*.json ./

# 4. Install the backend dependencies
RUN npm install

# 5. Copy the rest of your backend files (index.js, gemini.js, etc.)
COPY . .

# 6. Tell Docker the app runs on port 8080
EXPOSE 8080

# 7. The command to start your backend
CMD ["node", "index.js"]