import {css} from 'lit-element';

//language=CSS
export const selectionEmbeddedStyling = css`
    :host {
        font-family: var(--wertgarantie-selection-font-family, Roboto), sans-serif;
    }

    .wg-selection-container {
        background-color: var(--wertgarantie-selection-container-background-color, white);
        max-width: var(--wertgarantie-selection-container-max-width, 600px);
        font-weight: var(--wertgarantie-selection-container-font-weight, 400);
        font-size: var(--wertgarantie-selection-container-font-size, 16px);
        color: var(--wertgarantie-selection-container-text-color, #575757);
    }

    .head-section {
        background-image: var(--wertgarantie-selection-head-section-background-image, linear-gradient(to right, #f5f5f5, #f5f5f5));
        color: var(--wertgarantie-selection-head-section-text-color, #2574be);
        display: grid;
        grid-template-columns: 12% 60% 28%;
        padding: 0.7em;
    }

    .head-section__item {
        padding-top: 0.5em;
    }

    .head-section__left {
        min-width: 100px;
        grid-column-start: 1;
        align-self: center;
        margin: 30%;
    }

    .head-section__order-checkbox {
        zoom: 1.3;
    }

    .head-section__middle {
        align-self: center;
        grid-column-start: 2;
        grid-column-end: 2;

    }

    .head-section__right {
        height: 100%;
        grid-column-start: 3;
        grid-column-end: 3;
        padding-right: 0.7em;
        position: relative
    }

    .price-info {
        position: absolute;
        bottom: 0.5em;
        right: 0.5em;
        text-align: right;
    }

    .price-info__small {
        font-size: 0.6em;
    }

    .wg-title {
        font-family: var(--wertgarantie-selection-title-font-family, inherit), sans-serif;
        font-weight: var(--wertgarantie-selection-title-font-weight, 400);
        font-size: var(--wertgarantie-selection-title-font-size, 20px);
        text-transform: var(--wertgarantie-selection-title-text-transform);
        margin: 0.3em 0 0 0;
    }

    .show-details__button {
        border: none;
        background: none;
        outline: none;
        color: var(--wertgarantie-selection-show-details-button-text-color, inherit);
        font-size: var(--wertgarantie-selection-show-details-button-font-size);
        font-weight: var(--wertgarantie-selection-show-details-button-font-weight);
    }

    .show-details__button:hover {
        cursor: pointer;
    }

    .advantages__icon::before, .show-details__button::before {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        display: inline-block;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        margin: 0 0.5em 0 -0.4em;
        font-family: "Font Awesome 5 Free", sans-serif;
        font-weight: 700;
    }

    .show-details__button::before {
        color: var(--wertgarantie-selection-show-details-button-arrow-color, inherit);
    }

    .show-details__button--expanded::before {
        content: "\F102";
    }

    .show-details__button--collapsed::before {
        content: "\F103";
    }

    .product-details {
        padding: 0.7em;
        visibility: hidden;
        opacity: 0;
        max-height: 0;
        transition: all 0.4s;
        transform-origin: left top;
        transform: scaleY(0);
    }

    .product-details--expanded {
        visibility: visible;
        opacity: 1;
        max-height: 100%;
        transition: all 0.4s;
        transform: scaleY(1);
    }

    .advantages {
        padding-inline-start: 1.5em;
        list-style-type: none;
    }

    .advantages__item {
        font-size: var(--wertgarantie-selection-advantage-font-size, 13px);
        line-height: var(--wertgarantie-selection-container-line-height, 21px);
        margin: var(--wertgarantie-selection-advantage-margin, 0 0 0.3em 0);
    }

    .advantages__item--included {
        color: var(--wertgarantie-selection-advantage-included-text-color, #575757);
    }

    .advantages__item--excluded {
        color: var(--wertgarantie-selection-advantage-excluded-text-color, lightgrey);
    }

    .advantages__icon--included::before {
        color: var(--wertgarantie-selection-advantage-included-icon-color, #2574be);
    }

    .advantages__icon--excluded::before {
        color: var(--wertgarantie-selection-advantage-excluded-icon-color, lightgrey);
    }

    .advantages__icon--check::before {
        content: "\F00C";
    }

    .advantages__icon--ban::before {
        content: "\F05E";
    }

    .advantages__icon--plus::before {
        content: "\F067";
    }

    .advantages__icon--pdf::before {
        content: "\F1C1";
    }

    .product-information__link, .product-information__link:visited {
        color: var(--wertgarantie-selection-product-info-link-color, #2574be);
        position: static;
        text-decoration: none;
    }

    .product-selection {
        padding: 0.7em;
        display: flex;
        justify-content: space-around;
    }

    .product-selection__button {
        border: none;
        outline: none;
        width: 40%;
        margin: 0.4em;
        padding: 0.6em;
        font-size: inherit;
        opacity: 0.4;
        transition: all 0.6s;
        color: inherit;
    }

    .product-selection__button:hover {
        cursor: pointer;
    }

    .product-selection__button-header {
        font-weight: 700;
        color: var(--wertgarantie-selection-button-header-color, #2574be);
        border-radius: 10px;
    }

    .product-selection__button--selected {
        opacity: 1;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    }
`;
