#!/bin/sh

. /opt/TalentCloud/op/env

echo "running build.sh"

cd $WEBROOT && \

make -f $OPROOT/Makefile clean env composer-install laravel-init npm-install npm-dev

