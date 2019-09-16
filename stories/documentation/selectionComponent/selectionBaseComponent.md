# Selection base component


## Code
```
<wertgarantie-policy-selection
            data-title="title"
            data-checkbox-label="order checkbox label"
            data-details-text="details link text"
            data-details-uri="http://www.example.com"
            data-information-sheet-text="product information"
            data-information-sheet-uri="http://www.example.com"
            data-advantages="advantage1;advantage2"
>
</wertgarantie-policy-selection>
```

Note that there are two ways to define a `wertgarantie-policy-selection`. 

If you want to define all display data yourself, you need to provide all of the following attributes to the html tag:

 * data-title
 * data-checkbox-label
 * data-details-text
 * data-details-uri
 * data-inforamtion-sheet-text
 * data-information-sheet-uri
 * data-advantages --> seperate multiple advantages with a semicolon ";" and without space before or after ";"

If you want to fetch data from a server, you need to provide

 * data-fetch-url
 * data-device-id
 * data-device-price

More information about this is provided in `base component with fetched values`