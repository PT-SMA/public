FROM node:20-trixie-slim

WORKDIR /app
COPY package.json /app
COPY postinstall.mjs /app
RUN npm install

COPY index.mjs /app
EXPOSE 8869

# RUN useradd app
# USER app

CMD ["npm", "start"]
