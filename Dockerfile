FROM node:20.12.1-slim
WORKDIR /src
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
