const setup = () => {
    let knop = document.getElementById('knop');
    let textInput = document.getElementById('textInput');

    knop.addEventListener('click', () => { metSpaties(textInput.value); });
}
const metSpaties = (textInput) => {
    let uitkomst = "";

    for (let i = 0; i < textInput.length; i++) {
        uitkomst += textInput.charAt(i) + " ";
    }
    console.log(uitkomst);
}
window.addEventListener("load", setup);