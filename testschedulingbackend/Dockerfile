# Pull from Node LTS image to create our front end container
FROM node:10.15.1-jessie

# Set this as our working directory so we don't have to do a lot cd madness
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json over first
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the information that is within our app directory
COPY . .

# Expose port 4200
EXPOSE 3030

# Entrypoint that will start our node app
# that serves the front end
CMD sleep 6 && npm start