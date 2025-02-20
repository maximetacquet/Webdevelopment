const setup = () => {
	let colorDemos=document.getElementsByClassName("colorDemo");
	let sliders = document.getElementsByClassName("slider");

	for (let i=0; i<sliders.length; i++){
		sliders[i].addEventListener("change", update);
		sliders[i].addEventListener("input", update);
	}
	update();
}

const update = () => {
	let sliders = document.getElementsByClassName("slider");
	let colorDemos=document.getElementsByClassName("colorDemo");
	let waarden = document.getElementsByTagName("span");

	for (let i = 0; i < sliders.length; i++) {
		waarden[i].textContent = waarden[i].id +" "+ sliders[i].value;
	}
	let getal1 = sliders[0].value;
	let getal2 = sliders[1].value;
	let getal3 = sliders[2].value;
	colorDemos[0].style.backgroundColor="rgb("+getal1+", "+getal2+", "+getal3+")";
}
window.addEventListener("load", setup);