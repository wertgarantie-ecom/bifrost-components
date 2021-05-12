# Selection Pop Up Styling Example

<button class="example-button" onclick="openPopup('popup-styling-example')">Click me to see the styling example</button>

This styling example uses the css class example which you as a partnershop can provide and set in your <wertgarantie-selection-pop-up> - tag as shown below.

This is the css code for the example here:
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
    --wertgarantie-popup-product-background-primary:
        linear-gradient(to bottom right, rgba(0,0,0,0), #000),
        linear-gradient(to top right, rgb(192, 137, 17), rgba(81,61,61,0));

    /* background image color fading for every second product */
    --wertgarantie-popup-product-background-secondary:
        linear-gradient(to bottom right, rgba(81,61,61,0), rgba(190, 70, 0, 0.6)),
        linear-gradient(to top right, rgba(0,0,0,0), #000);

    /* text color of advantages that are included and excluded */ 
    --wertgarantie-selection-advantage-included-text-color: inherit;
    --wertgarantie-selection-advantage-excluded-text-color: rgb(180, 180, 147);
}
```

<wertgarantie-selection-pop-up id="popup-styling-example"
        class="example2"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie"
        data-product-name="Super Phone"
        data-display-self=false
        data-device-class="Smartphone"
        data-device-price="800">
</wertgarantie-selection-pop-up>

```html
<wertgarantie-selection-pop-up
        class="example"
        data-client-id="5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-product-name="Super Phone"
        data-device-class="Smartphone"
        data-device-price="800">
</wertgarantie-selection-pop-up>
```
