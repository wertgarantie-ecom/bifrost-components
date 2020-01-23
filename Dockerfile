FROM node:latest

RUN mkdir -p /app/components-liveserve
WORKDIR /app/components-liveserve/
COPY package*.json /app/components-liveserve/
RUN npm install

COPY . /app/components-liveserve/
RUN npm run build


EXPOSE 3333

CMD npm run serve