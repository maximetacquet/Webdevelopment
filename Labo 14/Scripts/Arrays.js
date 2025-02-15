const setup = () => {
    const familieleden=["Maxime","Thibault","Efraín","Dries","Seppe"];
    console.log(familieleden.length);
    console.log(familieleden[0],familieleden[2],familieleden[4]);
    const voegNaamToe =() => {
        let nieuweNaam = prompt("Voeg een nieuwe naam toe");
        if(nieuweNaam){
        familieleden.push(nieuweNaam);
        }
    }
    voegNaamToe();
    console.log(familieleden);
    let alleFamilieleden =familieleden.join(", ");
    console.log(alleFamilieleden);
}
window.addEventListener("load", setup);