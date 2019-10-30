# Wertgarantie's Google rating component

This web component can be used to embed Wertgarantie's google rating into any website.

* [Install / Include](#install)
* [Configuration](#configure-the-rating-component)
* [Styling](#styling)

## Install
Include this package either via npm:

```
npm install wertgarantie-rating
```

Or directly include it into your web page
```html
<script src="https://cdn.jsdelivr.net/npm/wertgarantie-rating/src/rating.js" type="text/javascript">
```

Once the JavaScript file is included the following tag is available
```html
<wertgarantie-rating></wertgarantie-rating>
```

## Configure the rating component

The component behaves different depending on what attibutes are provided when included.

### Fetch Data
If you want to fetch the real google ratings from Wertgarantie's backend for frontend `Bifröst`, you need to set the `data-fetch-uri` attribute like in the following example:

<wertgarantie-rating data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"></wertgarantie-rating>

```html
<wertgarantie-rating data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"></wertgarantie-rating>
```

### Provide data manually
Another way to configure the component is to provide all of the following three attributes:
* data-text (e. g. "5000 Reviews on Google")
* data-uri (the link behind the `data-text`)
* data-rating (the rating number itself, e. g. 3.5)

<wertgarantie-rating data-text="5000 Reviews on Google"
                     data-uri="https://www.google.de/"
                     data-rating="3.5">
</wertgarantie-rating>

```html
<wertgarantie-rating data-text="5000 Reviews on Google"
                     data-uri="https://www.google.de/"
                     data-rating="3.5">
</wertgarantie-rating>
```

### Noteworthy
<strong>Note</strong> that you either have to provide `data-fetch-uri` or <i>all</i> three attributes for manual data providing

The attribute `data-show-rating-number` can be set to false in order to hide the number and just show the stars:
<wertgarantie-rating data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating" data-show-rating-number="false"></wertgarantie-rating>
```html
<wertgarantie-rating data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"
                     data-show-rating-number="false">
</wertgarantie-rating>
```

## Styling
The component can be styled by providing a stylesheet with CSS properties. Available properties are the following:
* `--wertgarantie-rating-font-family`
* `--wertgarantie-rating-font-size`
* `--wertgarantie-rating-font-weight` 
* `--wertgarantie-rating-text-color`
* `--wertgarantie-rating-stars-font-size`
* `--wertgarantie-rating-stars-color`

### Example
```css
.default {
    --wertgarantie-rating-font-family: "Comic Sans MS", sans-serif;
    --wertgarantie-rating-font-size: 1.8rem;
    --wertgarantie-rating-font-weight: 800;
    --wertgarantie-rating-text-color: rgb(134, 134, 134);
    
    --wertgarantie-rating-stars-font-size: 30px;
    --wertgarantie-rating-stars-color: green;
}
```
<wertgarantie-rating class="default" data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"></wertgarantie-rating>
```html
<wertgarantie-rating class="default"
                     data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"
                     data-show-rating-number="false">
</wertgarantie-rating>
```