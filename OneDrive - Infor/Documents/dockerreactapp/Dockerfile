FROM node:20-alpine as build
WORKDIR /cont
ADD ./package*.json ./
RUN npm install
ADD . .
ENTRYPOINT ["/cont"]
EXPOSE 3000

CMD ["npm","start"]


