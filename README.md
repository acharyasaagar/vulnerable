# Vulnerable web application



## Requirements
```
* Docker 18+
* Docker Compose 1.23+

```
## Instructions

### Building

```sh 
docker-compose pull
docker-compose build
```

### Running

* in the foreground:
  
  ```sh 
  docker-compose up
  ```

### Connect to the app

  ```sh 
  Check for the docker container IP.
  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
  ```

## Vulnerabilities

