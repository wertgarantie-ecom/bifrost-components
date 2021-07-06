import {LitElement, html} from "lit-element";
import fetchBifrost from "wertgarantie-common/src/fetchBifrost";
import 'wertgarantie-rating/dist/rating.min.js';
import {landingPageStylingGeneral} from "./landing-page-styling-general";
import {landingPageStylingHead} from "./landing-page-styling-head";
import {landingPageStylingBody} from "./landing-page-styling-body";
import {landingPageStylingSteps} from "./landing-page-styling-steps";

class LandingPage extends LitElement {

    static get styles() {
        return [
            landingPageStylingGeneral,
            landingPageStylingHead,
            landingPageStylingBody,
            landingPageStylingSteps
        ];
    }

    static get properties() {
        return {
            showComponent: {type: Boolean},
            tariffCalculatorHtml: {type: String},
            headImageLink: {type: String},
            whyInsurance: {type: Object},
            insuranceForDevices: {type: Object},
            safeIsSafe: {type: Object},
            findYourTariff: {type: Object},
            bottom: {type: Object}
        };
    }

    constructor() {
        super();

        // method binding
        this.displayComponent = this.displayComponent.bind(this);
        this.fetchLandingPageData = this.fetchLandingPageData.bind(this);
        this.setProperties = this.setProperties.bind(this);
        this.renderArrowBetweenSteps = this.renderArrowBetweenSteps.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.clientId = this.getAttribute("data-client-id");
        this.partnerNumber = this.getAttribute('data-partner-number');
        this.showComponent = false;
        this.displayComponent();
    }

    displayComponent() {
        this.fetchLandingPageData()
            .then(this.setProperties)
            .then(() => this.showComponent = true)
            .catch(() => this.showComponent = false)
    }

    async fetchLandingPageData() {
        const url = `${this.bifrostUri}/ecommerce/clients/${this.clientId}/components/landing-page/`;
        const result = await fetchBifrost(url, 'GET');
        return result.body;
    }

    setProperties(landingPageData) {
        this.tariffCalculatorHtml = landingPageData.tariffCalculatorHtml;
        this.headImageLink = landingPageData.headImageLink;
        this.whyInsurance = landingPageData.textSections.whyInsurance;
        this.insuranceForDevices = landingPageData.textSections.insuranceForDevices;
        this.safeIsSafe = landingPageData.textSections.safeIsSafe;
        this.findYourTariff = landingPageData.textSections.findYourTariff;
        this.bottom = landingPageData.textSections.bottom;
    }

    render() {
        return this.showComponent ? html`
            <div class="landing-page">
                <div class="landing-page__head" style="--image-link: url(${this.headImageLink});">
                    <div class="head">
                        <div class="title-section">
                            <div class="head__title head__item">
                                Wertgarantie Komplettschutz
                            </div>
                            <div class="head__title--edge"></div>
                        </div>
                        <div class="head__subtitle head__item">
                            Der leistungsstarke Schutz für Ihre Geräte
                        </div>
                        <div class="head__bottom head__item">
                            <div class="secure-button">
                                <a target="_blank" href=${"https://www.wertgarantie.de/Home/Landingpage/Banner.aspx?partner=" + this.partnerNumber + "&sortiment=1"}>
                                    <button class="insurance-application-button">
                                        Jetzt absichern
                                    </button>
                                </a>
                            </div>
                            <div class="google-rating-container">
                                <wertgarantie-rating class="default-google-rating"
                                                     data-disable-rating-number="true"
                                                     data-bifrost-uri="${this.bifrostUri}"
                                                     data-link-text="Google Rezensionen">
                                </wertgarantie-rating>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="head__images">
                            <img id="tuev-image" src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/landing-page/wertgarantie-tuev-logo.png" alt="">
                            <img id="focus-money-image" src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/landing-page/focus-money-smartphone.png" alt="">
                            <img id="test-bild-image" src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/landing-page/test-bild-wertgarantie-109-01.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="landing-page_body body">
                    <div class="body__section body__section--with-picture body__section--small-picture-right">
                        <div class="section__content section__content--split section__content--split-broad">
                            <div class="section__header section__header--split">
                                ${this.whyInsurance.title}
                            </div>
                            <div class="section__text">
                                ${this.whyInsurance.text}
                            </div>
                        </div>
                        <div class="section__image--small">
                            <img class="wertgarantie-logo" src="https://wertgarantie-components.s3.eu-central-1.amazonaws.com/landing-page/wertgarantie-logo.png" alt="">
                        </div>
                    </div>
                    <div class="body__section body__section--with-picture">
                        <div class="section__content section__content--split">
                            <div class="section__header section__header--split">
                                ${this.insuranceForDevices.title}
                            </div>
                            <div class="section__text">
                                ${this.insuranceForDevices.text}
                            </div>
                        </div>
                        <div class="section__image" style="--image-link: url(${this.insuranceForDevices.imageLink});">
                        
                        </div>
                    </div>
                    <div class="body__section">
                        <div class="section__header">
                            So einfach Geht's:
                        </div>
                        <div class="steps">
                            <div class="steps__step step">
                                <div class="step__square">
                                    1
                                </div>
                                <div class="step__title">
                                    Schritt 1
                                </div>
                                <div class="step__text">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                                </div>
                            </div>
                           ${this.renderArrowBetweenSteps()}
                            <div class="steps__step step">
                                <div class="step__square">
                                    2
                                </div>
                                <div class="step__title">
                                    Schritt 2
                                </div>
                                <div class="step__text">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                                </div>
                            </div>
                           ${this.renderArrowBetweenSteps()}
                            <div class="steps__step step">
                                <div class="step__square">
                                    3
                                </div>
                                <div class="step__title">
                                    Schritt 3
                                </div>
                                <div class="step__text">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                                </div>
                            </div>
                           ${this.renderArrowBetweenSteps()}
                            <div class="steps__step step steps__step--final">
                                <div class="step__square">
                                    <!-- Font Awesome Shield Icon -->
                                    <svg class="icon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="icon__svg--colored" d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"/></svg>
                                </div>
                                <div class="step__title">
                                    Fertig!
                                </div>
                                <div class="step__text">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="body__section body__section--with-picture">
                        <div class="section__image" style="--image-link: url(${this.safeIsSafe.imageLink});">
                            
                        </div>
                        <div class="section__content section__content--split">
                            <div class="section__header section__header--split">
                                ${this.safeIsSafe.title}
                            </div>
                            <div class="section__text">
                                ${this.safeIsSafe.text}
                            </div>
                        </div>
                    </div>
                    <div class="body__section body__section--with-picture body__section--small-picture-right">
                        <div class="section__content section__content--split section__content--split-broad">
                            <div class="section__header section__header--split">
                                ${this.bottom.title}
                            </div>
                            <div class="section__text">
                                ${this.bottom.text}
                            </div>
                        </div>
                        <div class="section__image section__image--small" style="--image-link: url(${this.bottom.imageLink});">
                        </div>
                    </div>
                </div>
            </div>
        ` : html``;
        // language=HTML
    }

    renderArrowBetweenSteps() {
        //language=HTML
        return html`
            <div class="steps__arrow">
                <!-- Font Awesome chevron right: -->
                <svg class="steps__arrow--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                </svg>
            </div>
        `;
    }
}

if (!customElements.get('wertgarantie-landing-page')) {
    customElements.define('wertgarantie-landing-page', LandingPage);
}
