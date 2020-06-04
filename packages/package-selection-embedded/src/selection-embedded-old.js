(function () {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                font-family: var(--wertgarantie-selection-font-family, Roboto),sans-serif;
            }
            
            .wg-selection-container {
                background-color: var(--wertgarantie-selection-container-background-color, white);
                max-width: var(--wertgarantie-selection-container-max-width, 600px);
                font-weight: var(--wertgarantie-selection-container-font-weight, 400);
                font-size: var(--wertgarantie-selection-container-font-size, 16px);
                color: var(--wertgarantie-selection-container-text-color, #575757);
            }

            .head-section {
                background-image: var(--wertgarantie-selection-head-section-background-image, linear-gradient(to right, #f5f5f5, #f5f5f5));
                color: var(--wertgarantie-selection-head-section-text-color, #2574be);
                display: grid;
                grid-template-columns: 12% 60% 28%;
                padding: 0.7em;
            }

            .head-section__item {
                padding-top: 0.5em;
            }

            .head-section__left {
                min-width: 100px;
                grid-column-start: 1;
                align-self: center;
                margin: 30%;
            }

            .head-section__order-checkbox {
                zoom: 1.3;
            }
            
            .head-section__middle {
                align-self: center;
                grid-column-start: 2;
                grid-column-end: 2;
                
            }

            .head-section__right {
                height: 100%;
                grid-column-start: 3;
                grid-column-end: 3;
                padding-right: 0.7em;
                position: relative
            }
            
            .price-info {
                position: absolute;
                bottom: 0.5em;
                right: 0.5em;
                text-align: right;
            }

            .price-info__small {
                font-size: 0.6em;
            }
            
            .wg-title {
                font-family: var(--wertgarantie-selection-title-font-family, inherit),sans-serif;
                font-weight: var(--wertgarantie-selection-title-font-weight, 400);
                font-size: var(--wertgarantie-selection-title-font-size, 20px);
                text-transform: var(--wertgarantie-selection-title-text-transform); 
                margin: 0.3em 0 0 0;
            }

            .show-details__button {
                border: none;
                background: none;
                outline: none;
                color: var(--wertgarantie-selection-show-details-button-text-color, inherit);
                font-size: var(--wertgarantie-selection-show-details-button-font-size);
                font-weight: var(--wertgarantie-selection-show-details-button-font-weight);
            }

            .show-details__button:hover {
                cursor: pointer;
            }
            
            .advantages__icon::before, .show-details__button::before {
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                display: inline-block; 
                font-style: normal;
                font-variant: normal;
                text-rendering: auto;
                margin:0 0.5em 0 -0.4em;
                font-family: "Font Awesome 5 Free",sans-serif;
                font-weight: 700;
            }

            .show-details__button::before {
                color: var(--wertgarantie-selection-show-details-button-arrow-color, inherit);
            }

            .show-details__button--expanded::before {
                content: "\\F102";
            }

            .show-details__button--collapsed::before {
                content: "\\F103";
            }

            .product-details {
                padding: 0.7em;
                visibility: hidden;
                opacity: 0;
                max-height: 0;
                transition: all 0.4s;
                transform-origin: left top;
                transform: scaleY(0);
            }

            .product-details--expanded {
                visibility: visible;
                opacity: 1;
                max-height: 100%;
                transition: all 0.4s;
                transform: scaleY(1);
            }
            
            .advantages {
                padding-inline-start: 1.5em;
                list-style-type: none;
            }

            .advantages__item {
                font-size: var(--wertgarantie-selection-advantage-font-size, 13px);
                line-height: var(--wertgarantie-selection-container-line-height, 21px);
                margin: var(--wertgarantie-selection-advantage-margin, 0 0 0.3em 0);
            }

            .advantages__item--included {
                color: var(--wertgarantie-selection-advantage-included-text-color, #575757);
            }

            .advantages__item--excluded {
                color: var(--wertgarantie-selection-advantage-excluded-text-color, lightgrey);
            }
        
            .advantages__icon--included::before {
                color: var(--wertgarantie-selection-advantage-included-icon-color, #2574be);
            }
        
            .advantages__icon--excluded::before {
                color: var(--wertgarantie-selection-advantage-excluded-icon-color, lightgrey);
            }
            
            .advantages__icon--check::before {
                content: "\\F00C";
            }
            
            .advantages__icon--ban::before {
                content: "\\F05E";
            }

            .advantages__icon--plus::before {
                content: "\\F067";
            }
            
            .advantages__icon--pdf::before {
                content: "\\F1C1";
            }
            
            .product-information__link, .product-information__link:visited {
                color: var(--wertgarantie-selection-product-info-link-color, #2574be);
                position: static;
                text-decoration: none;
            }

            .product-selection {
                padding: 0.7em;
                display: flex;
                justify-content: space-around;
            }

            .product-selection__button {
                border: none;
                outline: none;
                width: 40%;
                margin: 0.4em;
                padding: 0.6em;
                font-size: inherit;
                opacity: 0.4;
                transition: all 0.6s;
                color: inherit;
            }

            .product-selection__button:hover {
                cursor: pointer;
            }

            .product-selection__button-header {
                font-weight: 700;
                color: var(--wertgarantie-selection-button-header-color, #2574be);
                border-radius: 10px;
            }

            .product-selection__button--selected {
                opacity: 1;
                box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
            }
        </style>

        <div class="wg-selection-container">
            <div class="head-section">
                <div class="head-section__left">
                    <input type="checkbox" class="head-section__order-checkbox" id="order">
                </div>
                <div class="head-section__middle">
                    <h2 class="wg-title" id="wertgarantie-header"></h2>
                    <div class="head-section__item" id="information">
                        <slot name="wertgarantie-rating-component"></slot>
                    </div>
                    <div class="show-details head-section__item">
                        <button class="show-details__button show-details__button--collapsed" id="details-dropdown-button">Details anzeigen</button>
                    </div>
                </div>
                <div class="head-section__right">
                    <div class="price-info">
                        <small class="price-info__small" id="payment-interval">pro Monat</small><br/>
                        <strong id="price-display">ab X,XX €</strong><br/>
                        <small class="price-info__small" id="tax-display">inkl. x,xx€ VerSt</small>
                    </div>
                </div>
            </div>
            <div class="product-details" id="product-section">
                <ul class="advantages" id="wertgarantie-services-list"></ul>
                <ul class="advantages" id="wertgarantie-advantages-list"></ul>
                <ul class="advantages">
                    <li class="advantages__item">
                        <small class="product-information">
                            <span class="advantages__icon advantages__icon--included advantages__icon--plus">
                                <a target="_blank" class="product-information__link" id="product-details-link"></a>
                            </span>
                        </small>
                    </li>
                    <li class="advantages__item">
                        <small class="product-information">
                            <span class="advantages__icon advantages__icon--included advantages__icon--pdf">
                                <a target="_blank" class="product-information__link" id="product-information-sheet"></a>
                            </span>
                        </small>
                    </li>
                </ul>
            </div>
            <div class="product-selection" id="product-selection">
            </div>
        </div>
    `;

    /*
    TODOs:
     - add documentation for our vaious components
     - what to do with multiple documents?

     - we need to provide auth information
     - what to do with multiple product offerings?
     */
    class WertgarantiePolicySelection extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.showDetailsButton = this.shadowRoot.querySelector("#details-dropdown-button");
            this.productSection = this.shadowRoot.querySelector("#product-section");
            this.wertgarantieHeader = this.shadowRoot.querySelector('#wertgarantie-header');
            this.servicesList = this.shadowRoot.querySelector('#wertgarantie-services-list');
            this.advantagesList = this.shadowRoot.querySelector('#wertgarantie-advantages-list');
            this.productDetailsLink = this.shadowRoot.querySelector('#product-details-link');
            this.productInformationSheet = this.shadowRoot.querySelector('#product-information-sheet');
            this.priceDisplay = this.shadowRoot.querySelector('#price-display');
            this.taxDisplay = this.shadowRoot.querySelector('#tax-display');
            this.paymentInterval = this.shadowRoot.querySelector('#payment-interval');
            this.productSelection = this.shadowRoot.querySelector('#product-selection');

            this.overwriteWithUserDefinedAttributes = this.overwriteWithUserDefinedAttributes.bind(this);
            this.setupDisplay = this.setupDisplay.bind(this);
            this.createSelectionButton = this.createSelectionButton.bind(this);
            this.updateDisplay = this.updateDisplay.bind(this);
            this.toggleProductSection = this.toggleProductSection.bind(this);
        }

        set devicePrice(devicePrice) {
            this.setAttribute("data-device-price", devicePrice);
        }

        set deviceId(deviceId) {
            this.setAttribute("data-device-id", deviceId);
        }

        connectedCallback() {
            this.showDetailsButton.addEventListener("click", this.toggleProductSection);

            const addIfDefined = (object, name, property) => {
                if (property) object[name] = property;
            };

            this._upgradeProperty('deviceId');
            this._upgradeProperty('devicePrice');

            const displayData = {};
            addIfDefined(displayData, 'title', this.getAttribute('data-title'));

            const fetchData = {};
            addIfDefined(fetchData, 'devicePrice', this.getAttribute('data-device-price'));
            addIfDefined(fetchData, 'deviceId', this.getAttribute('data-device-id'));
            addIfDefined(fetchData, 'fetchUri', this.getAttribute('data-fetch-uri'));

            this.fetchPolicy(fetchData)
                .then((fetchedValues) => this.overwriteWithUserDefinedAttributes(fetchedValues, displayData)) // title can still be overwritten
                .then(this.allDisplayDataAvailable) // check if display data is complete
                .then(this.setupDisplay);
        }

        _upgradeProperty(prop) {
            if (this[prop]) {
                let value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }

        allDisplayDataAvailable(displayData) {
            let isComplete = true;
            displayData.products.forEach(data => {
                if (!(data.name && data.detailsText && data.detailsUri 
                    && data.infoSheetUri && data.infoSheetText && data.paymentInterval
                    && data.price && data.currency && data.priceFormatted && data.tax)) {
                        isComplete = false;
                    }
            });
            if (!isComplete) {
                this.remove();
                throw new Error("display data incomplete");
            }
            return displayData;
        }

        async fetchPolicy({fetchUri, devicePrice, deviceId}) {
            if (!(fetchUri && devicePrice && deviceId)) {
                this.remove();
                throw new Error("fetch data incomplete\n" + 
                    "fetchUri: " + fetchUri + "\n" +
                    "devicePrice: " + devicePrice + "\n" +
                    "deviceId: " + deviceId
                );
            }
            try {
                const url = new URL(fetchUri);
                const queryParams = {
                    devicePrice: devicePrice,
                    deviceId: deviceId
                };
                Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
                const response = await fetch(url);
                if (response.status !== 200) {
                    console.error('fetch failed:', response);
                    return {};
                }
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
                return {};
            }
        }

        overwriteWithUserDefinedAttributes(fetchedDisplayData, displayData) {
            const merge = (object1, object2) => {
                return {...object1, ...object2}
            };
            return merge(fetchedDisplayData, displayData);
        }

        toggleProductSection() {
            if (this.showDetailsButton.classList.toggle("show-details__button--expanded")) {
                this.showDetailsButton.innerText = "Details ausblenden";
            }
            if (this.showDetailsButton.classList.toggle("show-details__button--collapsed")) {
                this.showDetailsButton.innerText = "Details einblenden";
            }
            this.productSection.classList.toggle("product-details--expanded");
        }

        setupDisplay(displayData) {
            displayData.products.forEach((product) => {
                product.title = displayData.title;
                this.createSelectionButton(product);
            });
            this.productSelection.firstChild.nextSibling.classList.add("product-selection__button--selected");
            this.updateDisplay(displayData.products[0]);
        }

        createSelectionButton(product) {
            const productButton = document.createElement('button');
            productButton.classList.add("product-selection__button")

            // add headline button headline
            const productButtonHeader = document.createElement('p');
            productButtonHeader.classList.add("product-selection__button-header")
            productButtonHeader.textContent = product.name;
            // append headline to button
            productButton.appendChild(productButtonHeader);

            // create info box for button with price details
            const priceInfoDiv = document.createElement('div');
            priceInfoDiv.classList.add("price-info__border");

            const priceSpan = document.createElement('strong');
            priceSpan.textContent = product.priceFormatted;
            priceSpan.appendChild(document.createElement('br'));
            
            const payInterval = document.createElement('small');
            payInterval.classList.add("price-info__small");
            payInterval.textContent = "pro " + product.paymentInterval;
            
            // wire everything together in correct order
            priceInfoDiv.appendChild(priceSpan);
            priceInfoDiv.appendChild(payInterval);
            productButton.appendChild(priceInfoDiv);

            productButton.addEventListener("click", () => {
                this.productSelection.querySelectorAll(".product-selection__button").forEach(button => button.classList.remove("product-selection__button--selected"));
                productButton.classList.add("product-selection__button--selected");
                this.updateDisplay(product);
            });
            this.productSelection.appendChild(productButton);
        }

        updateDisplay(product) {
            this.wertgarantieHeader.innerHTML = product.title;
            this.productDetailsLink.setAttribute('href', product.detailsUri);
            this.productDetailsLink.textContent = product.detailsText;
            this.productInformationSheet.setAttribute('href', product.infoSheetUri);
            this.productInformationSheet.textContent = product.infoSheetText;
            this.priceDisplay.textContent = product.priceFormatted;
            this.taxDisplay.textContent = "inkl. " + product.tax + product.currency + " VerSt";
            this.paymentInterval.textContent = "pro " + product.paymentInterval;
            

            // still uncertain what this should look like? separate lists? 
            // resolve diffs between the products and mark 
            // advantages / services that are not available in product a but in product b? 
            // --> icons and css classes already available: advantages__icon--included, advantages__icon--ban
            this.advantagesList.innerHTML = '';
            this.servicesList.innerHTML = '';

            product.services.forEach((service) => {
                const listElement = this.createListElement(service);
                this.servicesList.appendChild(listElement);
            })

            product.advantages.forEach((advantage) => {
                const listElement = this.createListElement(advantage);
                this.advantagesList.appendChild(listElement);
            });
        }

        createListElement(listItem) {
            const listElement = document.createElement('li');
            listElement.classList.add('advantages__item', 'advantages__item--included');
            const spanElement = document.createElement('span');
            spanElement.innerText = listItem;
            spanElement.classList.add('advantages__icon', 'advantages__icon--included', 'advantages__icon--check');
            listElement.appendChild(spanElement);
            return listElement;
        }

        disconnectedCallback() {
            console.log("disconnected");
        }
    }

    window.customElements.define('wertgarantie-policy-selection', WertgarantiePolicySelection);
})();