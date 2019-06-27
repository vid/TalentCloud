#!/bin/sh -x

. /opt/TalentCloud/op/env

echo "running talentcloud-op setup via op-assert.sh"

if [ ! -d /var/log/nginx ]; then
  mkdir /var/log/nginx/
fi && \

OPENSSL_CONF=/usr/src/php/ext/openssl/tests/openssl.cnf openssl req -nodes -x509 -newkey rsa:4096 -keyout ${APPROOT}/ssl/server.key -out ${APPROOT}/ssl/server.pem -days 365 -subj "/C=US/ST=Ontario/L=Ottawa/O=Localhost/OU=Org/CN=talent.test" && \

cd $WEBROOT && \

su -s $OPROOT/post-install.sh www-data && \
cp $WEBROOT/.env $APPROOT/app/env-saved && \

ls -lat $APPROOT/app/ && \

date > $SETUP_FLAG
