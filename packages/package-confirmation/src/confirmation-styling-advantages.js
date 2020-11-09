import {css} from "lit-element";

// language=CSS
export const confirmationStylingAdvantages = css`
    .product__advantages {
        display: flex;
        flex-flow: column;
    }

    .product__advantage {
        padding-top: 0.7em;
        display: flex;
    }

    .advantage__icon-container {
        width: auto;
        padding-right: 1em;
        display: flex;
        justify-content: left;
        align-items: flex-start;
    }

    .advantage__text-container {
        width: 95%;
        text-align: left;
        vertical-align: center;
    }
    
    .advantage__icon {
        width: 15px;
        height: 15px;
    }
`;