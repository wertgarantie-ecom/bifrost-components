# Confirmation component for bike insurance products

The wertgarantie-confirmation component should be included by a shop in the shopping cart where the shop's checkout is triggered from.
It is, so to say, the shopping cart for Wertgarantie's products.

* [Install / Include](#include)
* [Configuration](#configuration)
* [Validation](#validation)

## Include
To make the html `wertgarantie-confirmation`-tag available, just include this JS file in your web page:
```html
<script src="https://cdn.jsdelivr.net/npm/package-confirmation/dist/confirmation.min.js" type="module">
```
`NOTE` that `type="module"` is required to ensure that older browsers without ES6 support will not misinterpret the file and throw errors.

In order to see the confirmation component here, please select a bike insurance product via <a href="https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-pop-up--bike-product-popup">this link</a>.

<form id="demo-html-form">
    <input id="hidden-input-bike" type="hidden" />
    <wertgarantie-confirmation
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-hidden-input-selector="#hidden-input-bike"
        data-form-selector="#demo-html-form">
    </wertgarantie-confirmation>
    <input type="submit" class="checkoutBtn" value="Checkout" />
</form>

Code for this component: 

```html
<form id="demo-html-form">
    <input id="hidden-input-bike" type="hidden" />
    <wertgarantie-confirmation
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-hidden-input-selector="#hidden-input-bike"
        data-form-selector="#demo-html-form">
    </wertgarantie-confirmation>
    <input type="submit" class="checkoutBtn" value="Checkout" />
</form>
```

## Configuration
There are several attributes in the component that are configurable:
* `data-client-id`: the public client ID for your shop (you get this ID from Wertgarantie). You can either use this attribute or set `component.clientId = <your client ID>` via JavaScript, but `without this information, the component will not work`.
* `data-hidden-input-selector`: a css-selector that selects a hidden input tag in your HTML-form. When initialized, the component will set the value of the input tag (cookie data with signature) that you can use for the checkout call to bifrost in your web shop.
* `data-form-selector`: a css-selector that selects your checkout form (e. g. '#checkout-form') 
* `data-bifrost-uri`: Uri of the backend. Defaults to `"https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie"`


## Validation

If you, as a web shop, include Wertgarantie Frontend Components in your shop and you include this confirmation component in your shopping cart and there in your checkout form. If so, you will want to validate if the user has confirmed all checkboxes within the component.
Therefore you have different opportunities:
* provide the `data-form-selector` attribute in the html tag that selects your checkout form. This way the component automatically adds a `submit` - event listener to your form, and checks for confirmation status. If not confirmed the form will not be submitted and the confirmation component will notify the user and mark checkboxes in red.
* the component has an API that you can use to validate. You'll just have to call the method `checkStateOnSubmit()` of the component which returns false in case the confirmation is not given by the user. So you can call this method in your maybe already existing submit event listening method.

To see this in action, please checkout the [demo shop](https://wertgarantie-demo-shop.herokuapp.com/demoshop) where the interaction of the different components is displayed 