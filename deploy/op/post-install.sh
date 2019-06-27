#!/bin/sh -x

. /opt/TalentCloud/op/env

make -f $OPROOT/Makefile env laravel-init fresh-db fake-data
