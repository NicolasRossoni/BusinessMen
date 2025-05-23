#!/bin/bash

# Para o container se estiver rodando
sudo docker stop backend-api 2>/dev/null
sudo docker rm backend-api 2>/dev/null

# Build da imagem
sudo docker build -t backend-api .

# Roda o container
sudo docker run -d --name backend-api -p 5000:5000 backend-api

echo "Backend rodando em http://localhost:5000"
echo "Para parar: sudo docker stop backend-api" 