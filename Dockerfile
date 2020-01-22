FROM node:latest

WORKDIR /app/components-liveserve/
COPY package*.json /app/components-liveserve/
RUN npm install
RUN npm install -g local-cors-proxy

COPY . /app/components-liveserve/

EXPOSE 8010

RUN npm run serve &
CMD lcp --proxyUrl http://localhost:3333