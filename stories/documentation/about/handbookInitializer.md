# Handbuch

1. Stimmen Sie mit uns ab, welche Komponenten Sie an welchen Stellen/auf welchen Seiten in ihren Einkaufsprozess integrieren möchten.
2. Stimmen Sie mit uns ab, welche Produkte bzw. Produktkategorien versichert werden sollen.
3. Wenn Sie ein Reporting über die Versicherungsanträge, die über Ihren Shop angelegt werden, wünschen, übermitteln Sie uns eine E-Mail-Adresse. An diese E-Mail-Adresse wird eine Nachricht gesendet für jeden angelegten Versicherungsantrag, s. [Email](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/about-content--email).
4. Sie erhalten von uns eine öffentliche ID und eine geheime (public client ID und secret).
5. Fügen Sie ein JavaScript-Snippet auf jede Seite, auf der mindestens eine der Komponenten angezeigt werden soll.

## JavaScript-Snippet
Das JavaScript-Snippet muss als `type="module"` in die Seite inkludiert werden. Hier ein Beispiel: 
```html
<script type="module">
    // import des wertgarantieLoaders, der sich mit den unten beschriebenen Daten um die Initialisierung der Komponente(n) auf der jeweiligen Seite kümmert:
    import initInsuranceComponents from 'https://cdn.jsdelivr.net/npm/wertgarantie-component-loader@1/dist/wertgarantieLoader.min.js';

    // 
    const shopConfig = {
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
### Shop Konfiguration
| Attribut  | Erklärung  | erforderlich |   |   |
|---|---|---|---|---|
| encryptedSessionId  | Die Wertgarantie setzt beim Einkauf eines Kunden einen Cookie, in dem eine Session ID gespeichert ist. Diese muss beim Checkout durch den Shop ausgelesen und mit dem von der Wertgarantie übermittelten `secret` verschlüsselt werden. Dieses muss zwingend auf dem Server erfolgen. Nähere Informationen s. [TODO]().  | nur bei Checkout  |   |   |
| orderId  | Die ID der Bestellung des Kunden im Shop selbst. Darüber kann später der übermittelte Versicherungsantrag der Bestellung im Shop zugeordnet werden.  | nur bei Checkout  |   |   |
| customer  | Die Daten des Kunden. Diese werden mit Einverständnis des Kunden an die Wertgarantie übermittelt und sind notwendig, um einen Versicherungsantrag anlegen zu können. | nur bei Checkout  |   |   |
| customer.salutation  | Anrede  |   |   |   |
| customer.firstname  | Vorname  |   |   |   |
| customer.lastname  | Nachname  |   |   |   |
| customer.street  | Straße und Hausnummer  |   |   |   |
| customer.zip  | Postleitzahl  |   |   |   |
| customer.country  | Land (als [ISO alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) - z. B. DE` für Deutschland  |   |   |   |
| customer.email  | E-Mail-Adresse  |   |   |   |
| displayedProduct  | Daten zum aktuell dargestellten Produkt auf dessen Detailseite im Shop  | nur auf Produkt-Detailseite  |   |   |
| cartProducts  | Im Shop-Warenkorb befindliche Produkte als Array  | ja  |   |   |
| sku  | stock keeping unit (Artikelnummer). Wenn es sich um eine Variante handelt, die vollständige sku der Variante (Bsp. 12345-1 bedeuted Variante 1 des Produkts 12345).  | ja  |   |   |
| baseSku  | Die sku des Basis-Produkts   | nein  |   |   |
| name  | Anzeigename des Produkts  | ja  |   |   |
| deviceClasses  | Produktkategorie(n), der/denen das Produkt angehört als kommaseparierte Liste | ja  |   |   |
| price  | Der Preis des Produkts in `minor units`(Preis `1000,00€ müssen mit `100000` angegeben  |   |   |   |
