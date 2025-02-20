const setup = () => {
    let btnHerbereken = document.getElementById("btnHerbereken");
    btnHerbereken.addEventListener("click", herbereken);

}
const herbereken = () => {
    let prijs = document.getElementsByClassName("prijs");
    let aantal = document.getElementsByClassName("aantal");
    let btw = document.getElementsByClassName("btw");
    let subtotaal = document.getElementsByClassName("subtotaal");
    let eindtotaal = 0;

    for (let i = 0; i < prijs.length; i++) {

        let p = parseFloat(prijs[i].textContent);
        let a =  parseFloat(aantal[i].value);
        let b =  parseFloat(btw[i].textContent);
        let s = p * a * (1+b/100);
        subtotaal[i].textContent = s.toFixed(2).toString() + " eur";
        eindtotaal += s;
    }
    subtotaal[3].textContent = eindtotaal.toFixed(2).toString() + " eur";
}
window.addEventListener("load", setup);