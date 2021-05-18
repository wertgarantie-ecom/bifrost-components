# After-sales Component

The after-sales component is responsible for the actual insurance contract. It __must__ be placed within the _"thanks for your purchase"_-page.

_* Examples / Demos for each component can be found in *Chapter 2: Components* below._


### Placement


Placeholder: ```<div id="wertgarantie-after-sales"></div>```
Place placeholder whereever it should be rendered within the _"thanks for your purchase"_-page.

_* If another placeholder-div is wanted (other class or id), please inform us so that we can configure it on our side._


### Data

| Property | Type     | Description
| -------- | -------- | --------
| id       | ```string```   | PublicId for the current environment / stage
| stage    | ```string```   | The current environment, either ```staging``` or ```production```
| cartProducts    | ```displayedProduct[]```     | ```displayedProduct```-Array that contains all insurable cart products (see table below)
| orderId | ```string``` | Shop internal order id for the purchase
| encryptedSessionId | ```string``` | Session Id from ```wertgarantie-session-id```-Cookie the which was SHA-256 encrypted on the server side with the provided secret (see [below](##encryption)) 
| customer | ```object``` | Neccessary customer data (see table below)

_displayed product_
| Property | Type     | Description
| -------- | -------- | --------
| sku    | ```string```     | shop internal product id
| name    | ```string```     | shop internal product name
| deviceClasses    | ```string```     | deviceClasses for this product
| price   | ```number```     | Price as a ```minor unit``` number: 801,75€ -> 80175
| baseSku&nbsp;(optional)    | ```string```     | sku of the base product
| manufacturer&nbsp;(optional) | ```string``` | Manufacturer of the product

_customer_
| Property | Type     | Description
| -------- | -------- | --------
| salutation    | ```string```     | salutation, e.g. "Herr", "Frau", "Divers"
| firstname    | ```string```     | First name
| lastname    | ```string```     | Last name
| street    | ```string```     | Street address incl. house number
| zip    | ```string```     | Zip code
| country    | ```string```     | Country, ideally as an [alpha-2-code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), e.g. DE for Germany
| email    | ```string```     | Customer email
| company (optional)    | ```string```     | Customer company

### Example
```js
<script type="module">
    import initInsuranceComponents from 'https://cdn.jsdelivr.net/npm/wertgarantie-component-loader@1/dist/wertgarantieLoader.min.js';

    const shopConfig = {
        id: "public:855wd6ea-rvre-a89z-9f8d-778f0ad9137f", 
        stage: "staging",
        cartProducts = [
            {
                sku: "97d1eb7c-fe0e-4b95-96dc-ec44709aca7d",
                name: "Bapple X",
                deviceClasses: "Smartphone",
                price: 80000,
                manufacturer: "Bapple"
            },
            {
                sku: "6f0b2bf6-c507-11ea-a054-cf2d1d418205",
                name: "LG C9 OLED",
                deviceClasses: "332,5080,4983",
                price: 219900
            }
        ],
        orderId: "96a0466a-0cc6-4595-9f43-ac6426525bfb",
        encryptedSessionId: "7d5545846ec409da1594294ae1743095b8463d4bcd9a479417c71dba0b9a092b",
        customer: {
            company: "mustermann AG",
            salutation: "Herr", 
            firstname: "Max",
            lastname: "Mustermann",
            street: "Unter den Linden 9",
            zip: "52345", 
            city: "Köln",
            country: "DE",
            email: "max@example.com"
        }
    };
    
    initInsuranceComponents(shopConfig);
</script>
```

## Encryption
To ensure all data is correct and was not modified in the process the ```wertgarantie-session-id```-Cookie must be encrypted __on the server side__. The secret must remain secret. Please contact us immediately if the secret was published somehow. 

Process: 
1. Get the ```wertgarantie-session-id```-Cookie
2. Encrypt the cookie with HmacSHA256-Hashing Algorithm with the secret

You can find examples below:


### NodeJS + Express
You'll need a 3rd party package for encryption (like [CryptoJS](https://www.npmjs.com/package/crypto-js)).
```js
const CryptoJS = require('crypto-js');

// retrieve cookie from request
const sessionId = req.cookies['wertgarantie-session-id'];

// your secret
const secret = "shop secret for that environment"

// encrypt retrieved sessionID with secret provided by Wertgarantie team
const encryptedSessionId = CryptoJS.HmacSHA256(sessionId, secret).toString();
```


### PHP

```php
// retrieve cookie from request
$sessionId = $_COOKIE["wertgarantie-session-id"];

// your secret
$secret = "shop secret for that environment";

// encrypt retrieved sessionID with secret provided by Wertgarantie team
$encryptedSessionId = hash_hmac('sha256', $sessionId, $secret);
```







