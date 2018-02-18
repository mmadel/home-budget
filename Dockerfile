FROM ubuntu:14.04

RUN	apt-get update 
RUN	apt-get install -y apt-transport-https 
RUN	apt-get -y install git 
RUN	apt-get -y install curl 
RUN	apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5 
RUN	echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list 
RUN	apt-get update 
RUN	apt-get install -y mongodb-org 
RUN	rm -rf /var/lib/apt/lists/* 
RUN	mkdir /data 
RUN	mkdir /data/db 
RUN	chown mongodb:mongodb /data -R 
RUN	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - 
RUN apt-get install -y nodejs 
RUN	apt-get install -y build-essential 
RUN	mkdir  /home/home-budget 
RUN	git clone https://github.com/mmadel/home-budget.git /home/home-budget 
RUN chmod +x /home/home-budget/mongoscript.sh
RUN sh /home/home-budget/mongoscript.sh
RUN	npm install -g --unsafe-perm @angular/cli 
WORKDIR /home/home-budget/ 
RUN	npm install 
RUN	ng build 
WORKDIR /home/home-budget/backend  
RUN	npm install 
RUN	npm install pm2 -g 
RUN	apt-get install -y nginx 
RUN	cp /home/home-budget/HomeBudget /etc/nginx/sites-available 
WORKDIR	/var 
RUN	mkdir -p www/HomeBudget/root 
RUN	cp -a /home/home-budget/dist/. /var/www/HomeBudget/root/
RUN	ln -s /etc/nginx/sites-available/HomeBudget /etc/nginx/sites-enabled/ 
RUN	echo 'service nginx start' >> /etc/bash.bashrc 
RUN	echo 'pm2 start /home/home-budget/backend/app.js' >> /etc/bash.bashrc
RUN	echo 'mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db/' >> /etc/bash.bashrc