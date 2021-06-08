import {html, LitElement} from "lit-element";
import fetchBifrost from "wertgarantie-common/dist/fetchBifrost";
import {
    deleteProductSelection,
    findProductSelection,
    getShoppingCart,
    saveProductSelection
} from "wertgarantie-common/dist/wertgarantieShoppingCartRepository";
import 'wertgarantie-information-popup/dist/information-popup.min.js';
import {selectionEmbeddedStyling} from "./selection-embedded-styling";
import {classMap} from "lit-html/directives/class-map";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

const MOBILE_BREAKPOINT = 350;


class WertgarantieSelectionEmbedded extends LitElement {

    static get styles() {
        return [
            selectionEmbeddedStyling
        ];
    }

    static get properties() {
        return {
            showComponent: {type: Boolean},
            smallView: {type: Boolean},
            title: {type: String},
            wertgarantieFurtherInfoHtml: {type: String}, // used?
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
        this.renderProductTag = this.renderProductTag.bind(this);
        this.updateSelectedProductIndex = this.updateSelectedProductIndex.bind(this);
        this.allDataAvailable = this.allDataAvailable.bind(this);
        this.addProductToShoppingCart = this.addProductToShoppingCart.bind(this);
        this.deleteFromShoppingCart = this.deleteFromShoppingCart.bind(this);
        this.updateShoppingCart = this.updateShoppingCart.bind(this);
        this.checkForExistingProductSelection = this.checkForExistingProductSelection.bind(this);
        this.initEventListeners = this.initEventListeners.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.clientId = this.getAttribute("data-client-id");
        this.devicePrice = parseInt(this.getAttribute("data-device-price"));
        this.deviceClass = this.getAttribute("data-device-class") || undefined;
        this.deviceClasses = this.getAttribute("data-device-classes") || undefined;
        this.landingPageUri = this.getAttribute("data-landing-page-uri") || "https://www.wertgarantie.de"; // TODO: Used?
        this.productBaseIdentifier = this.getAttribute("data-product-base-identifier");
        this.completeProductName = this.getAttribute("data-complete-product-name");
        this.deviceCondition = this.getAttribute("data-device-condition") || undefined;
        this.orderItemId = this.getAttribute("data-order-item-id") || this.completeProductName;
        this.selectionTriggerElementIdentifier = this.getAttribute('data-product-selection-trigger-element-identifier');
        this.selectionTriggerEvent = this.getAttribute('data-product-selection-trigger-event');
        this.directSelectionMode = !this.selectionTriggerElementIdentifier;
        this.showComponent = false;
        this.displayedProductInfoPanelIndex = -1;
        this.selectedProductIndex = -1;
        this.currentOrderId = undefined;
        this.smallView = this.parentElement.clientWidth <= 350;
        this.initEventListeners();
        this.displayComponent();
    }

    initEventListeners() {
        document.addEventListener('wertgarantie-product-deleted', e => {
            if (e.detail.orderId === this.currentOrderId) {
                this.selectedProductIndex = -1;
                this.currentOrderId = undefined;
            }
        });
        window.addEventListener('resize', () => {
            if ((this.parentElement.clientWidth <= MOBILE_BREAKPOINT && !this.smallView) || (this.parentElement.clientWidth > MOBILE_BREAKPOINT && this.smallView)) {
                this.smallView = !this.smallView;
            }
        });
    }

    displayComponent() {
        this.fetchSelectionData()
            .then(this.setProperties)
            .catch((e) => {
                console.error(e);
                this.showComponent = false
            })
    }

    allDataAvailable() {
        if (this.directSelectionMode) {
            return this.devicePrice && (this.deviceClass || this.deviceClasses) && this.clientId && this.productBaseIdentifier && this.completeProductName;
        }
        const selectionTriggerExists = document.querySelector(this.selectionTriggerElementIdentifier);
        return selectionTriggerExists && this.devicePrice && (this.deviceClass || this.deviceClasses) && this.clientId && this.productBaseIdentifier && this.completeProductName && this.selectionTriggerEvent;
    }

    async fetchSelectionData() {
        if (!this.allDataAvailable()) {
            const errorContent = {
                deviceClass: this.deviceClass,
                devicePrice: this.devicePrice,
                clientId: this.clientId,
                deviceCondition: this.deviceCondition,
                productBaseIdentifier: this.productBaseIdentifier,
                completeProductName: this.completeProductName,
                directSelectionMode: this.directSelectionMode
            };
            if (!this.directSelectionMode) {
                errorContent.selectionTriggerElementIdentifier = this.selectionTriggerElementIdentifier;
                errorContent.selectionTriggerEvent = this.selectionTriggerEvent;
            }
            const errorMessage = `component data incomplete: 
                ${JSON.stringify(errorContent, null, 2)}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        const url = `${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/`;
        const result = await fetchBifrost(url, 'PUT', {
            deviceClasses: this.deviceClasses,
            deviceClass: this.deviceClass,
            devicePrice: this.devicePrice,
            deviceCondition: this.deviceCondition,
        });
        if (result.status === 204) {
            return undefined;
        }
        return result.body;
    }

    async setProperties(selectionData) {
        if (!selectionData) {
            this.showComponent = false;
            return;
        }
        this.title = selectionData.texts.title;
        this.wertgarantieFurtherInfoHtml = selectionData.texts.wertgarantieFurtherInfoHtml.replace("%s", this.landingPageUri); // TODO: Used?
        this.includedTax = selectionData.texts.includedTax;
        this.footerHtml = selectionData.texts.footerHtml; // TODO: Used?

        this.productPanelTitle = selectionData.texts.productPanelTitle;
        this.productPanelDetailsHeader = selectionData.texts.productPanelDetailsHeader;
        this.productFurtherInformation = selectionData.texts.productFurtherInformation;

        this.products = selectionData.products;

        if (this.directSelectionMode) {
            await this.checkForExistingProductSelection();
        } else {
            this.selectedProductIndex = await findProductSelection(this.productBaseIdentifier) || -1;
            document.querySelector(this.selectionTriggerElementIdentifier).addEventListener(this.selectionTriggerEvent, async () => {
                await this.addProductToShoppingCart();
                await deleteProductSelection(this.productBaseIdentifier);
                return true;
            });
        }
        this.showComponent = true;
    }

    async checkForExistingProductSelection() {
        const signedShoppingCart = await getShoppingCart();
        const orderForShopProduct = signedShoppingCart ?
            signedShoppingCart.shoppingCart.orders.find(order => order.shopProduct.orderItemId === this.orderItemId && order.shopProduct.price === this.devicePrice)
            : undefined;
        if (orderForShopProduct) {
            for (var i = 0; i < this.products.length; i++) {
                if (this.products[i].id === orderForShopProduct.wertgarantieProduct.id) {
                    this.selectedProductIndex = i;
                    this.currentOrderId = orderForShopProduct.id;
                }
            }
        }
    }

    async updateSelectedProductIndex(idx) {
        const updatedProductSelection = {
            productId: this.products[idx].id,
            productName: this.products[idx].name,
            productIndex: idx,
            productBaseIdentifier: this.productBaseIdentifier,
            orderId: this.currentOrderId
        };
        if (this.selectedProductIndex === idx) {
            await this.registerClick("DELETE", updatedProductSelection);
            this.selectedProductIndex = -1;
            if (!this.directSelectionMode) {
                await deleteProductSelection(updatedProductSelection.productBaseIdentifier);
            } else {
                await this.deleteFromShoppingCart(idx);
            }
        } else {
            await this.registerClick("POST", updatedProductSelection);
            this.selectedProductIndex = idx;
            if (!this.directSelectionMode) {
                await saveProductSelection(updatedProductSelection);
            } else {
                await this.updateShoppingCart();
            }
        }
    }

    async registerClick(method, updatedProductSelection) {
        await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/select`, method, updatedProductSelection);
    }

    renderProductInfoPanel(product) {
        const popUp = document.createElement(`wertgarantie-information-popup`);
        const popUpDataString = JSON.stringify({
            product: product,
            title: this.productPanelTitle,
            productPanelDetailsHeader: this.productPanelDetailsHeader,
            productFurtherInformation: this.productFurtherInformation
        });
        popUp.dataset.insuranceProduct = btoa(unescape(encodeURIComponent(popUpDataString)));
        popUp.dataset.bifrostUri = this.bifrostUri;

        window.document.body.appendChild(popUp);
        this.displayedProductInfoPanelIndex = -1;
    }

    render() {
        return this.showComponent ? html`
            <!--
                Font Awesome Free by @fontawesome - https://fontawesome.com
                License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
            -->
        <div class="component">
            <div class="component__head head">
                <div class="head__title">
                    ${unsafeHTML(this.title)}
                </div>
            </div>
            <div class="products">
                ${this.products.map((product, idx) => this.renderProductTag(idx, product))}
            <div class="component__footer">
                ${this.includedTax}
            </div>
        </div>` : html``;
    }

    renderProductTag(idx, product) {
        const selectionClassList = {
            "product__selection": true,
            "product__selection--selected": idx === this.selectedProductIndex,
            "product__selection--notselected": this.selectedProductIndex > -1 && idx !== this.selectedProductIndex
        };

        const productCheckboxClassList = {
            "product__checkbox": true,
            "product__checkbox--selected": idx === this.selectedProductIndex
        };

        return html`
            <div class="products__product product">
                <div class="${classMap(selectionClassList)}">
                    <div class="product--selectable" @click="${() => this.updateSelectedProductIndex(idx)}">
                        <div class="checkbox__container">
                            <div class="${classMap(productCheckboxClassList)}">
                                <!-- Font Awesome check icon -->
                                ${this.selectedProductIndex === idx ?
                                    html`<svg class="selection__checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="checkmark-path" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`
                                    : html``}
                            </div>
                        </div>
                        <div class="product__info">
                            <div class="product__name">${product.shortName}</div>
                            <div class="product__price">${product.priceFormatted + " pro " + product.paymentInterval + "*"}</div>
                        </div>
                    </div>
                    
                    <div class="product__information-icon" @click="${() => this.displayedProductInfoPanelIndex = idx}">
                        <div>
                            Info
                        </div>
                        <div>
                            <!-- Font Awesome info icon chevron right -->
                            <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
            ${idx === this.displayedProductInfoPanelIndex ? this.renderProductInfoPanel(product) : html``}`;
    }

    async addProductToShoppingCart() {
        if (this.selectedProductIndex === -1) {
            return {};
        }
        const selectedProduct = this.products[this.selectedProductIndex];
        if (!(this.bifrostUri && this.devicePrice && (this.deviceClass || this.deviceClasses) && this.completeProductName && selectedProduct.id && selectedProduct.name && this.clientId)) {
            throw new Error("order data incomplete: \n" +
                "bifrostUri: " + this.bifrostUri + "\n" +
                "devicePrice: " + this.devicePrice + "\n" +
                "deviceClass: " + this.deviceClass + "\n" +
                "deviceClass: " + this.deviceClasses + "\n" +
                "clientId: " + this.clientId + "\n" +
                "selectedProductId: " + selectedProduct.id + "\n" +
                "selectedProductName: " + selectedProduct.name + "\n" +
                "completeProductName: " + this.completeProductName
            );
        }
        try {
            const response = await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/shoppingCart/`, 'POST', {
                shopProduct: {
                    price: this.devicePrice,
                    deviceClass: this.deviceClass,
                    deviceClasses: this.deviceClasses,
                    deviceCondition: this.deviceCondition,
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
                console.error('Adding product to shopping cart failed: ', response);
                return {};
            }
            document.dispatchEvent(new Event('wertgarantie-shopping-cart-updated'));
            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async deleteFromShoppingCart() {
        const url = new URL(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/product`);
        const result = await fetchBifrost(url, 'DELETE', {
            orderId: this.currentOrderId
        });
        if (result.status !== 204 && result.status !== 200) {
            console.error('Deleting product from shopping cart failed: ', result);
            return;
        }
        this.currentOrderId = undefined;
        document.dispatchEvent(new Event('wertgarantie-shopping-cart-updated'));
    }

    async updateShoppingCart() {
        if (!this.currentOrderId) {
            const response = await this.addProductToShoppingCart();
            this.currentOrderId = response.body.orderId;
        } else {
            const selectedProduct = this.products[this.selectedProductIndex];
            const url = new URL(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/product`);
            const response = await fetchBifrost(url, 'POST', {
                orderId: this.currentOrderId,
                shopProduct: {
                    price: this.devicePrice,
                    deviceClass: this.deviceClass,
                    deviceClasses: this.deviceClasses,
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
                console.error('Updating product in shopping cart failed: ', response);
                return {};
            }
        }
        document.dispatchEvent(new Event('wertgarantie-shopping-cart-updated'));
    }
}

if (!customElements.get('wertgarantie-selection-embedded')) {
    customElements.define('wertgarantie-selection-embedded', WertgarantieSelectionEmbedded);
}
