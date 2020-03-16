import {css} from 'lit-element';

//language=CSS
export const afterSalesStyling = css`
    :host {
        font-family: var(--wertgarantie-after-sales-font-family, Arial, Helvetica), sans-serif;
    }

    .after-sales {
        width: 100%;
        max-width: 1350px;
        font-family: Arial, Helvetica, sans-serif;
        border: 1px solid #F2F2F2;
    }

    .header {
        display: flex;
        justify-content: normal;
    }

    .header__icon {
        min-width: 65px;
        font-size: 1.2em;
        color: white;
        background-color: #13CC52;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header__title {
        width: calc(100% - 65px);
        padding: 1.5em 1.5em;
        line-height: 1.2em;
        font-size: 0.8em;
        background-color: #CDFFCC;
        text-transform: uppercase;
        font-weight: 700;
    }

    .content {
        display: flex;
        justify-content: normal;
        background-color: #F9F9F9;
    }

    .content__box {
        width: 50%;
        padding: 1.5em;
    }

    .box__header {
        line-height: 1.2em;
        font-size: 1.5em;
        text-transform: uppercase;
        font-weight: 700;
    }

    .order {
        display: flex;
        flex-wrap: wrap;
        padding-top: 1.5em;
    }

    .order-item {
        width: 28%;
        min-width: 150px;
        height: 100%;
        min-height: 250px;
        margin-top: 0.3em;
        margin-right: 1.5em;
        display: flex;
    }

    .order-item--light {
        --text-color: white;
        --background-color: lightgrey;
        color: var(--text-color);
        background-color: var(--background-color);
        --image-link: linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
        background-image: var(--wertgarantie-after-sales-order-background-light,
        linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
        linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0))),
        var(--image-link);
        background-size: cover;
    }

    .order-item--dark {
        --text-color: white;
        --background-color: black;
        color: var(--text-color);
        background-color: var(--background-color);
        --image-link: linear-gradient(to top right, rgba(0, 0, 0, 0), #000);
        background-image: var(--wertgarantie-after-sales-order-background-dark,
        linear-gradient(to bottom right, rgba(81, 61, 61, 0), rgba(255, 145, 0, 0.6)),
        linear-gradient(to top right, rgba(0, 0, 0, 0), #000)),
        var(--image-link);
        background-size: cover;
    }

    .panel__content {
        margin: 0.8em 0.8em;
    }

    .panel__content--top {
        height: 50%;
        display: flex;
        flex-flow: column;
    }

    .panel__content--bottom {
        height: 50%;
        display: flex;
        flex-flow: column-reverse;
    }

    .panel__number {
        width: 28px;
        height: 28px;
        min-height: 28px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        border: 3px solid var(--text-color);
    }

    .panel__title {
        text-transform: uppercase;
        font-weight: 700;
    }

    .panel__product-name {
        border-bottom: 3px solid var(--text-color);
    }

    .box__icons {
        display: flex;
        justify-content: space-evenly;
        width: 50%;
        font-size: 2.5em;
        padding: 1em 1.5em 1em 1.5em;
    }

    .box__icons__arrow {
        font-size: 0.7em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;