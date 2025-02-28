const setup = () => {
    let knop1 = document.getElementById('knop1');
    knop1.addEventListener('click', countWithIndexOf);
    let knop2 = document.getElementById('knop2');
    knop2.addEventListener('click', countWithLastIndexOf);
}
const countWithIndexOf = () => {
    let textInput = document.getElementById('textInput');
    let text = textInput.value;
    let uitkomstText = document.getElementById('uitkomst');
    let uitkomstHoeveelheid = 0;
    let i = text.indexOf("an");
    while(i !== -1) {
        uitkomstHoeveelheid++;
        i = text.indexOf("an", i + 1);
    }
    uitkomstText.textContent = "Deze zin heeft een index van: " + uitkomstHoeveelheid;
}
const countWithLastIndexOf = () => {
    let textInput = document.getElementById('textInput');
    let text = textInput.value;
    let uitkomstText = document.getElementById('uitkomst');
    let uitkomstHoeveelheid = 0;
    let i = text.lastIndexOf("an");
    while(i !== -1) {
        uitkomstHoeveelheid++;
        text = text.substring(0, i);
        i = text.lastIndexOf("an", i);
    }
    uitkomstText.textContent = "Deze zin heeft een index van: " + uitkomstHoeveelheid;
}
window.addEventListener("load", setup);