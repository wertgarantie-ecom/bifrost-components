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
<script src="https://cdn.jsdelivr.net/npm/wertgarantie-selection-popup/dist/selection-popup.min.js" type="text/javascript">
```

Once the JavaScript file is included the following tag is available
```html
<wertgarantie-selection-pop-up></wertgarantie-selection-pop-up>
```

## Configure the selection popup

### Fetch Data
The popup component currently shows data only if a `data-fetch-uri` is set as an attribute. The component will fetch a JSON object from this server.
It also needs the attributes `deviceClass` and `devicePrice` which can be set via the attributes within the html tag or via JavaScript
```javascript
document.querySelector('wertgarantie-selection-pop-up').deviceClass = ${deviceClass};
document.querySelector('wertgarantie-selection-pop-up').devicePrice = ${devicePrice};
```

<button class="example-button" onclick="openPopup('basic-popup')">Click me to see the default popup</button>

<wertgarantie-selection-pop-up 
        id="basic-popup"
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/dummyPolicies"
        data-device-class="1dfd4549-9bdc-4285-9047-e5088272dade"
        data-device-price="800">
</wertgarantie-selection-pop-up>

```html
<wertgarantie-selection-pop-up 
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/dummyPolicies"
        data-device-class="1dfd4549-9bdc-4285-9047-e5088272dade"
        data-device-price="800">
</wertgarantie-selection-pop-up>
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


### Example

Provide a css file with the following code:

```css
.example {
    /* general styling */
    --wertgarantie-popup-font-family: Tahoma, Geneva, sans-serif;
    --wertgarantie-popup-background-color: rgb(213, 214, 116);

    /* button colors */
    --wertgarantie-popup-light-button-background-color: rgb(254, 255, 208);
    --wertgarantie-popup-light-button-text-color: rgb(37, 37, 37);
    --wertgarantie-popup-dark-button-background-color: rgb(37, 37, 37);
    --wertgarantie-popup-dark-button-text-color: rgb(254, 255, 208);

    /* background image color fading for every second product */
    --wertgarantie-popup-product-background-even:
        linear-gradient(to bottom right, rgba(0,0,0,0), #000),
        linear-gradient(to top right, rgb(192, 137, 17), rgba(81,61,61,0));

    /* background image color fading for every second product */
    --wertgarantie-popup-product-background-odd:
        linear-gradient(to bottom right, rgba(81,61,61,0), rgba(190, 70, 0, 0.6)),
        linear-gradient(to top right, rgba(0,0,0,0), #000);

    /* text color of advantages that are included and excluded */ 
    --wertgarantie-selection-advantage-included-text-color: inherit;
    --wertgarantie-selection-advantage-excluded-text-color: rgb(180, 180, 147);
}
```

<wertgarantie-selection-pop-up id="popup-styling-example"
        class="example2"
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/dummyPolicies"
        data-device-class="1dfd4549-9bdc-4285-9047-e5088272dade"
        data-device-price="800">
    <wertgarantie-rating 
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"
        data-show-rating-number="false"
        slot="wertgarantie-rating-component">
    </wertgarantie-rating>
</wertgarantie-selection-pop-up>

```html
<wertgarantie-selection-pop-up
        class="example"
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/dummyPolicies"
        data-device-class="1dfd4549-9bdc-4285-9047-e5088272dade"
        data-device-price="800">
    <wertgarantie-rating 
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"
        data-show-rating-number="false"
        slot="wertgarantie-rating-component">
    </wertgarantie-rating>
</wertgarantie-selection-pop-up>
```
<button class="example-button" onclick="openPopup('popup-styling-example')">Click me to see the styling example</button>