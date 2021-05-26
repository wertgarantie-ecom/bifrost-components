import {LitElement, html} from 'lit-element';
import {confirmationStyling} from './confirmation-styling';
import {confirmationStylingTabs} from "./confirmation-styling-tabs";
import {confirmationStylingAdvantages} from "./confirmation-styling-advantages";
import fetchBifrost from "wertgarantie-common/dist/fetchBifrost";
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
            orders: {type: Object},
            selectedProductIndex: {type: Number},
            confirmations: {type: Object},

            showUncheckedWarning: {type: Boolean},
            showPriceChangedWarning: {type: Boolean},

            flashMessage: {type: String},

            priceChangedWarning: {type: String},
            boxTitle: {type: String},
            title: {type: String},
            subtitle: {type: String},
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
        this.setProperties = this.setProperties.bind(this);
        this.checkStateOnSubmit = this.checkStateOnSubmit.bind(this);
        this.isFullyChecked = this.isFullyChecked.bind(this);
        this.check = this.check.bind(this);
        this.fetchConfirmationComponentData = this.fetchConfirmationComponentData.bind(this);
        this.productDataAvailable = this.productDataAvailable.bind(this);
        this.deleteProductOrder = this.deleteProductOrder.bind(this);
        this.displayComponent = this.displayComponent.bind(this);
        this.renderTab = this.renderTab.bind(this);
        this.renderBoxTitle = this.renderBoxTitle.bind(this);
        this.clearWarnings = this.clearWarnings.bind(this);
        this.toggleConfirmation = this.toggleConfirmation.bind(this);
        this.sendToggleConfirmationRequest = this.sendToggleConfirmationRequest.bind(this);
    }


    connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute('data-bifrost-uri') || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.clientId = this.getAttribute('data-client-id');
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
        this.confirmations = data.confirmations;
        this.showUncheckedWarning = false;

        this.flashMessage = this.showPriceChangedWarning ? this.priceChangedWarning : undefined;
    }

    initListeners() {
        if (this.validationTriggerSelector) {
            const elements = document.querySelectorAll(this.validationTriggerSelector);
            if (elements.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].addEventListener(this.validationTriggerEvent, this.checkStateOnSubmit);
                }
            } else {
                console.warn(`validation trigger configuration invalid. Couldn't find specified element: ${this.validationTriggerSelector}`)
            }
        }
        document.addEventListener('wertgarantie-shopping-cart-updated', () => {
            this.displayComponent();
        });
    }

    check() {
        if (!this.isFullyChecked() && this.showComponent) {
            this.showPriceChangedWarning = false;
            this.showUncheckedWarning = true;
            this.flashMessage = this.confirmationPrompt;
            this.scrollIntoView();
            return false;
        } else {
            return true;
        }
    }

    checkStateOnSubmit(e) {
        if (!this.check()) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        } else {
            return true;
        }
    }

    isFullyChecked() {
        let allChecked = true;
        const checkboxes = this.shadowRoot.querySelectorAll('.confirmation');
        for (var i = 0; i < checkboxes.length; i++) {
            if (!checkboxes[i].checked) {
                allChecked = false;
            }
        }
        return allChecked;
    }

    async fetchConfirmationComponentData() {
        const url = new URL(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/confirmation`);
        const response = await fetchBifrost(url, 'PUT', {
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
            "product--primary": order.backgroundStyle === "primary",
            "product--secondary": order.backgroundStyle === "secondary"
        };

        const productDivStyleMap = {
            "--image-link": "url(" + order.productImageLink + ")"
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

    toggleConfirmation(event, confirmationName) {
        if (event.target.checked) {
            if (this.isFullyChecked()) {
                this.clearWarnings();
            }
            return this.sendToggleConfirmationRequest('PUT', confirmationName);
        } else {
            return this.sendToggleConfirmationRequest('DELETE', confirmationName);
        }
    }

    async sendToggleConfirmationRequest(method, confirmationName) {
        const url = `${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/confirmation/${confirmationName}`;
        const response = await fetchBifrost(url, method);
        if (response.status === 200) {
            if (this.confirmations[confirmationName] !== undefined) {
                this.confirmations[confirmationName] = !this.confirmations[confirmationName];
            } else {
                this.confirmations.furtherConfirmations.map(conf => {
                    if (conf.name === confirmationName) {
                        conf.confirmed = !conf.confirmed;
                    }
                });
            }
        }
    }


    async deleteProductOrder(product) {
        const url = new URL(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/confirmation/product`);

        const result = await fetchBifrost(url, 'DELETE', {
            orderId: product.orderId
        });
        if (result.status === 200) {
            this.setProperties(result.body)
        } else if (result.status === 204) {
            this.showComponent = false
        }
        const event = new CustomEvent('wertgarantie-product-deleted', {
            detail: {
                orderId: product.orderId
            }
        });
        document.dispatchEvent(event);
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

    getCheckboxClassList(confirmed) {
        return {
            "checkbox__container": true,
            "confirmation--unchecked": !confirmed && this.showUncheckedWarning
        }
    }

    render() {
        return this.showComponent
            ? html`
            <!--
            Font Awesome Free by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
            -->
            <div class="box">
            ${this.renderBoxTitle()}
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
                                    <div class=${classMap(this.getCheckboxClassList(this.confirmations.termsAndConditionsConfirmed))}>
                                        <input @click="${event => this.toggleConfirmation(event, 'termsAndConditionsConfirmed')}" class="confirmation" type="checkbox" ?checked="${this.confirmations.termsAndConditionsConfirmed}">
                                    </div>
                                </div>
                                <div class="confirmation__text">${unsafeHTML(this.confirmations.confirmationTextTermsAndConditions)}</div>
                            </div>
                            ${this.confirmations.furtherConfirmations.map(confirmation => html`
                                <div class="confirmation__row">
                                    <div class="confirmation__checkbox-column">
                                        <div class=${classMap(this.getCheckboxClassList(confirmation.confirmed))}>
                                            <input @click="${event => this.toggleConfirmation(event, confirmation.name)}" class="confirmation" type="checkbox" ?checked="${confirmation.confirmed}">
                                        </div>
                                    </div>
                                    <div class="confirmation__text">${unsafeHTML(confirmation.confirmationText)}</div>
                                </div>`
            )}
                        </div>
                    </div>
                    ${this.renderFlashMessage()}
                </section>
                ${this.renderProductPanel('product__panel', this.orders[this.selectedProductIndex])}
            </div>
        </div>
        `
            : html``;
    }

    renderBoxTitle() {
        //language=HTML
        return (this.boxTitle) ?
            html`
                <div class="box__title">
                    <span class="box__title--text">${this.boxTitle}</span>
                </div>
            `
            : html``;
    }
}

class UndefinedConfirmationDataError extends Error {
}

if (!customElements.get('wertgarantie-confirmation')) {
    customElements.define('wertgarantie-confirmation', WertgarantieConfirmation);
}
