# Wertgarantie's Product Selection Pop Up

This web component can be used to embed Wertgarantie's product selection pop up into any website.

* [Install / Include](#install)
* [Configuration](#configure-the-selection-popup)
* [Styling](#styling)

## Install
Include this package either via npm:

```
npm install wertgarantie-selection-popup
```

Or directly include it into your web page
```html
<script src="https://cdn.jsdelivr.net/npm/wertgarantie-selection-popup/dist/selection-popup.min.js" type="module">
```
`NOTE` that `type="module"` is required to ensure that older browsers without ES6 support will not misinterpret the file and throw errors.

Once the JavaScript file is included the following tag is available
```html
<wertgarantie-selection-pop-up></wertgarantie-selection-pop-up>
```

## Configure the selection popup

### Fetch Data
The popup component fetches data from the value behind the attribute `data-bifrost-uri`. If this is not provided, it defaults to `https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie`. The component will fetch a JSON object from this server.
It also needs the following attributes:
* `data-device-class`
* `data-device-price`
* `data-shop-product-name`
* `data-client-id` (specific Client ID for the partner shop)

which can be set via the attributes within the html tag or via JavaScript
```javascript
document.querySelector('wertgarantie-selection-pop-up').deviceClass = ${deviceClass};
document.querySelector('wertgarantie-selection-pop-up').devicePrice = ${devicePrice};
document.querySelector('wertgarantie-selection-pop-up').shopProductName = ${shopProductName};
document.querySelector('wertgarantie-selection-pop-up').clientId = ${clientId};
```

<button class="example-button" onclick="openPopup('basic-popup')">Click me to see the default popup</button>

<wertgarantie-selection-pop-up 
        id="basic-popup"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie"
        data-product-model="Super Phone"
        data-order-item-id="order345"
        data-device-class="Smartphone"
        data-device-price="800">
</wertgarantie-selection-pop-up>

```html
<wertgarantie-selection-pop-up 
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-product-model="Super Phone"
        data-device-class="Smartphone"
        data-order-item-id="order345"
        data-device-price="800">
</wertgarantie-selection-pop-up>
```

### Open the Pop Up
Note that the component does not open up automatically. There is one line of code that needs to be implemented for the pop up to appear:
```javascript
window.wertgarantieSelectionPopUpOpen('#popup-id');
```
When initialized, the component registers the `window.wertgarantieSelectionPopUpOpen` method which expects the id of the `<wertgarantie-selection-pop-up>` tag. If you want the pop up to show without user interaction when your page is loaded, you can set the `window.onload` method.
Here is an example:
```javascript
window.onload = function() {
    if (window.wertgarantieSelectionPopUpOpen) {
        window.wertgarantieSelectionPopUpOpen('#popup-id');
    }
}
```


## Styling
The component can be styled by providing a stylesheet with CSS properties. Available properties are the following:
* general styling:
    * `--wertgarantie-popup-font-family`
    * `--wertgarantie-popup-background-color`
* button colors
    * `--wertgarantie-popup-light-button-background-color`
    * `--wertgarantie-popup-light-button-text-color`
    * `--wertgarantie-popup-dark-button-background-color`
    * `--wertgarantie-popup-dark-button-text-color`
* background image color fading for every second product
    * `--wertgarantie-popup-product-background-even`
* background image color fading for every second product
    * `--wertgarantie-popup-product-background-odd`
* text color of advantages that are included and excluded
    * `--wertgarantie-selection-advantage-included-text-color`
    * `--wertgarantie-selection-advantage-excluded-text-color`
    
If you are looking for an example, you can select the one here in the menu and you will have an overview which properties have been styled and how.