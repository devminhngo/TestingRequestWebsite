#!/bin/bash

echo "Stopping services"
docker stop ldap-service phpldapadmin-service

echo "Removing containers"
docker rm ldap-service phpldapadmin-service

echo "Removing network"
docker network rm ldap-net