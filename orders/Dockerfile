FROM node

WORKDIR /app/orders

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7777
CMD ["npm", "start"]
