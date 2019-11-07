# Policy Selection Component

The policy selection component lets the user choose between different variants of a product that Wertgarantie offers.
It is supposed to be embedded in a product details page in an online shop as an additional option to put into the user's shopping cart.

The HTML structure of the component is not modifiable by an online shop, but it can provide a custom styling and set several CSS properties that are applied to the corresponding parts.

Before getting into the styling part, let's take a look at the structure.

## Component's Structure
The component is divided into three sections
* head-section
* product-details
* product-selection

### Head Section
The head section consists of three parts itself, horizontally aligned.

1. The left part is reserved for the checkbox that indicates if the shopper wants an insurance or not.
2. The middle part consists of a headline, a slot for Wertgarantie's Google rating component, which optionally can be embedded here, and a button that triggers the drop down of the product-details section.
3. The right part contains price information (payment interval, price, included tax) in its downright corner.

### Product Details
The product details are hidden at first and only appear by clicking the button in the header section. This section consists of a list with all the advantages and services that come with a product as well as links to futher product information and business terms, etc.

### Product Selection
This section displays buttons for the different products offered. Clicking them updates the details section and the price information in the header section


## Embed Selection Component
The online shop needs to include Wertgarantie's `selection-embedded.js` - once published there will be a link here - in order to use the custom element `<wertgarantie-policy-selection>` and embed it where it wants to.

Here is an example code:

```
<wertgarantie-policy-selection
    class="{your-class-name}"
    data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/policies"
    data-device-id="1234"
    data-device-price="12">

    <wertgarantie-rating 
        slot="wertgarantie-rating-component" 
        class="{your-class-name}"
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating">
    </wertgarantie-rating>
</wertgarantie-policy-selection>
```

Notice, that in order to fetch data from the Wertgarantie server, as a shop you need to provide its uri as `data-fetch-uri` as well as the shop's product's price and device id with `data-device-price` and `data-device-id`, so the server can return the insurance product(s).

In order to embed the rating component within the selection component, make sure to set the slot attribute `slot="wertgarantie-rating-component"`. This way, the selection component knows exactly where to put it in the header.

## Custom Styling

In order to style the selection component, you can provide a class and set various CSS properties in that class which we'll cover in this section.

### Across component CSS properties
The following CSS properties can be set for the whole component:

* `--wertgarantie-selection-font-family`
* `--wertgarantie-selection-container-max-width`
* `--wertgarantie-selection-container-font-weight`
* `--wertgarantie-selection-container-font-size`
* `--wertgarantie-selection-container-text-color`
* `--wertgarantie-selection-container-background-color`

### Head Section CSS Properties
These properties overwrite the previous values for the head section:

* `--wertgarantie-selection-head-section-text-color`
* `--wertgarantie-selection-head-section-background-image`

### Headline
The headline itself can also be styled differently:

* `--wertgarantie-selection-title-font-family`
* `--wertgarantie-selection-title-font-weight`
* `--wertgarantie-selection-title-font-size`
* `--wertgarantie-selection-title-text-transform`

### Show Details Button

* `--wertgarantie-selection-show-details-button-font-size`
* `--wertgarantie-selection-show-details-button-font-weight`
* `--wertgarantie-selection-show-details-button-text-color`
* `--wertgarantie-selection-show-details-button-arrow-color`

### List item in the product details

* `--wertgarantie-selection-advantage-included-text-color`
* `--wertgarantie-selection-advantage-excluded-text-color`
* `--wertgarantie-selection-advantage-margin`
* `--wertgarantie-selection-advantage-font-size`
* `--wertgarantie-selection-advantage-included-icon-color`
* `--wertgarantie-selection-advantage-excluded-icon-color`

### Document link

* `--wertgarantie-selection-product-info-link-color`

### Product Selection Button Header

* `--wertgarantie-selection-button-header-color`