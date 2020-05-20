import * as Sentry from "@sentry/browser";

export default function initSentry(componentName, componentVersion, bifrostUri, clientId) {
    let environment;
    switch (bifrostUri) {
        case 'https://ecommerce.wertgarantie.com/wertgarantie':
            environment = 'production';
            break;
        case 'https://wertgarantie-bifrost-staging.herokuapp.com/wertgarantie':
            environment = 'staging';
            break;
        case 'https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie':
            environment = 'dev';
            break;
        case 'http://localhost:3000/wertgarantie':
            environment = 'local';
            break;
        default:
            environment = 'unknown';
            break;
    }
    if (environment === 'production' || environment === 'staging') {
        Sentry.init({
            dsn: 'https://10a2bf1226744e9f908e7939ec5e65c9@o395559.ingest.sentry.io/5247546',
            release: componentVersion,
            environment: environment


        });
        Sentry.configureScope(function (scope) {
            scope.setTag("clientId", clientId);
            scope.setTag("component", componentName);
        });
    }
}
