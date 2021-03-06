# Confirmation Component

The confirmation component is responsible for the user confirmation of selected insurances. It legally __must__ be placed within the checkout page, where the final __order now__ button is located.

_* Examples / Demos for each component can be found in *Chapter 2: Components* below._


### Placement


Placeholder: ```<div id="wertgarantie-confirmation"></div>```
Place placeholder whereever it should be rendered within the checkout page.

_* If another placeholder-div is wanted (other class or id), please inform us so that we can configure it on our side._


### Data

#includeLoaderBaseMulti#

#includeDisplayedProductTable#

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
                price: 80000
            },
            {
                sku: "6f0b2bf6-c507-11ea-a054-cf2d1d418205",
                name: "LG C9 OLED",
                deviceClasses: "332,5080,4983",
                price: 219900
            }
        ]
    };
    
    initInsuranceComponents(shopConfig);
</script>
```










