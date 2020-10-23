import {css} from 'lit-element';

//language=CSS
export const selectionPopUpStyling = css`
    :host {
        font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
        font-size: var(--wertgarantie-popup-desktop-text-font-size, 13px);
    }

    .modal {
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1001 !important;
        top: 0;
        left: 0;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .content {
        background-color: var(--wertgarantie-popup-background-color, rgb(244, 244, 244));
        margin: 5% auto;
        width: 75%;
        max-width: 1200px;
        animation-name: openModal;
        animation-duration: 1s;
    }

    @keyframes openModal {
        from {
            opacity: 0
        }
        to {
            opacity: 1
        }
    }

    .head {
        padding: 3em 3em 0.5em 3em;
        display: grid;
        grid-template-columns: 90% 10%;
    }

    .head__left {
        grid-column-start: 1;
        grid-column-end: 1;
        display: inline-block;
    }

    .head__right {
        grid-column-start: 2;
        grid-column-end: 2;
        position: relative;
    }

    .head__title {
        font-size: 1.4em;
        color: var(--wertgarantie-popup-title-color, black);
        padding-right: 2em;
        text-transform: uppercase;
    }

    .closeBtn {
        color: var(--wertgarantie-popup-dark-button-background-color, rgb(32, 32, 32));
        text-align: center;
        cursor: pointer;
        font-size: 2em;
        position: absolute;
        top: 0;
        right: 0;
    }

    .head__subtitle {
        padding: 1em 3em;
    }

    .product-selectors {
        display: none;
    }

    .product-selectors__button {
        font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
        font-size: inherit;
        cursor: pointer;
        background: none;
        outline: none;
        padding: 1em;
        border: 2px solid var(--wertgarantie-popup-dark-button-background-color, rgb(32, 32, 32));
        background-color: var(--wertgarantie-popup-light-button-background-color, rgb(244, 244, 244));
        color: var(--wertgarantie-popup-light-button-text-color, rgb(32, 32, 32));
        transition: all 0.4s;
        width: 50%;
    }

    .product-selectors__button--selected {
        background-color: var(--wertgarantie-popup-dark-button-background-color, rgb(32, 32, 32));
        color: var(--wertgarantie-popup-dark-button-text-color, rgb(244, 244, 244));
    }

    .product-offers {
        display: flex;
        position: relative;
    }

    .product {
        width: 50%;
        cursor: pointer;
        -webkit-transition: all 0.6s;
    }

    .product__head--background {
        color: white;
    }

    .product__head--background-primary {
        --image-link: linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0));
        background-image: var(--wertgarantie-popup-product-background-primary,
        linear-gradient(to bottom right, rgba(0, 0, 0, 0), #000),
        linear-gradient(to top right, #006EFF, rgba(81, 61, 61, 0))),
        var(--image-link);
        background-size: cover;
    }

    .product__head--background-secondary {
        --image-link: linear-gradient(to top right, rgba(0, 0, 0, 0), #000);
        background-image: var(--wertgarantie-popup-product-background-secondary,
        linear-gradient(to bottom right, rgba(81, 61, 61, 0.4), rgba(255, 145, 0, 0.84)),
        linear-gradient(to top right, rgba(0, 0, 0, 0.31), #000)),
        var(--image-link);
        background-size: cover;
    }

    .product--focused {
        opacity: 1;
        z-index: 3;
        width: 60%;
        background-color: #f7f7f7;
    }

    .product--focused-left {
        margin-right: -10%;
    }

    .product--focused-right {
        margin-left: -10%;
    }

    .product--unfocused {
        opacity: 0.2;
        z-index: 2;
    }

    .product__base-info {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        min-height: 280px;
        opacity: 1;
        padding: 2em 3em 2em 3em;
    }

    .product__base-info--top {
        display: flex;
        justify-content: space-between;
    }

    .product__base-info--top-left {
        width: calc(100% - 25px);
    }

    .price-display {
        font-size: 1.4em;
    }

    .product__base-info--top-right {
        width: 25px;
        justify-content: left;
    }

    .product__selection {
        display: inline-block;
        border-radius: 50%;
        cursor: pointer;
        background-color: rgb(70, 70, 70);
        height: 25px;
        width: 25px;
    }

    .product__selection--visible {
        height: 25px;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        text-decoration: none;
    }

    .selection__checkmark {
        display: block;
        margin: auto;
        height: 75%;
        width: 75%;
    }

    .product__selection--invisible {
        display: none;
    }

    .product__base-info--bottom {
        display: flex;
        flex-flow: column;
    }

    .product__title {
        font-weight: 700;
        font-size: 1.2em;
        max-width: 85%;
        text-transform: uppercase;
        min-height: 4em;
    }

    .product__advantages {
        display: flex;
        flex-flow: column;
    }

    .advantage {
        display: flex;
        padding-top: 0.9em;
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

    .product__details {
        visibility: hidden;
        overflow: auto;
        opacity: 0;
        max-height: 0;
        transition: all 0.4s;
        transform-origin: left top;
        transform: scaleY(0);
    }

    .details__title {
        padding-top: 2em;
        font-size: 1.4em;
        font-weight: 700;
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

    .advantage__icon--excluded::before {
        content: "\\F05E";
    }

    .product__details-footer {
        text-align: center;
        visibility: hidden;
        opacity: 0;
        max-height: 0;
        transition: height 0.6s;
        transform-origin: left top;
        transform: scaleY(0);
        overflow: auto;
    }

    .product__details--expanded, .product__details-footer--expanded {
        visibility: visible;
        opacity: 1;
        max-height: 100%;
        transition: all 0.6s;
        transform: scaleY(1);
        padding: 0 3em 1em 3em;
    }

    .product__terms {
        margin-top: 3em;
    }

    .product-further-info {
        text-align: center;
        padding-top: 1em;
    }

    .wg-link {
        text-decoration: none;
        color: #39f;
    }

    .award-image-block {
        display: inline-block;
        padding: 2em;
    }

    .award-image {
        vertical-align: text-top;
        max-height: 80px;
    }

    .button-section {
        padding: 3em;
        display: flex;
    }

    .button-section__details-cancel {
        width: 80%;
        display: flex;
        justify-content: space-between;
    }

    .button-section__order {
        width: auto;
        flex: 1 1 20%;
        display: flex;
        justify-content: flex-end;
    }

    .order-button {
        width: 100%;
        min-width: 205px;
    }

    .button {
        font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
        font-size: inherit;
        cursor: pointer;
        background: none;
        outline: none;
        padding: 1.5em 3em 1.5em 3em;
        margin: 3px;
        border: none;
        border: 2px solid var(--wertgarantie-popup-dark-button-background-color, rgb(32, 32, 32));
        transition: all 0.4s;
    }

    .button--dark {
        background-color: var(--wertgarantie-popup-dark-button-background-color, rgb(32, 32, 32));
        color: var(--wertgarantie-popup-dark-button-text-color, rgb(244, 244, 244));
    }

    .button--light {
        background-color: var(--wertgarantie-popup-light-button-background-color, rgb(244, 244, 244));
        color: var(--wertgarantie-popup-light-button-text-color, rgb(32, 32, 32));
    }

    .order-button--inactive {
        background-color: var(--wertgarantie-popup-dark-disabled-button-background-color, rgb(100, 100, 100));
        color: var(--wertgarantie-popup-dark-disabled-button-text-color, rgb(220, 220, 220));
        border: 2px solid var(--wertgarantie-popup-disabled-dark-button-background-color, rgb(100, 100, 100));
        opacity: 0.5;
    }

    .wg-rating-default {
        --wertgarantie-rating-font-family: var(--wertgarantie-embedded-rating-font-family, "Open Sans", sans-serif);
        --wertgarantie-rating-font-size: var(--wertgarantie-popup-desktop-text-font-size, 12px);
        --wertgarantie-rating-text-color: rgb(134, 134, 134);

        --wertgarantie-rating-stars-font-size: var(--wertgarantie-popup-desktop-text-font-size, 12px);
        --wertgarantie-rating-stars-color: orange;
    }

    @media only screen and (max-width: 878px) {
        :host {
            font-size: var(--wertgarantie-popup-tablet-text-font-size, 11px);
        }
        
        .wg-rating-default {
            --wertgarantie-rating-font-size: var(--wertgarantie-popup-tablet-text-font-size, 11px);
            --wertgarantie-rating-stars-font-size: var(--wertgarantie-popup-tablet-text-font-size, 11px);
        }
        
        .button-section {
            display: flex;
            flex-flow: column;
        }

        .button-section__details-cancel {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .button-section__order {
            width: 100%;
        }

        .button {
            width: 50%;
            padding: 1.5em 2em;
        }

        .order-button {
            width: 100%;
        }

        .product-selectors {
            display: flex;
            padding: 0 3em 2em 3em;
            justify-content: center;
        }
        
        .checkouts {
            display: block;
            position: relative;
        }

        .product {
            display: none;
            width: 100%;
            -webkit-transition: all 0.6s;
        }

        .product--focused {
            width: 100%;
            background-color: #f7f7f7;
        }

        .product--focused--mobile {
            display: block
        }

        .product--focused-left {
            margin-right: 0;
        }

        .product--focused-right {
            margin-left: 0;
        }

        .product--unfocused {
            display: none;
        }
        
        .product__base-info {
            min-height: 230px;
            opacity: 1;
            padding: 2em 3em 2em 3em;
        }

        .product__title {
            min-height: 2.5em;
            max-width: 100%;
        }
        
        .order-button {
            min-width: 0;
        }
    }
    
     @media only screen and (max-width: 450px) { 
        :host {
            font-size: var(--wertgarantie-popup-phone-text-font-size, 9px);
        }

         .wg-rating-default {
             --wertgarantie-rating-font-size: var(--wertgarantie-popup-tablet-text-font-size, 9px);
             --wertgarantie-rating-stars-font-size: var(--wertgarantie-popup-tablet-text-font-size, 9px);
         }
         
         .head {
             padding: 3em 2em 0.5em 2em;
         }
         
         .head__subtitle {
             padding: 1em 2em;
         }
    
         .product-selectors {
             padding: 0 2em 2em 2em;
         }
         
         .button-section {
             padding: 2em;
         }

         .product__title {
             min-height: 1em;
         }
    }
`;