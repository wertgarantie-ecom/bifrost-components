(function () {

    const template = document.createElement('template');
    template.innerHTML = `
        <style>

            :host {
                font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
            }

            .component {
                max-width: 1100px;            
                display: flex;
                background-color: white;
            }

            .info {
                flex: 2;
                padding: 1em;
                width: 66%;
            }

            .header {
                display: flex;
                width: 100%;
                background-color: rgb(230, 230, 230);
            }

            .header__icon {
                flex: 1;
                min-width: 50px;
                background-color: rgb(50, 50, 50);
                color: white;
                text-align: center;
                position: relative;
            }

            .shield::after {
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                display: inline-block; 
                font-style: normal;
                font-family: "Font Awesome 5 Free", sans-serif;
                font-weight: 700;
                font-size: 20px;
                content: "\\F3ED";
                position: absolute;
                top:30%;
                left:30%;
            }

            .header__title {
                flex: 12.5;
                padding: 1em;
                text-align: center;
                font-weight: 700;
                text-transform: uppercase;
                font-size: 0.7em;
                line-height: 26px;
            }

            .header__title__text {
                vertical-align: middle;
            }

            .product__tabs {
                padding-top: 1em;
                padding-left: 50px;
                display: flex;
                flex-direction: row;
            }

            .tab {
                border: 1px solid rgb(230, 230, 230);
                padding: 0.8em;
                width: 18%;
                margin-right: 1.5em;
                font-size: 0.8em;
                font-weight: 700;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
            }

            .tab:hover {
                background-color: rgb(230, 230, 230);
            }

            .tab--selected {
                background-color: rgb(230, 230, 230);
            }

            .remove-product {
                cursor: pointer;
                font-size: 1em;
            }

            .confirmation__header {
                padding-top: 1.5em;
                padding-left: 50px;
                font-weight: 700;
                font-size: 0.8em;
                text-transform: uppercase;
            }

            .confirmation__row {
                padding-top: 1em;
                display: flex;

            }

            .confirmation__checkbox {
                min-width: 40px;
                padding-left: 10px;
            }

            .confirmation__text {
                width: auto;
                font-size: 0.8em;
            }

            .confirmation__footer {
                padding-top: 1.5em;
                padding-left: 50px;
                font-weight: 700;
                font-size: 0.7em;
            }

            .product {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 1em;
                color: white;
            }

            .product--even {
                --image-link-even: url('https://wertgarantie-bifrost.s3.eu-central-1.amazonaws.com/utah-mountain-biking-bike-biking-71104.jpeg');
                background-image: var(--wertgarantie-popup-product-background-even, 
                    linear-gradient(to bottom right, rgba(0,0,0,0), #000),
                    linear-gradient(to top right, #006EFF, rgba(81,61,61,0))),
                    var(--image-link-even);
                background-size: cover;
            }

            .product--odd {
                --image-link-odd: linear-gradient(to top right, rgba(0,0,0,0), #000);
                background-image: var(--wertgarantie-popup-product-background-odd,
                    linear-gradient(to bottom right, rgba(81,61,61,0), rgba(255, 145, 0, 0.6)),
                    linear-gradient(to top right, rgba(0,0,0,0), #000)),
                    var(--image-link-odd);
                background-size: cover;
            }

            .product__price-info--small {
                font-size: 0.7em;
                opacity: 0.7;
            }

            .product__price-info--strong {
                font-weight: 700;
                font-size: 0.9em;
            }

            .product__title {
                padding-top: 6em;
                text-transform: uppercase;
                font-weight: 800;
            }

            .product__advantages {
                list-style-type: none;
                padding-inline-start: 1.5em;
            }

            .product__advantage {
                opacity: 0.8;
                font-size: 0.8em;
                padding-top: 0.7em;
            }

            .advantage__icon::before {
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                display: inline-block; 
                font-family: "Font Awesome 5 Free", sans-serif;
                font-weight: 700;
                margin:0 0.5em 0 -1.5em;
                content: "\\F00C";
            }

            .wg-link {
                text-decoration: none;
                color: #39f;
            }

            .product-link {
                font-size: 0.65em;
            }
    
        </style>

        <div class="component">
            <section class="info">
                <div class="header">
                    <div class="header__icon">
                        <i class="shield"></i>
                    </div>
                    <div class="header__title">
                        <span class="header__title__text">Herzlichen Glückwunsch, du hast den bestmöglichen Schutz für dein Bike ausgewählt.</span>
                    </div>
                </div>
                <div class="product__tabs"> 
                    <div class="tab tab--selected">
                        <div>
                            Fahrrad 1
                        </div>
                        <div class="remove-product">
                            &times;
                        </div>
                    </div>
                    <div class="tab">
                        <div>
                            Fahrrad 2
                        </div>
                        <div>
                            &times;
                        </div>
                    </div>
                    <div class="tab">
                        <div>
                            Fahrrad 3
                        </div>
                        <div>
                            &times;
                        </div>
                    </div>
                </div>
                <div class="confirmation__header">
                    Bitte bestätige noch kurz:
                </div>
                <div class="confirmation__row">
                    <div class="confirmation__checkbox">
                        <input type="checkbox" />
                    </div>
                    <div class="confirmation__text">
                        Ich akzeptiere die Allgemeinen Versicherungsbedingungen (AVB) und die Bestimmungen zum Datenschutz. 
                        Das gesetzliche Widerrufsrecht, das Produktinformationsblatt (IPID) und die Vermittler-Erstinformation habe ich zur 
                        Kenntnis genommen und alle Dokumente heruntergeladen. Mit der Bestätigung der Checkbox erkläre ich mich damit einverstanden, 
                        dass mir alle vorstehenden Unterlagen an meine E-Mail-Adresse übermittelt werden. Der Übertragung meiner Daten an Wertgarantie 
                        stimme ich zu. Der Betrag wird separat per Rechnung bezahlt.
                    </div>
                </div>
                <div class="confirmation__row">
                    <div class="confirmation__checkbox">
                        <input type="checkbox" />
                    </div>
                    <div class="confirmation__text">
                        Ich bestätige, dass ich ein Fahrradschloss mit einem Mindestkaufpreis von 49,00 € zur Sicherung meines Fahrrads nutzen werde.
                    </div>
                </div>
                <div class="confirmation__footer">
                    <strong>Mehr zum <a target="_blank" class="wg-link">Produkt</a> und der <a target="_blank" class="wg-link" href="http://www.example.com/">Wertgarantie</a>.</strong>
                </div>
            </section>
            <div class="product product--even">
                <div>
                    <span class="product__price-info--small">monatlich</span><br/>
                    <span class="product__price-info--strong">X,XX €</span><br/>
                    <span class="product__price-info--small">(inkl. x,xx€ VerSt**)</span>
                </div>
                <div>
                    <div class="product__title">Fahrrad Komplettschutz Basis</div>
                    <ul class="product__advantages">
                        <li class="product__advantage"><span class="advantage__icon"></span>Advantage 1</li>
                        <li class="product__advantage"><span class="advantage__icon"></span>Advantage 2</li>
                        <li class="product__advantage"><span class="advantage__icon"></span>Advantage 3</li>
                    </ul>
                </div>
                <div>
                    <small class="product-link"><a class="wg-link" href="http://www.example.com">Informationsblatt zu Versicherungsprodukten</a></small><br/>
                    <small class="product-link"><a class="wg-link" href="http://www.example.com">Allgemeine Versicherungsbedingungen</a></small>
                </div>
            </div>
        </div>
    `;

    // const productTabTemplate = `
    //     <div>
    //         Fahrrad Y
    //     </div>
    //     <div>
    //         X
    //     </div>
    // `;

    class WertgarantieConfirmation extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }

    window.customElements.define('wertgarantie-confirmation', WertgarantieConfirmation);
})();