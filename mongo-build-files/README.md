# Description
This repository holds all the files used to build a mongodb image used by the scheduler's API. The Dockerfile will be used to run `docker build -t scheduler-mongo .` and is configured to import a predefined data set that will be continously updated with every sprint.

## Requirements
- Docker installed
- mongodump stored within the backup folder

## Running
Run `docker run -it --name <some_name> -p 27017:27017 scheduler-mongo` to start up a container

## Stopping
- If stdin detached run `docker stop <some_name>` where some name is the name of the container
- If docker run used the `-it` flags, press `ctrl+c`
