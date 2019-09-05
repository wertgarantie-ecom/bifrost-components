(function() {
    const template = document.createElement('template');
    template.innerHTML = `
        <div class="policy-selection">
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
    
    class PolicySelection extends HTMLElement {
    
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.wgHeader = this.shadowRoot.querySelector('#wg-header');
            this.advantagesList = this.shadowRoot.querySelector('#wg-advantages-list');
            this.productDetails = this.shadowRoot.querySelector('#product-details');
            this.productInformationSheet = this.shadowRoot.querySelector('#product-information-sheet');
            this.checkboxOrderPolicy = this.shadowRoot.querySelector('#order');
            this.checkboxLabel = this.shadowRoot.querySelector('#order-label');
            this.fetchUri = "http://localhost:3000/wertgarantie/policies";

            this.overwriteWithUserDefinedAttributes = this.overwriteWithUserDefinedAttributes.bind(this);
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
                fetchUri: this.getAttribute('data-fetch-uri'),
                allSet: () => this.title && this.checkboxLabel && this.detailsText && this.detailsUri && this.infoSheetText && this.infoSheetUri
            };

            if (definedAttributes.fetchUri) {
                this.fetchUri = definedAttributes.fetchUri;
            }
            this.fetchPolicy(this.fetchUri, definedAttributes)
                .then((fetchedValues) => this.overwriteWithUserDefinedAttributes(fetchedValues, definedAttributes))
                .then(this.checkIfPolicyDefined)
                .then(this.updateDisplay);


            // const listElement = document.createElement('li');
            // listElement.innerText = "Appended child for advantages list";
            // this.advantagesList.appendChild(listElement);

        }
        async fetchPolicy(fetchUri, definedAttributes) {
            if (!fetchUri || definedAttributes.allSet()) {
                return {};
            } 
            try {
                const response = await fetch(fetchUri);
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

            /*
            title: this.getAttribute('data-title'),
                checkboxLabel: this.getAttribute('data-checkbox-label'),
                detailsText: this.getAttribute('data-details-text'),
                detailsUri: this.getAttribute('data-details-uri'),
                infoSheetText: this.getAttribute('data-information-sheet-text'),
                infoSheetUri: this.getAttribute('data-information-sheet-uri'),
                fetchUri: this.getAttribute('data-fetch-uri'),
            */
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
            if (!values || !values.infoSheetUri) {
                throw new Error("policy undefined");
            }
            return values
        }

        updateDisplay({title, checkboxLabel, detailsText, detailsUri, infoSheetText, infoSheetUri}) {
            this.wgHeader.textContent = title;
            this.checkboxLabel.textContent = checkboxLabel;
            this.productDetails.setAttribute('href', detailsUri);
            this.productDetails.textContent = detailsText;
            this.productInformationSheet.setAttribute('href', infoSheetUri);
            this.productInformationSheet.textContent = infoSheetText;
        }
    
    }
    window.customElements.define('wg-policy-selection', PolicySelection);
})();