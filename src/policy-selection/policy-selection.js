(function () {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
        :host {
            font-family: var(--wertgarantie-selection-font-family, Roboto),sans-serif;
        }
        
        #wertgarantie-selection-container {
            max-width: var(--wertgarantie-selection-container-max-width, 600px);
            padding: var(--wertgarantie-selection-container-padding, 0 0 0 0);
            font-weight: var(--wertgarantie-selection-container-font-weight, 400);
            background-color: var(--wertgarantie-selection-container-background-color, white);
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
        
        .center{
            text-align: center;
        }
        
        li {
            color: var(--wertgarantie-selection-container-color, #575757);
            font-size: var(--wertgarantie-selection-li-font-size, 13px);
            line-height: var(--wertgarantie-selection-container-line-height, 21px);
            list-style-type: none;
            margin: var(--wertgarantie-selection-li-margin, 0 0 4px 0);
        }

        ul {
            padding-inline-start: 1.5em;
        }

        .icon::before {
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            display: inline-block; 
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            line-height: 1;
            margin:0 0.5rem 0 -1.6em;
        }
    
        .icon-solid::before {
            font-family: "Font Awesome 5 Free",sans-serif;
            font-weight: 900;
            color: var(--wertgarantie-selection-icon-color, #2574be);
        }
        
        .icon-check::before {
            content: "\\F00C";
        }

        .icon-plus::before {
            content: "\\F067";
        }
        
        .icon-pdf::before {
            content: "\\F1C1";
        }
        
        a, a:visited {
            color: var(--wertgarantie-selection-icon-color, #2574be);
            position: static;
        }

        section {
            margin: 0 35px 20px 35px;
        }
        
        
        #order-input {
            color: var(--wertgarantie-selection-checkbox-color, #21314d );
            background-color: #f2f2f2;
            padding: 1.5em;
            font-weight: 700;
        }
        </style>

        <div id="wertgarantie-selection-container">
            <h2 class="wg-title" id="wertgarantie-header"></h2>
            <div id="information" class="center">
                <slot name="wertgarantie-rating-component"></slot>
            </div>
            <section>
                <ul class="advantages-list" id="wertgarantie-advantages-list">
                </ul>
                <ul>
                    <li>
                    <small>
                    <span class="icon icon-solid icon-plus">
                        <slot name="details-prefix"></slot>
                        <a id="product-details"></a>
                    </span>
                    </small>
                    </li>
                    <li>
                    <small>
                    <span class="icon icon-solid icon-pdf">
                        <a id="product-information-sheet"></a>
                        <slot name="information-prefix"></slot>
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
            if (this.getAttribute('data-style')) {
                const shadowStyle = document.createElement('style');
                shadowStyle.innerText = '@import url("' + this.getAttribute('data-style') + '")';
                this.shadowRoot.appendChild(shadowStyle);
            }
            this.policySelectionContainer = this.shadowRoot.querySelector('#wertgarantie-selection-container');
            this.wertgarantieHeader = this.shadowRoot.querySelector('#wertgarantie-header');
            this.advantagesList = this.shadowRoot.querySelector('#wertgarantie-advantages-list');
            this.productDetails = this.shadowRoot.querySelector('#product-details');
            this.productInformationSheet = this.shadowRoot.querySelector('#product-information-sheet');
            this.checkboxLabel = this.shadowRoot.querySelector('#order-label');
            this.overwriteWithUserDefinedAttributes = this.overwriteWithUserDefinedAttributes.bind(this);
            this.checkIfPolicyDefined = this.checkIfPolicyDefined.bind(this);
            this.updateDisplay = this.updateDisplay.bind(this);
        }

        set devicePrice(devicePrice) {
            this.setAttribute("data-device-price", devicePrice);
        }

        set deviceId(deviceId) {
            this.setAttribute("data-device-id", deviceId);
        }

        connectedCallback() {
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

        updateDisplay({title, checkboxLabel, detailsText, detailsUri, infoSheetText, infoSheetUri, advantages = []}) {
            this.wertgarantieHeader.textContent = title;
            this.checkboxLabel.textContent = checkboxLabel;
            this.productDetails.setAttribute('href', detailsUri);
            this.productDetails.textContent = detailsText;
            this.productInformationSheet.setAttribute('href', infoSheetUri);
            this.productInformationSheet.textContent = infoSheetText;

            advantages.forEach((advantage) => {
                const listElement = document.createElement('li');
                const spanElement = document.createElement('span');
                spanElement.innerText = advantage;
                spanElement.classList.add('icon', 'icon-solid', 'icon-check');
                listElement.appendChild(spanElement);
                this.advantagesList.appendChild(listElement);
            });

            this.policySelectionContainer.style.display = "block";
        }

        disconnectedCallback() {
            console.log("disconnected");
        }
    }

    window.customElements.define('wertgarantie-policy-selection', WertgarantiePolicySelection);
})();