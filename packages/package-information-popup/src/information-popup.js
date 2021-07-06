import { LitElement, html } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { styleMap } from "lit-html/directives/style-map";
import 'wertgarantie-rating/dist/rating.min.js';
import { informationPopUpStyling } from "./information-popup-styling";

class WertgarantieInformationPopup extends LitElement {

    static get styles() {
        return [
            informationPopUpStyling
        ];
    }

    static get properties() {
        return {
            product: { type: Object },
            title: { type: String },
            productPanelDetailsHeader: { type: String },
            productFurtherInformation: { type: String },
            showComponent: { type: Boolean },
            bifrostUri: { type: String }
        };
    }

    constructor() {
        super();
        this.renderAdvantage = this.renderAdvantage.bind(this);
        this.fadeOut = this.fadeOut.bind(this);
        this.checkAllPropertiesSet = this.checkAllPropertiesSet.bind(this);
        this.showComponent = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute('data-bifrost-uri') || "https://ecommerce.wertgarantie.com/wertgarantie";
        const productDataString = decodeURIComponent(escape(atob(this.getAttribute('data-insurance-product'))));
        const productData = JSON.parse(productDataString);
        this.product = productData.product;
        this.title = productData.title;
        this.productPanelDetailsHeader = productData.productPanelDetailsHeader;
        this.productFurtherInformation = productData.productFurtherInformation;


        this.checkAllPropertiesSet();
    }

    checkAllPropertiesSet() {
        this.showComponent = this.product && this.title && this.productPanelDetailsHeader && this.productFurtherInformation;
    }

    render() {
        const productHeadClassList = {
            "product-card--background-primary": this.product.backgroundStyle === 'primary',
            "product-card--background-secondary": this.product.backgroundStyle === 'secondary'
        };
        const productImageLinkStyleList = {
            "--image-link": "url(" + this.product.productImageLink + ")"
        };
        return this.showComponent ? html`
            <div class="product-modal">
                <div class="content">
                    <div class="content__head header">
                        <div class="header__row">
                            <strong class="header__title">${this.product.title || this.title}</strong>
                            <span @click="${this.fadeOut}" class="closeBtn" id="closeBtn">×</span>
                        </div>
                            <wertgarantie-rating class="wg-rating-default" data-rating="4.6" data-link-text="Reviews on Google" data-ratings-total="4500" data-bifrost-uri="https://ecommerce.wertgarantie.com/wertgarantie"></wertgarantie-rating>
                    </div>
                    <div class="content__product-card">
                        <div class=${classMap(productHeadClassList)} style=${styleMap(productImageLinkStyleList)}>
                            <div class="product-card__base-info">
                                <div class="product-card__base-info--top">
                                    <div class="product-card__base-info--top-left">
                                        <small class="payment-interval">${this.product.paymentInterval}</small><br>
                                        <strong class="price-display">${this.product.priceFormatted}</strong><br>
                                        <small class="tax-display">${this.product.taxFormatted}</small>
                                    </div>
                                </div>
                                <div class="product-card__base-info--bottom">
                                    <div class="product-card__title">${this.product.name}</div>
                                    <div class="product-card__advantages">
                                        ${this.product.top3.map(adv => this.renderAdvantage(adv, true))}
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
                            ${this.product.advantages.map(adv => this.renderAdvantage(adv, false))}
                        </div>
                        <div class="product__footer-section">
                            <p><strong>${this.productFurtherInformation}</strong></p>
                            <a target="_blank" class="wg-link"
                               href="${this.product.IPIDUri}">${this.product.IPIDText}</a><br>
                            <a target="_blank" class="wg-link"
                               href="${this.product.GTCIUri}">${this.product.GTCIText}</a>
                        </div>
                        <div class="product__footer-section">
                            <div class="award-image-block">
                                <div>
                                    <a class="award-image-block__link" target="_blank" href="https://www.certipedia.com/quality_marks/9105052129">
                                        <img class="quality-seal-image"
                                            src="https://www.certipedia.com/logos/000/049/786/9105052129_de.png?1396417891"
                                            alt="tuev-logo">
                                        </a>
                                </div>
                                <div>
                                    <a class="award-image-block__link" target="_blank" href="https://www.wertgarantie.de/Home.aspx#">
                                        <img class="award-image"
                                            src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/zertifikate/focus_money_15_21_beste_elektronikversicherung.jpg"
                                            alt="Focus Money Beste Elektronik-Versicherung 15/2021">
                                    </a>
                                    <a class="award-image-block__link" target="_blank" href="https://www.wertgarantie.de/Home.aspx#">
                                        <img class="award-image"
                                            src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/zertifikate/focus_money_15_21_beste_smartphone_versicherung.jpg"
                                            alt="Focus Money Beste Smartphone-Versicherung 15/2021">
                                    </a>

                                    <a class="award-image-block__link" target="_blank" href="https://www.wertgarantie.de/Home.aspx#">
                                        <img class="award-image"
                                            src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/zertifikate/chip_juni_2020_small.jpeg"
                                            alt="CHIP Smartphone Versicherungen Juni 2020">
                                    </a>

                                    <a class="award-image-block__link" target="_blank" href="https://www.wertgarantie.de/Home.aspx#">
                                        <img class="award-image"
                                            src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/zertifikate/efahrer_03_21_bester_leistungsumfang.jpg"
                                            alt="EFahrer.com Bester Leistungsumfang E-Bike Versicherungen">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ` : html``;
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
                self.remove();
            }
        }, 20);
    }
}


if (!customElements.get('wertgarantie-information-popup')) {
    customElements.define('wertgarantie-information-popup', WertgarantieInformationPopup);
}
