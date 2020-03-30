import {css} from 'lit-element';

//language=CSS
export const confirmationStyling = css`
    :host {
        font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
    }

    .component {
        max-width: 1100px;
        display: flex;
        background-color: white;
    }

    .info {
        width: 65%;
        padding: 1em;
    }

    .product__panel {
        width: 35%;
    }

    .product__panel--mobile {
        display: none;
    }

    .header {
        display: flex;
        width: 100%;
        background-color: rgb(230, 230, 230);
    }

    .header__icon {
        flex: 1;
        min-width: 50px;
        background-color: rgb(50, 50, 50);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .icon__svg {
        width: 50%;
        height: 50%;
    }

    .icon__svg--white {
        fill: white;
    }

    .header__title {
        flex: 12.5;
        text-align: center;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.7em;
        line-height: 1.2em;
        padding: 1.7em 1em;
    }

    .confirmation__header {
        padding-top: 1.5em;
        padding-left: 50px;
        font-weight: 700;
        font-size: 0.8em;
        text-transform: uppercase;
    }

    .confirmation__row {
        padding-top: 1em;
        display: flex;
    }

    .confirmation__checkbox-column {
        min-width: 40px;
        padding-left: 10px;
    }

    .checkbox__container {
        margin-left: 2px;
        margin-right: 2px;
        display: flex;
        justify-content: center;
    }

    .confirmation--unchecked {
        border: 2px solid red;
    }

    .confirmation__text {
        width: auto;
        font-size: 0.8em;
    }

    .confirmation__footer {
        padding-top: 1.5em;
        padding-left: 50px;
        font-weight: 700;
        font-size: 0.7em;
    }

    .confirmation__footer--notification {
        color: red;
    }

    .product {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        padding: 1em;
        color: white;
        height: calc(100% - 2em);
    }

    .product--selected {
        display: flex;
    }

    .product--even {
        --image-link: linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
        background-image: var(--wertgarantie-popup-product-background-even,
        linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
        linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0))),
        var(--image-link);
        background-size: cover;
    }

    .product--odd {
        --image-link: linear-gradient(to top right, rgba(0, 0, 0, 0), #000);
        background-image: var(--wertgarantie-popup-product-background-odd,
        linear-gradient(to bottom right, rgba(81, 61, 61, 0), rgba(255, 145, 0, 0.6)),
        linear-gradient(to top right, rgba(0, 0, 0, 0), #000)),
        var(--image-link);
        background-size: cover;
    }

    .product__price-info--small {
        font-size: 0.7em;
        opacity: 0.7;
    }

    .product__price-info--strong {
        font-weight: 700;
        font-size: 0.9em;
    }

    .product__title {
        text-transform: uppercase;
        font-weight: 800;
        padding: 2em 0;
    }

    .wg-link {
        text-decoration: none;
        color: #39f;
    }

    .product-link {
        display: flex;
        padding-top: 2em;
        padding-bottom: 0.5em;
        font-size: 0.8em;
    }

    @media only screen and (max-width: 768px) {
        .component {
            width: 100%;
            max-width: 500px;
        }

        .info {
            width: 100%;
            padding: 0;
        }

        .header__title {
            line-height: 1em;
            text-align: left;
        }

        .product__tabs {
            padding-left: 1em;
        }

        .product__panel {
            display: none;
        }

        .product__panel--mobile {
            display: block;
        }

        .confirmation__section {
            padding-right: 1em;
            padding-bottom: 1em;
        }

        .confirmation__header {
            padding-left: 2em;
        }

    }
`;