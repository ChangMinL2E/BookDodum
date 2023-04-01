# base image
FROM node:16.14.0-buster-slim

# update and install necessary packages
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    v4l-utils

# set permission for video device
RUN chmod 777 /dev/video0

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source code
COPY . .

# start application
CMD ["npm", "start"]
