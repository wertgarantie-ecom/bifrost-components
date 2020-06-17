import {css} from "lit-element";

// language=CSS
export const listSelectionStyling = css`
    :host {
        font-family: var(--wertgarantie-selection-embedded-font-family, Arial, Helvetica), sans-serif;
    }
    
    .content {
        display: flex;
        flex-flow: column;
        width: 70%;
        margin: 2em auto;
    }

    .selection__item {
        display: flex;
        margin: 1em 0;
        border-bottom: 1px solid black;
    }

    .tax-explanation {
        margin: 2em 0;
        align-self: end;
    }

    .shop-product {
        width:60%;
        display: flex;
    }

    .product__image {
        width: 30%;
        min-width: 100px;
        height: auto;
    }

    .product__name {
        align-self: center;
        font-size: 1.2em;
        font-weight: bold;
    }

    .insurance-offer {
        width: 40%;
    }
`;