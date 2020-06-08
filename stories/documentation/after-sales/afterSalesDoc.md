# After Sales Component

* [Install / Include](#install)
* [Configuration](#configure-the-after-sales-component)
* [Example](#example)

## Install

In order to include Wertgarantie's after sales component in your website, you need to take out the following steps:
- include the script-tag in your page: 
```htmlembedded=
    <script src="https://cdn.jsdelivr.net/npm/wertgarantie-after-sales/dist/after-sales.min.js" type="module"></script>
```
- use the now available custom element 
```htmlembedded=
    <wertgarantie-after-sales></wertgarantie-after-sales>
```

## Configure the After Sales Component
Checkout Call for insurance products is made by the after sales component itself.
To configure the component correctly, you need to generate a base64 encoded json object that contains the checkout data from you, the partner shop:
   - customer data
   - shop product data
   - encrypted Wertgarantie session ID (encrypted with your client secret - provided by Wertgarantie using [HmacSHA256](https://en.wikipedia.org/wiki/HMAC))
    The session ID is set in a cookie within the shop domain. The cookie name is `wertgarantie-session-id`.
    A schema for this data can be found [here](https://github.com/wertgarantie-ecom/bifrost/blob/master/src/shoppingcart/schemas/checkoutSchema.js).
    The generated base64 string is set in the component through the `data-shop-purchase-data` attribute.
```html
    <wertgarantie-after-sales
        data-client-id="clientId"
        data-shop-purchase-data="eyJwdXJjaGFzZWRQcm9kdWN0cyI6W3sicHJpY2UiOjg...">
    </wertgarantie-after-sales>
```
### Code snippets for creating base64 string
<details>
<summary>JavaScript</summary>

```javascript
const CryptoJS = require('crypto-js');

// retrieve cookie from request
const sessionId = req.cookies['wertgarantie-session-id'];

// encrypt retrieved sessionID with secret client ID provided by Wertgarantie team
const encryptedSessionId = CryptoJS.HmacSHA256(sessionId, "yourSecretClientIDFromWertgarantie").toString();

// Buffer stringified Object and convert to base64
const wertgarantieCheckoutDataBuffer = Buffer.from(JSON.stringify({
        purchasedProducts: [
            {
                price: 86000, // in minor units (cent)
                manufacturer: "XXXPhones Inc.",
                deviceClass: "Smartphone",
                name: "Example Phone",
                orderId: "orderNo1"
            }       
        ],
        customer: {
            salutation: 'Herr',
            firstname: 'Otto',
            lastname: 'Normalverbraucher',
            street: 'Beispielstraße 9',
            zip: '52345',
            city: 'Köln',
            country: 'Deutschland',
            email: 'otto@normalverbraucher.com'
        },
        encryptedSessionId: encryptedSessionId
    }));
const dataShopPurchaseData = wertgarantieCheckoutDataBuffer.toString('base64');
```
</details>

## Example
<button class="example-button" onclick="showAfterSalesExample('after-sales-comp')">Click me to see the after sales component example</button>
<wertgarantie-after-sales id="after-sales-comp"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie">
</wertgarantie-after-sales>