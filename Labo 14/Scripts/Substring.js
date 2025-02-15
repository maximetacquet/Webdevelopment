const setup = () => {
    document.getElementById("calculate").addEventListener("click", calculate);
}

const calculate = () => {
    const input = document.getElementById("input").value;
    const arg1 = parseInt(document.getElementById("arg1").value);
    const arg2 = parseInt(document.getElementById("arg2").value);
    let output = document.getElementById("output");

    if (isNaN(arg1) || isNaN(arg2) || input === "") {
        output.textContent = "Vul alle velden correct in!";
        return;
    }

    const calculation = input.substring(arg1, arg2);
    output.textContent = calculation;
};

window.addEventListener("load", setup);
