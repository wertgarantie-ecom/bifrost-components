# Handbuch zur Integration

🔴🔴 __Deprecated! We will deprecte this method in the near future.__ 🔴🔴

WERTGARANTIE Komponenten integrieren. So geht's.

In diesem Handbuch werden wir Sie Schritt für Schritt durch die zu erledigenden Punkte führen, die dafür notwendig sind.
Enthalten sind:

1. [Konfiguration](#konfiguration)
2. [Integration](#integration)
3. [Installationsanleitung](#installationsanleitung)
4. [Links](#links)


# Konfiguration

### Versicherbare Geräteklassen
Als Partner der Wertgarantie müssen Sie entscheiden, welche Geräteklassen versichert werden sollen. 
Diese müssen Sie unserem Team übermitteln. Die Geräteklasse muss ein eindeutiger Identifier sein (z. B. "Smartphone").


### Gewünschte Versicherungen
Für jede ausgewählte Geräteklasse können Sie zusammen mit uns passende Versicherungsangebote konfigurieren.


### Zugangsdaten 
Für den weiteren Verlauf legen wir Zugangsdaten für Sie an. Hierbei handelt es sich um eine öffentliche (public) und eine geheime (secret) client ID.
Mittels der öffentlichen client ID initialisieren Sie unsere Web-Komponenten, die sie in diesem Storybook in der Rubrik Components finden.
Mithilfe der geheimen client ID wird der Kauf der Versicherung abgesichert. Die `geheime Client ID` muss `unbedingt sicher aufbewahrt` werden.
 Sollte sie versehentlich veröffentlicht werden, kontaktieren Sie uns bitte schnellstmöglich unter <a href="mailto:ecommerce@wertgarantie.com">ecommerce@wertgarantie.com</a>.
 
 
### E-Mail-Adresse des Shops
Bitte übermitteln Sie uns eine E-Mail-Adresse, über die wir Sie über Versicherungsanträge informieren können, die über Ihren Shop bei uns eingegangen sind.
Künftig werden wir diesen Mechanismus durch ein entsprechendes Reporting ablösen.



# Integration
Um den kompletten Cross-Selling-Prozess abzubilden, sind folgende drei Komponenten notwendig:

1. [Selection Pop Up](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-pop-up--product-selection-popup): 
    - Dient zur Auswahl einer Versicherung zu einem Produkt aus dem Webshop, das gerade in den Warenkorb gelegt wurde (wenn es einer versicherbaren Geräteklasse angehört)
2. [Confirmation](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-confirmation--confirmation-component-phone-shop):
    - Listet alle ausgewählten Versicherungsprodukte und relevanten Dokumente auf und holt die Einverständniserklärung des Kunden zum Kauf der Versicherungen ein
3. [After Sales](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-after-sales--after-sales-general): 
    - erstellt bei Initialisierung die vom Kunden gewählten Versicherungsanträge.
    - Zeigt eine Zusammenfassung der gekauften Versicherungsprodukte und zugehörigen Wertgarantie-Vertragsnummern an.



## Benachrichtigung
Nach dem Kauf wird eine E-Mail an den Kunden und an Sie gesendet mit allen relevanten Informationen zu den gekauften Versicherungsprodukten. Dies dient u. a. zur 
Nachverfolgung im Fall eines Fehlers, sollte beim Kauf der Versicherung etwas nicht korrekt gelaufen sein und der Kunde sich bei Ihnen melden. In diesem Fall können
Sie uns einfach benachrichtigen und haben auch Informationen zu Wertgarantie-Vertragsnummern, die sie uns zur weiteren Analyse mitsenden können.


# Installationsanleitung
Wir werden eine Installationsanleitung bereitstellen, sobald wir Sie als Nutzer der Komponentenlösung der WERTGARANTIE registriert und konfiguriert haben.
Diese wird wie folgt aussehen:

## Konfiguration
* public Client Ids: `<Ihre Public Client ID>`
* secrets: `<Ihr Client Secret>`

## Konfigurierte Device Classes
- Smartphone
- Mobilfunk

## Integration der Komponenten
### 1. Selection Pop Up Component

Initialisierung der Komponente mit Produktname, Preis (in minor Units -> Cents), konfigurierter DeviceClass und einer der public Client IDs:
```html
    <wertgarantie-selection-pop-up id="wertgarantie-selection"
                               data-bifrost-uri="<Link zu Bifröst-Server auf entsprechender Umgebung>"
                               data-shop-product-name="iPhone SE"
                               data-device-price=86000
                               data-device-class="Smartphone"
                               data-order-item-id="1234-12309aj1-321"
                               data-client-id="<your Public Client ID>">
    </wertgarantie-selection-pop-up>
    
    <script type="module" src="https://cdn.jsdelivr.net/npm/wertgarantie-selection-popup@2/dist/selection-popup.min.js" crossorigin="anonymous"></script>
    
    <script>
        window.onload = function () {
        var selection = document.getElementById('wertgarantie-selection');
        if (selection) {
            selection.displayComponent();
        }
    }
    </script>
```


Weitere Details zur Selection-PopUp-Component sind [hier](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-pop-up--product-selection-popup) zu finden.

### 2. Confirmation Component
Die Confirmation Component benötigt zur Initialisierung den aktuellen Shopping Cart aus Ihrem Shop (zumindest alle Artikel deren deviceClass versicherbar ist).
Die Artikel müssen in einem Base64 enkodierten JSON Array übergeben werden (das zugehörige Schema ist [hier](https://github.com/wertgarantie-ecom/bifrost/blob/master/src/shoppingcart/schemas/shopProductSchema.js) zu finden). 

Hier ein Beispiel Code in Javascript:

```js
const confirmationCompData = [];
confirmationCompData.push(...shoppingCartData.products.map(product => {
    return {
        price: product.selectedVariant.devicePrice,
        deviceClass: product.deviceClass,
        name: product.productName,
        orderItemId: product.orderItemId
    }
}));
const confirmationShopOrderBase64 = Buffer.from(JSON.stringify(confirmationCompData)).toString('base64'); 
```

Die Confirmation Component ist designed, um im Warenkorb eingebunden zu werden. Im Warenkorb wird es ein HTMLElement geben, das den Einkauf der Shop-Produkte abschließt. 
Ein Selector dieses HTMLElements wird mit dem Attribut `data-validation-trigger-selector` der Komponente übergeben. Dahinter kann sich z. B. eine Form verbergen oder ein Button. Darauf setzt die Komponente automatisch einen Event-Listener auf den Event-Typ, der mit 
dem Attribut `data-validation-trigger-event` (form -> "submit", button -> "click", ...) übergeben wird. Beim entsprechenden Event führt die Komponente eine Prüfung durch, ob die Einverständniserklärung bestätigt wurde, bevor die eigentliche Aktion des Shops ausgeführt wird. 
Wurde nicht bestätigt, wird diese Aktion unterbrochen und die Komponente zeigt eine entsprechende Meldung an. Wurde bestätigt, wird der reguläre Vorgang im Shop ausgelöst.

```html
<wertgarantie-confirmation class="wertgarantie-confirmation" id="wg-confirmation"
       data-bifrost-uri="<Link zu Bifröst-Server auf entsprechender Umgebung>"
       data-validation-trigger-selector="#orderbutton"
       data-validation-trigger-event="click"
       data-shop-order-base64="JVBERi0xLjYNJeLjz9MNCjI1IDAgb2JqDTw8L0xpbmVhcml6ZWQgMS9MIDgxNTAyL08..."
       data-client-id="<your Public Client ID>">
</wertgarantie-confirmation>
                        
<script type="module" src="https://cdn.jsdelivr.net/npm/wertgarantie-confirmation@2/dist/confirmation.min.js" crossorigin="anonymous"></script>
```

Weitere Details zur Confirmation-Component sind [hier](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-confirmation--confirmation-component-phone-shop) zu finden.

### 3. After Sales Component
Die After-Sales Komponente benötigt zur Initialisierung ein Base64 enkodiertes JSON Object mit den Produkten, die in Ihrem Shop gekauft wurden, sowie die Kundendaten und die mit einem secret verschlüsselte SessionID aus dem Cookie `wertgaranite-session-id`.
Das zugehörige Schema des JSON Objects ist [hier](https://github.com/wertgarantie-ecom/bifrost/blob/master/src/components/aftersales/afterSalesComponentCheckoutSchema.js) zu finden.

Hier ein Beispiel-Code in JavaScript:
```js
const CryptoJS = require('crypto-js');

// retrieve cookie from request
const sessionId = req.cookies['wertgarantie-session-id'];

// encrypt retrieved sessionID with secret client ID provided by Wertgarantie team
const encryptedSessionId = CryptoJS.HmacSHA256(sessionId, "<Ihr Client Secret, das sie von der WERTGARANTIE erhalten haben>").toString();

// Buffer stringified Object and convert to base64
const wertgarantieCheckoutDataBuffer = Buffer.from(JSON.stringify({
        purchasedProducts: [
            {
                price: 86000, // in minor units (cent)
                manufacturer: "XXXPhones Inc.",
                deviceClass: "Smartphone",
                name: "Example Phone",
                orderId: "orderNo1"
            }       
        ],
        customer: {
            salutation: 'Herr',
            firstname: 'Otto',
            lastname: 'Normalverbraucher',
            street: 'Beispielstraße 9',
            zip: '52345',
            city: 'Köln',
            country: 'Deutschland',
            email: 'otto@normalverbraucher.com'
        },
        encryptedSessionId: encryptedSessionId
    }));
const dataShopPurchaseData = wertgarantieCheckoutDataBuffer.toString('base64');
```

Das Resultat (hier `dataShopPurchaseData`) wird mit dem HTML-Attribut `data-shop-purchase-data` der Komponente übergeben, die daraufhin die Versicherungsanträge übermittelt und das Ergebnis anzeigt.
Weiterhin ist die public client ID erforderlich:

```html
<wertgarantie-after-sales
                    data-bifrost-uri="<Link zu Bifröst-Server auf entsprechender Umgebung>"
                    id="wertgarantie-after-sales"
                    data-shop-purchase-data="eyJwdXJjaGFzZWRQcm9kdWN0cyI6W3sicHJpY2UiOjg..."
                    data-client-id="<your Public Client ID>">
</wertgarantie-after-sales>

<script type="module" src="https://cdn.jsdelivr.net/npm/wertgarantie-after-sales@1/dist/after-sales.min.js" crossorigin="anonymous"></script>
```

Weitere Details zur Implementierung befinden sich [hier](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-after-sales--after-sales-general).

# Links
- [Dokumentation](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/about-about--overview)
- [Github Code](https://github.com/wertgarantie-ecom)
- [PopUp-Component Package](https://www.npmjs.com/package/wertgarantie-selection-popup)
- [Confirmation-Component Package](https://www.npmjs.com/package/wertgarantie-confirmation)
- [After-Sales-Component Package](https://www.npmjs.com/package/wertgarantie-after-sales)
- [PopUp-Component CDN](https://www.jsdelivr.com/package/npm/wertgarantie-selection-popup)
- [Confirmation-Component CDN](https://www.jsdelivr.com/package/npm/wertgarantie-confirmation)
- [After-Sales-Component CDN](https://www.jsdelivr.com/package/npm/wertgarantie-after-sales)
- [CSS Styles](https://www.jsdelivr.com/package/npm/wertgarantie-integrations?path=src)
