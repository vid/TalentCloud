
TalentCloud docker/AKS integration (wip)


# Overview

## talentcloud-op

An operator image that manages the environment for talentcloud and nginx.

On startup, it uses this flow:

* During container build, run the repo install, including generating an app key to .env.
* On image startup:
 * If there's no setup flag, run op-assert, which creates the ssl key, affirms the directory structure, copies any existing .env file to the app volume, and creates the setup flag.
 * Else if there's a setup file, copies the .env file from the current build
* Run the startup script, which calls migrate
* Sleep, standing by for operator commands


## talentcloud

The app container, it builds after talentcloud-op and copies the built files from it.

## nginx

The nginx server, it builds after talentcloud-op and copies the built files from it.

## postgres

The database server.

# Notes

The final .env file is copied to the app volume post initial install (no .setup), and restored on successive startups (setup present).

## Testing
...Makefile
    `composer install`

... post-install.sh
    `make -f $OPROOT/Makefile env laravel-init fresh-db fake-data`

## Production

It may be better to copy the .env file before the container build starts.

...Makefile
    `composer install -v --prefer-dist --no-dev --no-suggest --optimize-autoloader`


