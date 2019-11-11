(function () {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>

        :host {
            font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
            font-size: 0.8em;
        }

        .modal {
            display: none;
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
            background-color: var(--wertgarantie-popup-background-color, rgb(244, 244, 244));
            margin: 5% auto;
            width: 75%;
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
            background-color: var(--wertgarantie-popup-dark-button-background-color, rgb(32, 32, 32));
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
        }

        .product {
            width: 50%;
            cursor: pointer;
            -webkit-transition: all 0.6s;
        }

        .product__head--background {
            color: white;
        }
        
        .product__head--background-even {
            --image-link-even: linear-gradient(to top right, #006EFF, rgba(81,61,61,0));
            background-image: var(--wertgarantie-popup-product-background-even, 
                linear-gradient(to bottom right, rgba(0,0,0,0), #000),
                linear-gradient(to top right, #006EFF, rgba(81,61,61,0))),
                var(--image-link-even);
            background-size: cover;
        }

        .product__head--background-odd {
            --image-link-odd: linear-gradient(to top right, rgba(0,0,0,0), #000);
            background-image: var(--wertgarantie-popup-product-background-odd,
                linear-gradient(to bottom right, rgba(81,61,61,0), rgba(255, 145, 0, 0.6)),
                linear-gradient(to top right, rgba(0,0,0,0), #000)),
                var(--image-link-odd);
            background-size: cover;
        }

        .product--selected {
            opacity: 1;
            z-index: 3;
            width: 60%;
            background-color: #f7f7f7;
        }

        .product--selected-left {
            margin-right: -10%;
        }
        
        .product--selected-right {
            margin-left: -10%;
        }

        .product--unselected {
            opacity: 0.2;
            z-index: 2;
        }

        .product__base-info {
            opacity: 1;
            padding: 2em 3em 2em 3em;
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
            background-color: rgb(70, 70, 70);
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
        
        .product__title {
            padding-top: 5em;
            max-width: 75%;
            text-transform: uppercase;
            min-height: 3em;
        }

        .product__advantages {
            list-style-type: none;
            padding-left: 1.5em;
            -webkit-transition: all 0.6s;
        }

        product__advantages--top3 {
            padding-left: 2.5em;
        }

        .product__details {
            visibility: hidden;
            overflow: auto;
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

        .product__details-footer {
            text-align: center;
            padding: 2em 3em;
            visibility: hidden;
            opacity: 0;
            max-height: 0;
            transition: height 0.6s;
            transform-origin: left top;
            transform: scaleY(0);
        }

        .product__details--expanded, .product__details-footer--expanded {
            visibility: visible;
            opacity: 1;
            max-height: 100%;
            transition: all 0.6s;
            transform: scaleY(1);
            padding: 0 3em 1.7em 3em;
        }

        .product__terms {
            margin-top: 3em;
            font-size: 0.8em;
        }

        .product-further-info {
            text-align: center;
            padding-top: 1em;
        }

        .wg-link {
            text-decoration: none;
            color: #39f;
        }

        wg-infosheet-link {
            font-size: 8px;
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
            padding: 0 3em 3em 3em;
            display: flex;
            justify-content: space-between;
        }

        .button {
            font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
            font-size: 0.9em;
            cursor: pointer;
            background: none;
            outline: none;
            padding: 1.5em 3em 1.5em 3em;
            border: 2px solid var(--wertgarantie-popup-dark-button-background-color, rgb(32, 32, 32));
            transition: all 0.4s;
        }

        .button--dark {
            background-color: var(--wertgarantie-popup-dark-button-background-color, rgb(32, 32, 32));
            color: var(--wertgarantie-popup-dark-button-text-color, rgb(244, 244, 244));
        }

        .button--light {
            background-color: var(--wertgarantie-popup-light-button-background-color, rgb(244, 244, 244));
            color: var(--wertgarantie-popup-light-button-text-color, rgb(32, 32, 32));
        }

        .order-button {
            display: none;
        }

        .wg-rating-default {
            --wertgarantie-rating-font-family: var(--wertgarantie-embedded-rating-font-family, "Open Sans", sans-serif);
            --wertgarantie-rating-font-size: 0.7rem;
            --wertgarantie-rating-text-color: rgb(134, 134, 134);
            
            --wertgarantie-rating-stars-font-size: 15px;
            --wertgarantie-rating-stars-color: orange;
        }

    </style>

    <div class="modal" id="modal">
        <div class="content">
            <div class="head">
                <div class="head__left">
                    <strong class="head__title">Wird oft dazugebucht</strong>
                    <wertgarantie-rating 
                        class="wg-rating-default"
                        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"
                        data-show-rating-number="false">
                    </wertgarantie-rating>
                </div>
                <div class="head__right">
                    <span class="closeBtn" id="closeBtn">&times;</span>
                </div>
                <p class="head__subtitle">Wählen Sie den Schutz, der Ihren Bedürfnissen am besten entspricht:</p>
            </div>
            <section class="products" id="products">
            </section>
            <section class="product__details-footer">
                <div>
                    <p>Versicherung ist Vertrauenssache, deshalb setzt "PARTNERSHOP" neben <strong>500.000 zufriedener Kunden</strong> auf die <strong>Wertgarantie</strong>, den <strong>Testsieger in Sachen Sicherheit</strong></p>
                </div>
                
                <div class="award-image-block">
                    <a target="_blank" href="https://www.certipedia.com/quality_marks/9105052129"><img class="award-image" src="https://www.wertgarantie.de/portaldata/4/resources/Icons/tuev-logo.png" alt="tuev-logo"></a>
                    <a target="_blank" href="https://www.wertgarantie.de/Home.aspx#"><img class="award-image" src="https://www.wertgarantie.de/Portaldata/4/Resources/logos/test-bild-wertgarantie-109-01.png" alt="test-bild"></a>
                </div>
            </section>
            <section class="button-section">
                <div>
                    <button class="button button--dark" id="detailsBtn">Details anzeigen</button>
                </div>
                <div>
                    <button class="button button--light" id="cancelOrder">Ich möchte nicht absichern</button>
                    <button class="button button--dark order-button" id="orderBtn">Beides in den Warenkorb</button>
                </div>
            </section>
        </div>
    </div>
    `;

    let productTemplate = `
        <div class="product__head--background">
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
        </div>
        <div class="product__details">
            <h3>Details</h3>
            <ul class="product__advantages product__advantages--details">
            </ul>
            <div class="product__terms">
                <div>
                    <p><strong>Bedingungen</strong></p>
                    <a class="wg-link wg-infosheet-link wg-product-info-sheet" href="http://www.example.com">Informationsblatt zu Versicherungsprodukten</a><br/>
                    <a class="wg-link wg-infosheet-link wg-avb" href="http://www.example.com">Allgemeine Versicherungsbedingungen</a>
                </div>
                <div style="text-align: center; padding-top: 1em;">
                    <p><strong>Mehr zum <a target="_blank" class="wg-link info-sheet-link">Produkt</a> und der <a target="_blank" class="wg-link" href="http://www.example.com/">Wertgarantie</a>.</strong></p>
                </div>
            </div>
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
            this.productDetailsFooter = this.shadowRoot.querySelector('.product__details-footer');
            this.orderBtn = this.shadowRoot.querySelector('#orderBtn');

            // method binding:
            this.allDisplayDataAvailable = this.allDisplayDataAvailable.bind(this);
            this.setupDisplay = this.setupDisplay.bind(this);
            this.expandDetailsSections = this.expandDetailsSections.bind(this);
            this.open = this.open.bind(this);
            this.close = this.close.bind(this);
        }

        set devicePrice(devicePrice) {
            this.setAttribute("data-device-price", devicePrice);
        }

        set deviceClass(deviceClass) {
            this.setAttribute("data-device-class", deviceClass);
        }

        open() {
            this.modal.style.display = 'block';
        }

        close() {
            this.modal.style.display = 'none';
        }

        connectedCallback() {
            // setup event listeners
            this.closeBtn.addEventListener('click', this.close);
            this.detailsBtn.addEventListener('click', this.expandDetailsSections);

            this._upgradeProperty('deviceClass');
            this._upgradeProperty('devicePrice');

            const addIfDefined = (object, name, property) => {
                if (property) object[name] = property;
            };

            const fetchData = {};
            addIfDefined(fetchData, 'devicePrice', this.getAttribute('data-device-price'));
            addIfDefined(fetchData, 'deviceClass', this.getAttribute('data-device-class'));
            addIfDefined(fetchData, 'fetchUri', this.getAttribute('data-fetch-uri'));

            this.fetchPolicy(fetchData)
                .then(this.allDisplayDataAvailable) // check if display data is complete
                .then(this.setupDisplay);
        }

        expandDetailsSections() {
            const detailsSections = this.shadowRoot.querySelectorAll('.product__details');
            detailsSections.forEach(section => {
                section.classList.toggle('product__details--expanded');
            });
            this.productDetailsFooter.classList.toggle('product__details-footer--expanded');
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

        async fetchPolicy({fetchUri, devicePrice, deviceClass}) {
            if (!(fetchUri && devicePrice && deviceClass)) {
                this.remove();
                throw new Error("fetch data incomplete\n" +
                    "fetchUri: " + fetchUri + "\n" +
                    "devicePrice: " + devicePrice + "\n" +
                    "deviceClass: " + deviceClass
                );
            }
            try {
                const url = new URL(fetchUri);
                const queryParams = {
                    devicePrice: devicePrice,
                    deviceClass: deviceClass
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
                    if(product.imageLink) {
                        newProductDiv.querySelector('.product__head--background').style.setProperty('--image-link-even', 'url("' + product.imageLink + '")');
                    }
                    newProductDiv.querySelector('.product__head--background').classList.add('product__head--background-even');
                } else {
                    if(product.imageLink) {
                        newProductDiv.querySelector('.product__head--background').style.setProperty('--image-link-odd', 'url("' + product.imageLink + '")');
                    }
                    newProductDiv.querySelector('.product__head--background').classList.add('product__head--background-odd');
                }

                // Update price display
                newProductDiv.querySelector('.payment-interval').textContent = product.paymentInterval;
                newProductDiv.querySelector('.price-display').textContent = product.priceFormatted;
                newProductDiv.querySelector('.tax-display').textContent = product.taxFormatted;
                newProductDiv.querySelector('.product__title').textContent = product.name;
                newProductDiv.querySelector('.product__selection').value = product.id;
                newProductDiv.querySelector('.info-sheet-link').href = product.infoSheetUri;

                // Assemble Top 3 advantages to product head
                product.top_3.forEach(advantage => {
                    const listElement = document.createElement('li');
                    listElement.classList.add('advantage', 'advantage--included');

                    const spanElement = document.createElement('span');
                    spanElement.classList.add('advantage__icon', 'advantage__icon--included');
                    spanElement.textContent = advantage;

                    listElement.appendChild(spanElement);

                    newProductDiv.querySelector('.product__advantages--top3').appendChild(listElement);
                });

                // Assemble Product Details
                product.excludedAdvantages.forEach(excludedAdvantage => {
                    const listElement = document.createElement('li');
                    listElement.classList.add('advantage', 'advantage--excluded');

                    const spanElement = document.createElement('span');
                    spanElement.classList.add('advantage__icon', 'advantage__icon--excluded');
                    spanElement.textContent = excludedAdvantage;

                    listElement.appendChild(spanElement);

                    newProductDiv.querySelector('.product__advantages--details').appendChild(listElement);
                });

                product.advantages.forEach(advantage => {
                    const listElement = document.createElement('li');
                    listElement.classList.add('advantage', 'advantage--included');

                    const spanElement = document.createElement('span');
                    spanElement.classList.add('advantage__icon', 'advantage__icon--included');
                    spanElement.textContent = advantage;

                    listElement.appendChild(spanElement);

                    newProductDiv.querySelector('.product__advantages--details').appendChild(listElement);
                });

                newProductDiv.querySelector('.wg-product-info-sheet').setAttribute('href', product.infoSheetUri);
                newProductDiv.querySelector('.wg-avb').setAttribute('href', product.detailsDocUri);


                // add listeners
                newProductDiv.addEventListener('click', () => {
                    if (newProductDiv.querySelector(".product__selection").checked) {
                        newProductDiv.querySelector(".product__selection").checked = false;
                        this.restoreHighlighting(newProductDiv);
                    } else {
                        newProductDiv.querySelector(".product__selection").checked = true;
                        this.orderBtn.style.display = "inline-block";
                        this.highlightProduct(newProductDiv);
                    }
                });

                newProductDiv.addEventListener('mouseover', () => {
                    this.highlightProduct(newProductDiv);
                });

                newProductDiv.addEventListener('mouseleave', () => {
                    this.restoreHighlighting();
                });

                this.productSection.appendChild(newProductDiv);
            });
        }

        highlightProduct(newProductDiv) {
            this.productSection.querySelectorAll('.product').forEach((productDiv, idx) => {
                if (productDiv.querySelector('.product__selection').value === newProductDiv.querySelector('.product__selection').value) {
                    this.markAsSelected(productDiv, idx);
                } else {
                    this.markAsUnselected(productDiv);
                }
            });
        }

        restoreHighlighting() {
            let checked = false;
            this.productSection.querySelectorAll('.product').forEach((productDiv, idx) => {
                this.markAsUnselected(productDiv);

                if (productDiv.querySelector(".product__selection").checked) {
                    checked = true;
                    this.markAsSelected(productDiv, idx);
                }
            });
            if (!checked) {
                this.productSection.querySelectorAll('.product').forEach(productDiv => {
                    productDiv.classList.remove('product--unselected');
                });
                this.orderBtn.style.display = "none";
            }
        }

        markAsSelected(productDiv, idx) {
            productDiv.classList.remove('product--unselected');
            productDiv.classList.add('product--selected');
            if (idx % 2 === 0) {
                productDiv.classList.add('product--selected-left');
            } else {
                productDiv.classList.add('product--selected-right');
            }
        }

        markAsUnselected(productDiv) {
            productDiv.classList.add('product--unselected');
            productDiv.classList.remove('product--selected');
            productDiv.classList.remove('product--selected-left');
            productDiv.classList.remove('product--selected-right');
        }
    }

    window.wertgarantieSelectionPopUpOpen = () => {
        const name = 'wertgarantie-selection-pop-up';
        if (customElements.get(name)) {
            document.querySelector(name).open();
        } else {
            customElements.define(name, WertgarantieSelectionPopUp);
        }
    }
})();