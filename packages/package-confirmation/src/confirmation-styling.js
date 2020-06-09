import {css} from 'lit-element';

//language=CSS
export const confirmationStyling = css`
    :host {
        font-family: var(--wertgarantie-confirmation-font-family, Arial, Helvetica), sans-serif;
    }

    .box {
        border-top: var(--wertgarantie-confirmation-box-border-top, 0 solid rgb(230, 230, 230));
        border-left: var(--wertgarantie-confirmation-box-border-left, 0 solid rgb(230, 230, 230));
        border-right: var(--wertgarantie-confirmation-box-border-right, 0px solid rgb(230, 230, 230));
        border-bottom: var(--wertgarantie-confirmation-box-border-bottom, 0 solid rgb(230, 230, 230));
        display: flex;
        flex-direction: column;
        margin: var(--wertgarantie-confirmation-box-margin, 0 0 20px 0);
    }

    .box__title {
        background-color: var(--wertgarantie-confirmation-box-background-color, rgb(230, 230, 230));
        line-height: var(--wertgarantie-confirmation-box-title-line-height, 1em);
        padding: var(--wertgarantie-confirmation-box-title-padding, 9px 0 9px 0);
        color: var(--wertgarantie-confirmation-box-title-color, black);
        text-align: left;
    }

    .box__title--text {
        font-size: var(--wertgarantie-confirmation-box-title-font-size, 1.2em);
        margin: var(--wertgarantie-confirmation-box-title-margin, 0 63px 0 63px);
    }

    .component {
        box-sizing: border-box;
        text-align: left;
        line-height: 1em;
        max-width: 1100px;
        display: flex;
        flex-direction: row;
        padding: var(--wertgarantie-confirmation-component-padding, '0px 0px 0px 0px');
        color: var(--wertgarantie-confirmation-text-color, black);
        margin: var(--wertgarantie-confirmation-component-margin, 0 0 0 0);
        background-color: var(--wertgarantie-confirmation-background-color, white);
    }


    .info {
        width: 65%;
        padding: var(--wertgarantie-confirmation-info-padding, 1em);
    }

    .flash-message {
        background-color: #ee6767;
        justify-content: center;
        text-align: center;
        color: white;
        padding: 8px;
        margin: 16px 50px 0px 50px;
        font-weight: 700;
        font-size: 0.8em;
    }

    .product__panel {
        width: 35%;
        margin: var(--wertgarantie-confirmation-product-panel-margin, 0 0 0 0);
    }

    .product__panel--mobile {
        display: none;
    }

    .header {
        display: flex;
        width: 100%;
        margin: var(--wertgarantie-confirmation-header-margin, 0 0 0 0);
        background-color: var(--wertgarantie-confirmation-header-background-color, rgb(230, 230, 230));
    }

    .header__icon {
        flex: 1;
        min-width: 50px;
        background-color: var(--wertgarantie-confirmation-header-icon-background-color, rgb(50, 50, 50));
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon__svg {
        width: 50%;
        height: 50%;
    }

    .icon__svg--white {
        fill: var(--wertgarantie-confirmation-header-icon-fill-color, white);
    }

    .header__title {
        flex: 12.5;
        text-align: center;
        font-weight: var(--wertgarantie-confirmation-header-title-font-weight, 700);
        text-transform: var(--wertgarantie-confirmation-header-title-text-transform, uppercase);
        font-size: var(--wertgarantie-confirmation-header-title-font-size, 0.7em);
        line-height: var(--wertgarantie-confirmation-header-title-line-height, 1.2em);
        padding: 1.7em 1em;
    }

    .confirmation__header {
        padding-top: 1.5em;
        padding-left: 50px;
        font-weight: var(--wertgarantie-confirmation-body-subtitle-font-weight, 700);
        font-size: var(--wertgarantie-confirmation-body-subtitle-font-size, 0.8em);
        text-transform: var(--wertgarantie-confirmation-body-subtitle-text-transform, uppercase);
    }

    .confirmation__row {
        padding-top: 1em;
        display: flex;
    }

    .confirmation__checkbox-column {
        min-width: 40px;
        padding: var(--wertgarantie-confirmation-checkbox-column-padding, 0 0 0 10px);
    }

    .checkbox__container {
        margin-left: 2px;
        margin-right: 2px;
        display: flex;
        justify-content: center;
    }

    .confirmation--unchecked {
        border: 2px solid #ee6767;
    }

    .confirmation__text {
        width: auto;
        font-size: 0.8em;
    }


    .product {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        padding: 1em;
        color: var(--wertgarantie-confirmation-product-panel-text-color, white);
        height: calc(100% - 2em);
    }

    .product--selected {
        display: flex;
    }

    .product--even {
        --image-link: linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
        background-image: var(--wertgarantie-confirmation-product-background-even,
        linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
        linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0))),
        var(--image-link);
        background-size: cover;
    }

    .product--odd {
        --image-link: linear-gradient(to top right, rgba(0, 0, 0, 0), #000);
        background-image: var(--wertgarantie-confirmation-product-background-odd,
        linear-gradient(to bottom right, rgba(44, 25, 25, 0), rgba(255, 145, 0, 0.6)),
        linear-gradient(to top right, #000, rgba(0, 0, 0, 0.3))),
        var(--image-link);
        background-size: cover;
    }

    .product__price-info--small {
        font-size: 0.7em;
        opacity: 0.8;
    }

    .product__price-info--strong {
        font-weight: 700;
        font-size: 1.3em;
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
        font-size: 0.7em;
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