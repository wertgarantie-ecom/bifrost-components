import {css} from 'lit-element';

//language=CSS
export const ratingStyling = css`
    :host {
        font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
    }

    .component {
        max-width: 1100px;
        display: none;
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
        color: white;
        text-align: center;
        position: relative;
    }

    .shield::after {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        display: inline-block;
        font-style: normal;
        font-family: "Font Awesome 5 Free", sans-serif;
        font-weight: 700;
        font-size: 20px;
        content: "\F3ED";
        position: absolute;
        top: 10%;
        left: 30%;
    }

    .header__title {
        flex: 12.5;
        padding: 1em;
        text-align: center;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.7em;
        line-height: 1.2em;
    }

    .header__title__text {
        vertical-align: middle;
    }

    .product__tabs {
        padding-top: 1em;
        padding-left: 50px;
        display: flex;
        flex-wrap: wrap;
    }

    .tab {
        border: 1px solid rgb(230, 230, 230);
        padding: 0.8em;
        width: 18%;
        min-width: 80px;
        margin-right: 1.5em;
        margin-bottom: 1em;
        font-size: 0.8em;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        vertical-align: middle;
    }

    .tab__name {
        flex: 4;
    }

    .tab__remove {
        cursor: pointer;
        flex: 0.5;
    }

    .tab:hover {
        background-color: rgb(230, 230, 230);
    }

    .tab--selected {
        background-color: rgb(230, 230, 230);
    }

    .remove-product {
        cursor: pointer;
        font-size: 1em;
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
        display: none;
        color: red;
    }

    .product {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        padding: 1em;
        color: white;
    }

    .product--selected {
        display: block;
    }

    .product--even {
        --image-link-even: linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
        background-image: var(--wertgarantie-popup-product-background-even,
        linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
        linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0))),
        var(--image-link-even);
        background-size: cover;
    }

    .product--odd {
        --image-link-odd: linear-gradient(to top right, rgba(0, 0, 0, 0), #000);
        background-image: var(--wertgarantie-popup-product-background-odd,
        linear-gradient(to bottom right, rgba(81, 61, 61, 0), rgba(255, 145, 0, 0.6)),
        linear-gradient(to top right, rgba(0, 0, 0, 0), #000)),
        var(--image-link-odd);
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
        padding-top: 6em;
        text-transform: uppercase;
        font-weight: 800;
    }

    .product__advantages {
        list-style-type: none;
        padding-inline-start: 1.5em;
    }

    .product__advantage {
        font-size: 0.8em;
        padding-top: 0.7em;
    }

    .advantage__icon::before {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        display: inline-block;
        font-family: "Font Awesome 5 Free", sans-serif;
        font-weight: 700;
        margin: 0 0.5em 0 -1.5em;
        content: "\F00C";
    }

    .wg-link {
        text-decoration: none;
        color: #39f;
    }

    .product-link {
        font-size: 0.65em;
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