# Selection component with external theme

The selection component allows you to set your own theme. The styling is css-property based. Before getting into detail about the css-properties, we need to describe the basic structure of the component.

1. container that wrapps the whole component.
2. title
3. optional slot for embedded Wertgarantie rating component
4. list with all product advantages
5. list with all product information and links

Now, let's get to the styling possibilities:

## Global variable(s) for the whole component:
- --wertgarantie-selection-font-family

## Container variables:
- --wertgarantie-selection-container-background-color 
- --wertgarantie-selection-container-max-width
- --wertgarantie-selection-container-padding
- --wertgarantie-selection-container-font-weight
- --wertgarantie-selection-container-font-size
- --wertgarantie-selection-container-color
- --wertgarantie-selection-container-line-height

## Header variables:
- --wertgarantie-selection-title-font-family
- --wertgarantie-selection-title-padding
- --wertgarantie-selection-title-font-weight
- --wertgarantie-selection-title-font-size
- --wertgarantie-selection-title-line-height
- --wertgarantie-selection-title-color

## Advantage List    
- --wertgarantie-selection-advantage-included-text-color
- --wertgarantie-selection-advantage-included-icon-color
- --wertgarantie-selection-advantage-excluded-text-color
- --wertgarantie-selection-advantage-excluded-icon-color
- --wertgarantie-selection-advantages-margin
- --wertgarantie-selection-advantages-font-size

## Product information link color
- --wertgarantie-selection-product-info-link-color: #84bc34;

## TODO
    /* checkbox */