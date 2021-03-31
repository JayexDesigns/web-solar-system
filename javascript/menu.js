//Dropdown Of The Main Menu
var dropButton = document.getElementById("dropdown");
var menuDisplayed = false;

dropButton.addEventListener('click', () => {
    let menu = document.getElementById("menu");
    if (menuDisplayed) {
        menu.style.top = "-50%";
        document.getElementById("createMenu").style.top = "-50%";
        document.getElementById("browseMenu").style.top = "-50%";
        document.getElementById("generalMenu").style.top = "-50%";
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
var generalButton = document.getElementById("generalButton");

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

generalButton.addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById("generalMenu").style.top = "50%";
    }, 150);
    document.getElementById("menu").style.top = "-50%";
});



//Event And Functioning Of The Create Planet Menu
var createPlanet = document.getElementById("createPlanet");

createPlanet.addEventListener('click', () => {
    let name = document.getElementById("createName").childNodes[1].value;
    let posX = ortCamera.position.x + parseFloat(document.getElementById("createPosX").value);
    let posY = ortCamera.position.z + parseFloat(document.getElementById("createPosY").value);
    let velX = parseFloat(document.getElementById("createVelX").value) * 0.01;
    let velY = parseFloat(document.getElementById("createVelY").value) * 0.01;
    let mass = parseFloat(document.getElementById("createMass").childNodes[1].value) * 1000;
    let radius = parseFloat(document.getElementById("createRadius").childNodes[1].value) * 0.1;
    let color = parseInt(document.getElementById("createColor").childNodes[1].value, 16);
    let fixed = document.getElementById("createStatic").childNodes[1].checked;
    let followed = document.getElementById("createCameraFollow").childNodes[1].checked;
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
        let planet = new Planet(name, posX, posY, velX, velY, mass, radius, color, fixed, followed);
    }
});



//Event And Functioning Of The Browse Planet Menu
var actualPlanetList = [];

function makePlanetList() {
    let browseMenu = document.getElementById("browseMenu");
    for (let planet of Planet.planets) {
        if (!actualPlanetList.includes(planet.name)) {
            actualPlanetList.push(planet.name);
            let planetDiv = document.createElement("div");


            let planetName = document.createElement("p");
            planetName.innerText = planet.name;
            let stringColor = planet.color.toString(16);
            while (stringColor.length < 6) {
                stringColor = `0${stringColor}`;
            }
            planetName.style.color = `#${stringColor}`;
            planetDiv.appendChild(planetName);


            let removeSection = document.createElement("div");
            removeSection.classList.add("removePlanet");
            let removeButton = document.createElement("button");
            removeButton.innerText = "X";
            removeButton.addEventListener('click', () => {
                removePlanet(planet);
            });
            removeSection.appendChild(removeButton);
            planetDiv.appendChild(removeSection);


            let optionsDiv = document.createElement("div");
            optionsDiv.classList.add("planetOptions");
            let positionDiv = document.createElement("div");
            let positionX = document.createElement("input");
            positionX.type = "text";
            positionX.setAttribute("placeholder", "X Position");
            positionX.classList.add("lightInput");
            let positionY = document.createElement("input");
            positionY.type = "text";
            positionY.setAttribute("placeholder", "Y Position");
            positionY.classList.add("lightInput");
            positionDiv.appendChild(positionX);
            positionDiv.appendChild(positionY);

            let velocityDiv = document.createElement("div");
            let velocityX = document.createElement("input");
            velocityX.type = "text";
            velocityX.setAttribute("placeholder", "X Velocity");
            velocityX.classList.add("lightInput");
            let velocityY = document.createElement("input");
            velocityY.type = "text";
            velocityY.setAttribute("placeholder", "Y Velocity");
            velocityY.classList.add("lightInput");
            velocityDiv.appendChild(velocityX);
            velocityDiv.appendChild(velocityY);

            let massOption = document.createElement("input");
            massOption.type = "text";
            massOption.setAttribute("placeholder", "Mass");
            massOption.classList.add("lightInput");

            let otherOptions = document.createElement("div");
            let fixedLabel = document.createElement("label");
            fixedLabel.innerText = "Static";
            let fixedCheckbox = document.createElement("input");
            fixedCheckbox.type = "checkbox";
            fixedCheckbox.classList.add("lightInput");
            if (planet.fixed) {fixedCheckbox.checked = true}
            else {fixedCheckbox.checked = false}
            fixedLabel.appendChild(fixedCheckbox);
            
            let followedLabel = document.createElement("label");
            followedLabel.innerText = "Followed";
            let followedCheckbox = document.createElement("input");
            followedCheckbox.type = "checkbox";
            followedCheckbox.classList.add("lightInput");
            if (planet.followed) {followedCheckbox.checked = true}
            else {followedCheckbox.checked = false}
            followedLabel.appendChild(followedCheckbox);
            otherOptions.appendChild(fixedLabel);
            otherOptions.appendChild(followedLabel);

            let setButton = document.createElement("button");
            setButton.innerText = "Set";
            setButton.addEventListener('click', () => {
                if (positionX.value != "") {
                    posX = parseFloat(positionX.value);
                    if (!isNaN(posX)) {
                        planet.pos.x = ortCamera.position.x + posX;
                    }
                }
                if (positionY.value != "") {
                    posY = parseFloat(positionY.value);
                    if (!isNaN(posY)) {
                        planet.pos.y = ortCamera.position.z + posY;
                    }
                }
                if (velocityX.value != "") {
                    velX = parseFloat(velocityX.value);
                    if (!isNaN(velX)) {
                        planet.vel.x = velX * 0.01;
                    }
                }
                if (velocityY.value != "") {
                    velY = parseFloat(velocityY.value);
                    if (!isNaN(velY)) {
                        planet.vel.y = velY * 0.01;
                    }
                }
                if (massOption.value != "") {
                    mass = parseFloat(massOption.value);
                    if (!isNaN(mass)) {
                        planet.mass = mass * 1000;
                    }
                }
                planet.fixed = fixedCheckbox.checked;
                if (followedCheckbox.checked) {
                    planet.followed = true;
                    if (Planet.currentFollowed != undefined) {
                        Planet.currentFollowed.followed = false;
                    }
                    Planet.currentFollowed = planet;
                }
                else {
                    if (Planet.currentFollowed == planet) {
                        Planet.currentFollowed = undefined;
                        planet.followed = false;
                    }
                }
            });

            optionsDiv.appendChild(positionDiv);
            optionsDiv.appendChild(velocityDiv);
            optionsDiv.appendChild(massOption);
            optionsDiv.appendChild(otherOptions);
            optionsDiv.appendChild(setButton);
            planetDiv.appendChild(optionsDiv);


            browseMenu.appendChild(planetDiv);


            let red = parseInt(stringColor.slice(0,2), 16);
            let green = parseInt(stringColor.slice(2,4), 16);
            let blue = parseInt(stringColor.slice(4,6), 16);
            if ((red*0.299 + green*0.587 + blue*0.114) > 186) {
                planetDiv.style.backgroundColor = "#1a1a1a";
                planetDiv.style.boxShadow = "0 0 3vh #777777";

                removeButton.style.color = "#ffffff";
                removeButton.style.backgroundColor = "#1a1a1a";

                positionX.style.color = "#ffffff";
                positionX.style.backgroundColor = "#1a1a1a";
                positionX.style.boxShadow = "0 0 3vh #333333";
                positionX.classList.add("darkInput");
                positionY.style.color = "#ffffff";
                positionY.style.backgroundColor = "#1a1a1a";
                positionY.style.boxShadow = "0 0 3vh #333333";
                positionY.classList.add("darkInput");

                velocityX.style.color = "#ffffff";
                velocityX.style.backgroundColor = "#1a1a1a";
                velocityX.style.boxShadow = "0 0 3vh #333333";
                velocityX.classList.add("darkInput");
                velocityY.style.color = "#ffffff";
                velocityY.style.backgroundColor = "#1a1a1a";
                velocityY.style.boxShadow = "0 0 3vh #333333";
                velocityY.classList.add("darkInput");

                massOption.style.color = "#ffffff";
                massOption.style.backgroundColor = "#1a1a1a";
                massOption.style.boxShadow = "0 0 3vh #333333";
                massOption.classList.add("darkInput");

                fixedLabel.style.color = "#ffffff";
                fixedCheckbox.style.boxShadow = "0 0 1vh #888888";
                fixedCheckbox.style.backgroundColor = "#1a1a1a";
                fixedCheckbox.style.borderColor = "#1a1a1a";
                fixedCheckbox.classList.add("darkInput");
                
                followedLabel.style.color = "#ffffff";
                followedCheckbox.style.boxShadow = "0 0 1vh #888888";
                followedCheckbox.style.backgroundColor = "#1a1a1a";
                followedCheckbox.style.borderColor = "#1a1a1a";
                followedCheckbox.classList.add("darkInput");

                setButton.style.color = "#ffffff";
                setButton.style.backgroundColor = "#1a1a1a";
                setButton.style.boxShadow = "0 0 3vh #333333";
            }
        }
    }
}



//Event And Functioning Of The General Settings Menu
var applySettings = document.getElementById("applySettings");

applySettings.addEventListener('click', () => {
    let generalMenu = document.getElementById("generalMenu");
    let sections = generalMenu.getElementsByTagName("section");
    let gravValue = parseFloat(sections[0].childNodes[1].value);
    let velCap = sections[1].childNodes[1].checked;
    let velCapValue = parseFloat(sections[2].childNodes[1].value);
    let collSystem = sections[3].childNodes[1].checked;
    if (!isNaN(gravValue)) {
        Planet.grav = gravValue * 1e-11;
    }
    if (!isNaN(velCapValue)) {
        Planet.velCapVal = velCapValue * 0.01;
    }
    Planet.velCap = velCap;
    Planet.collisionSystem = collSystem;

    document.getElementById("generalMenu").style.top = "-50%";
    menuDisplayed = false;
});



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
    if (planet.followed) {
        Planet.currentFollowed = undefined;
    }
    planet.removePlanet();
}