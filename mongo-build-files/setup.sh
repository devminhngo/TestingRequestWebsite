#!/bin/bash

# Create log file
touch /var/log/mongodb.log

# Start mongod service with logging enabled
# Ensure that it is reachable via all ip addresses
mongod --bind_ip 0.0.0.0 --logpath /var/log/mongodb.log --logappend &

# Sleep 5 seconds while we wait for mongo to start and tail the log
sleep 5 && mongorestore --dir=/tmp/backup/ && tail -f /var/log/mongodb.log