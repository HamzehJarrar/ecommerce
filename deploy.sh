#!/bin/bash

echo "🚀 Starting MegaMart deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Building Docker images...${NC}"
docker-compose build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker build successful!${NC}"

echo -e "${BLUE}🚀 Starting containers...${NC}"
docker-compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to start containers!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Containers started successfully!${NC}"

# Wait for services to be healthy
echo -e "${BLUE}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check if containers are running
if [ "$(docker-compose ps -q app | wc -l)" -gt 0 ]; then
    echo -e "${GREEN}✅ Application is running!${NC}"
    echo -e "${GREEN}🌐 Access the application at: http://localhost${NC}"
    echo -e "${GREEN}📊 API available at: http://localhost:5000${NC}"
    echo -e "${BLUE}📋 View logs with: docker-compose logs -f${NC}"
    echo -e "${BLUE}🛑 Stop with: docker-compose down${NC}"
else
    echo -e "${RED}❌ Containers failed to start properly${NC}"
    echo -e "${BLUE}Check logs with: docker-compose logs${NC}"
    exit 1
fi

echo -e "${GREEN}✨ Deployment complete!${NC}"
