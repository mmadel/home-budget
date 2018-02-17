FROM ubuntu:14.04
RUN \
	apt-get update && \
	apt-get install -y apt-transport-https && \
	apt-get -y install git && \
	apt-get -y install curl && \
	apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5 && \
	echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list && \
	apt-get update && \
	apt-get install -y mongodb-org && \
	rm -rf /var/lib/apt/lists/* && \
	mkdir /data && \
	mkdir /data/db && \
	chown mongodb:mongodb /data -R && \
	mongod --fork --logpath /var/log/mongodb.log && \
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
    apt-get install -y nodejs && \
	apt-get install -y build-essential && \
	mkdir  /home/home-budget && \
	git clone https://github.com/mmadel/home-budget.git /home/home-budget && \
	mongo --eval "load('/home/home-budget/initialdatabasescript.js')" && \
	npm install -g --unsafe-perm @angular/cli && \
	cd /home/home-budget/ && \
	npm install && \
	ng build && \
	cd /home/home-budget/backend  && \
	npm install && \
	npm install pm2 -g && \
	apt-get install -y nginx && \
	cp /home/home-budget/HomeBudget /etc/nginx/sites-available && \
	cd var && \
	mkdir -p www/HomeBudget/root && \
	cp /home/home-budget/dist/*.* /var/www/HomeBudget/root/ && \
	ln -s /etc/nginx/sites-available/HomeBudget /etc/nginx/sites-enabled/ && \
	echo 'service nginx start' >> /etc/bash.bashrc
	echo 'pm2 start /home/home-budget/backend/app.js' >> /etc/bash.bashrc

	
	