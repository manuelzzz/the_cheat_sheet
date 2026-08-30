---
title: Docker
description: Core Docker CLI commands for images, containers, and volumes.
---

## Images

```bash
docker build -t <name> .        # build an image from a Dockerfile
docker images                    # list local images
docker pull <image>                # download an image
docker rmi <image>                   # remove an image
```

## Containers

```bash
docker run -d -p 8080:80 <image>   # run a container in the background
docker ps                            # list running containers
docker ps -a                           # list all containers
docker stop <container>                  # stop a container
docker rm <container>                      # remove a container
docker logs -f <container>                   # follow container logs
docker exec -it <container> sh                 # open a shell in a container
```

## Volumes & Networks

```bash
docker volume ls                # list volumes
docker network ls                 # list networks
```

## Compose

```bash
docker compose up -d      # start services in the background
docker compose down         # stop and remove services
docker compose logs -f        # follow logs for all services
```
