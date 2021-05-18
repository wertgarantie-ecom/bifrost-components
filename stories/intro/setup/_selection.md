# Selection Components

The selection-components are responsible for the selection of an insurance product. At the moment there are two different selection components. You may choose **one** for your implementation:

* __Embedded:__ A checkbox-style component for two insurance products. This component can either be placed on the detail page level or the shopping-cart level for multiple insurances.
* __Popup:__ A popup which contains a selection of two insurance products and respective information. This component may have a slightly better conversion rate but it also more intrusive to the end user experience.

_* Examples / Demos for each component can be found in *Chapter 2: Components* below._

### Limitations
Two products with the exact same configuration and id cannot be insured.

# Variants
As stated above the selection-embedded-component can be placed at product-detail level or at cart level (then also referred as the "selection-multi-embeddedd"-component).

Choose __only one__ of the following three:



## 🔹 Selection Embedded (detail)

### Placement
Placeholder: ```<div id="wertgarantie-selection-embedded"></div>```
Place placeholder whereever it should be rendered.


_* If another placeholder-div is wanted (other class or id), please inform us so that we can configure it on our side._

### Data

#includeLoaderBaseSingle#

#includeDisplayedProductTable#

### Example
```js
<script type="module">
    import initInsuranceComponents from 'https://cdn.jsdelivr.net/npm/wertgarantie-component-loader@1/dist/wertgarantieLoader.min.js';

    const shopConfig = {
        id: "public:855wd6ea-rvre-a89z-9f8d-778f0ad9137f", 
        stage: "staging",
        displayedProduct: {
            sku: "75-46413-awffvv-sv56-ada",
            name: "Super E-Bike 5000 Pro"
            deviceClasses: "E-Bike",
            price: 500000
        }
    };
    
    initInsuranceComponents(shopConfig);
</script>
```

<br>



## 🔹 Selection Multi Embedded (cart)
### Placement
Placeholder: ```<div id="wertgarantie-selection-embedded"></div>```
Place placeholder within each cart item slot so that it can be rendered below the product itself.

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
        stage: "production",
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
        ]
    };
    
    initInsuranceComponents(shopConfig);
</script>
```

<br>




## 🔹 Selection Popup
### Placement
The selection popup does not neccessarily need a placeholder. Most commonly it just gets appended to the ```body``` tag. Please provide us with a sample route it is going to be used at (e.g. ```/products/phones/bapple-x?storage=128gb```)

### Data

#includeLoaderBaseMulti#

#includeDisplayedProductTable#

### Example
```js
<script type="module">
    import initInsuranceComponents from 'https://cdn.jsdelivr.net/npm/wertgarantie-component-loader@1/dist/wertgarantieLoader.min.js';

    const shopConfig = {
        id: "public:855wd6ea-rvre-a89z-9f8d-778f0ad9137f", 
        stage: "production",
        cartProducts = [
            {
                sku: "97d1eb7c-fe0e-4b95-96dc-ec44709aca7d",
                name: "Bapple X",
                deviceClasses: "Smartphone",
                price: 80000
            }
        ]
    };
    
    initInsuranceComponents(shopConfig);
</script>
```











