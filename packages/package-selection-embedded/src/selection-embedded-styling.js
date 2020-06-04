import {css} from 'lit-element';

//language=CSS
export const selectionEmbeddedStyling = css`
    :root {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .component {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 1em;
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
        border: 1px solid black;
        padding: 0.5em;
        margin: 0.7em 0;
        font-size: 0.8em;
        font-weight: 500;
    }

    .product__selection {
        display: flex;
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
