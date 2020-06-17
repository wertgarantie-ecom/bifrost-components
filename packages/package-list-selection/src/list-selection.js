import {LitElement, html} from "lit-element";
import {listSelectionStyling} from "./listSelectionStyling";
import fetchBifrost from "../../../shared-code/fetchBifrost";
import initSentry from "../../../shared-code/sentry";
import "../../package-selection-embedded/dist/selection-embedded.min.js";

class WertgarantieListSelection extends LitElement {
    static get styles() {
        return [
            listSelectionStyling
        ];
    }

    static get properties() {
        return {
            showComponent: {type: Boolean},
            title: {type: String},
            includedTax: {type: String},
            addInsuranceButtonText: {type: String},

            insurableProductRows: {type: Object},
            shopOrderBase64: {type: String}
        };
    }

    constructor() {
        super();
        this.componentVersion = '0.0.1';


        this.displayComponent = this.displayComponent.bind(this);
        this.setProperties = this.setProperties.bind(this);
        this.fetchListSelectionComponentData = this.fetchListSelectionComponentData.bind(this);
        this.renderProductRow = this.renderProductRow.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        this.clientId = this.getAttribute('data-client-id');
        this.shopOrderBase64 = this.getAttribute('data-shop-order-base64');
        this.bifrostUri = this.getAttribute('data-bifrost-uri') || "https://ecommerce.wertgarantie.com/wertgarantie";
        initSentry('list-selection', this.componentVersion, this.bifrostUri, this.clientId);
        this.displayComponent();
    }

    displayComponent() {
        this.fetchListSelectionComponentData()
            .then(this.setProperties)
            .then(() => this.showComponent = true)
            .catch((e) => {
                console.error(e);
                this.showComponent = false
            })
    }

    async fetchListSelectionComponentData() {
        const url = new URL(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/list-selection`);
        const response = await fetchBifrost(url, 'PUT', this.componentVersion, {
            shopShoppingCart: this.shopOrderBase64
        });

        if (response.status !== 200) {
            return undefined;
        }

        return response.body;
    }

    setProperties(fetchedData) {
        this.insurableProductRows = fetchedData.insurableProductRows;
        this.title = fetchedData.listSelectionComponentTexts.title;
        this.includedTax = fetchedData.listSelectionComponentTexts.includedTax;
        this.addInsuranceButtonText = fetchedData.listSelectionComponentTexts.addInsuranceButtonText;
    }

    render() {
        return this.showComponent ? html`
            <div class="content">
                <div class="head">
                    <h3>${this.title}</h3>
                </div>
                <div class="selection">
                    ${this.insurableProductRows.map(this.renderProductRow)}
                    <div class="tax-explanation">
                        ${this.includedTax}
                    </div>
                </div>
                <div class="footer">
                    <button id="addToShoppingCart">${this.addInsuranceButtonText}</button>
                </div>
            </div>
        ` : html`
            <div>nothing to show</div>  
        `;
    }

    renderProductRow(productRow) {
        return html`
            <div class="selection__item">
                <div class="shop-product product">
                    <img class="product__image" src="${productRow.shopProductImageLink}">
                    <div class="product__name">
                        ${productRow.shopProductName}
                    </div>
                </div>
                <div class="insurance-offer">
                    <wertgarantie-selection-embedded
                        data-client-id="${this.clientId}"
                        data-bifrost-uri="${this.bifrostUri}"
                        data-after-sales-embedded="true"
                        data-display-data="${productRow.embeddedSelectionDataBase64}">
                    </wertgarantie-selection-embedded>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('wertgarantie-list-selection')) {
    customElements.define('wertgarantie-list-selection', WertgarantieListSelection);
}