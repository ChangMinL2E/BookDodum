# build stage
FROM node:16.18.0 as build-stage

# # 웹캠에 접근할 수 있는 권한 설정
# RUN addgroup -S webcam && adduser -S webcam -G webcam
# RUN chmod 777 /dev/video0
# USER webcam
#
# # 필요한 라이브러리 및 패키지 설치
# RUN apk add --no-cache v4l-utils

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /var/jenkins_home/workspace/S08P22C104/frontend/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/S08P22C104/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#test
