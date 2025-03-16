const setup = () => {
    let knop = document.getElementById("knop");
    knop.addEventListener("click", uitkomst)
}
const uitkomst = () => {
    roken();
    taal();
    buurland();
    bestelling();
}

const roken = () => {
    let roken = document.getElementById("roken").checked;
    if (roken) {
        console.log("roker");
    } else {
        console.log("geen roker");
    }
}
const taal = () => {
    let talen = document.getElementsByName("moedertaal");
    for (let i = 0; i < talen.length; i++) {
        if (talen[i].checked) {
            console.log("Moedertaal: " + talen[i].value);
        }
    }
}
const buurland = () => {
    let buurlandOptions = document.getElementById("buurland").options;
    for (let i = 0; i < buurlandOptions.length; i++) {
        if (buurlandOptions[i].selected) {
            console.log("Favoriete buurland: " + buurlandOptions[i].text);
        }
    }
}
const bestelling = () => {
    let bestellingsOpties = document.getElementById("bestelling").options;
    let bestelling = "Bestelling: ";
    for (let i = 0; i < bestellingsOpties.length; i++) {
        if (bestellingsOpties[i].selected) {
            bestelling += bestellingsOpties[i].text + " ";
        }
    }
    console.log(bestelling);
}
window.addEventListener("load", setup);