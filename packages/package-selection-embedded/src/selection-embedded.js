import {LitElement, html} from "lit-element";
import fetchBifrost from "../../package-common/src/fetchBifrost";
import {
    saveProductSelection,
    findProductSelection,
    deleteProductSelection
} from "../../package-common/src/wertgarantieShoppingCartRepository";
import '../../package-rating/dist/rating.min.js';
import initSentry from "../../package-common/src/sentry";
import {selectionEmbeddedStyling} from "./selection-embedded-styling";
import {selectionEmbeddedProductPanelStyling} from "./selection-embedded-product-panel-styling";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {classMap} from "lit-html/directives/class-map";
import {styleMap} from "lit-html/directives/style-map";


class WertgarantieSelectionEmbedded extends LitElement {

    static get styles() {
        return [
            selectionEmbeddedStyling,
            selectionEmbeddedProductPanelStyling
        ];
    }

    static get properties() {
        return {
            showComponent: {type: Boolean},
            title: {type: String},
            wertgarantieFurtherInfoHtml: {type: String},
            includedTax: {type: String},

            products: {type: Object},
            displayedProductInfoPanelIndex: {type: Number},
            selectedProductIndex: {type: Number},

            productPanelTitle: {type: String},
            productPanelDetailsHeader: {type: String},
            productFurtherInformation: {type: String}
        };
    }

    constructor() {
        super();

        // method binding
        this.displayComponent = this.displayComponent.bind(this);
        this.fetchSelectionData = this.fetchSelectionData.bind(this);
        this.setProperties = this.setProperties.bind(this);
        this.renderProductInfoPanel = this.renderProductInfoPanel.bind(this);
        this.renderAdvantage = this.renderAdvantage.bind(this);
        this.renderProductTag = this.renderProductTag.bind(this);
        this.updateSelectedProductIndex = this.updateSelectedProductIndex.bind(this);
        this.allDataAvailable = this.allDataAvailable.bind(this);
        this.addProductToShoppingCart = this.addProductToShoppingCart.bind(this);
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
        this.productBaseIdentifier = this.getAttribute("data-product-base-identifier");
        this.completeProductName = this.getAttribute("data-complete-product-name");
        this.selectionTriggerElementIdentifier = this.getAttribute('data-product-selection-trigger-element-identifier');
        this.selectionTriggerEvent = this.getAttribute('data-product-selection-trigger-event');
        this.showComponent = false;
        this.displayedProductInfoPanelIndex = -1;
        this.selectedProductIndex = -1;
        this.displayComponent();
    }

    displayComponent() {
        this.fetchSelectionData()
            .then(this.setProperties)
            .then(() => this.showComponent = true)
            .catch(() => this.showComponent = false)
    }

    allDataAvailable() {
        const selectionTriggerExists = document.querySelector(this.selectionTriggerElementIdentifier);
        return selectionTriggerExists && this.devicePrice && this.deviceClass && this.clientId && this.productBaseIdentifier && this.completeProductName && this.selectionTriggerEvent;
    }

    async fetchSelectionData() {
        if (!this.allDataAvailable()) {
            const errorMessage = `component data incomplete: 
                ${JSON.stringify({
                deviceClass: this.deviceClass,
                devicePrice: this.devicePrice,
                clientId: this.clientId,
                productBaseIdentifier: this.productBaseIdentifier,
                completeProductName: this.completeProductName,
                selectionTriggerElementIdentifier: this.selectionTriggerElementIdentifier,
                selectionTriggerEvent: this.selectionTriggerEvent
            }, null, 2)}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        const url = `${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/`;
        const result = await fetchBifrost(url, 'PUT', this.componentVersion, {
            deviceClass: this.deviceClass,
            devicePrice: this.devicePrice
        });
        return result.body;
    }

    async setProperties(selectionData) {
        this.title = selectionData.texts.title;
        this.wertgarantieFurtherInfoHtml = selectionData.texts.wertgarantieFurtherInfoHtml.replace("%s", this.landingPageUri);
        this.includedTax = selectionData.texts.includedTax;
        this.footerHtml = selectionData.texts.footerHtml;

        this.productPanelTitle = selectionData.texts.productPanelTitle;
        this.productPanelDetailsHeader = selectionData.texts.productPanelDetailsHeader;
        this.productFurtherInformation = selectionData.texts.productFurtherInformation;

        this.products = selectionData.products;

        this.selectedProductIndex = await findProductSelection(this.productBaseIdentifier);

        document.querySelector(this.selectionTriggerElementIdentifier).addEventListener(this.selectionTriggerEvent, async () => {
            await this.addProductToShoppingCart();
            await deleteProductSelection(this.productBaseIdentifier);
            return true;
        });
    }

    async updateSelectedProductIndex(idx) {
        const updatedProductSelection = {
            productId: this.products[idx].id,
            productName: this.products[idx].name,
            productIndex: idx,
            productBaseIdentifier: this.productBaseIdentifier
        };
        if (this.selectedProductIndex === idx) {
            await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/select`, "DELETE", this.componentVersion, updatedProductSelection);
            await deleteProductSelection(updatedProductSelection.productBaseIdentifier);
            this.selectedProductIndex = -1;
        } else {
            await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/select`, "POST", this.componentVersion, updatedProductSelection);
            await saveProductSelection(updatedProductSelection);
            this.selectedProductIndex = idx;
        }
        return;
    }

    fadeOut() {
        const fadeTarget = this.shadowRoot.querySelector('.product-modal');
        const self = this;
        const fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.05;
            } else {
                clearInterval(fadeEffect);
                self.displayedProductInfoPanelIndex = -1;
            }
        }, 20);
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

    renderProductInfoPanel(product, idx) {
        const productHeadClassList = {
            "product-card--background-even": idx % 2 === 0,
            "product-card--background-odd": idx % 2 !== 0
        };
        const productImageLinkStyleList = {
            "--image-link": "url(" + product.imageLink + ")"
        };
        //language=HTML
        return html`
            <div class="product-modal">
                <div class="content">
                    <div class="content__head header">
                        <div class="header__row">
                            <strong class="header__title">${this.productPanelTitle}</strong>
                            <span @click="${this.fadeOut}" class="closeBtn" id="closeBtn">×</span>
                        </div>
                        <div class="header__row">
                            <wertgarantie-rating class="wg-rating-default"
                                                 data-bifrost-uri="${this.bifrostUri}"
                                                 data-disable-rating-number="true">
                            </wertgarantie-rating>
                        </div>
                    </div>
                    <div class="content__product-card">
                        <div class=${classMap(productHeadClassList)} style=${styleMap(productImageLinkStyleList)}>
                            <div class="product-card__base-info">
                                <div class="product-card__base-info--top">
                                    <div class="product-card__base-info--top-left">
                                        <small class="payment-interval">${product.paymentInterval}</small><br>
                                        <strong class="price-display">${product.priceFormatted}</strong><br>
                                        <small class="tax-display">${product.taxFormatted}</small>
                                    </div>
                                </div>
                                <div class="product-card__base-info--bottom">
                                    <div class="product-card__title">${product.name}</div>
                                    <div class="product-card__advantages">
                                        ${product.top3.map(adv => this.renderAdvantage(adv, true))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content__details details">
                        <div class="details__title">
                            ${this.productPanelDetailsHeader}
                        </div>
                        <div class="product__advantages product__advantages--details">
                            ${product.advantages.map(adv => this.renderAdvantage(adv, false))}
                        </div>
                        <div class="product__footer-section">
                            <p><strong>${this.productFurtherInformation}</strong></p>
                            <a target="_blank" class="wg-link"
                               href="${product.IPIDUri}">${product.IPIDText}</a><br>
                            <a target="_blank" class="wg-link"
                               href="${product.GTCIUri}">${product.GTCIText}</a>
                        </div>
                        <div class="product__footer-section">
<!--                            <div class="trust-text">-->
<!--                                 <p>${unsafeHTML(this.footerHtml)}</p>-->
<!--                            </div>-->
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
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    render() {
        // <wertgarantie-rating class="head__rating"
        //                      data-bifrost-uri="${this.bifrostUri}"
        //                      data-disable-rating-number="true"
        //                      data-link-text=" ">
        // </wertgarantie-rating>
        return this.showComponent ? html`
            <!--
                Font Awesome Free by @fontawesome - https://fontawesome.com
                License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
            -->
        <div class="component">
            <div class="component__head head">
                <div class="head__title">
                    ${this.title}
                </div>
            </div>
            <div class="products">
                ${this.products.map((product, idx) => this.renderProductTag(idx, product)
        )}
            <div class="component__footer">
                ${this.includedTax}
            </div>
        </div>` : html``;
    }

    renderProductTag(idx, product) {
        const selectionClassList = {
            "selection": true,
            "product__selection": true,
            "product__selection--first": idx === 0,
            "product__selection--last": idx === (this.products.length - 1),
            "product__selection--selected": idx === this.selectedProductIndex

        };

        return html`
            <div class="products__product product">
                <div class="${classMap(selectionClassList)}" @click="${() => this.updateSelectedProductIndex(idx)}">
                    <div class="selection__overview overview">
                        <div class="overview__checkbox">
                            <!-- Font Awesome check icon -->
                            ${this.selectedProductIndex === idx ?
            html`<svg class="selection__checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`
            : html``}
                        </div>
                        <div class="overview__name">${product.shortName}</div>
                    </div>
                    <div class="selection__price">${product.priceFormatted + " / " + product.paymentInterval + "*"}</div>
                </div>
                <div class="selection__information-icon" @click="${() => this.displayedProductInfoPanelIndex = idx}">
                    <!-- Font Awesome info icon -->
                    <svg class="info-icon" aria-hidden="true" focusable="false" data-prefix="far" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path>
                    </svg>
                </div>
            </div>
            ${idx === this.displayedProductInfoPanelIndex ? this.renderProductInfoPanel(product, idx) : html``}`;
    }

    async addProductToShoppingCart() {
        if (this.selectedProductIndex === -1) {
            return {};
        }
        const selectedProduct = this.products[this.selectedProductIndex];
        if (!(this.bifrostUri && this.devicePrice && this.deviceClass && this.completeProductName && selectedProduct.id && selectedProduct.name && this.clientId)) {
            throw new Error("order data incomplete: \n" +
                "bifrostUri: " + this.bifrostUri + "\n" +
                "devicePrice: " + this.devicePrice + "\n" +
                "deviceClass: " + this.deviceClass + "\n" +
                "clientId: " + this.clientId + "\n" +
                "selectedProductId: " + selectedProduct.id + "\n" +
                "selectedProductName: " + selectedProduct.name + "\n" +
                "completeProductName: " + this.completeProductName
            );
        }
        try {
            const response = await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/shoppingCart/`, 'POST', this.componentVersion, {
                shopProduct: {
                    price: this.devicePrice,
                    deviceClass: this.deviceClass,
                    name: this.completeProductName,
                    orderItemId: this.orderItemId
                },
                wertgarantieProduct: {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    paymentInterval: selectedProduct.intervalCode,
                    price: selectedProduct.price,
                    deviceClass: selectedProduct.deviceClass,
                    shopDeviceClass: selectedProduct.shopDeviceClass
                }
            });
            if (response.status !== 200) {
                console.error('Adding product to shopping cart failed:', response);
                return {};
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

if (!customElements.get('wertgarantie-selection-embedded')) {
    customElements.define('wertgarantie-selection-embedded', WertgarantieSelectionEmbedded);
}