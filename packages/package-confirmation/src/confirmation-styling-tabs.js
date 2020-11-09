import {css} from "lit-element";

// language=CSS
export const confirmationStylingTabs = css`
    .product__tabs {
        padding-top: 1em;
        padding-left: 50px;
        display: flex;
        flex-wrap: wrap;
    }

    .tab {
        cursor: pointer;
        border: 1px solid rgb(230, 230, 230);
        width: 20%;
        min-width: 150px;
        margin-right: 1.5em;
        margin-bottom: 1em;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        vertical-align: middle;
    }

    .tab__name {
        width: 85%;
        font-size: 0.7em;
        padding: 0.8em 0.8em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tab__remove {
        cursor: pointer;
        width: 15%;
        font-size: 1.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5em 0.3em;
    }

    .tab:hover {
        background-color: var(--wertgarantie-confirmation-product-tab-background-color-hover, rgb(230, 230, 230));
    }

    .tab--selected {
        background-color: var(--wertgarantie-confirmation-product-tab-background-color-selected, rgb(230, 230, 230));
    }

    .tab--warning {
        border: 4px solid #ee6767;
    }

    .remove-product {
        cursor: pointer;
        font-size: 1em;
    }
`;