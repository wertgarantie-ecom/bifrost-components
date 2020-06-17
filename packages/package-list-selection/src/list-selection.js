import {LitElement, html} from "lit-element";
import {listSelectionStyling} from "./listSelectionStyling";
import fetchBifrost from "../../../shared-code/fetchBifrost";
import initSentry from "../../../shared-code/sentry";

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
            addToShoppingCartText: {type: String},

            shopProducts: {type: Object},
            shopProductsBase64: {type: String}
        };
    }

    constructor() {
        super();
        this.componentVersion = '0.0.1';


        this.displayComponent = this.displayComponent.bind(this);
        this.setProperties = this.setProperties.bind(this);
        this.checkDataComplete = this.checkDataComplete.bind(this);
        this.fetchListSelectionComponentData = this.fetchListSelectionComponentData.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        this.clientId = this.getAttribute('data-client-id');
        this.shopOrderBase64 = this.getAttribute('data-shop-order-base64');
        this.bifrostUri = this.getAttribute('data-bifrost-uri') || "https://ecommerce.wertgarantie.com/wertgarantie";

        this.displayComponent();
    }

    displayComponent() {
        this.fetchListSelectionComponentData()
            .then(this.checkDataComplete)
            .then(this.setProperties)
            .then(() => this.showComponent = true)
            .catch(() => this.showComponent = false)
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

    setProperties() {

    }

    checkDataComplete() {
        //TODO keep or delete?
    }

    render() {
        this.showComponent ? html`
            <div class="content">
                <div class="head">
                    <h3>EXTRASCHUTZ?</h3>
                </div>
                <div class="selection">
                    ${this.shopProducts.map(shopProduct => html`
                        <div class="selection__item">
                            <div class="shop-product product">
                                <img class="product__image" src=${shopProduct.imageLink}>
                                <div class="product__name">
                                    ${shopProduct.name}
                                </div>
                            </div>
                            <div class="insurance-offer">
                                <wertgarantie-selection-embedded
                                    data-client-id=${this.clientId}
                                    data-bifrost-uri=${this.bifrostUri}
                                    data-device-class=${shopProduct.deviceClass}
                                    data-device-price=${shopProduct.price}
                                    data-after-sales-embedded="true"
                                    data-complete-product-name=${shopProduct.name}>
                                </wertgarantie-selection-embedded>
                            </div>
                        </div>
                    `)}
                    <div class="tax-explanation">
                        ${this.includedTax}
                    </div>
                </div>
                <div class="footer">
                    <button id="addToShoppingCart">${this.addToShoppingCartText}</button>
                </div>
            </div>
        ` : html``;
    }
}

if (!customElements.get('wertgarantie-list-selection')) {
    customElements.define('wertgarantie-list-selection', WertgarantieListSelection);
}