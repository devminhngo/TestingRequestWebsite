# Use the latest mongo image as it's base
FROM mongo:latest

# Copy the backup folder containing the mongodump data.
COPY backup/ /tmp/backup

# Copy over the setup script
COPY setup.sh /home/setup.sh

# Modify the file so that it can be read, listed, and executed
RUN chmod 777 /home/setup.sh

# Expose port 27017
EXPOSE 27017

# Start the mongod service and import the backup from the tmp directory
# using the setup shell script
CMD /home/setup.sh