FROM composer:1.5.1 AS composer

FROM php:7.2-alpine3.7 as talentcloud-op

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apk update && apk upgrade && \
  docker-php-source extract && \
  # transitory packages
  apk add --no-cache --virtual .build-dependencies \
  zlib-dev \
  cyrus-sasl-dev \
  autoconf \
  g++ \
  libtool \
  pcre-dev && \
  # included packages
  apk add --no-cache \
  nodejs-npm \
  git \
  make \
  libzip-dev \
  postgresql-dev imagemagick-dev && \
  pecl install imagick && \
  pecl install zip && \
  docker-php-ext-enable imagick zip && \
  docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
  docker-php-ext-install pgsql pdo_pgsql && \
  apk del .build-dependencies && \
  rm -rf /var/cache/apk/*

COPY deploy/etc/php/php.ini /etc/php/
COPY deploy/op /opt/TalentCloud/op/

#ADD --chown=www-data:www-data deploy/www.tgz /opt/TalentCloud/var/
#RUN chmod -R uog+rwx /opt/TalentCloud/var/www/storage

# start of build path
RUN mkdir -p /opt/TalentCloud/var/www/
# called as context .. from docker-compose.yml
ADD --chown=www-data:www-data . /opt/TalentCloud/var/www/

# set up permissions
RUN chown -R www-data:www-data /opt/TalentCloud/var/www && chmod -R u+s /opt/TalentCloud/var/www && chmod -R g+rxws /opt/TalentCloud/var/www/storage && chmod -R g+rxws /opt/TalentCloud/var/www/bootstrap/cache

# build the current repo image
RUN su -s /opt/TalentCloud/op/build.sh www-data
# end of build path

WORKDIR /opt/TalentCloud/

# assert the environment, then wait around
CMD ["/opt/TalentCloud/op/up.sh"]

