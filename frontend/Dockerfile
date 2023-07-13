FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm i
EXPOSE 5000
CMD ["npm", "start"]

