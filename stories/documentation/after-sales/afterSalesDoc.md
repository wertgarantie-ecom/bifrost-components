# After Sales Component

* [Install / Include](#install)
* [Configuration](#configure-the-after-sales-component)
* [Styling](#styling)
* [Example](#example)

## Install

In order to include Wertgarantie's after sales component in your website, you need to take out the following steps:
- include the script-tag in your page: 
```html
    <script src="https://cdn.jsdelivr.net/npm/wertgarantie-after-sales/dist/after-sales.min.js" type="module"></script>
```
- use the now available custom element 
```html
    <wertgarantie-after-sales></wertgarantie-after-sales>
```

## Configure the After Sales Component
The after sales component works in two different ways that you, as a partner shop of Wertgarantie, can choose.
The two different ways also determine how to configure the component.
First, let's discuss the two ways:
    
1. Checkout Call is made by the partner shop.
In this case, you just need to use the custom elements - no more attributes required

2. Checkout Call is made by the after sales component itself.
In this case, you need to generate a base64 encoded json object that contains the checkout data:
   - customer data
   - shop product data
   - encrypted Wertgarantie session ID (encrypted with your client secret - provided by Wertgarantie)
An instruction on how to assemble this exactly will come soon and/or will be worked out with you and the Wertgarantie developers.
So, you have to provide the attribute `data-shop-purchase-data` with the value of the base64-string.
```html
    <wertgarantie-after-sales
        data-shop-purchase-data="eyJwdXJjaGFzZWRQcm9kdWN0cyI6W3sicHJpY2UiOjg...">
    </wertgarantie-after-sales>
```

## Styling
Custom Styling is coming soon...

## Example
<button class="example-button" onclick="showAfterSalesExample('after-sales-comp')">Click me to see the after sales component example</button>
<wertgarantie-after-sales id="after-sales-comp"
        data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie">
</wertgarantie-after-sales>