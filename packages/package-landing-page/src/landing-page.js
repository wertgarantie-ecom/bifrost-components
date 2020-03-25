import {LitElement, html} from "lit-element";
import fetchBifrost from "../../../shared-code/fetchBifrost";
import {unsafeHTML} from "lit-html/directives/unsafe-html";

class LandingPage extends LitElement{

    static get properties() {
        return {
            showComponent: {type: Boolean},
            tariffCalculatorHtml: {type: String}
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
        this.componentVersion = '0.0.1';

        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
        this.clientId = this.getAttribute('data-client-id');
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
        const url = this.bifrostUri + '/components/landing-page/' + this.clientId;
        const result = await fetchBifrost(url, 'GET', this.componentVersion);
        return result.body;
    }

    setProperties(landingPageData) {
        this.tariffCalculatorHtml = landingPageData.tariffCalculatorHtml;
    }

    render() {
        return this.showComponent ? html`
                ${unsafeHTML(this.tariffCalculatorHtml)}
        ` : html``;
    }
}

if (!customElements.get('wertgarantie-landing-page')) {
    customElements.define('wertgarantie-landing-page', LandingPage);
}