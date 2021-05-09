FROM node:lts-alpine3.13@sha256:7021600941a9caa072c592b6a89cec80e46cb341d934f1868220f5786f236f60
WORKDIR /app
RUN npm install npm@7.12.0 -g
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_BACKEND_BASE_URL
RUN REACT_APP_BACKEND_BASE_URL=$REACT_APP_BACKEND_BASE_URL npm run build
CMD node server.ts