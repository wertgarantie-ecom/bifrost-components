# Wrap up

You hopefully now got it working by the end of this guide. If problems occur or questions arise please do not hesitate to ask. This page should only be viewed as a last piece of guidance, a checklist if you will.

### Before the integration

- [ ] You received an ```id``` and a ```secret``` for ```staging```
- [ ] You received an ```id``` and a ```secret``` for ```production```
- [ ] We agreed on a set of ```deviceClasses```
- [ ] We agreed on a set of ```placeholder-divs``` (only if you chose to __not__ use the defaults from the component-integration pages, if you use the defaults, we're good)

_If your shop support conditions_
- [ ] We agreed on a set of ```conditions``` which we will map internally to the WERTGARANTIE conditions



### Integration
- [ ] You chose one of three ```selection-*-components``` and implemented it
    - [ ] Placement: On product detail page or cart, depending on selection-component variant
    - [ ] one ```placeholder-div```
            * selection-popup: ```none```
            * selection-embedded: _(default: ```<div id="wertgarantie-selection-embedded"></div>```)_
    - [ ] one ```component-loader```
    <br>
- [ ] You implemented the ```confirmation-component```
    - [ ] Placement: Checkout page where the final "order now" button is
    - [ ] one ```placeholder-div``` _(default: ```<div id="wertgarantie-confirmation"></div>```)_
    - [ ] one ```component-loader```
<br>
- [ ] You implemented the ```after-sales-component```
    - [ ] Placement: "Thanks for your purchase" - page
    - [ ] one ```placeholder-div``` _(default: ```<div id="wertgarantie-after-sales"></div>```)_
    - [ ] one ```component-loader```
    
### Optional
- [ ] You provided us with a shop-email, so we can notify you about new insurance contratcs

### Feedback
Do you have feedback for this guide? Tell us at <a href="mailto:ecommerce@wertgarantie.com">ecommerce@wertgarantie.com</a>!


