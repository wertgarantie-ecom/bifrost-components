# Hier kommt die Landing Page mit einem anderen Styling example hin

## Das hier wird das styling:
```css
    .wertgarantie-landing-page {
        --wertgarantie-landing-page-font-family: "Helvetica", Arial, sans-serif;
        --wertgarantie-landing-page-primary-color: #2574be;
        --wertgarantie-landing-page-head-banner-title-color: rgb(229, 229, 229);
        --wertgarantie-landing-page-head-banner-title-font-size: 1.5em;
        --wertgarantie-landing-page-head-background-image: linear-gradient(to right, rgb(144, 183, 221), rgb(165, 200, 237), rgb(112, 151, 190));
    
        --wertgarantie-landing-page-head-banner-title-font-weight: 600;
        --wertgarantie-landing-page-head-banner-subtitle-color: rgba(0, 0, 0, 0.87);
        --wertgarantie-landing-page-head-banner-subtitle-font-size: rgba(0, 0, 0, 0.87);
        --wertgarantie-landing-page-head-banner-subtitle-font-weight: 600;
    
        --wertgarantie-landing-page-head-insurance-application-button-font-weight: 600;
        --wertgarantie-landing-page-head-insurance-application-button-font-size: 0.8em;
        --wertgarantie-landing-page-head-insurance-application-button-background-image: linear-gradient(to right, #a82845, rgb(224, 57, 94));
    
        --wertgarantie-landing-page-body-title-color: rgba(0, 0, 0, 0.87);
        --wertgarantie-landing-page-body-title-font-size: 1.5em;
        --wertgarantie-landing-page-body-title-font-weight: 600;
        --wertgarantie-landing-page-body-text-color: rgba(75, 75, 75, 0.87);
        --wertgarantie-landing-page-body-text-font-size: 1.2em;
        --wertgarantie-landing-page-body-text-line-height: 1.7em;
    
        --wertgarantie-landing-page-google-rating-text-color: var(--wertgarantie-landing-page-head-banner-subtitle-color);
        --wertgarantie-landing-page-google-rating-text-font-size: 0.9em;
        --wertgarantie-landing-page-google-rating-text-font-weight: 800;
        --wertgarantie-landing-page-google-rating-star-color: #ff9b00;
        --wertgarantie-landing-page-google-rating-star-font-size: 1.5em;
    }
```

```html
    <wertgarantie-landing-page
        class="wertgarantie-landing-page"
        data-bifrost-uri="http://localhost:3000/wertgarantie"
        data-client-id="5209d6ea-1a6e-11ea-9f8d-778f0ad9137f">
    </wertgarantie-landing-page>
```

<wertgarantie-landing-page
    class="wertgarantie-landing-page"
    data-bifrost-uri="http://localhost:3000/wertgarantie"
    data-client-id="5209d6ea-1a6e-11ea-9f8d-778f0ad9137f">
</wertgarantie-landing-page>