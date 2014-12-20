#!/bin/bash

if [ -d "anime_storage" ]; then
  rm -rf anime_storage
fi

if [ -d "apps" ]; then
  rm -rf apps
fi

if [ -d "static" ]; then
  rm -rf static
fi

if [ -d "templates" ]; then
  rm -rf templates
fi

unzip dist.zip

rm dist.zip

supervisorctl restart anime_storage

echo "Update: done"