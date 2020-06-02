#!/bin/bash
echo "RMI APP production"

echo "doing pull"
git pull origin 2018

echo "Building project"
sudo docker-compose build

echo "Stopping project"
sudo docker-compose down

echo "Stopped and running new version"
sudo docker-compose up -d

echo "Cleaning after deploy"
sudo docker system prune -a -f

echo "Restarting server"
sudo service nginx restart
