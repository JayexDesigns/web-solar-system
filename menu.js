//Dropdown Of The Main Menu
var dropButton = document.getElementById("dropdown");
var menuDisplayed = false;

dropButton.addEventListener('click', () => {
    let menu = document.getElementById("menu");
    if (menuDisplayed) {
        menu.style.top = "-50%";
        document.getElementById("createMenu").style.top = "-50%";
        document.getElementById("browseMenu").style.top = "-50%";
        menuDisplayed = false;
    }
    else if (!menuDisplayed) {
        menu.style.top = "50%";
        menuDisplayed = true;
    }
});



//Dropdown Of The Specific Menus
var createButton = document.getElementById("createButton");
var browseButton = document.getElementById("browseButton");

createButton.addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById("createMenu").style.top = "50%";
    }, 150);
    document.getElementById("menu").style.top = "-50%";
});

browseButton.addEventListener('click', () => {
    makePlanetList();
    setTimeout(() => {
        document.getElementById("browseMenu").style.top = "50%";
    }, 150);
    document.getElementById("menu").style.top = "-50%";
});



//Event And Functioning Of The Create Planet Menu
var createPlanet = document.getElementById("createPlanet");

createPlanet.addEventListener('click', () => {
    let name = document.getElementById("createName").childNodes[1].value;
    let posX = ortCamera.position.x + parseInt(document.getElementById("createPosX").value);
    let posY = ortCamera.position.z + parseInt(document.getElementById("createPosY").value);
    let velX = parseInt(document.getElementById("createVelX").value) * 0.01;
    let velY = parseInt(document.getElementById("createVelY").value) * 0.01;
    let mass = parseInt(document.getElementById("createMass").childNodes[1].value) * 1000;
    let radius = parseInt(document.getElementById("createRadius").childNodes[1].value) * 0.1;
    let color = parseInt(document.getElementById("createColor").childNodes[1].value, 16);
    if (name == "" || isNaN(posX) || isNaN(posY) || isNaN(velX) || isNaN(velY) || isNaN(mass) || isNaN(radius)) {
        document.getElementsByTagName("h1")[0].innerHTML = "You must fill<br>all fields";
        setTimeout(() => {
            document.getElementsByTagName("h1")[0].innerText = "Create Planet";
        }, 2000);
    }
    else if (mass <= 0 || radius <= 0) {
        document.getElementsByTagName("h1")[0].innerHTML = "Mass and radius can't<br>be negative or zero";
        setTimeout(() => {
            document.getElementsByTagName("h1")[0].innerText = "Create Planet";
        }, 2000);
    }
    else if (color > 16777215 || color < 0 || isNaN(color)) {
        document.getElementsByTagName("h1")[0].innerHTML = "Color has to be<br>a valid hex color";
        setTimeout(() => {
            document.getElementsByTagName("h1")[0].innerText = "Create Planet";
        }, 2000);
    }
    else {
        for (let i of Planet.planets) {
            if (i.name == name) {
                document.getElementsByTagName("h1")[0].innerHTML = "That name<br>already exists";
                setTimeout(() => {
                    document.getElementsByTagName("h1")[0].innerText = "Create Planet";
                }, 2000);
                return;
            }
        }
        document.getElementById("createName").childNodes[1].value = "";
        document.getElementById("createMenu").style.top = "-50%";
        menuDisplayed = false;
        let planet = new Planet(name, posX, posY, velX, velY, mass, radius, color);
    }
});



//Event And Functioning Of The Browse Planet Menu
var actualPlanetList = [];

function makePlanetList() {
    let browseMenu = document.getElementById("browseMenu");
    for (let planet of Planet.planets) {
        if (planet.name != "Sun" && !actualPlanetList.includes(planet.name)) {
            actualPlanetList.push(planet.name);
            let planetDiv = document.createElement("div");

            let planetName = document.createElement("p");
            planetName.innerText = planet.name;
            planetDiv.appendChild(planetName);

            let optionsDiv = document.createElement("div");
            optionsDiv.classList.add("removePlanet");
            let removeButton = document.createElement("button");
            removeButton.innerText = "X";
            removeButton.addEventListener('click', () => {
                removePlanet(planet);
            });
            optionsDiv.appendChild(removeButton);
            planetDiv.appendChild(optionsDiv);

            browseMenu.appendChild(planetDiv);
        }
    }
}



//Function That Removes A Planet From The Scene, The Instance And It's Name On The Browse List
function removePlanet(planet) {
    for (let element of document.getElementById("browseMenu").childNodes) {
        if (element.firstChild.innerText == planet.name) {
            element.remove();
        }
    }
    for (let name = 0; name < actualPlanetList.length; ++name) {
        if (planet.name == actualPlanetList[name]) {
            actualPlanetList.splice(name, 1);
        }
    }
    planet.removePlanet();
}