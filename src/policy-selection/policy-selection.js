(function () {
    const template = document.createElement('template');
    template.innerHTML = `
        <div id="policy-selection-container">
            <div id="wg-header"></div>
            <ul id="wg-advantages-list">
                <slot name="advantages"></slot>
            </ul>
            <ul>
                <li>
                    <a id="product-details"></a>
                </li>
                <li>
                    <a id="product-information-sheet"></a>
                </li>
            </ul>
            <div class="checkboxOrderPolicy">
                <input type="checkbox" id="order">
                <label id="order-label" for="order"></label>
            </div>
        </div>
    `;


    /*
    TODOs:
     - do not display element on error or missing values
     - we need to provide auth information
     - we need to send query params to midgard
     - let's style
     - what to do with multiple product offerings?
     - what to do with multiple documents?
     */
    class PolicySelection extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.policySelectionContainer = this.shadowRoot.querySelector('#policy-selection-container');
            this.wgHeader = this.shadowRoot.querySelector('#wg-header');
            this.advantagesList = this.shadowRoot.querySelector('#wg-advantages-list');
            this.productDetails = this.shadowRoot.querySelector('#product-details');
            this.productInformationSheet = this.shadowRoot.querySelector('#product-information-sheet');
            this.checkboxOrderPolicy = this.shadowRoot.querySelector('#order');
            this.checkboxLabel = this.shadowRoot.querySelector('#order-label');

            this.overwriteWithUserDefinedAttributes = this.overwriteWithUserDefinedAttributes.bind(this);
            this.checkIfPolicyDefined = this.checkIfPolicyDefined.bind(this);
            this.updateDisplay = this.updateDisplay.bind(this);
            this.updateDisplay = this.updateDisplay.bind(this);
        }

        connectedCallback() {
            const definedAttributes = {
                title: this.getAttribute('data-title'),
                checkboxLabel: this.getAttribute('data-checkbox-label'),
                detailsText: this.getAttribute('data-details-text'),
                detailsUri: this.getAttribute('data-details-uri'),
                infoSheetText: this.getAttribute('data-information-sheet-text'),
                infoSheetUri: this.getAttribute('data-information-sheet-uri'),
                devicePrice: this.getAttribute('data-device-price'),
                deviceId: this.getAttribute('data-device-id'),
                fetchUri: this.getAttribute('data-fetch-uri'),
            };

            this.fetchPolicy(definedAttributes)
                .then((fetchedValues) => this.overwriteWithUserDefinedAttributes(fetchedValues, definedAttributes))
                .then(this.checkIfPolicyDefined)
                .then(this.updateDisplay);
        }

        async fetchPolicy({fetchUri, devicePrice, deviceId}) {
            if (!fetchUri) {
                return {};
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

        overwriteWithUserDefinedAttributes(fetchedValues, definedAttributes) {
            const merge = (object1, object2) => {
                return {...object1, ...object2}
            };

            const addIfDefined = (object, name, property) => {
                if (property) object[name] = property;
            };

            const userData = {};
            addIfDefined(userData, 'title', definedAttributes.title);
            addIfDefined(userData, 'checkboxLabel', definedAttributes.checkboxLabel);
            addIfDefined(userData, 'detailsText', definedAttributes.detailsText);
            addIfDefined(userData, 'detailsUri', definedAttributes.detailsUri);
            addIfDefined(userData, 'infoSheetText', definedAttributes.infoSheetText);
            addIfDefined(userData, 'infoSheetUri', definedAttributes.infoSheetUri);

            return merge(fetchedValues, userData);
        }

        checkIfPolicyDefined(values) {
            // TODO on error we should hide our complete component, just throwing an error is not enough
            if (!values || !values.infoSheetUri) {
                this.policySelectionContainer.innerHTML = `<div>Service ist momentan nicht verfügbar</div>`;
                throw new Error("policy undefined");
            }
            return values
        }

        updateDisplay({title, checkboxLabel, detailsText, detailsUri, infoSheetText, infoSheetUri, advantages = []}) {
            this.wgHeader.textContent = title;
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
        }
    }
    window.customElements.define('wg-policy-selection', PolicySelection);
})();