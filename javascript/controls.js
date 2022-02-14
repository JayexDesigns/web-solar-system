const controller = {
    pos0: new Vector2D(0, 0),
    vel0: new Vector2D(0, 0),

    // Gives A Random Name Of The Names List
    randomName: (planets) => {
        let name = names[Math.floor(Math.random() * (names.length))];
        let counter = 0;

        while (true) {
            let valid = true;
            for (planet of planets) {
                if (planet.name == name) {
                    ++counter;
                    valid = false;
                    break;
                }
            }
            if (valid) {
                return name;
            }
            else {
                name = `${name.split(" ")[0]} ${counter}`;
            }
        }
    },

    // When The User Clicks Sets The First Position
    firstPoint: (event) => {
        event.preventDefault();
        if (event.changedTouches) {
            controller.pos0.x = ((event.changedTouches[0].clientX/window.innerWidth) * (window.innerWidth/90) * 2 - window.innerWidth/90);
            controller.pos0.y = ((event.changedTouches[0].clientY/window.innerHeight) * (window.innerHeight/90) * 2 - window.innerHeight/90);
        }
        else {
            controller.pos0.x = ((event.clientX/window.innerWidth) * (window.innerWidth/90) * 2 - window.innerWidth/90);
            controller.pos0.y = ((event.clientY/window.innerHeight) * (window.innerHeight/90) * 2 - window.innerHeight/90);
        }
    },

    // When The User Releases The Click Sets The Second Point And Calculates The Velocity
    secondPoint: (event) => {
        event.preventDefault();
        let x, y;
        if (event.changedTouches) {
            x = ortCamera.position.x + ((event.changedTouches[0].clientX/window.innerWidth) * (window.innerWidth/90) * 2 - window.innerWidth/90);
            y = ortCamera.position.z + ((event.changedTouches[0].clientY/window.innerHeight) * (window.innerHeight/90) * 2 - window.innerHeight/90);
        }
        else {
            x = ortCamera.position.x + ((event.clientX/window.innerWidth) * (window.innerWidth/90) * 2 - window.innerWidth/90);
            y = ortCamera.position.z + ((event.clientY/window.innerHeight) * (window.innerHeight/90) * 2 - window.innerHeight/90);
        }

        if (x == controller.pos0.x && y == controller.pos0.y) {
            controller.vel0.x = 0;
            controller.vel0.y = 0;
        }
        else {
            let pos = new Vector2D(x, y);
            controller.pos0.x += ortCamera.position.x;
            controller.pos0.y += ortCamera.position.z;
            controller.vel0 = pos.sub(controller.pos0).mul(0.3);
            controller.vel0.x *= 0.1;
            controller.vel0.y *= 0.1;
            controller.createPlanet();
        }
    },

    // Creates A Planet With Random Attributes (Not Including The Position And Velocity, Those Are Specified By The User)
    createPlanet: () => {
        let randomNum = Math.random();
        let mass = randomNum*(10000000-100000)+100000;
        let radius = randomNum*(0.3-0.05)+0.05;
        let color = Math.floor(Math.random() * (16777215-0)+0);
        let planet = new Planet(
            controller.randomName(Planet.planets),
            controller.pos0.x,
            controller.pos0.y,
            controller.vel0.x,
            controller.vel0.y,
            mass, radius, color);
    }
}



// Event Listeners
document.getElementsByTagName("canvas")[0].addEventListener('mousedown', controller.firstPoint);
document.getElementsByTagName("canvas")[0].addEventListener('mouseup', controller.secondPoint);
document.getElementsByTagName("canvas")[0].addEventListener('touchstart', controller.firstPoint);
document.getElementsByTagName("canvas")[0].addEventListener('touchend', controller.secondPoint);