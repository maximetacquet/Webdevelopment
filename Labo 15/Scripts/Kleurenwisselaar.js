const setup = () => {
    const setup = () => {
        let knop1 = document.getElementById("knop1");
        let knop2 = document.getElementById("knop2");
        let knop3 = document.getElementById("knop3");

        knop1.addEventListener("click", kleurKnop1);
        knop2.addEventListener("click", kleurKnop2);
        knop3.addEventListener("click", kleurKnop3);
    }

    const kleurKnop1 = () => {
        let knop = document.getElementById("knop1");
        knop.classList.toggle("kleurWisselen");
    }
    const kleurKnop2 = () => {
        let knop = document.getElementById("knop2");
        knop.classList.toggle("kleurWisselen");
    }
    const kleurKnop3 = () => {
        let knop = document.getElementById("knop3");
        knop.classList.toggle("kleurWisselen");
    }

    window.addEventListener("load", setup);
}
window.addEventListener("load", setup);