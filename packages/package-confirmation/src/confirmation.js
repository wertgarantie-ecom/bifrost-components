import {LitElement, html} from 'lit-element';
import {confirmationStyling} from './confirmation-styling';
import {confirmationStylingTabs} from "./confirmation-styling-tabs";
import {confirmationStylingAdvantages} from "./confirmation-styling-advantages";
import fetchBifrost from "../../../shared-code/fetchBifrost";
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from "lit-html/directives/style-map";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import initSentry from "../../../shared-code/sentry";

class WertgarantieConfirmation extends LitElement {

    static get properties() {
        return {
            showComponent: {type: Boolean},
            clientId: {type: String},
            bifrostUri: {type: String},
            formSelector: {type: String},
            orders: {type: Object},
            selectedProductIndex: {type: Number},
            termsAndConditionsConfirmed: {type: Boolean},

            showUncheckedWarning: {type: Boolean},
            showPriceChangedWarning: {type: Boolean},

            flashMessage: {type: String},

            priceChangedWarning: {type: String},
            boxTitle: {type: String},
            title: {type: String},
            subtitle: {type: String},
            confirmationTextTermsAndConditions: {type: String},
            confirmationPrompt: {type: String}
        }
    }

    static get styles() {
        return [
            confirmationStyling,
            confirmationStylingTabs,
            confirmationStylingAdvantages
        ];
    }

    constructor() {
        super();
        this.componentVersion = '2.0.24';

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
        this.renderTab = this.renderTab.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.clearWarnings = this.clearWarnings.bind(this);
    }


    connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute('data-bifrost-uri') || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.clientId = this.getAttribute('data-client-id');
        initSentry('confirmation', this.componentVersion, this.bifrostUri, this.clientId);
        this.shopOrderBase64 = this.getAttribute('data-shop-order-base64');
        this.validationTriggerSelector = this.getAttribute('data-validation-trigger-selector');
        this.validationTriggerEvent = this.getAttribute('data-validation-trigger-event') || 'submit';

        this.initListeners();
        this.displayComponent();
    }

    setProperties(data) {
        this.boxTitle = data.texts.boxTitle;
        this.title = data.texts.title;
        this.subtitle = data.texts.subtitle;
        this.showPriceChangedWarning = data.showPriceChangedWarning;
        this.priceChangedWarning = data.texts.priceChangedWarning;
        this.confirmationTextTermsAndConditions = data.texts.confirmationTextTermsAndConditions;
        this.confirmationPrompt = data.texts.confirmationPrompt;
        this.orders = data.orders;
        this.selectedProductIndex = 0;
        this.termsAndConditionsConfirmed = data.termsAndConditionsConfirmed || false;
        this.showUncheckedWarning = false;

        this.flashMessage = this.showPriceChangedWarning ? this.priceChangedWarning : undefined;
    }

    initListeners() {
        if (this.validationTriggerSelector) {
            const form = document.querySelector(this.validationTriggerSelector);
            form.addEventListener(this.validationTriggerEvent, this.checkStateOnSubmit);
        }
        document.addEventListener('wertgarantie-product-added', () => {
            this.displayComponent();
        });
    }

    checkStateOnSubmit(e) {
        if (!this.isFullyChecked() && this.showComponent) {
            this.showPriceChangedWarning = false;
            this.showUncheckedWarning = true;
            this.flashMessage = this.confirmationPrompt;
            e.target.scrollIntoView();
            e.preventDefault();
            return false;
        }
    }

    isFullyChecked() {
        return this.termsAndConditionsConfirmed;
    }

    async fetchConfirmationComponentData() {
        const url = new URL(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/confirmation`);
        const response = await fetchBifrost(url, 'PUT', this.componentVersion, {
            shopShoppingCart: this.shopOrderBase64
        });

        if (response.status !== 200) {
            return undefined;
        }

        return response.body;
    }

    productDataAvailable(fetchedConfirmationComponentData) {
        if (!fetchedConfirmationComponentData ||
            fetchedConfirmationComponentData.constructor !== Object ||
            Object.entries(fetchedConfirmationComponentData).length === 0 ||
            fetchedConfirmationComponentData.orders.length === 0) {
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

    renderProductPanel(classAttribute, order) {
        const productDivClassList = {
            "product": true,
            "product--selected": true,
            "product--even": this.selectedProductIndex % 2 === 0,
            "product--odd": this.selectedProductIndex % 2 !== 0
        };

        const productDivStyleMap = {
            "--image-link": "url(" + order.productBackgroundImageLink + ")"
        };

        return html`
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css">
            <div class="${classAttribute}">
                <div class=${classMap(productDivClassList)}
                     style=${styleMap(productDivStyleMap)}>
                    <div>
                        <span class="payment-interval product__price-info--small">${order.paymentInterval}</span><br>
                        <span class="product-price product__price-info--strong">${order.price}</span><br>
                        <span class="product-tax product__price-info--small">${order.includedTax}</span>
                    </div>
                    <div>
                        <div class="product__title">
                            ${order.productTitle}
                        </div>
                        <div class="product__advantages">
                        ${order.top3.map(advantage => html`
                            <div class="product__advantage">
                                <div class="advantage__icon-container">
                                    <!-- font awesome check icon -->
                                    <svg class="advantage__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="icon__svg--white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                </div>
                                <div class="advantage__text-container">
                                    ${advantage}
                                </div>
                            </div>
                           `)}
                        </div>
                        <div class="product-link">
                            <a class="wg-link" href="${order.IPIDUri}">${order.IPIDText}</a>
                        </div>
                    </div>
                </div>
            </div>
       `;
    }

    toggleTermsAndConditionsConfirmation(event) {
        if (event.target.checked) {
            this.clearWarnings();
            return this.sendToggelTermsAndConditionsConfirmationRequest('PUT');
        } else {
            return this.sendToggelTermsAndConditionsConfirmationRequest('DELETE');
        }
    }

    async sendToggelTermsAndConditionsConfirmationRequest(method) {
        const url = `${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/confirmation/termsAndConditionsConfirmed`;
        const response = await fetchBifrost(url, method, this.componentVersion);
        if (response.status === 200) {
            this.termsAndConditionsConfirmed = !this.termsAndConditionsConfirmed;
        }
    }


    async deleteProductOrder(product) {
        const url = new URL(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/confirmation/product`);

        const result = await fetchBifrost(url, 'DELETE', this.componentVersion, {
            orderId: product.orderId
        });
        if (result.status === 200) {
            this.setProperties(result.body)
        } else if (result.status === 204) {
            this.showComponent = false
        }
    }


    renderTab(order, index) {
        const tabClassList = {
            "tab": true,
            "tab--selected": index === this.selectedProductIndex,
            "tab--warning": order.updated && this.showPriceChangedWarning
        };
        return html`
            <div class="${classMap(tabClassList)}" @click="${() => this.selectedProductIndex = index}">
                <div class="tab__name">${order.shopProductShortName}</div>
                <div class="tab__remove"
                     @click="${() => this.deleteProductOrder(order)}">
                    ×
                </div>
            </div>
        `
    }

    clearWarnings() {
        this.flashMessage = undefined;
        this.showPriceChangedWarning = false;
        this.showUncheckedWarning = false;
    }

    renderFlashMessage() {
        return this.flashMessage
            ? html`
                    <div class="flash-message">${this.flashMessage}</div>
        ` : html``;
    }

    renderComponent() {
        const termsAndConditionsCheckboxClassList = {
            "checkbox__container": true,
            "confirmation--unchecked": !this.termsAndConditionsConfirmed && this.showUncheckedWarning
        };
        return html`
            <!--
            Font Awesome Free by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
            -->
            <div class="component">
                <section class="info">
                    <div class="header">
                        <div class="header__icon">
                            <!-- Font Awesome shield icon: -->
                            <svg class="icon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="icon__svg--white" d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"/></svg>
                        </div>
                        <div class="header__title">
                            ${this.title}
                        </div>
                    </div>
                    <div class="product__tabs">
                    ${this.orders.map((order, index) => this.renderTab(order, index))}
                    </div>
                    ${this.renderProductPanel('product__panel--mobile', this.orders[this.selectedProductIndex])}
                    <div class="confirmation__section">
                        <div class="confirmation__header" id="please-confirm-text">${this.subtitle}</div>
                        <div class="confirmation__input">
                            <div class="confirmation__row">
                                <div class="confirmation__checkbox-column">
                                    <div class=${classMap(termsAndConditionsCheckboxClassList)}>
                                        <input @click="${event => this.toggleTermsAndConditionsConfirmation(event)}" class="confirmation" id="confirmation_check" type="checkbox" ?checked="${this.termsAndConditionsConfirmed}">
                                    </div>
                                </div>
                                <div class="confirmation__text" id="general-confirmation-text">${unsafeHTML(this.confirmationTextTermsAndConditions)}</div>
                            </div>
                        </div>
                    </div>
                    ${this.renderFlashMessage()}
                </section>
                ${this.renderProductPanel('product__panel', this.orders[this.selectedProductIndex])}
            </div>
        
        `;
    }

    render() {
        if (!this.showComponent) {
            return html``;
        }
        //language=HTML
        return (this.boxTitle) ?
            html`
            <div class="box">
                <div class="box__title">
                    <span class="box__title--text">${this.boxTitle}</span>
                </div>
               ${this.renderComponent()}
            </div> `
            : this.renderComponent();
    }
}

class UndefinedConfirmationDataError extends Error {
}

if (!customElements.get('wertgarantie-confirmation')) {
    customElements.define('wertgarantie-confirmation', WertgarantieConfirmation);
}
