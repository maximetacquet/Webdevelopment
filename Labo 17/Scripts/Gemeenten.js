const setup = () => {
    let input = "begin";
    let gemeenten = [];
    while (input !== null) {
        input = window.prompt('Voer een gemeente in:');
        gemeenten.push(input);
    }
    uitkomst(gemeenten.sort());
}
const uitkomst = (gemeenten) => {
    for (let i = 0; i < gemeenten.length; i++) {
        if (gemeenten[i] !== null) {
            let outputVeld = document.getElementById("gemeenten");
            outputVeld.innerHTML += "<option value='" + gemeenten[i] + "'>" + gemeenten[i] + "</option>";
        }
    }
}
window.addEventListener("load", setup);