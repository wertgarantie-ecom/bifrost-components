# Web Component for Wertgarantie's Google rating with external styling

The rating component can be styled by adding a class to `<wertgarantie-rating>` and provide css properties.

Current styling options via css properties are: 

```
.wg-rating-theme1 {
    --wertgarantie-rating-font-family: "Open Sans", sans-serif;
    --wertgarantie-rating-font-size: 12px;
    --wertgarantie-rating-number-color: #21314d;
}
```

<br/>

## Example with styling from above 
```
<wertgarantie-rating class="wg-rating-theme1">
                     data-text="9999 Google Rezensionen"
                     data-uri="http://example.com"
                     data-rating="4.5"
</wertgarantie-rating>
```

