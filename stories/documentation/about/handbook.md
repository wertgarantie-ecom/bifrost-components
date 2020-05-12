# Handbuch zur Integration

Willkommen bei der Komponentenlösung der Wertgarantie. Sie haben sich dazu entschieden, Cross-Selling für Wertgarantie-Produkte auf Ihrer Seite zu betreiben.
In diesem Handbuch werden wir Sie Schritt für Schritt durch die zu erledigenden Punkte führen, die dafür notwendig sind. 


## Konfiguration

### Versicherbare Geräteklassen
Als Partner der Wertgarantie müssen Sie entscheiden, welche Geräteklassen versichert werden sollen. 
Diese müssen Sie unserem Team übermitteln. Die Geräteklasse muss ein eindeutiger Identifier sein (z. B. "Smartphone).


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



## Integration der Komponenten
Um den kompletten Cross-Selling-Prozess abzubilden, sind folgende drei Komponenten notwendig:

1. [Selection Pop Up](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-pop-up--product-selection-popup): 
    - Dient zur Auswahl einer Versicherung zu einem Produkt aus dem Webshop, das gerade in den Warenkorb gelegt wurde (wenn es einer versicherbaren Geräteklasse angehört)
2. [Confirmation](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-confirmation--confirmation-component-phone-shop):
    - Listet alle ausgewählten Versicherungsprodukte und relevanten Dokumente auf und holt die Einverständniserklärung des Kunden zum Kauf der Versicherungen ein
3. [After Sales](https://wertgarantie-ecom.github.io/bifrost-components/?path=/story/components-after-sales--after-sales-general): 
    - Zeigt eine Zusammenfassung der gekauften Versicherungsprodukte und zugehörigen Wertgarantie-Vertragsnummern an



## Benachrichtigung
Nach dem Kauf wird eine E-Mail an den Kunden und an Sie gesendet mit allen relevanten Informationen zu den gekauften Versicherungsprodukten. Dies dient u. a. zur 
Nachverfolgung im Fall eines Fehlers, sollte beim Kauf der Versicherung etwas nicht korrekt gelaufen sein und der Kunde sich bei Ihnen melden. In diesem Fall können
Sie uns einfach benachrichtigen und haben auch Informationen zu Wertgarantie-Vertragsnummern, die sie uns zur weiteren Analyse mitsenden können.