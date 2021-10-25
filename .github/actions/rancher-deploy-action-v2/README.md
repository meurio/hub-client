# Action for Github to deploy image in Rancher using Rancher API

## Envs

### `RANCHER_ACCESS_KEY`

**Required** API Access key created in Rancher.

### `RANCHER_SECRET_KEY`

**Required** API Secret key created in Rancher.

### `RANCHER_URL_API`

**Required** API Url of your rancher project workload.

### `SERVICE_NAME`

**Required** NAME OF YOUR SERVICE ON RANCHER CLUSTER WHAT YOU WANT DEPLOY.

### `DOCKER_IMAGE`

**Required** URL TO YOUR DOCKER IMAGE (Ex: AWS or DOCKER REGISTRY).

### `DOCKER_IMAGE_LATEST`

**Optional** URL TO YOUR DOCKER IMAGE WITH LATEST TAG.


## Example usage
`````
  
- name: Rancher Deploy
  uses: yantadeu/rancher-deploy-action@v0.0.2
  env:
    RANCHER_ACCESS_KEY: 'XXXXXXX'
    RANCHER_SECRET_KEY: 'XXXXXXX'
    RANCHER_URL_API: 'https://rancher.YOUR-DOMAIN.COM/v3'
    SERVICE_NAME: 'myProject'
    DOCKER_IMAGE: 'xxxxxxx:yyyyyyyy'
    DOCKER_IMAGE_LATEST: 'xxxxxxx:latest'
