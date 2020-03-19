import {LitElement, html} from "lit-element";
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from "lit-html/directives/style-map";
import {afterSalesStyling} from './after-sales-styling';
import fetchBifrost from '../../../shared-code/fetchBifrost';
import getWertgarantieCookieValue from "../../../shared-code/getWertgarantieCookieValue";

const WERTGARANTIE_SESSION_ID_COOKIE = 'wertgarantie-session-id';

class WertgarantieAfterSales extends LitElement {
    static get styles() {
        return afterSalesStyling;
    }

    static get properties() {
        return {
            headerTitle: {type: String},
            productBoxTitle: {type: String},
            orderItems: {type: Array},
            nextStepsTitle: {type: String},
            nextSteps: {type: Array},
            base64EncodedShopCheckoutData: {type: String},
            showComponent: {type: Boolean}
        };
    }

    setProperties(data) {
        this.headerTitle = data.headerTitle || "Ihre Geräte wurden erfolgreich versichert!";
        this.productBoxTitle = data.productBoxTitle || "Folgende Geräte wurden versichert:";
        this.nextStepsTitle = data.nextStepsTitle || "Die nächsten Schritte:";
        this.nextSteps = data.nextSteps || [];
        this.orderItems = data.orderItems || [];

    }

    constructor() {
        super();
        this.componentVersion = '1.0.4';
        this.setProperties = this.setProperties.bind(this);
        this.renderOrder = this.renderOrder.bind(this);
        this.renderOrderItem = this.renderOrderItem.bind(this);
        this.displayComponent = this.displayComponent.bind(this);
    }

    async connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
        this.base64EncodedShopCheckoutData = this.getAttribute('data-shop-purchase-data');

        this.displayComponent();
    }

    async displayComponent() {
        let fetchResult;
        if (!this.base64EncodedShopCheckoutData) {
            const sessionId = getWertgarantieCookieValue(WERTGARANTIE_SESSION_ID_COOKIE);
            if (!sessionId) {
                this.showComponent = false;
                return;
            }
            const url = this.bifrostUri + '/components/after-sales/' + sessionId;
            fetchResult = await fetchBifrost(url, 'GET', this.componentVersion);
        } else {
            this.showComponent = false;
            const shopDataString = atob(this.base64EncodedShopCheckoutData);
            const shopData = JSON.parse((shopDataString));
            const url = this.bifrostUri + '/components/after-sales/checkout';
            const checkoutRequestData = {
                webshopData: shopData
            };
            fetchResult = await fetchBifrost(url, 'POST', this.componentVersion, checkoutRequestData);
        }
        if (fetchResult.status === 200) {
            this.setProperties(fetchResult.body);
            this.showComponent = true;
        } else {
            this.showComponent = false;
        }
    }


    renderOrder() {
        //language=HTML
        return html`
            <div class="order">
                ${this.orderItems.map((item, index) => this.renderOrderItem(item, index))}
            </div>
        `;
    }

    renderOrderItem(item, index) {
        const contrastClasses = {
            "order-item": true,
            "order-item--dark": index % 2 === 0,
            "order-item--light": index % 2 === 1
        };
        const imageLinkStyle = {
            "--image-link": "url(" + item.imageLink + ")"
        }
        //language=HTML
        return html`
            <div class=${classMap(contrastClasses)} style=${styleMap(imageLinkStyle)}>
                <div class="order-item__panel panel">
                    <div class="panel__content--top">
                        <div class="panel__content panel__number">
                            ${index + 1}
                        </div>
                        <div class="panel__content panel__title">
                            ${item.insuranceProductTitle}
                        </div>
                    </div>
                    <div class="panel__content--bottom">
                        <div class="panel__content">
                            <span class="panel__product-name">${item.productTitle}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        //language=HTML
        return this.showComponent ? html`
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css">
            <div class="after-sales">
                <div class="orders">
                    <div class="header">
                        <div class="header__icon"><i class="icon fas fa-check"></i></div>
                        <div class="header__title">${this.headerTitle}</div>
                    </div>
                    <div class="content">
                        <div class="content__box">
                            <div class="box__header">
                                ${this.productBoxTitle}
                            </div>
                            ${this.renderOrder()}
                        </div>
                        <div class="content__box">
                            <div class="box__header">${this.nextStepsTitle}</div>
                            <div class="box__icons">
                                <i class="fas fa-envelope-open-text"></i>
                                <div class="box__icons__arrow">
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                                <i class="fas fa-file-alt"></i>
                                <div class="box__icons__arrow">
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                                <i class="fas fa-flag-checkered"></i>
                            </div>
                            <div class="box__explanation">
                                <ol>
                                    ${this.nextSteps.map((step) => html`<li>${step}</li>`)}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ` : html``;
    }
}

if (!customElements.get('wertgarantie-after-sales')) {
    customElements.define('wertgarantie-after-sales', WertgarantieAfterSales);
}
