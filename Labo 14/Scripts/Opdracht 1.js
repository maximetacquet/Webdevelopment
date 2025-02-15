const setup = () => {
    document.getElementById("alert").addEventListener("click", alert);
    document.getElementById("confirm").addEventListener("click", confirm);
    document.getElementById("prompt").addEventListener("click", prompt);
}
const alert = () => {
    let mededeling = window.alert("Welkom");
    console.log("alert: " + mededeling);
};

const confirm = () => {
    let confirm = window.confirm("Ben je het zeker?");
    console.log("confirm: " + confirm);
};

const prompt = () => {
    let prompt = window.prompt("Wat is uw naam");
    console.log("prompt: " + prompt);
};

window.addEventListener("load", setup);