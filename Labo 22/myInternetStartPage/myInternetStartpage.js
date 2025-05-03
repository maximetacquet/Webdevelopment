const setup = () => {
    let knop = document.getElementById("knop");
    knop.addEventListener("click", website);
    lokaalladen();
}
const website = () => {
    let soortenCommandos = ["g", "i", "x", "y"];
    let linksCommandos = {g: "https://www.google.com/search?q=", i: "https://www.instagram.com/explore/tags/", x: "https://x.com/hashtag/", y: "https://www.youtube.com/results?search_query="};
    let waarde = document.querySelector("#zoekopdracht").value
    let zoekopdracht = waarde.split("");
    if (!(zoekopdracht[2] === " " || !(zoekopdracht[0] === "/")))
    {
        window.alert("Invalid command");
    }
    else if (!soortenCommandos.includes(zoekopdracht[1]))
    {
        window.alert("Unknown command prefix");
    }
    else
    {
        let link = linksCommandos[zoekopdracht[1]];
        let zoeken = "";
        for (let i = 3; i < zoekopdracht.length; i++) {
            zoeken+= zoekopdracht[i];
        }
        let resultaat = link + zoeken;
        window.open(resultaat, "_blank");
        opslaan(zoekopdracht[1], zoeken, resultaat);
        lokaalopslaan();
    }
}
const laden = (event) => {
    let url = event.currentTarget.getAttribute("resultaat");
    window.open(url, "_blank");
}
const opslaan = (commando, zoek, resultaat) => {
    let bootstrap = document.createElement("div");
    bootstrap.classList.add("p-1");
    bootstrap.classList.add("col-4");
    let website = document.createElement("div")
    website.classList.add("tab");
    website.classList.add(commando);
    website.setAttribute("commando", commando);
    website.setAttribute("zoek", zoek);
    website.setAttribute("resultaat", resultaat);
    let websites = {g: "Google", y: "Youtube", i: "Instagram", x: "X"};
    let naam =  document.createElement("h3");
    naam.textContent = websites[commando];
    website.appendChild(naam);
    let textzoeken = document.createElement("h5");
    textzoeken.textContent = zoek;
    website.appendChild(textzoeken);
    let invoer = document.createElement("input");
    invoer.type = "button";
    invoer.value = "GO!";
    invoer.setAttribute("resultaat", resultaat);
    invoer.addEventListener("click", laden);
    website.appendChild(invoer);
    bootstrap.appendChild(website);
    let geschiedenis = document.querySelector("#geschiedenis");
    geschiedenis.appendChild(bootstrap);
}

const lokaalopslaan = () => {
    let geschiedenis = document.querySelectorAll(".tab");
    let alleAntwoorden = [];
    for (let i = 0; i < geschiedenis.length; i++) {
        let commando = geschiedenis[i].getAttribute("commando");
        let zoek = geschiedenis[i].getAttribute("zoek");
        let resultaat = geschiedenis[i].getAttribute("resultaat");
        let opgeslaan = {commando: commando, zoek: zoek, resultaat: resultaat};
        alleAntwoorden.push(opgeslaan);
    }
    localStorage.setItem("geschiedenis", JSON.stringify(alleAntwoorden));
}
const lokaalladen = () => {
    let opgeslaan = JSON.parse(localStorage.getItem("geschiedenis"));
    if (opgeslaan !== null)
    {
        for (let i = 0; i < opgeslaan.length; i++)
        {
            opslaan(opgeslaan[i].commando, opgeslaan[i].zoek, opgeslaan[i].resultaat);
        }
    }
}
window.addEventListener("load", setup);