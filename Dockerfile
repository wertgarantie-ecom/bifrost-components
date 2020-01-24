FROM node:latest

RUN mkdir -p /app/components-liveserve
WORKDIR /app/components-liveserve/
COPY package*.json /app/components-liveserve/
RUN npm install
RUN npm install -g http-server

COPY . /app/components-liveserve/
RUN npm run build

EXPOSE 3333

RUN npm rum watch &

CMD http-server -p 3333 --cors