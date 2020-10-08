import {css} from 'lit-element';

//language=CSS
export const afterSalesStyling = css`
    :host {
        font-family: var(--wertgarantie-after-sales-font-family, Arial, Helvetica, sans-serif);
        line-height: var(--wertgarantie-after-sales-line-height, 1.2em);
    }

    .after-sales {
        width: 100%;
        max-width: 1350px;
        border: var(--wertgarantie-after-sales-border, 1px solid #F2F2F2);
        color: var(--wertgarantie-after-sales-text-color, black);
        margin: var(--wertgarantie-after-sales-margin, 0 0 0 0);
    }

    .header {
        display: flex;
        justify-content: normal;
    }

    .header__icon {
        width: 65px;
        background-color: var(--wertgarantie-after-sales-header-icon-background-color, #13CC52);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon__svg {
        width: 45%;
        height: 45%;
    }

    .icon__svg--white {
        fill: var(--wertgarantie-after-sales-header-icon-color, white);
    }

    .header__title {
        width: calc(100% - 65px);
        padding: 1.5em 1.5em;
        font-size: var(--wertgarantie-after-sales-header-title-font-size, 0.9em);
        font-weight: var(--wertgarantie-after-sales-header-title-font-weight, 700);
        background-color: var(--wertgarantie-after-sales-header-title-background-color, #CDFFCC);
        color: var(--wertgarantie-after-sales-header-title-color, black);
        text-transform: var(--wertgarantie-after-sales-header-title-text-transform, uppercase);
    }

    .content {
        display: flex;
        justify-content: normal;
        background-color: var(--wertgarantie-after-sales-body-background-color, #F9F9F9);
        padding: 1.5em;
    }

    .content__box {
    }

    .box__insured-products {
        width: 60%;
    }

    .box__next-steps {
        width: 40%;
    }

    .box__header {
        font-size: var(--wertgarantie-after-sales-box-header-font-size, 1.1em);
        text-transform: var(--wertgarantie-after-sales-box-header-text-transform, uppercase);
        font-weight: var(--wertgarantie-after-sales-box-header-font-weight, 700);
    }

    .order {
        display: flex;
        flex-wrap: wrap;
    }

    .order-item {
        width: 33%;
        min-width: 185px;
        max-width: 200px;
        height: 100%;
        min-height: 250px;
        margin-top: 1.5em;
        margin-right: 1.5em;
        display: flex;
    }

    .order-item--primary {
        --text-color: var(--wertgarantie-after-sales-product-card-text-color, white);
        color: var(--text-color);
        --image-link: linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
        background-image: var(--wertgarantie-after-sales-product-card-background-primary,
        linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
        linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0))),
        var(--image-link);
        background-size: cover;
    }

    .order-item--secondary {
        --text-color: var(--wertgarantie-after-sales-product-card-text-color, white);
        color: var(--text-color);
        --image-link: linear-gradient(to top right, rgba(0, 0, 0, 0), #000);
        background-image: var(--wertgarantie-after-sales-product-card-background-secondary,
        linear-gradient(to bottom right, rgba(81, 61, 61, 0), rgba(255, 145, 0, 0.6)),
        linear-gradient(to top right, rgba(0, 0, 0, 0), #000)),
        var(--image-link);
        background-size: cover;
    }

    .panel {
        font-size: var(--wertgarantie-after-sales-product-card-font-size, 0.9em);
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
        flex-flow: column;
        justify-content: flex-end;
    }

    .panel__number {
        width: 25px;
        height: 25px;
        min-height: 25px;
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
        justify-content: space-between;
        width: 65%;
        font-size: 2.5em;
        padding: 1em 1.5em 0.5em 1.0em;
    }

    .box__icons__arrow {
        font-size: 0.7em;
        width: 20%;
        max-width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.5em;
    }

    .next-steps__arrow {
        width: 50%;
        height: 50%;
    }

    .next-steps__icon {
        width: 47px;
        height: 47px;
    }

    .next-steps__icon--color {
        fill: var(--wertgarantie-after-sales-next-steps-icon-color, black);
    }

    .explanation-list__item {
        margin-top: 2em;
    }

    @media only screen and (max-width: 1050px) {
        .after-sales {
            max-width: 750px;
        }

        .content {
            flex-flow: column;
        }

        .box__insured-products {
            width: 100%;
        }

        .box__next-steps {
            width: 100%;
            padding-top: 2.5em;
        }

        .box__icons {
            align-items: center;
            justify-content: flex-start;
        }

        .box__icons__arrow {
            align-items: center;
        }

        .next-steps__arrow {
            max-height: 35px;
        }
    }

    @media only screen and (max-width: 480px) {
        .after-sales {
            max-width: 380px;
        }

        .content {
            flex-flow: column;
            justify-content: center;
            align-items: center;
        }

        .box__header {
            text-align: center;
        }

        .order {
            display: flex;
            justify-content: center;
        }

        .box__insured-products {
            width: 100%;
        }

        .box__next-steps {
            display: flex;
            flex-flow: column;
            justify-content: center;
            width: 100%;
            padding-top: 3em;
        }

        .box__icons {
            align-items: center;
            justify-content: space-between;
        }

        .next-steps__arrow {
            max-height: 35px;
        }
    }
`;