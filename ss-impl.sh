#upload to server
rsync -vaP -e "ssh -p 20050" ./dist/allchains.zip tjordan@switchersoft.com:~/

#extract on server, cd root web
cd /var/www/allchains.app/web
rm *.js
rm *.woff
rm *.ico
rm *.svg
rm *.woff2
rm *.ttf
rm *.css
rm *.eot
rm assets/ -R
cp /home/tjordan/allchains.zip ./
unzip allchains.zip
mv ./allchains/* ./
rm allchains* -R
chown web30:client1 ./ -Rv
