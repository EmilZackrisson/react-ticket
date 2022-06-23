FROM node:alpine AS client
WORKDIR /app
COPY ./client/package.json ./
COPY ./client/package-lock.json ./
COPY ./client ./
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:alpine AS server
WORKDIR /app
COPY ./server/package.json ./
COPY ./server/package-lock.json ./
COPY ./server ./
RUN npm i
EXPOSE 3001
CMD ["npm", "run", "start"]