import {LitElement, html} from "lit-element";
import fetchBifrost from "wertgarantie-common/src/fetchBifrost";
import {
    saveProductSelection,
    findProductSelection,
    deleteProductSelection,
    getShoppingCart
} from "wertgarantie-common/src/wertgarantieShoppingCartRepository";
import 'wertgarantie-rating/dist/rating.min.js';
import 'wertgarantie-information-popup/dist/information-popup.min.js';
import {selectionEmbeddedStyling} from "./selection-embedded-styling";
import {classMap} from "lit-html/directives/class-map";


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
        this.componentVersion = '0.0.24';
        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.clientId = this.getAttribute("data-client-id");

        this.devicePrice = parseInt(this.getAttribute("data-device-price"));
        this.deviceClass = this.getAttribute("data-device-class") || undefined;
        this.deviceClasses = this.getAttribute("data-device-classes") || undefined;
        this.landingPageUri = this.getAttribute("data-landing-page-uri") || "https://www.wertgarantie.de";
        this.productBaseIdentifier = this.getAttribute("data-product-base-identifier");
        this.completeProductName = this.getAttribute("data-complete-product-name");
        this.selectionTriggerElementIdentifier = this.getAttribute('data-product-selection-trigger-element-identifier');
        this.selectionTriggerEvent = this.getAttribute('data-product-selection-trigger-event');
        this.directSelectionMode = !this.selectionTriggerElementIdentifier;
        this.showComponent = false;
        this.displayedProductInfoPanelIndex = -1;
        this.selectedProductIndex = -1;
        this.currentOrderId = undefined;
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
        const result = await fetchBifrost(url, 'PUT', this.componentVersion, {
            deviceClasses: this.deviceClasses,
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
            signedShoppingCart.shoppingCart.orders.find(order => order.shopProduct.orderItemId === this.completeProductName && order.shopProduct.price === this.devicePrice)
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
        await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/selection-embedded/select`, method, this.componentVersion, updatedProductSelection);
    }

    renderProductInfoPanel(product) {
        const popUp = document.createElement(`wertgarantie-information-popup`);
        const popUpDataString = JSON.stringify({
            product: product,
            title: this.productPanelTitle,
            productPanelDetailsHeader: this.productPanelDetailsHeader,
            productFurtherInformation: this.productFurtherInformation
        });
        const base64PopUpData = btoa(unescape(encodeURIComponent(popUpDataString)));
        popUp.dataset.insuranceProduct = base64PopUpData;
        popUp.dataset.bifrostUri = this.bifrostUri;

        window.document.body.appendChild(popUp);
        this.displayedProductInfoPanelIndex = -1;
        return;
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
                    ${this.title}
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
            "product__selection--selected": idx === this.selectedProductIndex

        };

        return html`
            <div class="products__product product">
                <div class="${classMap(selectionClassList)}">
                    <div class="product--selectable" @click="${() => this.updateSelectedProductIndex(idx)}">
                        <div class="product__checkbox">
                            <!-- Font Awesome check icon -->
                            ${this.selectedProductIndex === idx ?
            html`<svg class="selection__checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`
            : html``}
                        </div>
                        <div class="product__info">
                            <div class="product__name">${product.shortName}</div>
                            <div class="product__price">${product.priceFormatted + " / " + product.paymentInterval + "*"}</div>
                        </div>
                    </div>
                    
                    <div class="product__information-icon" @click="${() => this.displayedProductInfoPanelIndex = idx}">
                        <!-- Font Awesome info icon -->
                        <svg class="info-icon" aria-hidden="true" focusable="false" data-prefix="far" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path>
                        </svg>
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
            const response = await fetchBifrost(`${this.bifrostUri}/ecommerce/clients/${this.clientId}/shoppingCart/`, 'POST', this.componentVersion, {
                shopProduct: {
                    price: this.devicePrice,
                    deviceClass: this.deviceClass,
                    deviceClasses: this.deviceClasses,
                    name: this.completeProductName,
                    orderItemId: this.completeProductName
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
        const result = await fetchBifrost(url, 'DELETE', this.componentVersion, {
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
            const response = await fetchBifrost(url, 'POST', this.componentVersion, {
                orderId: this.currentOrderId,
                shopProduct: {
                    price: this.devicePrice,
                    deviceClass: this.deviceClass,
                    deviceClasses: this.deviceClasses,
                    name: this.completeProductName,
                    orderItemId: this.completeProductName
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
