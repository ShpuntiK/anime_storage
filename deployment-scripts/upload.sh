#!/bin/bash

REMOTE_HOST=

cd ..
npm i
grunt compress
scp dist.zip deployment-scripts/update.sh root@$REMOTE_HOST:/var/projects/anime_storage

ssh root@$REMOTE_HOST "cd /var/projects/anime_storage; chmod +x update.sh; ./update.sh"