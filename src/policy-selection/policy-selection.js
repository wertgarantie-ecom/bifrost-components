(function () {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
        .default-color {
        fill: #84bc34;
        }
        </style>

        <div id="wertgarantie-selection-container">
            <h3 id="wertgarantie-header"></h3>
            <ul id="wertgarantie-advantages-list">
                <slot name="advantages"></slot>
            </ul>
            <ul>
                <li>
                    <slot name="details-prefix"></slot>
                    <a id="product-details"></a>
                </li>
                <li>
                    <slot name="information-prefix">
                    <svg class="default-color" xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"/></svg>
</slot>
                    <a id="product-information-sheet"></a>
                </li>
            </ul>
            <div id="order-input">
                <input type="checkbox" id="order">
                <label id="order-label" for="order"></label>
            </div>
        </div>
    `;

    /*
    TODOs:
     - add policy-selection to storybook
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
            this.checkboxOrderPolicy = this.shadowRoot.querySelector('#order');
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
                throw new Error("fetch data and display data incomplete");
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
                listElement.innerText = advantage;
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