# Responsible Mining Index (RMI) - App
React & Node powered.

## 🔧 Prerequisites

* yarn (1.6.0)
* node (8.10.x)
* Responsible Mining Index (RMI) - API

## 🚛 Install

1. Install proper node version (8.10.x)

    ```bash
    nvm install v8.10.0
    nvm use v8.10.0
    ```

1. Install dependencies using yarn or npm

    ```bash
    yarn
    ```

1. Rename `.env.default` to `.env` and fill accordingly:

    ```bash
    cp .env.default .env
    vim .env
    ```
   
    Set the API port, by default `3001` if unchanged in your RMI-API project

    ```
    PORT=3001
    ```
   
    Set the API url, by default `http://localhost`. Obviously the RMI-API Docker should be up

    ```
    API_URL=http://localhost
    ```
   
    Set the API token, which can be found in your RMI-API `docker-compose.yml` -> `secretKey`

    ```
    API_TOKEN=
    ```

1. Complie & run the server

    ```bash
    yarn dev
    ```
