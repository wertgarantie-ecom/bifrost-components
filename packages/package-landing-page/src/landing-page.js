import {LitElement, html} from "lit-element";
import fetchBifrost from "../../../shared-code/fetchBifrost";
import {unsafeHTML} from "lit-html/directives/unsafe-html";
import '../../package-rating/dist/rating.min.js';
import {landingPageStylingGeneral} from "./landing-page-styling-general";
import {landingPageStylingHead} from "./landing-page-styling-head";
import {landingPageStylingBody} from "./landing-page-styling-body";
// import {landingPageStylingTariffCalculator} from "./landing-page-styling-tariff-calculator";

class LandingPage extends LitElement{

    static get styles() {
        return [
            landingPageStylingGeneral,
            landingPageStylingHead,
            landingPageStylingBody
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
    }

    connectedCallback() {
        super.connectedCallback();
        this.componentVersion = '0.0.2';

        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
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
        const url = this.bifrostUri + '/components/landing-page/';
        const result = await fetchBifrost(url, 'GET', this.componentVersion);
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
        // language=HTML
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
                                                     data-link-text="Google Rezensionen">
                                </wertgarantie-rating>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="head__images">
                            <img id="tuev-image" src="https://www.wertgarantie.de/portaldata/4/resources/Icons/tuev-logo.png" alt="">
                            <img id="focus-money-image" src="https://www.wertgarantie.at/assets/pictures/badges/1914_FoMo_ElVers_ges_B.jpg" alt="">
                            <img id="test-bild-image" src="https://www.wertgarantie.de/Portaldata/4/Resources/logos/test-bild-wertgarantie-109-01.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="landing-page_body body">
                    <div class="body__section body__section--no-picture">
                        <div class="section__header">
                            ${this.whyInsurance.title}
                        </div>
                        <div class="section__text">
                            ${this.whyInsurance.text}
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
        ` : html``;
    }
}

if (!customElements.get('wertgarantie-landing-page')) {
    customElements.define('wertgarantie-landing-page', LandingPage);
}
