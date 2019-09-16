# Selection component with embedded rating component

There is a `<slot>` for the `Wertgarantie rating component` within the `Wertgarantie selection component` that allows you to embed it.

## Code
```
<wertgarantie-policy-selection
        data-title="Vergessen Sie nicht Ihren Rundumschutz"
        data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
        data-details-text="Alle Details zum Tarif"
        data-details-uri="http://www.example.com"
        data-information-sheet-text="Produktinformationsblatt"
        data-information-sheet-uri="http://www.example.com"
        data-advantages="Schutz bei Displaybrüchen;Schutz bei Wasserschaden;Schutz bei Akku-Defekten"
>
    <wertgarantie-rating 
        slot="wertgarantie-rating-component"
        data-text="2.557 Google-Rezensionen"
        data-rating="4.2"
        data-uri="http://www.innoq.com" >
    </wertgarantie-rating>
</wertgarantie-policy-selection>
```