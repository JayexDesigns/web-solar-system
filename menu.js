var dropButton = document.getElementById("dropdown");
var menuDisplayed = false;

dropButton.addEventListener('click', () => {
    let menu = document.getElementById("menu");
    if (menuDisplayed) {
        document.getElementById("menu").style.top = "-50%";
        document.getElementById("createMenu").style.top = "-50%";
        document.getElementById("browseMenu").style.top = "-50%";
        menuDisplayed = false;
    }
    else if (!menuDisplayed) {
        document.getElementById("menu").style.top = "50%";
        menuDisplayed = true;
    }
});



var createMenu = document.getElementById("createButton");
var browseMenu = document.getElementById("browseButton");

createMenu.addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById("createMenu").style.top = "50%";
    }, 150);
    document.getElementById("menu").style.top = "-50%";
});

browseMenu.addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById("browseMenu").style.top = "50%";
    }, 150);
    document.getElementById("menu").style.top = "-50%";
});



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
    else if (color > 16777215 || color < 0) {
        document.getElementsByTagName("h1")[0].innerHTML = "Color has to be<br>a valid hex color";
        setTimeout(() => {
            document.getElementsByTagName("h1")[0].innerText = "Create Planet";
        }, 2000);
    }
    else {
        document.getElementById("createName").childNodes[1].value = "";
        document.getElementById("createMenu").style.top = "-50%";
        menuDisplayed = false;
        let planet = new Planet(name, posX, posY, velX, velY, mass, radius, color);
    }
});