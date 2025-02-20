const setup = () => {
    const setup = () => {
        let btn1 = document.getElementById("knop1");
        let btn2 = document.getElementById("knop2");
        let btn3 = document.getElementById("knop3");

        btn1.addEventListener("click", switchColorBtn1);
        btn2.addEventListener("click", switchColorBtn2);
        btn3.addEventListener("click", switchColorBtn3);
    }

    const switchColorBtn1 = () => {
        let btn = document.getElementById("knop1");
        btn.classList.toggle("switchColor");
    }
    const switchColorBtn2 = () => {
        let btn = document.getElementById("knop2");
        btn.classList.toggle("switchColor");
    }
    const switchColorBtn3 = () => {
        let btn = document.getElementById("knop3");
        btn.classList.toggle("switchColor");
    }

    window.addEventListener("load", setup);
}
window.addEventListener("load", setup);