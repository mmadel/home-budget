mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db/
mongo --eval "load('/home/home-budget/initialdatabasescript.js')"
