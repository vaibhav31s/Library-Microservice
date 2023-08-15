FROM node

WORKDIR /app/customers

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5555
CMD ["npm", "start"]
