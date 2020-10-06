# Handbuch zur dynamischen Integration mit dem Wertgarantie Initializer

WERTGARANTIE Komponenten integrieren. So geht's.

In diesem Handbuch werden wir Sie Schritt für Schritt durch die zu erledigenden Punkte führen, die dafür notwendig sind.
Enthalten sind:

1. [Konfiguration](#konfiguration)
2. [Integration](#integration)
3. [Encrypted Session ID](#encrypted-session-id---checkout)


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


### Genauen Ort der Komponenten festlegen
Stimmen Sie mit uns ab, welche Komponenten Sie an welchen Stellen/auf welchen Seiten in ihren Einkaufsprozess integrieren möchten.
Wir werden mit Ihnen eine Konfiguration erstellen, die Informationen zum genauen Platz auf einer Seite enthält, an dem eine Komponente eingebunden werden soll.


# Integration
Zur Integration muss nur auf den Seiten, wo eine oder mehrere Komponenten integriert werden sollen, ein JavaScript-Snippet eingefügt werden. 
Das JavaScript-Snippet muss als `type="module"` in die Seite inkludiert werden. Hier ein Beispiel: 
```html
<script type="module">
    // import des wertgarantieLoaders, der sich mit den unten beschriebenen Daten um die Initialisierung der Komponente(n) auf der jeweiligen Seite kümmert:
    import initInsuranceComponents from 'https://cdn.jsdelivr.net/npm/wertgarantie-component-loader@1/dist/wertgarantieLoader.min.js';

    const shopConfig = {
        stage: "staging" // optional, default ist production
        encryptedSessionId: "test", // nur auf der Checkout-Seite
        orderId: "test", // nur auf der Checkout-Seite
        id: "public:5209d6ea-1a6e-11ea-9f8d-778f0ad9137f", // von uns übermittelte public client ID aus Schritt 4
        customer: { // nur auf der Checkout-Seite
            salutation: "test",
            firstname: "test",
            lastname: "test",
            street: "test",
            zip: "test",
            city: "test",
            country: "test",
            email: "test"
        },
        displayedProduct: {
            sku: "test",
            baseSku: "test", //optional
            name: "IPhone X",
            deviceClasses: "Smartphone",
            price: 100000,
        },
        cartProducts: [{
            sku: "test",
            baseSku: "test", //optional
            name: "IPhone X",
            deviceClasses: "Smartphone",
            price: 100000,
        }]
    };
    initInsuranceComponents(shopConfig);
</script>
```
### JavaScript-Snippet Bestandteile
| Attribut  | Erklärung  | erforderlich |
|---|---|---|
|stage | Gegen welche Stage die Integration laufen soll. Mögliche Werte sind `local`, `dev`, `staging` und `production`. Default ist `production`.
| encryptedSessionId  | Die Wertgarantie setzt beim Einkauf eines Kunden einen Cookie, in dem eine Session ID gespeichert ist. Diese muss beim Checkout durch den Shop ausgelesen und mit dem von der Wertgarantie übermittelten `secret` verschlüsselt werden. Dieses muss zwingend auf dem Server erfolgen. Nähere Informationen s. [Encrypted Session ID - Checkout](#encrypted-session-id---checkout).  | nur bei Checkout  |
| orderId  | Die ID der Bestellung des Kunden im Shop selbst. Darüber kann später der übermittelte Versicherungsantrag der Bestellung im Shop zugeordnet werden.  | nur bei Checkout  |
| customer  | Die Daten des Kunden. Diese werden mit Einverständnis des Kunden an die Wertgarantie übermittelt und sind notwendig, um einen Versicherungsantrag anlegen zu können. | nur bei Checkout  |
| customer.salutation  | Anrede  |   |
| customer.firstname  | Vorname  |   |
| customer.lastname  | Nachname  |   |
| customer.street  | Straße und Hausnummer  |   |
| customer.zip  | Postleitzahl  |   |
| customer.country  | Land (als [ISO alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) - z. B. DE` für Deutschland  |   |
| customer.email  | E-Mail-Adresse  |   |   |   |
| displayedProduct  | Daten zum aktuell dargestellten Produkt auf dessen Detailseite im Shop  | nur auf Produkt-Detailseite  |
| cartProducts  | Im Shop-Warenkorb befindliche Produkte als Array  | ja  |
| sku  | stock keeping unit (Artikelnummer). Wenn es sich um eine Variante handelt, die vollständige sku der Variante (Bsp. 12345-1 bedeuted Variante 1 des Produkts 12345).  | ja  |
| baseSku  | Die sku des Basis-Produkts   | nein  |
| name  | Anzeigename des Produkts  | ja  |
| deviceClasses  | Produktkategorie(n), der/denen das Produkt angehört als kommaseparierte Liste | ja  |
| price  | Der Preis des Produkts in `minor units`(Preis `1000,00€` muss mit `100000` angegeben  | ja  |

# Encrypted Session ID - Checkout
Diese wird nur für den Checkout durch unsere AfterSales-Komponente benötigt. Sie muss zwingend auf dem Server erstellt werden, da hierfür das `Client Secret` benötigt wird, das wir Ihnen vorab übermittelt haben.
Dies darf nicht an den client gelangen. 
Zur Erstellung wird zunächst der Cookie `wertgarantie-session-id` ausgelesen und anschließend mit dem HmacSHA256 Hashing Algorithmus unter Nutzung des `Client Secret` gehashed.
Ein Beispiel, wie es in einer Node-Applikation aussehen kann:
```js
const CryptoJS = require('crypto-js');

// retrieve cookie from request
const sessionId = req.cookies['wertgarantie-session-id'];

// encrypt retrieved sessionID with secret client ID provided by Wertgarantie team
const encryptedSessionId = CryptoJS.HmacSHA256(sessionId, "<Ihr Client Secret, das sie von der WERTGARANTIE erhalten haben>").toString();
````

