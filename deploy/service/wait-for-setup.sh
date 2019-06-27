#!/bin/sh
# execute passed argument after .setup exists

SETUP_FLAG=/var/log/.setup

if [ ! -f $SETUP_FLAG ]; then
  echo "waiting for $SETUP_FLAG to exist"
  while [ ! -f $SETUP_FLAG ]
    do
      sleep 2
    done
fi

echo "Found setup from `cat $SETUP_FLAG`, running $1"
$1
echo 'exited'
if [ "$CI" != 'true' ] ; then
  echo DEBUGGING container running;
  sleep 100000;
fi
