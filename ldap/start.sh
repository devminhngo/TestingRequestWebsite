#!/bin/bash
echo "Creating network"
docker network create ldap-net
echo "Creating containers"
docker run --name ldap-service --network ldap-net --hostname ldap-service \
    --detach -p 389:389 -p 636:636 \
    osixia/openldap:latest --copy-service
docker run -p 6443:443 --network ldap-net \
    --env PHPLDAPADMIN_LDAP_HOSTS=ldap-service \
    --hostname phpldapadmin \
    --name phpldapadmin-service \
    --detach osixia/phpldapadmin:latest

PHPLDAP_IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" phpldapadmin-service)

echo "Ready!"
echo "Go to: https://localhost:6443"
echo "Login DN: cn=admin,dc=example,dc=org"
echo "Password: admin"