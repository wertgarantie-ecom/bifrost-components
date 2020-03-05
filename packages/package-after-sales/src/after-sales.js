import {LitElement, html} from "lit-element";
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from "lit-html/directives/style-map";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {afterSalesStyling} from './after-sales-styling';

class WertgarantieAfterSales extends LitElement {
    static get styles() {
        return afterSalesStyling;
    }

    static get properties() {
        return {

        };
    }

    constructor() {
        super();
        this.componentVersion = '1.0.0';
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return html`
            <div>
                
            </div>
        `;
    }
}

if (!customElements.get('wertgarantie-after-sales')) {
    customElements.define('wertgarantie-after-sales', WertgarantieAfterSales);
}