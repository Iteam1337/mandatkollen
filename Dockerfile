FROM node:alpine
WORKDIR /app
COPY package*.json .
RUN npm ci 
COPY . .
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
RUN npm run build
CMD npm start
