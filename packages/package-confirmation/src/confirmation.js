import {LitElement, html} from 'lit-element';
import {confirmationStyling} from './confirmation-styling';
import {fetchBifrost} from "../../../shared-code/fetchBifrost";
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from "lit-html/directives/style-map";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

class WertgarantieConfirmation extends LitElement {

    static get properties() {
        return {
            showComponent: {type: Boolean},
            clientId: {type: String},
            bifrostUri: {type: String},
            formSelector: {type: String},
            headerTitle: {type: String},
            products: {type: Object},
            selectedProductIndex: {type: Number},
            confirmText: {type: String},
            generalConfirmationText: {type: String},
            footerText: {type: String},
            moreInformationHtml: {type: String},
            pleaseConfirmText: {type: String},
            termsAndConditionsConfirmed: {type: Boolean},
            legalAgeConfirmed: {type: Boolean},
            showUncheckedWarning: {type: Boolean}
        }
    }

    static get styles() {
        return confirmationStyling;
    }

    constructor() {
        super();
        this.componentVersion = '2.0.1';

        //method binding
        this.setProperties = this.setProperties.bind(this);
        this.checkStateOnSubmit = this.checkStateOnSubmit.bind(this);
        this.isFullyChecked = this.isFullyChecked.bind(this);
        this.fetchConfirmationComponentData = this.fetchConfirmationComponentData.bind(this);
        this.productDataAvailable = this.productDataAvailable.bind(this);
        this.deleteProductOrder = this.deleteProductOrder.bind(this);
        this.displayComponent = this.displayComponent.bind(this);
        this.toggleTermsAndConditionsConfirmation = this.toggleTermsAndConditionsConfirmation.bind(this);
        this.sendToggelTermsAndConditionsConfirmationRequest = this.sendToggelTermsAndConditionsConfirmationRequest.bind(this);
        this.toggleLegalAgeConfirmationRequest = this.toggleLegalAgeConfirmationRequest.bind(this);
        this.sendToggelLegalAgeConfirmationRequest = this.sendToggelLegalAgeConfirmationRequest.bind(this);
        this.renderValidationFailed = this.renderValidationFailed.bind(this);
        this.renderTab = this.renderTab.bind(this);
    }


    connectedCallback() {
        super.connectedCallback();
        this.clientId = this.getAttribute('data-client-id');
        this.bifrostUri = this.getAttribute('data-bifrost-uri') || "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
        this.formSelector = this.getAttribute('data-form-selector');
        this.initListeners();
        this.displayComponent();
    }

    setProperties(data) {
        this.headerTitle = data.headerTitle;
        this.products = data.products;
        this.selectedProductIndex = 0;
        this.confirmText = data.confirmText;
        this.generalConfirmationText = data.generalConfirmationText;
        this.legalAgeConfirmationText = data.legalAgeConfirmationText;
        this.footerText = data.footerText;
        this.moreInformationHtml = data.moreInformationHtml;
        this.pleaseConfirmText = data.pleaseConfirmText;
        this.termsAndConditionsConfirmed = data.termsAndConditionsConfirmed || false;
        this.legalAgeConfirmed = data.legalAgeConfirmed || false;
        this.showUncheckedWarning = false;

    }

    initListeners() {
        if (this.formSelector) {
            const form = document.querySelector(this.formSelector);
            form.addEventListener('submit', this.checkStateOnSubmit);
        }
        document.addEventListener('wertgarantie-product-added', () => {
            this.displayComponent();
        });
    }

    checkStateOnSubmit(e) {
        if (!this.isFullyChecked()) {
            this.showUncheckedWarning = true;
            e.preventDefault();
            return false;
        }
    }

    isFullyChecked() {
        return this.termsAndConditionsConfirmed && this.legalAgeConfirmed;
    }

    async fetchConfirmationComponentData() {
        const url = new URL(this.bifrostUri + '/components/confirmation');
        const response = await fetchBifrost(url, 'PUT', this.componentVersion);

        if (response.status !== 200) {
            return undefined;
        }

        return response.body;
    }

    productDataAvailable(fetchedConfirmationComponentData) {
        if (!fetchedConfirmationComponentData ||
            fetchedConfirmationComponentData.constructor !== Object ||
            Object.entries(fetchedConfirmationComponentData).length === 0 ||
            fetchedConfirmationComponentData.products.length === 0) {
            throw new UndefinedConfirmationDataError("fetchedConfirmationData is empty or undefined");
        }
        return fetchedConfirmationComponentData;
    }

    displayComponent() {
        this.fetchConfirmationComponentData()
            .then(this.productDataAvailable)
            .then(this.setProperties)
            .then(() => this.showComponent = true)
            .catch(() => this.showComponent = false)
    }

    renderProductPanel(classAttribute, product) {
        const productDivClassList = {
            "product": true,
            "product--selected": true,
            "product--even": this.selectedProductIndex % 2 === 0,
            "product--odd": this.selectedProductIndex % 2 !== 0
        };

        const productDivStyleMap = {
            "--image-link": "url(" + product.productBackgroundImageLink + ")"
        };

        return html`
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css">
            <div class="${classAttribute}">
                <div class=${classMap(productDivClassList)}
                     style=${styleMap(productDivStyleMap)}>
                    <div>
                        <span class="payment-interval product__price-info--small">${product.paymentInterval}</span><br>
                        <span class="product-price product__price-info--strong">${product.price}</span><br>
                        <span class="product-tax product__price-info--small">${product.includedTax}</span>
                    </div>
                    <div>
                        <div class="product__title">${product.productTitle}</div>
                        <ul class="product__advantages">
                        ${product.top3.map(advantage => html`
                            <li class="product__advantage"><span class="advantage__icon">${advantage}</span>
                            </li>
                           `)}
                        </ul>
                    </div>
                    <div>
                        <small class="product-link"><a class="wg-link" href="http://www.example.com">${product.informationSheetUri}</a></small><br>
                    </div>
                </div>
            </div>
       `;
    }

    toggleTermsAndConditionsConfirmation(event) {
        if (event.target.checked) {
            return this.sendToggelTermsAndConditionsConfirmationRequest('PUT');
        } else {
            return this.sendToggelTermsAndConditionsConfirmationRequest('DELETE');
        }
    }

    async sendToggelTermsAndConditionsConfirmationRequest(method) {
        const url = this.bifrostUri + '/components/confirmation/termsAndConditionsConfirmed';
        const response = await fetchBifrost(url, method, this.componentVersion);
        if (response.status === 200) {
            this.termsAndConditionsConfirmed = !this.termsAndConditionsConfirmed;
        }
    }

    toggleLegalAgeConfirmationRequest(event) {
        if (event.target.checked) {
            return this.sendToggelLegalAgeConfirmationRequest('PUT');
        } else {
            return this.sendToggelLegalAgeConfirmationRequest('DELETE');
        }
    }

    async sendToggelLegalAgeConfirmationRequest(method) {
        const url = this.bifrostUri + '/components/confirmation/legalAgeConfirmed';
        const response = await fetchBifrost(url, method, this.componentVersion);
        if (response.status === 200) {
            this.legalAgeConfirmed = !this.legalAgeConfirmed;
        }
    }

    async deleteProductOrder(product) {
        const url = new URL(this.bifrostUri + '/components/confirmation/product');

        const result = await fetchBifrost(url, 'DELETE', this.componentVersion, {
            orderId: product.orderId
        });
        if (result.status === 200) {
            this.setProperties(result.body)
        } else if (result.status === 204) {
            this.showComponent = false
        }
    }

    renderValidationFailed() {
        return this.showUncheckedWarning ? html`
            <div class="confirmation__footer confirmation__footer--notification" >
                <strong>${this.pleaseConfirmText}</strong>
            </div> ` : html``;
    }

    renderTab(product, index) {
        const tabClassList = {
            "tab": true,
            "tab--selected": index === this.selectedProductIndex
        };
        return html`
            <div class="${classMap(tabClassList)}" @click="${() => this.selectedProductIndex = index}">
                <div class="tab__name">${product.shopProductShortName}</div>
                <div class="tab__remove"
                     @click="${() => this.deleteProductOrder(product)}">
                    ×
                </div>
            </div>
        `
    }

    render() {
        if (!this.showComponent) {
            return html``;
        }
        const termsAndConditionsCheckboxClassList = {
            "checkbox__container": true,
            "confirmation--unchecked": !this.termsAndConditionsConfirmed && this.showUncheckedWarning
        };
        const legalAgeCheckboxClassList = {
            "checkbox__container": true,
            "confirmation--unchecked": !this.legalAgeConfirmed && this.showUncheckedWarning
        };
        //language=HTML
        return html`
            <div class="component" style="display: flex;">
                <section class="info">
                    <div class="header">
                        <div class="header__icon">
                            <i class="shield"></i>
                        </div>
                        <div class="header__title">
                            ${this.headerTitle}
                        </div>
                    </div>
                    <div class="product__tabs">
                    ${this.products.map((product, index) => this.renderTab(product, index))}
                    </div>
                    ${this.renderProductPanel('product__panel--mobile', this.products[this.selectedProductIndex])}
                    <div class="confirmation__section">
                        <div class="confirmation__header" id="please-confirm-text">${this.confirmText}</div>
                        <div class="confirmation__input">
                            <div class="confirmation__row">
                                <div class="confirmation__checkbox-column">
                                    <div class=${classMap(termsAndConditionsCheckboxClassList)}>
                                        <input @click="${event => this.toggleTermsAndConditionsConfirmation(event)}" class="confirmation" id="confirmation_check" type="checkbox" ?checked="${this.termsAndConditionsConfirmed}">
                                    </div>
                                </div>
                                <div class="confirmation__text" id="general-confirmation-text">${unsafeHTML(this.generalConfirmationText)}</div>
                            </div>
                            <div class="confirmation__row">
                                <div class="confirmation__checkbox-column">
                                    <div class=${classMap(legalAgeCheckboxClassList)}>
                                        <input @click="${event => this.toggleLegalAgeConfirmationRequest(event)}" class="confirmation" id="confirmation_check" type="checkbox" ?checked="${this.legalAgeConfirmed}">
                                    </div>
                                </div>
                                <div class="confirmation__text" id="legal-age-confirmation-text">${this.legalAgeConfirmationText}</div>
                            </div>
                            ${this.renderValidationFailed()}
                        </div>
                        <div class="confirmation__footer">
                            <strong>${this.footerText}</strong>
                        </div>
                        <div class="confirmation__footer">
                            <strong>${this.moreInformationHtml}</strong>
                        </div>
                        
                    </div>
                </section>
                ${this.renderProductPanel('product__panel', this.products[this.selectedProductIndex])}
            </div>                   `;
    }
}

class UndefinedConfirmationDataError extends Error {
}
if (!customElements.get('wertgarantie-confirmation')) {
    customElements.define('wertgarantie-confirmation', WertgarantieConfirmation);
}
