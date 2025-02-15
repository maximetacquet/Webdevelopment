const setup = () => {
    // deze code wordt pas uitgevoerd als de pagina volledig is ingeladen
    let btn = document.getElementById("nieuweText");
    btn.addEventListener("click", wijzigText);
};

const wijzigText = () => {
    let pElement = document.getElementById("text");
    pElement.textContent = "Welkom!";
};

window.addEventListener("load", setup);