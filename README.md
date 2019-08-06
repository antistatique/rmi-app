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
   
    Set the App port, by default your RMI-API project use `3001` don't use the same
    ```
    PORT=3002
    ```
   
    Set the API url, by default `http://localhost:3001`. Obviously the RMI-API Docker should be up

    ```
    API_URL=http://localhost:3001/api
    ```
   
    Set the API token, if unchanged in your RMI-API Docker, get the token on 1Password under `RMI - Responsible Mining Index (RMI) - API` in the *.env* section. Otherwise, you can check the key `AUTH_TOKEN` into `docker-compose.yml` of your RMI-API Docker project.

    ```
    API_TOKEN=
    ```
   
    Set the TRANSIFEX API key, which can be found 1Password under `RMI - Responsible Mining Index (RMI) - API` in the *.env* section

    ```
    API_TOKEN=
    ```

1. Complie & run the server

    ```bash
    yarn dev
    ```
