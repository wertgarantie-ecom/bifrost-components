(function () {
    const template = document.createElement('template');
    template.innerHTML = `
        <div>
        
        </div>
    `;

    class WertgarantieSelectionPopUp extends HTMLElement {

        constructor() {
            super();
        }
    }
    window.customElements.define('wertgarantie-selection-pop-up', WertgarantieSelectionPopUp);
})();