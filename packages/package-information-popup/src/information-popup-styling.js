import {css} from "lit-element";

// language=CSS
export const informationPopUpStyling = css`
    :host {
        font-family: var(--wertgarantie-selection-embedded-font-family, Arial, Helvetica), sans-serif;
        font-size: var(--wertgarantie-selection-embedded-font-size, 13px);
    }
    
    .product-modal {
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.8);
        animation-name: openInfoPopUp;
        animation-duration: 1s;
    }

    .content {
        background-color: var(--wertgarantie-information-popup-background-color, rgb(244, 244, 244));
        margin: 5% auto;
        width: 90%;
        max-width: 600px;
    }

    @media screen and (min-width: 450px) {
        .content {
            width: 75%;
        }
    }

    @keyframes openInfoPopUp {
        from {
            opacity: 0
        }
        to {
            opacity: 1
        }
    }
    
    .content__head {
        display: flex;
        flex-flow: column;
        padding: 3em;
    }
    
    .header__row {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }
    
    .header__title {
        font-size: var(--wertgarantie-information-popup-title-font-size, 1.2em);
        margin-bottom: 1em;
        text-transform: var(--wertgarantie-information-popup-title-text-transform, uppercase);
    }
    
    .closeBtn {
        font-size: 1.4em;
        font-weight: 700;
        cursor: pointer;
    }

    .wg-rating-default {
        --wertgarantie-rating-font-family: var(--wertgarantie-embedded-rating-font-family, "Open Sans", sans-serif);
        --wertgarantie-rating-font-size: 0.9em;
        --wertgarantie-rating-text-color: rgb(134, 134, 134);

        --wertgarantie-rating-stars-font-size: 0.9em;
        --wertgarantie-rating-stars-color: orange;
    }
    
    .content__product-card {
        width: 100%;
        color: white;
    }

    .product-card--background-primary {
        --image-link: linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
        background-image: var(--wertgarantie-popup-product-background-primary,
        linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
        linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0))),
        var(--image-link);
        background-size: cover;
    }

    .product-card--background-secondary {
        --image-link: linear-gradient(to top right, rgba(0, 0, 0, 0), #000);
        background-image: var(--wertgarantie-popup-product-background-secondary,
        linear-gradient(to bottom right, rgba(81, 61, 61, 0.4), rgba(255, 145, 0, 0.84)),
        linear-gradient(to top right, rgba(0, 0, 0, 0.31), #000)),
        var(--image-link);
        background-size: cover;
    }

    .product-card__base-info {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        min-height: 250px;
        opacity: 1;
        padding: 2em 3em 2em 3em;
    }

    .product-card__base-info--top {
        display: flex;
        justify-content: space-between;
    }

    .product-card__base-info--top-left {
        width: calc(100% - 25px);
        font-size: 1em;
    }

    .price-display {
        font-size: 2.0em;
    }

    .product-card__base-info--top-right {
        width: 25px;
        justify-content: left;
    }
    
    .product-card__base-info--bottom {
        display: flex;
        flex-flow: column;
    }
    
    .product-card__title {
        font-weight: 700;
        font-size: 1.3em;
        text-transform: var(--wertgarantie-information-popup-title-text-transform, uppercase);
        min-height: 3em;
    }
    
    .product-card__advantages {
        display: flex;
        flex-flow: column;
    }

    .advantage {
        display: flex;
        font-size: var(--wertgarantie-information-popup-advantages-font-size, 0.8em);
        padding-top: var(--wertgarantie-information-popup-advantages-font-size, 0.8em);
    }

    .advantage__icon-container {
        width: auto;
        padding-right: 1em;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .advantage__text-container {
        width: 95%;
        line-height: 1.5em;
        text-align: left;
        vertical-align: center;
    }

    .advantage--included {
        color: var(--wertgarantie-selection-advantage-included-text-color, inherit);
    }

    .advantage--excluded {
        color: var(--wertgarantie-selection-advantage-excluded-text-color, rgb(161, 161, 161));
    }

    .advantage__icon {
        width: 15px;
        height: 15px;
    }

    .icon__svg--top3 {
        fill: var(--wertgarantie-selection-advantage-included-text-color, white);
    }

    .icon__svg--included {
        fill: var(--wertgarantie-selection-advantage-included-text-color, rgb(32, 32, 32));
    }

    .icon__svg--excluded {
        fill: var(--wertgarantie-selection-advantage-excluded-text-color, rgb(161, 161, 161));
    }

    .content__details {
        padding: 3em;
    }
    
    .details__title {
        font-size: var(--wertgarantie-information-popup-title-font-size, 1.2em);
        font-weight: 700;
    }
    
    .product__footer-section {
        padding-top: 2em;
    }
    
    .wg-link {
        text-decoration: none;
        color: #39f;
        font-size: 0.8em;
    }
    
    .trust-text {
        text-align: center;
    }

    .award-image-block {
        display: inline-block;
        padding: 2em;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .award-image-block__link {
        text-decoration: none;
    }

    .quality-seal-image {
        vertical-align: text-top;
        max-height: 100px;
    }

    .award-image {
        vertical-align: text-top;
        max-height: 100px;
        max-width: 80px
        margin: 0.2rem;
    }
    
    @media only screen and (max-width: 450px) {
        :host {
            font-size: 11px;
        }
        
        
    }
`;