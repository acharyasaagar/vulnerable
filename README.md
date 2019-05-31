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
  The app is running on the localhost:3000/static

  ```

## Vulnerabilities

### 1. Register as admin:

  ```
  We intentionaly left the html hidden from view option to register as an admin.
  if an attacker gains admin privileges can change anything within the app.
  ```
### 2. Poor server validation:	

  ```
  When a user is buying a product inside the app there is poor data validation while generating the invoice. An attacker could intercept the request and change the payload (change the price).
  ```

### 3. Unprotected for deletion:

  ```
  An attacker may gain access to the deletion page by spidering or guessing the url and then will be able to delete items.
  ```
 
