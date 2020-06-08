# Confirmation component for phone insurance products

The wertgarantie-confirmation component should be included by a shop in the shopping cart where the shop's checkout is triggered from.
It is, so to say, the shopping cart for Wertgarantie's products.

* [Install / Include](#include)
* [Configuration](#configuration)
* [Validation](#validation)

## Include
To make the html `wertgarantie-confirmation`-tag available, just include this JS file in your web page:
```html
<script src="https://cdn.jsdelivr.net/npm/wertgarantie-confirmation@2/dist/confirmation.min.js" type="module">
```
`NOTE` that `type="module"` is required to ensure that older browsers without ES6 support will not misinterpret the file and throw errors.

In order to see the confirmation component here, please select a phone insurance product via <a href="https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-pop-up--phone-product-popup">this link</a>.

<form id="demo-html-form">
    <input id="hidden-input-phone" type="hidden" />
    <wertgarantie-confirmation
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-hidden-input-selector="#hidden-input-phone"
        data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie">
        data-validation-trigger-selector="#demo-html-form">
    </wertgarantie-confirmation>
    <input type="submit" class="checkoutBtn" value="Checkout" />
</form>

Code for this component: 

```html
<form id="demo-html-form">
    <input id="hidden-input-phone" type="hidden" />
    <wertgarantie-confirmation
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-hidden-input-selector="#hidden-input-phone"
        data-validation-trigger-selector="#demo-html-form">
    </wertgarantie-confirmation>
    <input type="submit" class="checkoutBtn" value="Checkout" />
</form>
```

## Configuration
There are several attributes in the component that are configurable:
* `data-client-id`: the `public` client ID for your shop (you get this ID from Wertgarantie for your test/staging and production environments). You can either use this attribute or set `component.clientId = <your public client ID>` via JavaScript, but `without this information, the component will not work`.
* `data-hidden-input-selector`: a css-selector that selects a hidden input tag in your HTML-form. When initialized, the component will set the value of the input tag (cookie data with signature) that you can use for the checkout call to bifrost in your web shop.
* `data-validation-trigger-selector`: a css-selector that selects the element in your page that triggers the next step (usually we assume that this is the checkout since this component is included in the shopping cart view). When this element is clicked, the component will intercept and validate as described below in [Validation](#validation)   
* `data-bifrost-uri`: Uri of the backend. Defaults to `"http://ecommerce.wertgarantie.com/wertgarantie"` (our production server). When you include the component in your test/staging environment, please use `"https://wertgarantie-bifrost-staging.herokuapp.com/wertgarantie"`.

### Product configuration in shopping cart
If you have a shopping cart that allows modification of a selected product from within the cart which also changes the price, a possibly selected insurance for this product might have to change as well.
In this case we have to somehow sync the shopping cart on Wertgarantie's side and the partner shop's cart. To do that, you need to instantiate the confirmation component with
the `data-shop-order-base64` attribute that contains the your shopping cart as base64 encoded JSON object:
```json
[
    {
        "price": 86000,
        "manufacturer": "XXXPhones Inc.",
        "deviceClass": "Smartphone",
        "name": "Example Phone Xs",
        "orderId": "orderNo1"
    },
    {
        "price": "..."
    }      
]
```

So, your component might look like this in HTML:

```html
    <wertgarantie-confirmation
        data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
        data-hidden-input-selector="#hidden-input-phone"
        data-validation-trigger-selector="#demo-html-form"
        data-shop-order-base64="JVBERi0xLjYNJeLjz9MNCjI1IDAgb2JqDTw8L0xpbmVhcml6ZWQgMS9MIDgxNTAyL08...">
    </wertgarantie-confirmation>
```

On our side the server will calculate a differential of both shopping carts and detect price changes. If an insurance price is changed, the user will be notified via element 
highlighting and message within the component. 


### Code snippets
The following code snippets may help to implement the base64 encoding. We will expand these for more languages step by step

<details>
<summary>JavaScript</summary> 

```javascript
const confirmationCompData = [];
confirmationCompData.push(...shoppingCartData.products.map(product => {
    return {
        price: product.selectedVariant.devicePrice,
        manufacturer: product.manufacturer,
        deviceClass: product.deviceClass,
        name: product.productName,
        orderItemId: product.orderItemId
    }
}));
const confirmationShopOrderBase64 = Buffer.from(JSON.stringify(confirmationCompData)).toString('base64');
```
</details>

## Validation

If you, as a web shop, include Wertgarantie Frontend Components in your shop and you include this confirmation component in your shopping cart and there in your checkout form. If so, you will want to validate if the user has confirmed all checkboxes within the component.
Therefore you have different opportunities:
* provide the `data-validation-trigger-selector` attribute in the html tag that selects your checkout form. This way the component automatically adds a `submit` - event listener to your form, and checks for confirmation status. If not confirmed the form will not be submitted and the confirmation component will notify the user and mark checkboxes in red.
* the component has an API that you can use to validate. You'll just have to call the method `checkStateOnSubmit()` of the component which returns false in case the confirmation is not given by the user. So you can call this method in your maybe already existing submit event listening method.

To see this in action, please checkout the [demo shop](https://wertgarantie-demo-shop-staging.herokuapp.com/demoshop) where the interaction of the different components is displayed 