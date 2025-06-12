const setup = () => {
    let goBtn = document.getElementById("goBtn");
    goBtn.addEventListener("click", goToSite);
    loadFromLocalstorage();
    const afbeelding = document.createElement('img');

}
const goToSite = () => {
    let commandWordArray = ["g", "i", "x", "y"];
    let commandWords = {g: "https://www.google.com/search?q=", i: "https://www.instagram.com/explore/tags/", x: "https://x.com/hashtag/", y: "https://www.youtube.com/results?search_query="};
    let value = document.querySelector("#zoekopdracht").value;
    let zoekopdracht = value.split("");
    if (value.indexOf("/help") >= 0) {
        window.alert("Geldige commando's zijn: \n* /g --> Google\n* /y --> Youtube\n* /i --> Instagram\n* /x --> X");
    } else if (!(zoekopdracht[0] === "/") || !(zoekopdracht[2] === " ")) {
        window.alert("Invalid command");
    } else if (!commandWordArray.includes(zoekopdracht[1])) {
        window.alert("Unknown command prefix");
    } else {
        let urlPrefix = commandWords[zoekopdracht[1]];
        let search = "";
        for (let i = 3; i < zoekopdracht.length; i++) {
            search+= zoekopdracht[i];
        }
        let query = urlPrefix + search;
        window.open(query, "_blank");
        save(zoekopdracht[1], search, query);
        saveToLocalstorage();
    }
}
const save = (indexCommand, search, query) => {
    let newTab = document.createElement("div");
    newTab.classList.add("col-4");
    newTab.classList.add("p-1");

    let tabs = document.querySelector("#tabs");
    tabs.appendChild(newTab);

    let site = document.createElement("div");
    site.classList.add("tab");
    site.classList.add(indexCommand);
    site.setAttribute("data-indexCommand", indexCommand);
    site.setAttribute("data-search", search);
    site.setAttribute("data-query", query);

    let siteNames = {g: "Google", y: "Youtube", i: "Instagram", x: "X"};
    let siteName =  document.createElement("h3");
    siteName.textContent = siteNames[indexCommand];
    site.appendChild(siteName);

    let searchText = document.createElement("p");
    searchText.textContent = search;
    site.appendChild(searchText);

    let input = document.createElement("input");
    input.type = "button";
    input.value = "GO!";
    input.setAttribute("data-url", query);
    input.addEventListener("click", loadSite);
    site.appendChild(input);

    let deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "Delete";
    deleteBtn.addEventListener("click", deleteTab);
    deleteBtn.classList.add("deleteButton");
    site.appendChild(deleteBtn);

    newTab.appendChild(site);


}
const loadSite = (event) => {
    let url = event.currentTarget.getAttribute("data-url");
    window.open(url, "_blank");
}
const deleteTab = (event) => {
    event.target.parentElement.parentElement.remove();
    event.target.parentElement.remove();
    event.target.remove();
    event.stopPropagation();
    saveToLocalstorage();
}
const saveToLocalstorage = () => {
    let tabs = document.querySelectorAll(".tab");
    let storageArray = [];
    for (let i = 0; i < tabs.length; i++) {
        let indexCommand = tabs[i].getAttribute("data-indexCommand");
        let search = tabs[i].getAttribute("data-search");
        let query = tabs[i].getAttribute("data-query");
        let savedTab = {indexCommand: indexCommand, search: search, query: query};
        storageArray.push(savedTab);
    }
    localStorage.setItem("tabs", JSON.stringify(storageArray));

}
const loadFromLocalstorage = () => {
    let savedTabs = JSON.parse(localStorage.getItem("tabs"));
    if (savedTabs !== null) {
        for (let i = 0; i < savedTabs.length; i++) {
            save(savedTabs[i].indexCommand, savedTabs[i].search, savedTabs[i].query);
        }
    }
}
window.addEventListener("load", setup);