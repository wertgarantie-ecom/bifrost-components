# Component-Loader
The component loader is the central entry point for each component and is therefore needed on each page that holds one of the components mentioned before. This script is initialized with all neccessary data. It then loads the backend configuration, the component-scripts, CSS as well as insurance data and renders the component in the provided ```placeholder-div```. 

This approach has several advantages: 
* The shop-integration is simplified because the integration is almost identical across all components
* CSS loading is done by us.
* Component script loading and versioning is done by us
* We can roll-out new features, new insurance products, hotfixes etc. without any extra effort on your side (though of course any new features or products will be discussed with the partner-shop beforehand) 
* We have an overview over all versions used across all shops and can therefore keep them up-to-date and stable

_*Please note: The component-loader uses the ```type="module"```-Flag for ES6-Modules. Web-Components are not supported by older browsers (for reference check [Custom-Elements](https://caniuse.com/es6-module) and [ES6-Modules](https://caniuse.com/es6-module)!_
## Basic implementation
The component-loader has to be provided with all neccessary data for the current component. This data varies through the components and will therefore be described in the integration of the components itself. Two properties however are needed on all configs:

| Property | Type     | Description
| -------- | -------- | --------
| id       | ```string```   | PublicId for the current environment / stage
| stage    | ```string```   | The current environment, either ```staging``` or ```production```

### Example
```js
<script type="module">
    import initInsuranceComponents from 'https://cdn.jsdelivr.net/npm/wertgarantie-component-loader@1/dist/wertgarantieLoader.min.js';

    const shopConfig = {
        id: "public:855wd6ea-rvre-a89z-9f8d-778f0ad9137f", 
        stage: "staging",
        
        🔸 plus other data depending on component 🔸
    };
    
    initInsuranceComponents(shopConfig);
</script>
```



## Device Classes
In this short paragraph we will take a look at ```deviceClasses```. Device classes are passed as a property to product data within the loader-configuration as you will see in the following sections. 

Device classes are our way to identify insurable products. These are customizable to fit the partner shops internal data. 

For example: An electronics shops  sells smartphones and TVs which are related to different insurance products (e.g. "premium insurance tv" and "superior insurance smartphone"). Our goal is to map the correct insurance to the current product the user is looking at (we don't want a tv insurance for a smartphone!). Unfortunately the typical data, like the name of the product is not enough for us to identify an "iPhone X 128GB" as a smartphone, because each shop has different namings for the same product (and the total list of insurable products across multiple industries is just intangible). 

The solution though is fairly simple: The partner shop configures a ```deviceClasses``` property to each __insurable__ product. All smartphone products will then have ```deviceClasses: "smartphone"``` while TVs have ```deviceClasses: "tv"``` or ```deviceClasses: "flatscreen"``` or even both ```deviceClasses: "tv,flatscreen"```*. Which deviceClasses are mapped to WERTGARANTIE's insurances is up to you. 

You tell us which ```deviceClasses``` you want to use and we configure them beforehand (this needs to be done before the integration itself, or no component will be rendered / shown). Please note: We typically talk you through this process before and agree on a set of deviceClasses.

_*Multiple deviceClasses can be configured, seperated by Commas._ 

## Conditions
If your shop supports different conditions of a product (e.g. "Used", "New", "Refurbished", etc.) these can also be passed to the product information data.

Please talk to us beforehand so we can map your conditions to WERTGARANTIE insurances.


## A word about performance
We're determined to keep file sizes as small as possible (we currently average <20kb). Nevertheless the ```component-loader```, especially for ```selection-*``` components should only be included on products that are insurable. This prevents the end user from loading Javascript that's not needed.

Example: A Bike shop offers WERTGARANTIE insurances for Bikes and E-Bikes. The component-loader should therefore be included on bike and e-bike pages. Helmets are not insurable, the loader should therefore not be included on a helmet-detail-page.
