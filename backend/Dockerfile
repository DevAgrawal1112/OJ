FROM node:16-alpine
WORKDIR /app/backend
COPY package*.json ./
RUN apk update && apk add --no-cache gcc g++ python3 python3-dev openjdk11
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

