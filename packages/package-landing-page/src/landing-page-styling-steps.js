import {css} from "lit-element";

// language=CSS
export const landingPageStylingSteps = css`
    .steps {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: nowrap;
        margin-top: 4em;
    }
    
    .steps__step {
        display: flex;
        flex-flow: column;
        justify-content: center;
        max-width: 15%;
        align-items: center;
        text-align: center;
    }
    
    .step__square {
        width: 90px;
        height: 90px;
        background-color: var(--wertgarantie-landing-page-primary-color, #141414);
        color: var(--wertgarantie-landing-page-head-banner-title-color, white);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--wertgarantie-landing-page-steps-square-font-size, 2em);
        font-weight: var(--wertgarantie-landing-page-steps-square-font-size, 600);
    }

    .icon__svg {
        width: 50%;
        height: 50%;
    }

    .icon__svg--colored {
        fill: var(--wertgarantie-landing-page-head-banner-title-color, white);
    }
    
    .step__title {
        color: var(--wertgarantie-landing-page-head-banner-subtitle-color, #353535);
        font-size: var(--wertgarantie-landing-page-head-banner-subtitle-font-size, 1.1em);
        font-weight: var(--wertgarantie-landing-page-head-banner-subtitle-font-weight, 600);
        margin: 2em 0;
    }
    
    .step__text {
        font-size: 0.9em;
        line-height: 1.6em;
        color: var(--wertgarantie-landing-page-body-text-color, #636363);
    }
`;