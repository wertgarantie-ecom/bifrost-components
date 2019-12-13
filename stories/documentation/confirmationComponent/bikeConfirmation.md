# Confirmation component for bike insurance products

The wertgarantie-confirmation component should be included by a shop in the shopping cart where the shop's checkout is triggered from.
It is, so to say, the shopping cart for Wertgarantie's products.

* [Install / Include](#include)
* [Configuration](#configuration)
* [Validation](#validation)

## Include
To make the html `wertgarantie-confirmation`-tag available, just include this JS file in your web page:
```html
<script src="https://cdn.jsdelivr.net/npm/package-confirmation/dist/confirmation.min.js" type="text/javascript">
```

In order to see the confirmation component here, please select a bike insurance product via <a href="https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-pop-up--bike-product-popup">this link</a>.

<wertgarantie-confirmation
    data-client-id="f0037d1d-9936-4f63-8f74-136d8aa6b063"
    data-bifrost-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie">
</wertgarantie-confirmation>

Code for this component: 

```html
<wertgarantie-confirmation
    data-client-id="f0037d1d-9936-4f63-8f74-136d8aa6b063"
    data-bifrost-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie">
</wertgarantie-confirmation>
```

## Configuration
There are two attributes that you need to provide for this component:
* `data-client-id`: the public client ID for your shop (you get this ID from Wertgarantie)
* `data-bifrost-uri`: Uri of Wertgarantie's Backend for Frontend

The following attribute is optional:
* `data-form-selector`: a css-selector that selects your checkout form (e. g. '#checkout-form') 


## Validation

If you, as a web shop, include Wertgarantie Frontend Components in your shop and you include this confirmation component in your shopping cart and there in your checkout form. If so, you will want to validate if the user has confirmed all checkboxes within the component.
Therefore you have different opportunities:
* provide the `data-form-selector` attribute in the html tag that selects your checkout form. This way the component automatically adds a `submit` - event listener to your form, and checks for confirmation status. If not confirmed the form will not be submitted and the confirmation component will notify the user and mark checkboxes in red.
* the component has an API that you can use to validate. You'll just have to call the method `checkStateOnSubmit()` of the component which returns false in case the confirmation is not given by the user. So you can call this method in your maybe already existing submit event listening method.

To see this in action, please checkout the [demo shop](https://heimdall-mock.herokuapp.com/demoshop) where the interaction of the different components is displayed 