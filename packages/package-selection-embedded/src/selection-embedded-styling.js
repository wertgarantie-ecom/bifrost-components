import {css} from 'lit-element';

//language=CSS
export const selectionEmbeddedStyling = css`
    :host {
        font-family: var(--wertgarantie-selection-embedded-font-family, Arial, Helvetica), sans-serif;
    }

    .component {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
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
    }

    .products__product {
        display: flex;
        justify-content: space-between;
    }
    
    .product__overview {
        display: flex;
        width: 90%;
        justify-content: space-between;
        align-items: center;
        border: 1px solid black;
        padding: 0.5em;
        margin: 0.7em 0;
        font-size: 0.8em;
        font-weight: 500;
    }

    .product__information {
        width: 10%;
        padding: 0 0.5em;
        margin: 0.7em 0px;
        align-items: center;
        text-align: center;
    }

    .overview__selection {
        display: flex;
        align-items: center;
    }
    
    .overview-price {
        align-items: center;
    }

    .selection__checkbox {
        margin: 0 0.5em;
        border: 1px solid black;
        height: 12px;
        width: 12px;
    }

    .component__footer {
        margin: 0.5em 0;
        font-size: 0.7em;
    }
`;
