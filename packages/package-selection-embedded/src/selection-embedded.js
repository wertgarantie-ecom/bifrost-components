import {LitElement, html} from "lit-element";
import fetchBifrost from "../../../shared-code/fetchBifrost";
import '../../package-rating/dist/rating.min.js';
import initSentry from "../../../shared-code/sentry";
import {selectionEmbeddedStyling} from "./selection-embedded-styling";


class WertgarantieSelectionEmbedded extends LitElement {

    static get styles() {
        return [
            selectionEmbeddedStyling
        ];
    }

    static get properties() {
        return {
            showComponent: {type: Boolean},
            title: {type: String},
            wertgarantieFurtherInfoHtml: {type: String},
            products: {type: Object}
        };
    }

    constructor() {
        super();

        // method binding
        this.displayComponent = this.displayComponent.bind(this);
        this.fetchSelectionData = this.fetchSelectionData.bind(this);
        this.setProperties = this.setProperties.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.componentVersion = '0.0.3';
        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.clientId = this.getAttribute("data-client-id");
        initSentry('selection-embedded', this.componentVersion, this.bifrostUri, this.clientId);
        this.devicePrice = parseInt(this.getAttribute("data-device-price"));
        this.deviceClass = this.getAttribute("data-device-class");
        this.landingPageUri = this.getAttribute("data-landing-page-uri") || "https://www.wertgarantie.de";
        this.productBaseModel = this.getAttribute("data-product-base-model");
        this.showComponent = false;
        this.displayComponent();
    }

    displayComponent() {
        this.fetchSelectionData()
            .then(this.setProperties)
            .then(() => this.showComponent = true)
            .catch(() => this.showComponent = false)
    }

    async fetchSelectionData() {
        const url = `${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/`;
        const result = await fetchBifrost(url, 'PUT', this.componentVersion, {
            deviceClass: this.deviceClass,
            devicePrice: this.devicePrice
        });
        return result.body;
    }

    setProperties(selectionData) {
        this.title = selectionData.texts.title;
        this.wertgarantieFurtherInfoHtml = selectionData.texts.wertgarantieFurtherInfoHtml.replace("%s", this.landingPageUri);
        this.products = selectionData.products;
    }

    render() {
        return this.showComponent ? html`<div class="component">
            <div class="component__head head">
                <div class="head__title">
                    ${this.title}
                </div>
                <wertgarantie-rating class="head__rating"
                                     data-bifrost-uri="${this.bifrostUri}"
                                     data-link-text=" ">
                </wertgarantie-rating>
            </div>
            <div class="component__products prodcuts">
                ${this.products.map(product => html`
                    <div class="products__product product">
                        <div class="product__selection selection">
                            <div class="selection__checkbox"></div>
                            <div class="selection__name">${product.shortName}</div>
                        </div>
                        <div class="product__price">${product.priceFormatted + " / " + product.paymentInterval + "*"}</div>
                    </div>`
                )}
            <div class="component__footer">
                *Inkl. 19% Versicherungssteuer
            </div>
        </div>` : html``;
    }
}

if (!customElements.get('wertgarantie-selection-embedded')) {
    customElements.define('wertgarantie-selection-embedded', WertgarantieSelectionEmbedded);
}