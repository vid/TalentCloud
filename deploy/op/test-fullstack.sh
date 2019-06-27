#!/bin/sh
. /opt/TalentCloud/op/env
cd $WEBROOT

$OPROOT/op-assert.sh  && \
echo "running talentcloud-op tests" && \
cp $OPROOT/*junit.xml $APPROOT/reports/ && \
make -f $OPROOT/Makefile test-all && \
ls $APPROOT/reports/ && \
echo "tests finished"
