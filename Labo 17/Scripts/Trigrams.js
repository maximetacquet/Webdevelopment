const setup = () => {
    let knop = document.getElementById("knop");
    knop.addEventListener("click", trigram)
}
const trigram = () => {
    let inputText = document.getElementById("inputText");
    let input = inputText.value;
    let uitkomst = "";
    for (let i = 0; i < input.length - 2; i++) {
        uitkomst += input.substring(i, i+3) + " ";
    }
    console.log(uitkomst);
}
window.addEventListener("load", setup);