<br/>
<br/>
<p align="center">
<img width="500" src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/wertgarantie-logo.svg" alt="wertgarantie-logo">
</p>
<br/>
<p align="center">
  <a href="https://app.circleci.com/pipelines/github/wertgarantie-ecom/bifrost?branch=master"><img src="https://circleci.com/gh/wertgarantie-ecom/bifrost.svg?style=shield" alt="build status"></a>
</p>
<br/>

# Bifrost Components 
This repo contains all custom elements as well as common-functions and client-styling-packages.

## Running locally
The docker instance is build by bifrosts docker-compose. If dependencies are added or changed, this might break the docker container.
In this case either run ``docker-compose down``, then delete the bifrost-component-images (list them via: ``docker images``) followed by ``docker-compose up -d`` to rebuild and restart (you must seed the database again or no component will show, see bifrost readme).

Or better: Run ``npm i`` at package root level, then build via ``npm run build `` // `` npm run build:dev``.
Make sure to hard-reload the (e.g. demo-shop) browser-tab to delete any cached scripts.

## Publish packages to NPM
Make sure you've installed "lerna" globally.
```
// Check globally installed packages:
npm list -g --depth=0

// Install lerna
npm i -g lerna

// Publish packages -> in root dir, run:
lerna version
```

## Running the library locally
```
npm install
npm run storybook
```
## Building Assets
```
npm run build
```

## Storybook
https://wertgarantie-ecom.github.io/bifrost-components/


## Related projects

| Package                                                       | Description                                                                                                                         |
| :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Wertgarantie-ecom](https://github.com/wertgarantie-ecom)                                         | Overview over all 'wertgarantie-ecom' projects                                          |
| [Bifrost](https://github.com/wertgarantie-ecom/bifrost)                     | "Backend-for-frontend" between Wertgaranties's webservices and the custom elements                               |
| [Bifrost components](https://github.com/wertgarantie-ecom/bifrost-components)             | Contains all custom elements.                   |
| [Demo Shop](https://github.com/wertgarantie-ecom/demo-shop) | Demo-Shop for end-to-end testing of components/bifrost and/or new products/changed client configurations |
| [Integrations](https://github.com/wertgarantie-ecom/integrations)               | Contains example pages for some clients                      |
| [Heimdall mock](https://github.com/wertgarantie-ecom/heimdall-mock)                     | Service to mock Wertgarantie's webservices API                               |
