# build stage
FROM node:16.18.0 as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf

RUN chown nginx:nginx /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#test
