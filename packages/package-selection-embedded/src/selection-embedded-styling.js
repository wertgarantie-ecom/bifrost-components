import {css} from 'lit-element';

//language=CSS
export const selectionEmbeddedStyling = css`
    :host {
        font-family: var(--wertgarantie-selection-embedded-font-family, Arial, Helvetica), sans-serif;
        width: 100%;
    }

    .component {
        display: flex;
        flex-direction: column;
        padding: var(--wertgarantie-selection-embedded-component-padding, 1em 0);
        max-width: 500px;
        min-width: 220px;
    }

    .head__title {
        font-size: var(--wertgarantie-selection-embedded-component-title-font-size, 1em);
        font-weight: var(--wertgarantie-selection-embedded-component-title-font-weight, 700);
    }

    .products {
        padding-top: 1em;
    }

    .products__product {
        display: flex;
        justify-content: space-between;
    }
    
    .product__selection {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        border: 1px solid black;
        padding: var(--wertgarantie-selection-embedded-component-title-product-padding, 0.5em);
        font-size: var(--wertgarantie-selection-embedded-component-title-product-font-size, 0.9em);
        font-weight: 500;
        opacity: 0.2;
        transition: opacity 1s;
        cursor: pointer;
        padding: 0 0.5em;
    }
    
    .product__selection--selected {
        opacity: 1;
    }
    
    .product__name {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.8em;
        padding-right: 1em;
    }

    .product__price {
        font-size: 0.8em;
    }

    .product--selectable {
        display: flex;
        width: 90%;
    }
    
    .checkbox__container {
        display: flex;
        flex-flow: column;
        justify-content: center;
        padding: 0 0.5em;
    }
    
    .product__checkbox {
        border: 1px solid black;
        height: 12px;
        width: 12px;
    }

    
    .product__info {
        display: flex;
        justify-content: space-between;
        width: 90%;
        padding: 0.5em 1em;
    }
    
    .product__info--small {
        flex-flow: column;
    }
    
    .product__information-icon {
        padding: 1em;
        width: auto;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
    }

    .info-icon {
        width: 15px;
        height: 15px;
    }
    
    .selection__checkmark {
        padding-bottom: 1em;
    }

    .component__footer {
        margin: 1em 0;
        font-size: 0.7em;
    }
`;
