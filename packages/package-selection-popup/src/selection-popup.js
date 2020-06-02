import {LitElement, html} from 'lit-element';
import '../../package-rating/dist/rating.min.js';
import fetchBifrost from "../../../shared-code/fetchBifrost";
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from 'lit-html/directives/style-map';
import {selectionPopUpStyling} from "./selection-popup-styling";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import initSentry from "../../../shared-code/sentry";

const MOBILE_WIDTH = 878;
const DISPLAY_MODES = {
    button: "button",
    self: "self",
    trigger: "trigger"
}

class WertgarantieSelectionPopUp extends LitElement {

    static get styles() {
        return selectionPopUpStyling;
    }

    static get properties() {
        return {
            showComponent: {type: Boolean},
            displayMode: {type: String},
            displayModeButtonSelector: {type: String},
            showDetails: {type: Boolean},
            selectedProductIndex: {type: Number},
            focusedProductIndex: {type: Number},
            mobileView: {type: Boolean},

            devicePrice: {type: Number},
            deviceClass: {type: String},
            bifrostUri: {type: String},
            shopProductName: {type: String},
            clientId: {type: String},

            showPopUp: {type: Boolean},
            showDisplayButton: {type: Boolean},
            title: {type: String},
            subtitle: {type: String},
            footerHtml: {type: String},
            partnerShop: {type: String},
            detailsHeader: {type: String},
            furtherInformation: {type: String},
            wertgarantieFurtherInfoHtml: {type: String},
            showDetailsText: {type: String},
            hideDetailsText: {type: String},
            cancelButtonText: {type: String},
            confirmButtonText: {type: String},
            displayButtonText: {type: String},

            products: {type: Array}
        };
    }

    constructor() {
        super();
        this.initialized = false;
        this.componentVersion = '2.0.30';

        // method binding
        this.setProperties = this.setProperties.bind(this);
        this.fetchPolicy = this.fetchPolicy.bind(this);
        this.displayComponent = this.displayComponent.bind(this);
        this.createMobileProductSelectionButton = this.createMobileProductSelectionButton.bind(this);
        this.createProductDiv = this.createProductDiv.bind(this);
        this.createMobileProductSelectionButton = this.createMobileProductSelectionButton.bind(this);
        this.addProductToShoppingCart = this.addProductToShoppingCart.bind(this);
        this.updateMobileFocusIndex = this.updateMobileFocusIndex.bind(this);
        this.fadeout = this.fadeout.bind(this);
        this.setDefaults = this.setDefaults.bind(this);
        this.checkForMobileFocusUpdate = this.checkForMobileFocusUpdate.bind(this);
        this.renderAdvantage = this.renderAdvantage.bind(this);
        this.checkConfiguration = this.checkConfiguration.bind(this);
        this.cancelPopUp = this.cancelPopUp.bind(this);
        this.renderDisplayButton = this.renderDisplayButton.bind(this);
        this.renderPopUp = this.renderPopUp.bind(this);
        this.getSelectedProductText = this.getSelectedProductText.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.clientId = this.getAttribute("data-client-id");
        initSentry('selection-pop-up', this.componentVersion, this.bifrostUri, this.clientId);
        this.devicePrice = parseInt(this.getAttribute("data-device-price"));
        const quantity = this.getAttribute("data-quantity");
        this.quantity = quantity ? parseInt(quantity) : 1;
        this.deviceClass = this.getAttribute("data-device-class");
        this.landingPageUri = this.getAttribute("data-landing-page-uri") || "https://www.wertgarantie.de";
        this.model = this.getAttribute("data-product-model");
        this.orderItemId = this.getAttribute("data-order-item-id") || undefined;
        this.displayMode = DISPLAY_MODES[this.getAttribute('data-display-mode')] || DISPLAY_MODES.trigger;
        this.displayModeButtonSelector = this.getAttribute('data-display-mode-button-selector');
        this.displayModeButtonSelectionTriggerEvent = this.getAttribute('data-display-mode-button-selection-trigger-event') || 'submit';
        this.mobileView = window.innerWidth <= MOBILE_WIDTH;
        this.setDefaults();
        window.addEventListener('resize', () => {
            this.checkForMobileFocusUpdate();
            if ((window.innerWidth <= MOBILE_WIDTH && !this.mobileView) || (window.innerWidth > MOBILE_WIDTH && this.mobileView)) {
                this.mobileView = !this.mobileView;
            }
        });

        switch (this.displayMode) {
            case DISPLAY_MODES.button:
                this.showDisplayButton = true;
                this.showPopUp = false;
                document.querySelector(this.displayModeButtonSelector).addEventListener(this.displayModeButtonSelectionTriggerEvent, (event) => {
                    if (this.selectedProductIndex >= 0) {
                        this.addProductToShoppingCart().catch((e) => console.error(e));

                    }
                    return true;
                });
                this.displayComponent();
                break;
            case DISPLAY_MODES.self:
                this.showDisplayButton = false;
                this.showPopUp = true;
                this.displayComponent();
                break;
            case DISPLAY_MODES.trigger:
                this.showDisplayButton = false;
                this.showPopUp = true;
                this.triggerDisplay = () => {
                    this.showPopUp = true;
                    this.displayComponent();
                };
                this.triggerDisplay = this.triggerDisplay.bind(this);
                break;
            default:
                throw new Error(`unsupported data-display-mode: ${this.displayMode}, supported modes: ${DISPLAY_MODES}`)
        }
    }

    setDefaults() {
        this.showComponent = false;
        this.showDetails = false;
        this.selectedProductIndex = -1;
        this.focusedProductIndex = this.selectedProductIndex;
        this.checkForMobileFocusUpdate();
    }

    setProperties(responseData) {
        if (!responseData) {
            this.showComponent = false;
            return;
        }
        const products = responseData.products.map(product => {
            product.displayAttributes = {
                isSelected: false
            };
            return product;
        });

        this.title = responseData.texts.title;
        this.subtitle = responseData.texts.subtitle;
        this.footerHtml = responseData.texts.footerHtml;
        this.partnerShop = responseData.texts.partnerShop;
        this.detailsHeader = responseData.texts.detailsHeader;
        this.furtherInformation = responseData.texts.furtherInformation;
        this.wertgarantieFurtherInfoHtml = responseData.texts.wertgarantieFurtherInfoHtml;
        this.showDetailsText = responseData.texts.showDetailsText;
        this.hideDetailsText = responseData.texts.hideDetailsText;
        this.cancelButtonText = responseData.texts.cancelButtonText;
        this.confirmButtonText = responseData.texts.confirmButtonText;
        this.displayButtonText = responseData.texts.displayButtonText || 'Extra Schutz? Jetzt direkt prüfen.';
        this.products = products;

        this.showComponent = true;
    }

    displayComponent() {
        if (this.quantity !== 1) {
            this.showComponent = false;
            return;
        }

        this.checkConfiguration();

        this.fetchPolicy()
            .then(this.setProperties)
            .catch(console.error);
    }

    checkConfiguration() {
        if (!(this.bifrostUri && this.devicePrice && this.deviceClass && this.clientId && this.model)) {
            this.remove();
            throw new Error("fetch data incomplete\n" +
                "bifrostUri: " + this.bifrostUri + "\n" +
                "clientId: " + this.clientId + "\n" +
                "devicePrice: " + this.devicePrice + "\n" +
                "deviceClass: " + this.deviceClass + "\n" +
                "model: " + this.model
            );
        }
    }

    async fetchPolicy() {
        const url = new URL(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-popup`);
        const response = await fetchBifrost(url, 'PUT', this.componentVersion, {
            devicePrice: this.devicePrice,
            deviceClass: this.deviceClass,
            clientId: this.clientId,
            orderItemId: this.orderItemId
        });
        if (response.status === 204) {
            return undefined;
        }
        if (response.status !== 200) {
            throw new Error(`invalid bifrost response: ${response.status}`);
        }
        return response.body;
    }

    render() {
        return (this.showComponent)
            ? html`
            ${this.renderDisplayButton()}
            ${this.renderPopUp()} `
            : html``;
    }

    renderPopUp() {
        const orderButtonClassList = {
            "button": true,
            "button--dark": true,
            "order-button": true,
            "order-button--inactive": this.selectedProductIndex === -1
        };

        const productDetailsFooterClassList = {
            "product__details-footer": true,
            "product__details-footer--expanded": this.showDetails
        };
        return this.showPopUp
            ? html`
             <!--
            Font Awesome Free by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
            -->
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css">
                <div class="modal" id="modal">
                    <div class="content">
                        <div class="head">
                            <div class="head__left">
                                <strong class="head__title">${this.title}</strong>
                                <wertgarantie-rating class="wg-rating-default"
                                                     data-bifrost-uri="${this.bifrostUri}"
                                                     data-disable-rating-number="true">
                                </wertgarantie-rating>
                            </div>
                            <div class="head__right">
                                <span @click="${() => this.cancelPopUp()}" class="closeBtn" id="closeBtn">×</span>
                            </div>
                        </div>
                        <p class="head__subtitle">${this.subtitle}</p>
                        <section class="product-selectors" id="product-selectors">
                            ${this.products.map(this.createMobileProductSelectionButton)}
                        </section>
                        <section class="product-offers" id="products">
                            ${this.products.map(this.createProductDiv)}
                        </section>
                        <section class=${classMap(productDetailsFooterClassList)}>
                            <div>
                                <p>${unsafeHTML(this.wertgarantieFurtherInfoHtml.replace("%s", this.landingPageUri))}</p>
                            </div>
                            <div>
                                <p>${unsafeHTML(this.footerHtml)}</p>
                            </div>

                            <div class="award-image-block">
                                <a target="_blank" href="https://www.certipedia.com/quality_marks/9105052129">
                                    <img class="award-image"
                                         src="https://www.wertgarantie.de/portaldata/4/resources/Icons/tuev-logo.png"
                                         alt="tuev-logo">
                                     </a>
                                <a target="_blank" href="https://www.wertgarantie.de/Home.aspx#">
                                    <img class="award-image"
                                         src="https://www.wertgarantie.de/Portaldata/4/Resources/logos/test-bild-wertgarantie-109-01.png"
                                         alt="test-bild">
                                </a>
                            </div>
                        </section>
                        <section class="button-section">
                            <div class="button-section__details-cancel">
                                <button @click="${() => this.toggleDetailsExpansion()}" class="button button--light" id="detailsBtn">${this.showDetails ? this.hideDetailsText : this.showDetailsText}</button>
                                <button @click="${() => this.cancelPopUp()}" class="button button--light" id="cancelOrder">${this.cancelButtonText}</button>
                            </div>
                            <div class="button-section__order">
                                <button @click="${() => this.displayMode === DISPLAY_MODES.button ? this.preOrderProduct() : this.addProductToShoppingCart()}" class=${classMap(orderButtonClassList)} id="orderBtn"
                                        ?disabled=${this.selectedProductIndex === -1}>${this.confirmButtonText}
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            `
            : html``;
    }

    async preOrderProduct() {
        // fetch uri with different path for POST call to set cookie
        const selectedProduct = this.products[this.selectedProductIndex];
        if (!(this.bifrostUri && this.devicePrice && this.deviceClass && this.model && selectedProduct.id && selectedProduct.name && this.clientId)) {
            this.fadeout();
            throw new Error("order data incomplete: \n" +
                "bifrostUri: " + this.bifrostUri + "\n" +
                "devicePrice: " + this.devicePrice + "\n" +
                "deviceClass: " + this.deviceClass + "\n" +
                "clientId: " + this.clientId + "\n" +
                "selectedProductId: " + selectedProduct.id + "\n" +
                "selectedProductName: " + selectedProduct.name + "\n" +
                "shopProductName: " + this.model
            );
        }
        try {
            const response = await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/shoppingCart/preOrder`, 'POST', this.componentVersion, {
                shopProduct: {
                    price: this.devicePrice,
                    deviceClass: this.deviceClass,
                    model: this.model,
                    orderItemId: this.orderItemId
                },
                wertgarantieProduct: {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    paymentInterval: selectedProduct.intervalCode,
                    price: selectedProduct.price
                }
            });
            if (response.status !== 200) {
                console.error('Adding product to shopping cart failed:', response);
                return {};
            }
            this.fadeout();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    createMobileProductSelectionButton(product, idx) {
        const buttonClasses = {
            "product-selectors__button": true,
            "product-selectors__button--selected": idx === this.selectedProductIndex
        };
        return html`
            <button @click="${() => this.updateMobileFocusIndex(idx)}" class=${classMap(buttonClasses)}>${product.name}</button>
        `;
    }

    renderDisplayButton() {
        return this.displayMode === DISPLAY_MODES.button
            ? html` <button @click="${() => this.showPopUp = true}">${this.selectedProductIndex >= 0 ? this.getSelectedProductText() : this.displayButtonText}</button> `
            : html``;
    }

    getSelectedProductText() {
        return this.products[this.selectedProductIndex].name + " ausgewählt";
    }

    createProductDiv(product, idx) {
        const productDivClassList = {
            "product": true,
            "product--focused": this.isFocused(idx),
            "product--focused--mobile": this.isFocused(idx),
            "product--focused-left": this.isFocused(idx) && idx % 2 === 0,
            "product--focused-right": this.isFocused(idx) && idx % 2 !== 0,
            "product--unfocused": !this.isFocused(idx) && this.focusedProductIndex !== -1
        };
        const productHeadClassList = {
            "product__head--background": true,
            "product__head--background-even": idx % 2 === 0,
            "product__head--background-odd": idx % 2 !== 0
        };
        const productDetailsClassList = {
            "product__details": true,
            "product__details--expanded": this.showDetails,
            "product__details-footer--expanded": this.showDetails
        };
        const selectionCircleClassList = {
            "product__selection--visible": this.selectedProductIndex === idx,
            "product__selection--invisible": this.selectedProductIndex !== idx
        };
        const productImageLinkStyleList = {
            "--image-link": "url(" + product.imageLink + ")"
        };
        //language=HTML
        return html`
            <div @click="${() => {
            if (!this.mobileView) this.updateSelectedProductIndex(idx);
        }}"
                 @mouseover="${() => this.focusedProductIndex = idx}"
                 @mouseleave="${() => this.focusedProductIndex = this.selectedProductIndex}"
                 class=${classMap(productDivClassList)}>
                <div class=${classMap(productHeadClassList)} style=${styleMap(productImageLinkStyleList)}>
                    <div class="product__base-info">
                        <div class="product__base-info--top">
                            <div class="product__base-info--top-left">
                                <small class="payment-interval">${product.paymentInterval}</small><br>
                                <strong class="price-display">${product.priceFormatted}</strong><br>
                                <small class="tax-display">${product.taxFormatted}</small>
                            </div>
                            ${!this.mobileView ? html`
                                <div class="product__base-info--top-right">
                                    <div class="product__selection">
                                        <div class=${classMap(selectionCircleClassList)}>
                                            <!-- Font Awesome check icon -->
                                            <svg class="selection__checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="icon__svg--top3" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            ` : html``}
                        </div>
                        <div class="product__base-info--bottom">
                            <div class="product__title">${product.name}</div>
                            <div class="product__advantages">
                                ${product.top3.map(adv => this.renderAdvantage(adv, true))}
                            </div>
                        </div>
                    </div>
                </div>
                <div class=${classMap(productDetailsClassList)}>
                    <div class="details__title">${this.detailsHeader}</div>
                    <div class="product__advantages product__advantages--details">
                        ${product.advantages.map(adv => this.renderAdvantage(adv, false))}
                    </div>
                    <div class="product__terms">
                        <div>
                            <p><strong>${this.furtherInformation}</strong></p>
                            <a target="_blank" class="wg-link wg-infosheet-link wg-product-info-sheet"
                               href="${product.IPIDUri}">${product.IPIDText}</a><br>
                            <a target="_blank" class="wg-link wg-infosheet-link wg-avb"
                               href="${product.GTCIUri}">${product.GTCIText}</a>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    renderAdvantage(advantage, isTop3) {
        if (advantage.included) {
            return html`
                <div class="advantage advantage--included">
                    <div class="advantage__icon-container">
                        <!-- Font Awesome check icon-->
                        <svg class="advantage__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class=${isTop3 ? "icon__svg--top3" : "icon__svg--included"} d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                    </div>
                    <div class="advantage__text-container">
                        ${advantage.text}
                    </div>
                </div>`;
        }
        return html`
            <div class="advantage advantage--excluded">
                <!-- Font Awesome ban icon-->
                <div class="advantage__icon-container">
                    <svg class="advantage__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="icon__svg--excluded" d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"/></svg>
                </div>        
                <div class="advantage__text-container">                        
                    ${advantage.text}
                </div>
            </div>`;
    }

    checkForMobileFocusUpdate() {
        if (window.innerWidth <= MOBILE_WIDTH && this.focusedProductIndex === -1) {
            this.updateMobileFocusIndex(0);
        }
    }

    updateMobileFocusIndex(idx) {
        this.selectedProductIndex = idx;
        this.focusedProductIndex = idx;
    }

    toggleDetailsExpansion() {
        this.showDetails = !this.showDetails;
    }

    updateSelectedProductIndex(idx) {
        if (this.selectedProductIndex === idx) {
            this.selectedProductIndex = -1;
        } else {
            this.selectedProductIndex = idx;
        }
    }

    isFocused(idx) {
        return this.focusedProductIndex === idx;
    }

    async addProductToShoppingCart() {
        // fetch uri with different path for POST call to set cookie
        const selectedProduct = this.products[this.selectedProductIndex];
        if (!(this.bifrostUri && this.devicePrice && this.deviceClass && this.model && selectedProduct.id && selectedProduct.name && this.clientId)) {
            this.fadeout();
            throw new Error("order data incomplete: \n" +
                "bifrostUri: " + this.bifrostUri + "\n" +
                "devicePrice: " + this.devicePrice + "\n" +
                "deviceClass: " + this.deviceClass + "\n" +
                "clientId: " + this.clientId + "\n" +
                "selectedProductId: " + selectedProduct.id + "\n" +
                "selectedProductName: " + selectedProduct.name + "\n" +
                "shopProductName: " + this.model
            );
        }
        try {
            const response = await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/shoppingCart/`, 'POST', this.componentVersion, {
                shopProduct: {
                    price: this.devicePrice,
                    deviceClass: this.deviceClass,
                    model: this.model,
                    orderItemId: this.orderItemId
                },
                wertgarantieProduct: {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    paymentInterval: selectedProduct.intervalCode,
                    price: selectedProduct.price
                }
            });
            if (response.status !== 200) {
                console.error('Adding product to shopping cart failed:', response);
                return {};
            }
            document.dispatchEvent(new Event('wertgarantie-product-added'));
            this.fadeout();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async cancelPopUp() {
        await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-popup/cancel`, 'POST', this.componentVersion);
        this.fadeout();
    }


    fadeout() {
        const fadeTarget = this.shadowRoot.getElementById('modal');
        const self = this;
        const fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.05;
            } else {
                clearInterval(fadeEffect);
                self.showPopUp = false;
            }
        }, 20);
    }
}

if (!customElements.get('wertgarantie-selection-pop-up')) {
    customElements.define('wertgarantie-selection-pop-up', WertgarantieSelectionPopUp);
}
