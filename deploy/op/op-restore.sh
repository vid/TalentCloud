#!/bin/sh -x

. /opt/TalentCloud/op/env

echo "restoring app setup via op-restore.sh"

cp $APPROOT/app/env-saved $WEBROOT/.env

date >> $SETUP_FLAG
