# 🚀 MegaMart Deployment Guide

This guide covers deploying MegaMart to production servers with high performance and scalability.

## 📋 Prerequisites

- VPS or Cloud Server (AWS, Azure, GCP, DigitalOcean, etc.)
- Docker and Docker Compose installed
- Domain name (optional but recommended)
- SSL certificate (optional but recommended)

## 🐳 Deployment with Docker (Recommended)

### Option 1: Quick Deploy with Script

1. **Upload project to server**
   ```bash
   scp -r megamart-ecommerce user@your-server-ip:/home/user/
   ```

2. **SSH into server**
   ```bash
   ssh user@your-server-ip
   ```

3. **Navigate to project directory**
   ```bash
   cd /home/user/megamart-ecommerce
   ```

4. **Run deployment script**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Option 2: Manual Docker Compose Deployment

1. **Build and start containers**
   ```bash
   docker-compose up -d --build
   ```

2. **Check container status**
   ```bash
   docker-compose ps
   ```

3. **View logs**
   ```bash
   docker-compose logs -f
   ```

## 🌐 Nginx Configuration (Production)

### With Domain and SSL

1. **Install Certbot for SSL**
   ```bash
   sudo apt update
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Get SSL certificate**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Update nginx.conf**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
       
       # Rest of configuration...
   }
   ```

## ☁️ Cloud Provider Specific Deployment

### AWS Deployment

#### Using EC2

1. **Launch EC2 instance** (Ubuntu 22.04 recommended)
2. **Configure security groups** (Allow ports 80, 443, 22)
3. **Install Docker**
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose
   sudo usermod -aG docker $USER
   ```
4. **Deploy application** (follow Docker deployment steps)

#### Using ECS (Elastic Container Service)

1. **Push image to ECR**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URL
   docker tag megamart-ecommerce:latest YOUR_ECR_URL/megamart:latest
   docker push YOUR_ECR_URL/megamart:latest
   ```

2. **Create ECS task definition**
3. **Create ECS service with load balancer**
4. **Configure auto-scaling**

### Azure Deployment

#### Using Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name megamart \
  --image megamart-ecommerce:latest \
  --dns-name-label megamart \
  --ports 5000
```

### Google Cloud Platform

#### Using Cloud Run

```bash
gcloud run deploy megamart \
  --image gcr.io/PROJECT_ID/megamart:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 📊 Performance Optimization

### 1. Horizontal Scaling

Scale application instances:
```bash
docker-compose up -d --scale app=5
```

### 2. Load Balancing

Nginx is configured to load balance across multiple app instances using `least_conn` algorithm.

### 3. Caching Strategy

- **Static assets**: Cached for 30 days
- **API responses**: Can be cached with Redis
- **Browser caching**: Configured in Nginx

### 4. Database Optimization (when integrated)

```yaml
# Add to docker-compose.yml
mongodb:
  command: mongod --wiredTigerCacheSizeGB 2
```

### 5. Resource Limits

Configure in docker-compose.yml:
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## 📈 Monitoring & Logging

### Application Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app

# Last 100 lines
docker-compose logs --tail=100 app
```

### Health Monitoring

Access health endpoint:
```bash
curl http://localhost:5000/api/health
```

### Integration with Monitoring Tools

#### Prometheus + Grafana

1. **Add prometheus.yml**
   ```yaml
   scrape_configs:
     - job_name: 'megamart'
       static_configs:
         - targets: ['app:5000']
   ```

2. **Add to docker-compose.yml**
   ```yaml
   prometheus:
     image: prom/prometheus
     volumes:
       - ./prometheus.yml:/etc/prometheus/prometheus.yml
     ports:
       - "9090:9090"
   
   grafana:
     image: grafana/grafana
     ports:
       - "3001:3000"
   ```

## 🔐 Security Best Practices

### 1. Environment Variables

Never commit `.env` files. Use secrets management:
- AWS: Secrets Manager
- Azure: Key Vault
- GCP: Secret Manager

### 2. Firewall Configuration

```bash
# UFW example
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. Regular Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade

# Update Docker images
docker-compose pull
docker-compose up -d
```

### 4. SSL/TLS

Always use HTTPS in production. Auto-renew Let's Encrypt:
```bash
sudo certbot renew --dry-run
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build Docker image
        run: docker build -t megamart .
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push megamart
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/app
            docker-compose pull
            docker-compose up -d
```

## 🆘 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs app

# Check container status
docker-compose ps

# Restart containers
docker-compose restart
```

### High Memory Usage

```bash
# Check resource usage
docker stats

# Limit memory in docker-compose.yml
deploy:
  resources:
    limits:
      memory: 512M
```

### Network Issues

```bash
# Check network
docker network ls

# Inspect network
docker network inspect megamart-network
```

## 📞 Support

For deployment issues:
- Create an issue on GitHub
- Email: support@megamart.com
- Documentation: Check README.md

## 🎯 Post-Deployment Checklist

- [ ] Application accessible via domain
- [ ] SSL certificate installed and working
- [ ] Health check endpoint responding
- [ ] Logs being collected
- [ ] Monitoring configured
- [ ] Backups configured
- [ ] Firewall rules set
- [ ] Auto-scaling configured (if needed)
- [ ] CDN configured (if needed)
- [ ] Database backups automated (when integrated)

---

**Congratulations! Your MegaMart application is now deployed and ready to handle production traffic!** 🎉
