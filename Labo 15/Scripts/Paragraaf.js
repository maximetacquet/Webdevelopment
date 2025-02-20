const setup = () => {
    let veranderTekst = document.getElementsByClassName("belangrijk")
    for (let i = 0; i < veranderTekst.length; i++) {
        veranderTekst[i].classList.add("opvallend")
    }
}

window.addEventListener("load", setup);