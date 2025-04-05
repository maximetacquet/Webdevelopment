const setup = () => {

    let student1 = {
        voornaam: "Maxime",
        familienaam: "Tacquet",
        geboorteDatum: new Date("2006-12-30"),
        adres: {
            straat: "Vleterenstraat",
            huisnummer: 5,
            postcode: "8640",
            gemeente: "Oostvleteren"
        },
        isIngeschreven: true,
        namenVanExen: ["Clara", "Jana", "Iliana"],
        aantalAutos: 2
    };

    let uitkomst = JSON.stringify(student1);
    console.log(uitkomst);

    let kopie = '{"voornaam":"Maxime","familienaam":"Tacquet","geboorteDatum":"2006-12-30","adres":{"straat":"Vleterenstraat","huisnummer":"5","postcode":"8640","gemeente":"Vleteren"},"isIngeschreven":true,"namenVanExen":["Clara","Jana","Iliana"],"aantalAutos":2}';

    let vergelijken = JSON.parse(kopie);

    console.log(student1.familienaam);
    
}

window.addEventListener("load", setup);
