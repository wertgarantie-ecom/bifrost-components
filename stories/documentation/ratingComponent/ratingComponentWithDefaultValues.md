# Base Component for Wertgarantie's Google rating with default values

## Custom Element:

```
<wertgarantie-rating></wertgarantie-rating>
```
Default Values can be set via attributes within the HTML element:

* data-text
* data-uri
* data-rating

Note, that all three attributes must be set for the component to show data, unless you are using the `data-fetch-uri` attribute which is described in a different story.

## Example above
```
<wertgarantie-rating data-text="9999 Google Rezensionen"
                     data-uri="http://example.com" 
                     data-rating="4.7">
</wertgarantie-rating>```

