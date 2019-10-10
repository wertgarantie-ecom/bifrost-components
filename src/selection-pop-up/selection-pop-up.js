(function () {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>

        :host {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8em;
        }

        .modal {
            /* display: none; */
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.3);
        }

        .content {
            background-color: rgb(244, 244, 244);
            margin: 5% auto;
            width: 65%;
            animation-name: openModal;
            animation-duration: 1s;
        }

        @keyframes openModal {
            from{opacity: 0}
            to{opacity: 1}
        }

        .head {
            padding: 3em 3em 0.5em 3em;
            display: grid;
            grid-template-columns: 75% 25%;
        }

        .head__left {
            grid-column-start: 1;
            grid-column-end: 1;
            display: inline-block;
            font-size: 0.8em;
        }

        .head__right {
            grid-column-start: 2;
            grid-column-end: 2;
            position: relative;
        }

        .head__title {
            font-size: 1.5em;
            padding-right: 2em;
            text-transform: uppercase;
        }
        
        .closeBtn {
            color: white;
            background-color: rgb(32, 32, 32);
            padding: 0.8em 1.2em 0.8em 1.2em;
            text-align: center;
            cursor: pointer;
            font-size: 1.2em;
            position: absolute;
            top: 0;
            right: 0;
        }

        .head__subtitle {
            padding: 3em 0 1.5em 0;
        }

        .products {
            display: flex;
            position: relative;
            padding-bottom: 1em;
            align-content: center;
        }

        .product {
            width: 50%;
            padding: 2em 3em 0 3em;
            cursor: pointer;
            -webkit-transition: all 0.6s;
        }

        .product--light {
            background-image: linear-gradient(to bottom right, rgb(244, 244, 244),  rgb(235, 235, 235), rgb(220, 220, 220));
        }

        .product--dark {
            background-color: rgb(32, 32, 32);
            color: rgb(244, 244, 244);
        }

        .product--selected {
            opacity: 2;
            box-shadow: 2px 3px 6px rgba(0, 0, 0, .5);
            z-index: 3;
            width: 60%;
            overflow: visible;
        }

        .product--unselected {
            opacity: 0.2;
            z-index: 2;
        }

        .product__base-info {
            padding-bottom: 0.3em;
        }

        .product__base-info--top {
            display: grid;
            grid-template-columns: 50% 50%;
        }

        .product__base-info--top-left {
            grid-column-start: 1;
            grid-column-end: 1;
        }

        .product__base-info--top-right {
            grid-column-start: 2;
            grid-column-end: 2;
            position: relative;
        }

        .radio-container {
            top: 0;
            right: 0;
            position: absolute;
        }

        .product__selection {
            display: none;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }

        .radio-circle {
            display: inline-block;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            cursor: pointer;
        }

        .product__selection:checked + .radio-circle::after {
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            display: inline-block; 
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            font-family: "Font Awesome 5 Free", sans-serif;
            font-weight: 700;
            content: "\\F00C";
            position: absolute;
            top: 18%;
            left: 18%;
        }
        
        .radio-circle--light {
            background-color: rgb(211, 211, 211);
        }
        
        .radio-circle--dark {
            background-color: rgb(70, 70, 70);
        }
        
        .product__title {
            padding-top: 5em;
            max-width: 75%;
            text-transform: uppercase;
            min-height: 2.5em;
        }

        .product__advantages {
            list-style-type: none;
            padding-left: 1.5em;
        }

        product__advantages--top3 {
            padding-left: 2.5em;
        }

        .product__details {
            padding-bottom: 0.7em;
            visibility: hidden;
            opacity: 0;
            max-height: 0;
            transition: all 0.4s;
            transform-origin: left top;
            transform: scaleY(0);
        }

        .advantage {
            font-size: 0.9em;
            padding-top: 0.9em;
        }

        .advantage--included {
            color: var(--wertgarantie-selection-advantage-included-text-color, inherit);
        }

        .advantage--excluded {
            color: var(--wertgarantie-selection-advantage-excluded-text-color, rgb(161, 161, 161));
        }

        .advantage__icon::before {
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            display: inline-block; 
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            font-family: "Font Awesome 5 Free", sans-serif;
            font-weight: 700;
            margin:0 0.5em 0 -1.5em;
        }

        .advantage__icon--included::before {
            content: "\\F00C";
        }

        .advantage__icon--excluded::before {
            content: "\\F05E";
        }

        .details-hr {
            margin: 1em 0 1em 0;
        }

        .details-hr--light {
            border-top: 1px solid rgb(32, 32, 32);
        }

        .details-hr--dark {
            border-top: 1px solid rgb(244, 244, 244);
        }

        .product-info-link {
            padding-top: 2em;
            align-self: center;
            text-align: center;
        }

        .terms {
            text-align: center;
            padding: 2em 3em;
            visibility: hidden;
            opacity: 0;
            max-height: 0;
            transition: height 0.6s;
            transform-origin: left top;
            transform: scaleY(0);
        }

        .product__details--expanded, .terms--expanded {
            visibility: visible;
            opacity: 1;
            max-height: 100%;
            // transition: all 0.6s;
            transform: scaleY(1);
        }

        .award-image-block {
            display: inline-block;
            padding: 2em;
        }
        
        .award-image {
            vertical-align: text-top;
            max-height: 80px;
        }

        .button-section {
            padding: 3em;
            display: flex;
            justify-content: space-between;
        }

        .button {
            cursor: pointer;
            background: none;
            outline: none;
            padding: 1.5em 3em 1.5em 3em;
            font-size: 0.9em;
            border: 2px solid rgb(32, 32, 32);
            transition: all 0.4s;
        }

        .button--dark {
            background-color: rgb(32, 32, 32);
            color: rgb(244, 244, 244);
        }

        .button--light {
            background-color: rgb(244, 244, 244);
            color: rgb(32, 32, 32);
        }

        .order-button {
            display: none;
        }
    
    </style>

    <div class="modal" id="modal">
        <div class="content">
            <div class="head">
                <div class="head__left">
                    <strong class="head__title">Wird oft dazugebucht</strong>
                    <!-- wird slot -->
                    <slot name="wertgarantie-rating-component"></slot>
                </div>
                <div class="head__right">
                    <span class="closeBtn" id="closeBtn">&times;</span>
                </div>
                <p class="head__subtitle">Wählen Sie den Schutz, der Ihren Bedürfnissen am besten entpsricht:</p>
            </div>
            <section class="products" id="products">
            </section>
            <section class="terms" id="terms">
                <div>
                    <strong>Bedingungen</strong><br/><br/>
                    <small>Informationsblatt zu Versicherungsprodukten: <a href="www.example.com">www.example.com</a></small><br/>
                    <small>Allgemeine Versicherungsbedingungen: <a href="www.example.com">www.example.com</a></small><br/>
                    <p>Versicherung ist Vertrauenssache, deshalb setzt "PARTNERSHOP" neben <strong>500.000 zufriedener Kunden</strong> auf die <strong>Wertgarantie</strong>, den <strong>Testsieger in Sachen Sicherheit</strong></p>
                </div>
                
                <div class="award-image-block">
                    <a target="_blank" href="https://www.certipedia.com/quality_marks/9105052129"><img class="award-image" src="https://www.wertgarantie.de/portaldata/4/resources/Icons/tuev-logo.png" alt="tuev-logo"></a>
                    <a target="_blank" href="https://www.wertgarantie.de/Home.aspx#"><img class="award-image" src="https://www.wertgarantie.de/Portaldata/4/Resources/logos/test-bild-wertgarantie-109-01.png" alt="test-bild"></a>
                </div>
                <section>
                    <wertgarantie-rating 
                        data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/rating"
                        data-show-rating-number="false"
                        slot="wertgarantie-rating-component">
                    </wertgarantie-rating>
                </section>
            </section>
            <section class="button-section">
                <div>
                    <button class="button button--dark" id="detailsBtn">Details anzeigen</button>
                </div>
                <div>
                    <button class="button button--light" id="cancelOrder">Ich möchte das Produkt nicht absichern</button>
                    <button class="button button--dark order-button" id="orderBtn">Beides in den Warenkorb</button>
                </div>
            </section>
        </div>
    </div>
    `;

    let productTemplate = `
        <div class="product__base-info">
            <div class="product__base-info--top">
                <div class="product__base-info--top-left">
                    <small class="payment-interval">monatlich</small><br/>
                    <strong class="price-display">ab X,XX €</strong><br/>
                    <small class="tax-display">(inkl. x,xx€ VerSt**)</small>
                </div>
                <div class="product__base-info--top-right">
                    <label class="radio-container">
                        <input class="product__selection" type="radio" name="product-id"/>
                        <span class="radio-circle"></span>
                    </label>
                </div>
            </div>
            <div class="product__base-info--bottom">
                <h3 class="product__title">Smartphone Komplettschutz Basis</h3>
                <ul class="product__advantages product__advantages--top3">
            </div>
            </ul>
        </div>
        <div class="product__details">
            <hr class="details-hr">
            <ul class="product__advantages product__advantages--details">
            </ul>
            <p class="product-info-link"><strong>Mehr zum Produkt auf <a href="www.example.com">www.example.com</a>.</strong></p>
        </div>
        `;

    class WertgarantieSelectionPopUp extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.modal = this.shadowRoot.querySelector('#modal');
            this.closeBtn = this.shadowRoot.querySelector('#closeBtn');
            this.productSection = this.shadowRoot.querySelector('#products');
            this.detailsBtn = this.shadowRoot.querySelector('#detailsBtn');
            this.terms = this.shadowRoot.querySelector('#terms');
            this.orderBtn = this.shadowRoot.querySelector('#orderBtn');

            // method binding:
            this.allDisplayDataAvailable = this.allDisplayDataAvailable.bind(this);
            this.setupDisplay = this.setupDisplay.bind(this);
            this.expandDetailsAndTermsSections = this.expandDetailsAndTermsSections.bind(this);
        }

        set devicePrice(devicePrice) {
            this.setAttribute("data-device-price", devicePrice);
        }

        set deviceId(deviceId) {
            this.setAttribute("data-device-id", deviceId);
        }

        connectedCallback() {
            // setup event listeners
            this.closeBtn.addEventListener('click', () => this.modal.style.display = 'none');
            this.detailsBtn.addEventListener('click', this.expandDetailsAndTermsSections);
                
            this._upgradeProperty('deviceId');
            this._upgradeProperty('devicePrice');

            const addIfDefined = (object, name, property) => {
                if (property) object[name] = property;
            };

            const fetchData = {};
            addIfDefined(fetchData, 'devicePrice', this.getAttribute('data-device-price'));
            addIfDefined(fetchData, 'deviceId', this.getAttribute('data-device-id'));
            addIfDefined(fetchData, 'fetchUri', this.getAttribute('data-fetch-uri'));

            this.fetchPolicy(fetchData)
                .then(this.allDisplayDataAvailable) // check if display data is complete
                .then(this.setupDisplay);
        }

        expandDetailsAndTermsSections() {
            const detailsSections = this.shadowRoot.querySelectorAll('.product__details');
            detailsSections.forEach(section => {
                section.classList.toggle('product__details--expanded');
            });
            this.terms.classList.toggle('terms--expanded');
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
                if (!(data.name && data.detailsDocText && data.detailsDocUri && data.advantages && data.top_3
                    && data.excludedAdvantages && data.infoSheetUri && data.infoSheetText && data.paymentInterval
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

        setupDisplay(displayData) {
            displayData.products.forEach((product, idx) => {
                let newProductDiv = document.createElement('div');
                newProductDiv.classList.add('product');
                newProductDiv.innerHTML = productTemplate;
                
                // Set alternating light and dark styling for products
                if (idx % 2 === 0) {
                    newProductDiv.classList.add('product--light');
                    newProductDiv.querySelector('.radio-circle').classList.add('radio-circle--light')
                    newProductDiv.querySelector('.details-hr').classList.add('details-hr--light')
                } else {
                    newProductDiv.classList.add('product--dark');
                    newProductDiv.querySelector('.radio-circle').classList.add('radio-circle--dark')
                    newProductDiv.querySelector('.details-hr').classList.add('details-hr--dark')
                }

                // Update price display
                newProductDiv.querySelector('.payment-interval').textContent = product.paymentInterval;
                newProductDiv.querySelector('.price-display').textContent = product.priceFormatted;
                newProductDiv.querySelector('.tax-display').textContent = product.taxFormatted;
                newProductDiv.querySelector('.product__title').textContent = product.name;
                newProductDiv.querySelector(".product__selection").value = product.id;

                // Assemble Top 3 advantages to product head
                product.top_3.forEach(advantage => {
                    const listElement = document.createElement('li');
                    listElement.classList.add('advantage', 'advantage--included');
                    
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('advantage__icon', 'advantage__icon--included');
                    spanElement.textContent = advantage;

                    listElement.appendChild(spanElement);

                    newProductDiv.querySelector('.product__advantages--top3').appendChild(listElement);
                })

                // Assemble Product Details
                product.excludedAdvantages.forEach(excludedAdvantage => {
                    const listElement = document.createElement('li');
                    listElement.classList.add('advantage', 'advantage--excluded');
                    
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('advantage__icon', 'advantage__icon--excluded');
                    spanElement.textContent = excludedAdvantage;

                    listElement.appendChild(spanElement);

                    newProductDiv.querySelector('.product__advantages--details').appendChild(listElement);
                })

                product.advantages.forEach(advantage => {
                    const listElement = document.createElement('li');
                    listElement.classList.add('advantage', 'advantage--included');
                    
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('advantage__icon', 'advantage__icon--included');
                    spanElement.textContent = advantage;

                    listElement.appendChild(spanElement);

                    newProductDiv.querySelector('.product__advantages--details').appendChild(listElement);
                })

                newProductDiv.addEventListener('click', () => {
                    newProductDiv.querySelector(".product__selection").checked = true;
                    this.orderBtn.style.display = "inline-block";
                    console.log("Id of the clicked product: " + newProductDiv.querySelector('.product__selection').value);
                    this.productSection.querySelectorAll('.product').forEach(productDiv => {
                        if (productDiv.querySelector('.product__selection').value === newProductDiv.querySelector('.product__selection').value) {
                            productDiv.classList.remove('product--unselected');
                            productDiv.classList.add('product--selected');
                            console.log("needs to be selected");
                        } else {
                            productDiv.classList.add('product--unselected');
                            productDiv.classList.remove('product--selected');
                            console.log("needs to be unselected");
                        }
                    });
                });
                this.productSection.appendChild(newProductDiv);

            });
        }
    }
    window.customElements.define('wertgarantie-selection-pop-up', WertgarantieSelectionPopUp);
})();