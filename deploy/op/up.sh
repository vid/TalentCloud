#!/bin/sh

. /opt/TalentCloud/op/env

#[ -f $SETUP_FLAG ] && rm $SETUP_FLAG
cd $WEBROOT && \

if [ ! -f $SETUP_FLAG ]; then
  $OPROOT/op-assert.sh www-data
else
  $OPROOT/op-restore.sh www-data
fi && \

echo "post"

su -s $OPROOT/startup.sh www-data && \

sleep 9999d;
