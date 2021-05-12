# After Sales Component styling examples

## Example 1 - Default
<button class="example-button" onclick="showAfterSalesExample('after-sales-default')">Click me to see the after sales component with default styling</button>
<wertgarantie-after-sales class="after-sales-default" id="after-sales-default"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie">
</wertgarantie-after-sales>
```html
<wertgarantie-after-sales class="after-sales-default" id="after-sales-default"></wertgarantie-after-sales>
```

```css
    .after-sales-default {
        --wertgarantie-after-sales-font-family: Arial, Helvetica, sans-serif;
        --wertgarantie-after-sales-border: 1px solid #F2F2F2;
        --wertgarantie-after-sales-text-color: black;
    
        --wertgarantie-after-sales-header-icon-background-color: #13CC52;
        --wertgarantie-after-sales-header-icon-color: white;
        --wertgarantie-after-sales-header-title-font-size: 0.9em;
        --wertgarantie-after-sales-header-title-font-weight: 700;
        --wertgarantie-after-sales-header-title-line-height: 1.2em;
        --wertgarantie-after-sales-header-title-background-color: #CDFFCC;
        --wertgarantie-after-sales-header-title-text-transform: uppercase;
    
        --wertgarantie-after-sales-body-background-color: #F9F9F9;
    
        --wertgarantie-after-sales-product-card-text-color: white;
        --wertgarantie-after-sales-product-card-font-size: 0.9em;
        --wertgarantie-after-sales-product-card-background-primary: linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
        linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
        --wertgarantie-after-sales-product-card-background-secondary: linear-gradient(to bottom right, rgba(81, 61, 61, 0), rgba(255, 145, 0, 0.6)),
        linear-gradient(to top right, rgba(0, 0, 0, 0), #000);
    
        --wertgarantie-after-sales-next-steps-icon-color: black;
    }
```


## Example 2 - Custom
<button class="example-button" onclick="showAfterSalesExample('after-sales-example')">Click me to see the after sales component with custom styling</button>
<wertgarantie-after-sales class="after-sales-example" id="after-sales-example"
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie">
</wertgarantie-after-sales>
```html
<wertgarantie-after-sales class="after-sales-example" id="after-sales-default"></wertgarantie-after-sales>
```

```css
    .after-sales-example {
        --wertgarantie-after-sales-font-family: Arial, Helvetica, sans-serif;
        --wertgarantie-after-sales-border: 1px solid #f2bd82;
        --wertgarantie-after-sales-text-color: black;
    
        --wertgarantie-after-sales-header-icon-background-color: #cc5f00;
        --wertgarantie-after-sales-header-icon-color: white;
        --wertgarantie-after-sales-header-title-font-size: 1em;
        --wertgarantie-after-sales-header-title-font-weight: 700;
        --wertgarantie-after-sales-header-title-line-height: 1.1em;
        --wertgarantie-after-sales-header-title-background-color: #ffa850;
        --wertgarantie-after-sales-header-title-text-transform: uppercase;
    
        --wertgarantie-after-sales-body-background-color: #e7e7e7;
    
        --wertgarantie-after-sales-product-card-text-color: white;
        --wertgarantie-after-sales-product-card-font-size: 0.9em;
        --wertgarantie-after-sales-product-card-background-primary: linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000000),
        linear-gradient(to top right, #ff7a00, rgba(81, 61, 61, 0));
        --wertgarantie-after-sales-product-card-background-secondary: linear-gradient(to bottom right, rgba(81, 61, 61, 0), rgba(255, 211, 0, 0.58)),
        linear-gradient(to top right, rgba(0, 0, 0, 0), #000000);
    
        --wertgarantie-after-sales-next-steps-icon-color: #d95f00;
    }
```