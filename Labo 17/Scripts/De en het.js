const setup = () => {
    let trigramBtn = document.getElementById("knop het");
    trigramBtn.addEventListener("click", het)
}
const het = () => {
    let inputText = document.getElementById("text");
    let input = inputText.value.toLowerCase();
    let uitkomst = "";
    let lastIndex = 0;

    for (let i = 0; i < input.length - 1; i++) {
        if (input.substring(i, i+2).localeCompare("de") === 0) {
            uitkomst += input.substring(lastIndex, i) + "het";
            lastIndex = i+2;
        }
    }
    uitkomst += input.substring(lastIndex);
    console.log(uitkomst);
}
window.addEventListener("load", setup);