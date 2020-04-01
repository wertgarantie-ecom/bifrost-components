import {css} from "lit-element";

// language=CSS
export const landingPageStylingBody = css `      .landing-page_body {
    width: 100%;
}

.body__section {
    margin: 4em 0;
    width: 100%;
}

.body__section--with-picture {
    display: flex;
    justify-content: space-between;
}

.section__header {
    margin: 1em 0;
    font-size: 1.3em;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--wertgarantie-landing-page-body-title-color, black);
}

.section__text {
    font-size: 1em;
    line-height: 1.6em;
    color: var(--wertgarantie-landing-page-body-text-color, #636363);
}

.section__content {
    width: 50%;
    display: flex;
    flex-flow: column;
}

.section__content--split {
    padding: 1em 0;
}

.section__content--split-broad {
    width: 65%;
}

.section__image {
    width: 48%;
    --image-link: linear-gradient(44.14deg, var(--wertgarantie-landing-page-primary-color, #141414) 0%, var(--wertgarantie-landing-page-primary-color, #141414) 100%);
    background-image: var(--image-link);
    background-size: cover;
    background-repeat: no-repeat;
}

.wertgarantie-logo {
    width: 75%;
}

.section__image--small {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
}  `;