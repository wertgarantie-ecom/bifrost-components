import {css} from "lit-element";

// language=CSS
export const landingPageStylingBody = css `
    .landing-page_body {
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
    }
    
    .section__text {
        color: #575757;
        font-size: 1em;
        line-height: 1.3em;
    }

    .section__content {
        width: 50%;
        display: flex;
        flex-flow: column;
    }
    
    .section__image {
        width: 45%;
        background-color: #1a1a1a;
    }
`;