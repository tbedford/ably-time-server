FROM node:15
WORKDIR /home/node/server
COPY app /home/node/server
RUN npm install
CMD npm run server
EXPOSE 3000

