import {css} from 'lit-element';

//language=CSS
export const selectionEmbeddedStyling = css`
    :host {
        font-family: var(--wertgarantie-selection-embedded-font-family, Arial, Helvetica), sans-serif;
    }

    .component {
        display: flex;
        flex-direction: column;
        padding: 1em;
        width: fit-content;
        max-width: 350px;
    }

    .head__title {
        font-size: 1.2em;
        font-weight: 700;
    }

    .head__rating {
        margin: 0.3em;
        --wertgarantie-rating-font-size: 0.8em;
        --wertgarantie-rating-font-family: var(--wertgarantie-embedded-rating-font-family, "Open Sans", sans-serif);
        --wertgarantie-rating-text-color: rgb(134, 134, 134);

        --wertgarantie-rating-stars-font-size: 0.8em;
        --wertgarantie-rating-stars-color: orange;
    }
    
    .products {
        padding: 1em 0;
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
        padding: 0.8em;
        font-size: 0.8em;
        font-weight: 500;
        opacity: 0.5;
        transition: opacity 0.5s;
    }
    
    .product__selection--first {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .product__selection--last {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        margin-bottom: 1em;
    }
    
    .product__selection--selected {
        opacity: 1;
    }
    
    .selection__clickable {
        width: 90%;
        display: flex;
        justify-content: space-between;
    }

    .selection__overview {
        display: flex;
        align-items: center;
    }
    
    .overview__name {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.8em;
    }

    .selection__price {
        font-size: 0.8em;
    }

    .overview__checkbox {
        margin: 0 0.5em;
        border: 1px solid black;
        height: 12px;
        width: 12px;
        cursor: pointer;
    }
    
    .selection__information-icon {
        padding: 0 0.5em;
        margin: 0.7em 0px;
        width: 10%;
        cursor: pointer;
    }

    .info-icon {
        width: 15px;
        height: 15px;
    }


    .component__footer {
        margin: 0.5em 0;
        font-size: 0.7em;
    }
`;
