# Styling examples for confirmation component

Please make sure, that you have selected at least one insurance product in your shopping cart here in storybook via <a href="https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-pop-up--phone-product-popup">this link</a>.
Otherwise no styling example will be seen here. To see the different background colors in the product panels, please select at least 2 products :-)


## Example 1

````html
<wertgarantie-confirmation class="confirmationStylingExample1"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
</wertgarantie-confirmation>
````

<wertgarantie-confirmation class="confirmationStylingExample1"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
</wertgarantie-confirmation>

### Styling for Example 1
````css
.confirmationStylingExample1 {
    --wertgarantie-confirmation-font-family: "Comic Sans MS", sans-serif;
    --wertgarantie-confirmation-background-color: grey;

    --wertgarantie-confirmation-header-background-color: rgba(255, 108, 0, 0.61);
    --wertgarantie-confirmation-header-icon-background-color: #6e3100;
    --wertgarantie-confirmation-header-icon-fill-color: lightgrey;

    --wertgarantie-confirmation-header-title-font-weight: 800;
    --wertgarantie-confirmation-header-title-font-size: 0.8em;
    --wertgarantie-confirmation-header-title-line-height: 1.3em;
    --wertgarantie-confirmation-header-title-text-transform: uppercase;

    --wertgarantie-confirmation-body-subtitle-font-weight: 800;
    --wertgarantie-confirmation-body-subtitle-font-size: 0.9em;
    --wertgarantie-confirmation-body-subtitle-text-transform: none;

    --wertgarantie-confirmation-product-panel-text-color: #e7e7e7;
    --wertgarantie-confirmation-product-background-even: linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
    linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
    --wertgarantie-confirmation-product-background-odd: linear-gradient(to bottom right, rgba(44, 25, 25, 0), rgba(255, 145, 0, 0.6)),
    linear-gradient(to top right, #000, rgba(0, 0, 0, 0.3));
}
````

## Example 2
```html
<wertgarantie-confirmation class="confirmationStylingExample2"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
</wertgarantie-confirmation>
```

<wertgarantie-confirmation class="confirmationStylingExample2"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
</wertgarantie-confirmation>

### Styling for Example 2

```css
.confirmationStylingExample2 {
    --wertgarantie-confirmation-background-color: #85a484;
    --wertgarantie-confirmation-text-color: yellow;

    --wertgarantie-confirmation-header-background-color: rgba(170, 255, 165, 0.61);
    --wertgarantie-confirmation-header-icon-background-color: #1bff00;
    --wertgarantie-confirmation-header-icon-fill-color: yellow;

    --wertgarantie-confirmation-header-title-font-weight: 800;
    --wertgarantie-confirmation-header-title-font-size: 0.8em;
    --wertgarantie-confirmation-header-title-line-height: 1.3em;
    --wertgarantie-confirmation-header-title-text-transform: uppercase;

    --wertgarantie-confirmation-body-subtitle-font-weight: 800;
    --wertgarantie-confirmation-body-subtitle-font-size: 0.9em;
    --wertgarantie-confirmation-body-subtitle-text-transform: none;

    --wertgarantie-confirmation-product-panel-text-color: #e7e7e7;
    --wertgarantie-confirmation-product-background-even: linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
    linear-gradient(to top right, #3a00ff, rgba(81, 61, 61, 0));
    --wertgarantie-confirmation-product-background-odd: linear-gradient(to bottom right, rgba(44, 25, 25, 0), rgb(0, 255, 179)),
    linear-gradient(to top right, #000, rgba(0, 0, 0, 0.3));
}
```