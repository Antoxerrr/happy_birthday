# Билд стадия
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY happy_birthday/package*.json ./
RUN npm ci

COPY ./happy_birthday/ .
RUN npm run build

FROM nginx:alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]