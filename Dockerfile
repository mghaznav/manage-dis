FROM node:22-alpine3.19
LABEL maintainer="Muhammad Ali Ghaznavi <alighaznavi10@gmail.com>"

WORKDIR /app
COPY . .

EXPOSE 5173

RUN npm install
