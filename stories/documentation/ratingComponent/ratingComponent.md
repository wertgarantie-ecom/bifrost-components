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
<script src="https://cdn.jsdelivr.net/npm/wertgarantie-rating/dist/rating.min.js" type="module">
```
`NOTE` that `type="module"` is required to ensure that older browsers without ES6 support will not misinterpret the file and throw errors.

Once the JavaScript file is included the following tag is available
```html
<wertgarantie-rating></wertgarantie-rating>
```

## Configure the rating component

The component behaves different depending on what attributes are provided when included.

### Fetch Data
The component will fetch data from an endpoint that you can provide with the attribute `data-bifrost-uri`. If this attribute is not provided, the component will fetch from `"https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie/rating"` per default.
The endpoint will return a JSON object like
```
{
    "ratingsTotal": 2957,
    "text": "Google Reviews",
    "rating": 4.7,
    "uri": "https://www.google.com/maps/place/WERTGARANTIE+AG/@52.3691835,9.7394476,17z/data=!3m1!4b1!4m7!3m6!1s0x0:0x5a09a30e8964c1f7!8m2!3d52.3691835!4d9.7416363!9m1!1b1"
}
```
This is all the data, the component needs in order to be displayed in your web page.

<wertgarantie-rating
    data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie">
</wertgarantie-rating>

```html
<wertgarantie-rating></wertgarantie-rating>
```

### Provide data manually
Another way to configure the component is to provide all of the following three attributes:
* data-text (e. g. "Reviews on Google")
* data-ratings-total (e. g. 5000)
* data-uri (the link behind the `data-ratings-total` + `data-text`)
* data-rating (the rating number itself, e. g. 3.5)

<wertgarantie-rating data-link-text="Reviews on Google"
                     data-ratings-total="5000"
                     data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie"
                     data-uri="https://www.google.de/"
                     data-rating="3.5">
</wertgarantie-rating>

```html
<wertgarantie-rating data-link-text="Reviews on Google"
                     data-ratings-total="5000"
                     data-uri="https://www.google.de/"
                     data-rating="3.5">
</wertgarantie-rating>
```

### Noteworthy
<strong>Note</strong> that you either have to provide `data-bifrost-uri` or <i>all</i> four attributes for manual data providing

The attribute `data-disable-rating-number` can be set to true in order to hide the number and just show the stars:
<wertgarantie-rating 
    data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie"
    data-disable-rating-number="true">
</wertgarantie-rating>
```html
<wertgarantie-rating 
                     data-disable-rating-number="true">
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

Provide a css file with the following code:

```css
.example {
    --wertgarantie-rating-font-family: "Comic Sans MS", sans-serif;
    --wertgarantie-rating-font-size: 1.8rem;
    --wertgarantie-rating-font-weight: 800;
    --wertgarantie-rating-text-color: rgb(134, 134, 134);
    
    --wertgarantie-rating-stars-font-size: 30px;
    --wertgarantie-rating-stars-color: green;
}
```
<wertgarantie-rating class="example"
    data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie">
</wertgarantie-rating>

```html
<wertgarantie-rating class="example">
</wertgarantie-rating>
```
