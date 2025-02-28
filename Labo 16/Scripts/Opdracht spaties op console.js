const setup = () => {
    let knop = document.getElementById('knop');
    knop.addEventListener('click', spatiesToevoegen)
}

const spatiesToevoegen = () => {
    let textInput = document.getElementById('textInput');
    let text = textInput.value;
    let outputString = "";

    for (let i = 0; i < text.length; i++) {
        outputString += text.charAt(i) + " ";
    }
    console.log(outputString);
}
window.addEventListener("load", setup);