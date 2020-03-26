import {css} from "lit-element";

// language=CSS
export const landingPageStylingHead = css`
    .landing-page__head {
        width: 100%;
        background-image: linear-gradient(to right, rgb(190, 190, 190), rgb(230, 230, 230), rgb(190, 190, 190));
        border-radius: 3px;
    }

    .head {
        padding-top: 100px;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
        overflow: visible;
        width: fit-content;
        margin: auto;
    }

    .head__item {
        align-items: stretch;
    }

    .title-section {
        display: flex;
    }

    .head__title {
        text-transform: uppercase;
        color: white;
        padding: 0.7em;
        font-weight: 500;
        font-size: 1.3em;
        background-color: #141414;
        letter-spacing: 1px;

    }

    .head__title--edge {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 3.5em 0 0 1.5em;
        border-color: transparent transparent transparent #141414;
    }

    .head__subtitle {
        color: #353535;
        font-size: 1.1em;
        font-weight: 600;
        margin: 1em 0;
    }

    .head__bottom {
        display: flex;
        flex-flow: row;
        justify-content: center;
    }

    .insurance-application-button {
        background-image: linear-gradient(to right, #a82845, rgb(217, 54, 130));
        text-transform: uppercase;
        padding: 1.2em 2em;
        color: white;
        font-weight: 600;
        font-size: 0.8em;
        letter-spacing: 0.03em;
    }

    .google-rating {
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
        --wertgarantie-rating-font-size: 0.7em;
        --wertgarantie-rating-text-color: black;
        --wertgarantie-rating-font-weight: 800;

        --wertgarantie-rating-stars-font-size: 1.2em;
        --wertgarantie-rating-stars-color: #ffbe42;
    }
`;