# Landing Page

* [Install / Include](#install)
* [Configuration](#configure-the-landing-page)
* [Styling](#styling)

## Install

To show Wertgarantie's landing page component in your website, you need to take out the following steps:
- include the script-tag in your page: 
```html
    <script src="https://cdn.jsdelivr.net/npm/wertgarantie-landing-page/dist/landing-page.min.js" type="module"></script>
```
- use the now available custom element 
```html
    <wertgarantie-landing-page></wertgarantie-landing-page>
```

## Configure the Landing Page
The landing page needs a little bit of configuration. As a partner of Wertgarantie, you have a partner number that needs to be set as an attribute within the custom element:
```html
<wertgarantie-landing-page
    data-partner-number="1755805"
    data-client-id="clientId"
    data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie">
</wertgarantie-landing-page>
```

## Styling
The landing page offers some styling opportunities via CSS custom properties. All you have to do is to provide a class name for the custom element and fill out the following properties as you like:
```
    --wertgarantie-landing-page-font-family
    --wertgarantie-landing-page-primary-colo
    --wertgarantie-landing-page-head-banner-title-color
    --wertgarantie-landing-page-head-banner-title-font-size
    --wertgarantie-landing-page-head-background-image

    --wertgarantie-landing-page-head-banner-title-font-weight
    --wertgarantie-landing-page-head-banner-subtitle-color
    --wertgarantie-landing-page-head-banner-subtitle-font-size
    --wertgarantie-landing-page-head-banner-subtitle-font-weight

    --wertgarantie-landing-page-head-insurance-application-button-font-weight
    --wertgarantie-landing-page-head-insurance-application-button-font-size
    --wertgarantie-landing-page-head-insurance-application-button-background-image

    --wertgarantie-landing-page-steps-square-font-size
    --wertgarantie-landing-page-steps-square-font-weight

    --wertgarantie-landing-page-body-title-color
    --wertgarantie-landing-page-body-title-font-size
    --wertgarantie-landing-page-body-title-font-weight
    --wertgarantie-landing-page-body-text-color
    --wertgarantie-landing-page-body-text-font-size
    --wertgarantie-landing-page-body-text-line-height

    --wertgarantie-landing-page-google-rating-text-color
    --wertgarantie-landing-page-google-rating-text-font-size
    --wertgarantie-landing-page-google-rating-text-font-weight
    --wertgarantie-landing-page-google-rating-star-color
    --wertgarantie-landing-page-google-rating-star-font-size
```
There is a [concrete styling example](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-landing-page--landing-page-styling-example) in storybook right under this section where you can see the influence of the properties

Here is the example with the default styling when no custom styling is provided:

<wertgarantie-landing-page
    data-bifrost-uri="https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie"
    data-client-id="public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f"
    data-partner-number="1755805">
</wertgarantie-landing-page>