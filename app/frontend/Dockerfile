# STAGE 1: Build the Vite app
FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: Serve the app with Nginx
FROM nginx:stable-alpine
# Copy the 'dist' folder from the build stage to Nginx's public folder
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]