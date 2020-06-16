import {LitElement, html} from "lit-element";
import {listSelectionStyling} from "./listSelectionStyling";

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
    }

    connectedCallback() {
        super.connectedCallback();
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