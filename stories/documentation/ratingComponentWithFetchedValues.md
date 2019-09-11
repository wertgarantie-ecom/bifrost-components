# Base Component for Wertgarantie's Google rating with fetched values

If a `data-fetch-uri` is provided as attribute in the custom element tag, the component will try to fetch the data from this URI and display accordingly.<br/>

We deployed a piece of software to heroku that fetches Wertgarantie's google rating: `https://midgard-bff.herokuapp.com/wertgarantie/rating`

## Example above
```
<wertgarantie-rating data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/rating">
</wertgarantie-rating>
```

