import {LitElement, html} from "lit-element";
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from "lit-html/directives/style-map";
import {afterSalesStyling} from './after-sales-styling';
import fetchBifrost from 'wertgarantie-common/dist/fetchBifrost';

const WERTGARANTIE_SESSION_ID_COOKIE = 'wertgarantie-session-id';

class WertgarantieAfterSales extends LitElement {
    static get styles() {
        return afterSalesStyling;
    }

    static get properties() {
        return {
            title: {type: String},
            subtitle: {type: String},
            contractNumberText: {type: String},
            successfulOrders: {type: Array},
            nextStepsTitle: {type: String},
            nextSteps: {type: Array},
            base64EncodedShopCheckoutData: {type: String},
            showComponent: {type: Boolean}
        };
    }

    setProperties(data) {
        this.title = data.texts.success.title;
        this.subtitle = data.texts.success.subtitle;
        this.contractNumberText = data.texts.success.contractNumber;
        this.nextStepsTitle = data.texts.success.nextStepsTitle;
        this.nextSteps = data.texts.success.nextSteps;
        this.successfulOrders = data.successfulOrders;

        this.reportToShopCallback(data.proposalsInformation)
    }

    reportToShopCallback(proposalsInformation) {
        if (this.proposalInformationCallback && proposalsInformation) {
            window[this.proposalInformationCallback](proposalsInformation);
        }
    }

    constructor() {
        super();
        this.setProperties = this.setProperties.bind(this);
        this.renderOrder = this.renderOrder.bind(this);
        this.renderOrderItem = this.renderOrderItem.bind(this);
        this.displayComponent = this.displayComponent.bind(this);
        this.reportToShopCallback = this.reportToShopCallback.bind(this);
    }

    async connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.clientId = this.getAttribute("data-client-id");
        this.proposalInformationCallback = this.getAttribute("data-proposal-information-callback");
        this.base64EncodedShopCheckoutData = this.getAttribute('data-shop-purchase-data');
        const testData = this.getAttribute('data-test-data');
        this.testData = testData ? JSON.parse(testData) : undefined;
        await this.displayComponent();
    }

    async displayComponent() {
        let fetchResult;
        if (this.testData) {
            this.setProperties(this.testData);
            this.showComponent = true;
            return;
        }
        if (!this.base64EncodedShopCheckoutData) {
            const sessionId = document.cookie.match('(^|[^;]+)\\s*' + WERTGARANTIE_SESSION_ID_COOKIE + '\\s*=\\s*([^;]+)').pop();
            if (!sessionId) {
                this.showComponent = false;
                return;
            }
            const url = `${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/after-sales/${sessionId}`;
            fetchResult = await fetchBifrost(url, 'GET');
        } else {
            this.showComponent = false;
            const url = `${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/after-sales/checkout`;
            const checkoutRequestData = {
                webshopData: this.base64EncodedShopCheckoutData
            };
            fetchResult = await fetchBifrost(url, 'POST', checkoutRequestData);
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
                ${this.successfulOrders.map((item, index) => this.renderOrderItem(item, index))}
            </div>
        `;
    }

    renderOrderItem(item, index) {
        const contrastClasses = {
            "order-item": true,
            "order-item--primary": item.backgroundStyle === "primary",
            "order-item--secondary": item.backgroundStyle === "secondary"
        };
        const imageLinkStyle = {
            "--image-link": `url("${item.productImageLink}")`
        };
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
                            <span>${this.contractNumberText + " " + item.contractNumber}</span>
                        </div>
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
            <!--
            Font Awesome Free by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
            -->
            <div class="after-sales">
                <div class="orders">
                    <div class="header">
                        <div class="header__icon">
                            <!-- Font Awesome check icon: -->
                            <svg class="icon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="icon__svg--white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                        </div>
                        <div class="header__title">${this.title}</div>
                    </div>
                    <div class="content">
                        <div class="content__box box__insured-products">
                            <div class="box__header">
                                ${this.subtitle}
                            </div>
                            ${this.renderOrder()}
                        </div>
                        <div class="content__box box__next-steps">
                            <div class="box__header">${this.nextStepsTitle}</div>
                            <div class="box__icons">
                                <!-- Font Awesome envelope open text:-->
                                <svg class="next-steps__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="next-steps__icon--color" d="M176 216h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16zm-16 80c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16zm96 121.13c-16.42 0-32.84-5.06-46.86-15.19L0 250.86V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V250.86L302.86 401.94c-14.02 10.12-30.44 15.19-46.86 15.19zm237.61-254.18c-8.85-6.94-17.24-13.47-29.61-22.81V96c0-26.51-21.49-48-48-48h-77.55c-3.04-2.2-5.87-4.26-9.04-6.56C312.6 29.17 279.2-.35 256 0c-23.2-.35-56.59 29.17-73.41 41.44-3.17 2.3-6 4.36-9.04 6.56H96c-26.51 0-48 21.49-48 48v44.14c-12.37 9.33-20.76 15.87-29.61 22.81A47.995 47.995 0 0 0 0 200.72v10.65l96 69.35V96h320v184.72l96-69.35v-10.65c0-14.74-6.78-28.67-18.39-37.77z"/></svg>
                                <div class="box__icons__arrow">
                                    <!-- Font Awesome chevron right: -->
                                    <svg class="next-steps__arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path class="next-steps__icon--color" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                                </div>
                                <!-- Font Awesome file-alt:-->
                                <svg class="next-steps__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path class="next-steps__icon--color" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/></svg>
                                <div class="box__icons__arrow">
                                    <!-- Font Awesome chevron right: -->
                                    <svg class="next-steps__arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path class="next-steps__icon--color" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                                
                                </div>
                                <!-- Font Awesome flag checkered:-->
                                <svg class="next-steps__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="next-steps__icon--color" d="M243.2 189.9V258c26.1 5.9 49.3 15.6 73.6 22.3v-68.2c-26-5.8-49.4-15.5-73.6-22.2zm223.3-123c-34.3 15.9-76.5 31.9-117 31.9C296 98.8 251.7 64 184.3 64c-25 0-47.3 4.4-68 12 2.8-7.3 4.1-15.2 3.6-23.6C118.1 24 94.8 1.2 66.3 0 34.3-1.3 8 24.3 8 56c0 19 9.5 35.8 24 45.9V488c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24v-94.4c28.3-12.1 63.6-22.1 114.4-22.1 53.6 0 97.8 34.8 165.2 34.8 48.2 0 86.7-16.3 122.5-40.9 8.7-6 13.8-15.8 13.8-26.4V95.9c.1-23.3-24.2-38.8-45.4-29zM169.6 325.5c-25.8 2.7-50 8.2-73.6 16.6v-70.5c26.2-9.3 47.5-15 73.6-17.4zM464 191c-23.6 9.8-46.3 19.5-73.6 23.9V286c24.8-3.4 51.4-11.8 73.6-26v70.5c-25.1 16.1-48.5 24.7-73.6 27.1V286c-27 3.7-47.9 1.5-73.6-5.6v67.4c-23.9-7.4-47.3-16.7-73.6-21.3V258c-19.7-4.4-40.8-6.8-73.6-3.8v-70c-22.4 3.1-44.6 10.2-73.6 20.9v-70.5c33.2-12.2 50.1-19.8 73.6-22v71.6c27-3.7 48.4-1.3 73.6 5.7v-67.4c23.7 7.4 47.2 16.7 73.6 21.3v68.4c23.7 5.3 47.6 6.9 73.6 2.7V143c27-4.8 52.3-13.6 73.6-22.5z"/></svg>
                            </div>
                            <div class="box__explanation">
                                <ol class="explanation-list">
                                    ${this.nextSteps.map((step) => html`<li class="explanation-list__item">${step}</li>`)}
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
