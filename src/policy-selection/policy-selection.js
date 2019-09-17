(function () {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                font-family: var(--wertgarantie-selection-font-family, Roboto),sans-serif;
            }
            
            .wg-selection-container {
                max-width: var(--wertgarantie-selection-container-max-width, 600px);
                padding: var(--wertgarantie-selection-container-padding, 0 0 0 0);
                font-weight: var(--wertgarantie-selection-container-font-weight, 400);
                background-color: var(--wertgarantie-selection-container-background-color, #f5f5f5);
                font-size: var(--wertgarantie-selection-container-font-size, 16px);
                color: var(--wertgarantie-selection-container-color, #575757);
                line-height: var(--wertgarantie-selection-container-line-height, 21px);
            }
            
            .wg-title {
                font-family: var(--wertgarantie-selection-title-font-family, inherit),sans-serif;
                text-align: center;
                font-weight: var(--wertgarantie-selection-title-font-weight, 400);
                padding: var(--wertgarantie-selection-title-padding, 5px 0 0 0);
                font-size: var(--wertgarantie-selection-title-font-size, 20px);
                line-height: var(--wertgarantie-selection-title-line-height, 30px);
                color: var(--wertgarantie-selection-title-color, #2574be); 
            }
            
            .wg-rating {
                text-align: center;
            }

            .show-details {
                margin: auto;
                width: 50%;
                padding: 1.2em 0 0 0;
            }

            .show-details__button {
                border: none;
                background: none;
                height: 100%;
                font-weight: inherit;
                font-family: inherit;
                color: inherit;
                outline: none
            }
            
            .advantages__icon::before, .show-details__button::before {
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                display: inline-block; 
                font-style: normal;
                font-variant: normal;
                text-rendering: auto;
                line-height: 1;
                margin:0 0.5rem 0 -1.6em;
                font-family: "Font Awesome 5 Free",sans-serif;
                font-weight: 900;
            }

            .show-details__button--expanded::before {
                content: "\\F102";
            }

            .show-details__button--collapsed::before {
                content: "\\F103";
            }

            .product {
                margin: 0 35px 20px 35px;
                visibility: hidden;
                opacity: 0;
                max-height: 0;
                transition: all 0.4s;
                transform-origin: left top;
                transform: scaleY(0);
            }

            .product--expanded {
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
                margin: var(--wertgarantie-selection-advantage-margin, 0 0 4px 0);
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
            }
            
            #order-input {
                color: var(--wertgarantie-selection-checkbox-color, #21314d );
                background-color: #f2f2f2;
                padding: 1.5em;
                font-weight: 700;
            }
        </style>

        <div class="wg-selection-container" id="wertgarantie-selection-container">
            <h2 class="wg-title" id="wertgarantie-header"></h2>
            <div class="wg-rating" id="information">
                <slot name="wertgarantie-rating-component"></slot>
            </div>
            <div class="show-details">
                <button class="show-details__button show-details__button--collapsed" id="details-dropdown-button">Details anzeigen</button>
            </div>
            <section class="product product--collapsed" id="product-section">
                <ul class="advantages" id="wertgarantie-advantages-list">
                </ul>
                <ul class="advantages">
                    <li class="advantages__item">
                        <small class="product-information">
                            <span class="advantages__icon advantages__icon--included advantages__icon--plus">
                                <slot name="details-prefix"></slot>
                                <a class="product-information__link" id="product-details-link"></a>
                            </span>
                        </small>
                    </li>
                    <li class="advantages__item">
                        <small class="product-information">
                            <span class="advantages__icon advantages__icon--included advantages__icon--pdf">
                                <slot name="information-prefix"></slot>
                                <a class="product-information__link" id="product-information-sheet"></a>
                            </span>
                        </small>
                    </li>
                </ul>
                <div id="order-input">
                    <input type="checkbox" id="order">
                    <label id="order-label" for="order"></label>
                </div>
            </section>
        </div>
    `;

    /*
    TODOs:
     - add documentation for our vaious components

     - we need to provide auth information
     - let's style
     - what to do with multiple product offerings?
     - what to do with multiple documents?
     */
    class WertgarantiePolicySelection extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.showDetailsButton = this.shadowRoot.querySelector("#details-dropdown-button");
            this.productSection = this.shadowRoot.querySelector("#product-section");
            this.wertgarantieHeader = this.shadowRoot.querySelector('#wertgarantie-header');
            this.advantagesList = this.shadowRoot.querySelector('#wertgarantie-advantages-list');
            this.productDetailsLink = this.shadowRoot.querySelector('#product-details-link');
            this.productInformationSheet = this.shadowRoot.querySelector('#product-information-sheet');
            this.checkboxLabel = this.shadowRoot.querySelector('#order-label');
            this.overwriteWithUserDefinedAttributes = this.overwriteWithUserDefinedAttributes.bind(this);
            this.checkIfPolicyDefined = this.checkIfPolicyDefined.bind(this);
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
            addIfDefined(displayData, 'checkboxLabel', this.getAttribute('data-checkbox-label'));
            addIfDefined(displayData, 'detailsText', this.getAttribute('data-details-text'));
            addIfDefined(displayData, 'detailsUri', this.getAttribute('data-details-uri'));
            addIfDefined(displayData, 'infoSheetText', this.getAttribute('data-information-sheet-text'));
            addIfDefined(displayData, 'infoSheetUri', this.getAttribute('data-information-sheet-uri'));
            if (this.getAttribute('data-advantages')) {
                addIfDefined(displayData, 'advantages', this.getAttribute('data-advantages').split(';'));
            }

            const fetchData = {};
            addIfDefined(fetchData, 'devicePrice', this.getAttribute('data-device-price'));
            addIfDefined(fetchData, 'deviceId', this.getAttribute('data-device-id'));
            addIfDefined(fetchData, 'fetchUri', this.getAttribute('data-fetch-uri'));

            if (this.allDisplayDataAvailable(displayData)) {
                this.updateDisplay(displayData);
            } else {
                this.fetchPolicy(fetchData)
                    .then((fetchedValues) => this.overwriteWithUserDefinedAttributes(fetchedValues, displayData))
                    .then(this.checkIfPolicyDefined)
                    .then(this.updateDisplay);
            }
        }

        _upgradeProperty(prop) {
            if (this[prop]) {
                let value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }

        allDisplayDataAvailable(displayData) {
            return displayData.title && displayData.checkboxLabel && displayData.detailsText && displayData.detailsUri && displayData.infoSheetUri && displayData.infoSheetText;
        }

        async fetchPolicy({fetchUri, devicePrice, deviceId}) {
            if (!(fetchUri && devicePrice && deviceId)) {
                this.remove();
                throw new Error("fetch data and display data incomplete\n" + 
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

        checkIfPolicyDefined(displayData) {
            if (!this.allDisplayDataAvailable(displayData)) {
                this.remove();
                throw new Error("display data incomplete");
            } else {
                return displayData;
            }
        }

        toggleProductSection() {
            if (this.showDetailsButton.classList.toggle("show-details__button--expanded")) {
                this.showDetailsButton.innerText = "Details ausblenden";
                // this.productSection.style.display = "inline-block";
            }
            if (this.showDetailsButton.classList.toggle("show-details__button--collapsed")) {
                this.showDetailsButton.innerText = "Details einblenden";
                // this.productSection.style.display = "none";
            }
            this.productSection.classList.toggle("product--expanded");
        }

        updateDisplay({title, checkboxLabel, detailsText, detailsUri, infoSheetText, infoSheetUri, advantages = []}) {
            this.wertgarantieHeader.textContent = title;
            this.checkboxLabel.textContent = checkboxLabel;
            this.productDetailsLink.setAttribute('href', detailsUri);
            this.productDetailsLink.textContent = detailsText;
            this.productInformationSheet.setAttribute('href', infoSheetUri);
            this.productInformationSheet.textContent = infoSheetText;

            advantages.forEach((advantage) => {
                const listElement = document.createElement('li');
                listElement.classList.add('advantages__item', 'advantages__item--included')
                
                const spanElement = document.createElement('span');
                spanElement.innerText = advantage;
                spanElement.classList.add('advantages__icon', 'advantages__icon--included', 'advantages__icon--check');
                
                listElement.appendChild(spanElement);
                this.advantagesList.appendChild(listElement);
            });
            // this.productSection.style.display = "none";
        }

        disconnectedCallback() {
            console.log("disconnected");
        }
    }

    window.customElements.define('wertgarantie-policy-selection', WertgarantiePolicySelection);
})();