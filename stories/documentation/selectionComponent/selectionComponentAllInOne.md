# Selection Component with external theme, embedded rating component and fetched values

This is an example that wires all the shown possibilities before together with the following code: 

```
<wertgarantie-policy-selection
            class="mobilcom-theme"
            data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
>
    <wertgarantie-rating slot="wertgarantie-rating-component" 
                            data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/rating"
                            class="mobilcom-wg-rating-theme"
    >
    </wertgarantie-rating>
</wertgarantie-policy-selection>
```


The `styling` that is used here, is the following:

```
.mobilcom-theme {
    --wertgarantie-selection-font-family: "Open Sans", sans-serif;
    
    /* container  */
    --wertgarantie-selection-container-background-color: white;
    --wertgarantie-selection-container-max-width: 600px;
    --wertgarantie-selection-container-padding: 0 0 0 0;
    --wertgarantie-selection-container-font-weight: 400;
    --wertgarantie-selection-container-font-size: 13px;
    --wertgarantie-selection-container-color: #21314d;
    --wertgarantie-selection-container-line-height: 22px;
    
    /* header */
    --wertgarantie-selection-title-font-family: qtype, Helvetica, Arial, sans-serif;
    --wertgarantie-selection-title-padding: 10px 0 0 0;
    --wertgarantie-selection-title-font-weight: 800;
    --wertgarantie-selection-title-font-size: 18px;
    --wertgarantie-selection-title-line-height: 24px;
    --wertgarantie-selection-title-color: #84bc34;
    
    /* advantages */
    --wertgarantie-selection-advantage-included-text-color: var(--wertgarantie-selection-container-color);
    --wertgarantie-selection-advantage-excluded-text-color: lightgrey;
    --wertgarantie-selection-advantages-margin: 0 0 8px 0;
    --wertgarantie-selection-advantages-font-size: 100%;
    --wertgarantie-selection-advantage-included-icon-color: #84bc34;
    --wertgarantie-selection-advantage-excluded-icon-color: rgb(158, 158, 158);

    /* links */
    --wertgarantie-selection-product-info-link-color: #84bc34;

    /* checkbox */
    --wertgarantie-selection-checkbox-color: #21314d;

}
```
