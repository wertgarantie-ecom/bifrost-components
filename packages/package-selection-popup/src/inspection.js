function printPopupStatus() {
    var popup = document.getElementsByTagName('wertgarantie-selection-pop-up')[2];
    var inputs = popup.shadowRoot.querySelectorAll('input');

    inputs.forEach((input, idx) => console.log("Product " + (idx + 1) + " selected: " + input.checked))
}

printPopupStatus();