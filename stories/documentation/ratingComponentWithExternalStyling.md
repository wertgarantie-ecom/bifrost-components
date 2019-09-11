# Web Component for Wertgarantie's Google rating with external styling

The rating component can be styled by adding a class to `<wertgarantie-rating>` and provide css properties.

Current styling options via css properties are: 

```
.mobilcom-wg-rating-theme {
    --wertgarantie-rating-font-family: "Open Sans", sans-serif;
    --wertgarantie-rating-font-size: 10px;
}
```

<br/>

## Example with styling from above 
```
<wertgarantie-rating class="mobilcom-wg-rating-theme">
                     data-text="9999 Google Rezensionen"
                     data-uri="http://example.com"
                     data-rating="4.5"
</wertgarantie-rating>
```

