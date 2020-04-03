import {css} from "lit-element";

// language=CSS
export const landingPageStylingHead = css`
    .landing-page__head {
        width: 100%;
        --image-link: var(--wertgarantie-landing-page-head-background-image, linear-gradient(to right, rgb(190, 190, 190), rgb(230, 230, 230), rgb(190, 190, 190)));
        background-image: var(--wertgarantie-landing-page-head-background-image, linear-gradient(to right, rgba(190, 190, 190, 0.5), rgba(230, 230, 230, 0.5), rgba(190, 190, 190, 0.5))),
            var(--image-link);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 3px;
    }

    .head {
        padding-top: 125px;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
        overflow: visible;
        width: fit-content;
        width: -moz-fit-content;
        margin: auto;
    }

    .head__item {
        align-items: stretch;
    }

    .title-section {
        display: flex;
        height: 70px;
    }

    .head__title {
        text-transform: uppercase;
        color: var(--wertgarantie-landing-page-head-banner-title-color, white);
        padding: 0.7em;
        font-weight: var(--wertgarantie-landing-page-head-banner-title-font-weight, 600);
        font-size: var(--wertgarantie-landing-page-head-banner-title-font-size, 1.5em);
        /*line-height: var(--wertgarantie-landing-page-head-banner-title-font-size, 1.5em);*/
        background-color: var(--wertgarantie-landing-page-primary-color, #141414);
        letter-spacing: 1px;
        display: flex;
        align-items: center;

    }

    .head__title--edge {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 70px 0 0 1.5em;
        border-color: transparent transparent transparent var(--wertgarantie-landing-page-primary-color, #141414);
    }

    .head__subtitle {
        color: var(--wertgarantie-landing-page-head-banner-subtitle-color, #353535);
        font-size: var(--wertgarantie-landing-page-head-banner-subtitle-font-size, 1.1em);
        font-weight: var(--wertgarantie-landing-page-head-banner-subtitle-font-weight, 600);
        margin: 1em 0;
    }

    .head__bottom {
        display: flex;
        flex-flow: row;
        justify-content: center;
    }

    .insurance-application-button {
        background-image: var(--wertgarantie-landing-page-head-insurance-application-button-background-image, linear-gradient(to right, #a82845, rgb(224, 57, 94)));
        text-transform: uppercase;
        padding: 1.2em 2em;
        color: var(--wertgarantie-landing-page-head-banner-title-color, white);
        font-weight: var(--wertgarantie-landing-page-head-insurance-application-button-font-weight, 600);
        font-size: var(--wertgarantie-landing-page-head-insurance-application-button-font-size, 0.8em);
        letter-spacing: 0.03em;
        font-family: var(--wertgarantie-landing-page-font-family, "Helvetica", Arial, sans-serif);
        cursor: pointer;
    }

    .google-rating-container {
        display: flex;
        align-items: center;
        padding: 0 1em;
    }

    .bottom {
        display: flex;
        justify-content: flex-end;
        padding: 1em;
    }

    .head__images {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    #tuev-image {
        width: 20%;
    }

    #focus-money-image {
        width: 25%;
        margin: 0 0.5em;
    }

    #test-bild-image {
        width: 20%;
    }

    .default-google-rating {
        --wertgarantie-rating-font-family: var(--wertgarantie-landing-page-font-family, "Helvetica", Arial, sans-serif);
        --wertgarantie-rating-font-size: var(--wertgarantie-landing-page-google-rating-text-font-size, 0.7em);
        --wertgarantie-rating-text-color: var(--wertgarantie-landing-page-google-rating-text-color, black);
        --wertgarantie-rating-font-weight: var(--wertgarantie-landing-page-google-rating-text-font-weight, 800);
        --wertgarantie-rating-stars-font-size: var(--wertgarantie-landing-page-google-rating-star-font-size) 1.2em;
        --wertgarantie-rating-stars-color: var(--wertgarantie-landing-page-google-rating-star-color, #ffa819);
    }
`;