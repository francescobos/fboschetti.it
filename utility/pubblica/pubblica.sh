#!/bin/zsh
#genera sitemap xml
# backupRemoteSite.sh fboschetti.it
npx sitemap --index-base-url https://www.fboschetti.it/ < ../../routes/urlDelSito.txt > ../../public/sitemap.xml
rsync -rzv --delete --exclude-from='escludi.txt' ../../../fboschetti.it/ francesco@206.189.61.36:/home/francesco/fboschetti.it/
ssh francesco@206.189.61.36 'nvm use 20; pm2 --update-env restart fboschetti; sleep 4; pm2 list'