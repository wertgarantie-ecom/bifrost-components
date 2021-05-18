import {css} from 'lit-element';

//language=CSS
export const selectionEmbeddedStyling = css`
    :host {
        font-family: var(--wertgarantie-selection-embedded-font-family, Arial, Helvetica), sans-serif;
        font-size: 13px;
        width: 100%;
    }

    .component {
        display: flex;
        flex-direction: column;
        padding: var(--wertgarantie-selection-embedded-component-padding, 1em 0);
        max-width: 400px;
        min-width: 270px;
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
        border: 2px solid #f9f9f9;
        padding: var(--wertgarantie-selection-embedded-component-title-product-padding, 0.5em);
        font-size: var(--wertgarantie-selection-embedded-component-title-product-font-size, 0.9em);
        background-color: #f9f9f9;
        transition: border-color 1s, background-color 1s, border-color 1s, opacity 1s;
        cursor: pointer;
        padding: 0.7em;
        border-radius: var(--wertgarantie-selection-embedded-component-product-border-radius, 5px);
        margin: 5px 0;
    }

    .product__selection--selected {
        opacity: 1;
        border-color: var(--wertgarantie-selection-embedded-component-product-selected-color, #96c92a);
    }

    .product__selection--notselected {
        opacity: 0.4;
    }

    .product__selection:hover {
        background-color: #f2f2f2;
    }

    .product__name {
        text-transform: var(--wertgarantie-selection-embedded-component-product-name-transform, uppercase);
        font-size: 1em;
        padding-bottom: 2px;
    }

    .product__price {
        font-size: 0.9em;
        font-weight: bold;
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
        height: 18px;
        width: 18px;
        border-radius: 50%;
    }

    .product__checkbox--selected {
        border-width: 3px;
        height: 16px;
        width: 16px;
        border-color: var(--wertgarantie-selection-embedded-component-product-selected-color, #96c92a);
        background: var(--wertgarantie-selection-embedded-component-product-selected-color, #96c92a);
    }

    .product__info {
        line-height: 1.2em;
        display: flex;
        flex-flow: column;
        width: 90%;
        padding: 0.5em 1em;
    }

    .product__information-icon {
        padding: 1em;
        width: 10%;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
    }

    .info-icon {
        width: 10px;
        height: 10px;
        padding-left: 1em;
    }

    .selection__checkmark {
        margin-bottom: 1em;
        width: 100%;
    }

    .checkmark-path {
        fill: white;
    }

    .component__footer {
        margin: 1em 0;
        font-size: 0.8em;
        text-transform: var(--wertgarantie-selection-embedded-component-footer-text-transform, uppercase);
        letter-spacing: 1px;
        text-align: var(--wertgarantie-selection-embedded-component-footer-text-align, center);
    }


    @media only screen and (max-width: 450px) {
        :host {
            font-size: 11px;
        }

        .head__title {
            font-size: 1.1em
        }

        .component__footer {
            font-size: 0.9em;
        }
    }
`;

