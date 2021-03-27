const controller = {
    pos0: new Vector2D(0, 0),
    vel0: new Vector2D(0, 0),

    randomName: (planets) => {
        let name = names[Math.floor(Math.random() * (names.length))];

        while (true) {
            let valid = true;
            for (planet of planets) {
                if (planet.name == name) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                return name;
            }
            else {
                name = names[Math.floor(Math.random() * (names.length))];
            }
        }
    },

    firstPoint: (event) => {
        event.preventDefault();
        controller.pos0.x = ((event.clientX/window.innerWidth) * (window.innerWidth/90) * 2 - window.innerWidth/90);
        controller.pos0.y = ((event.clientY/window.innerHeight) * (window.innerHeight/90) * 2 - window.innerHeight/90);
    },

    secondPoint: (event) => {
        event.preventDefault();
        let x = ortCamera.position.x + ((event.clientX/window.innerWidth) * (window.innerWidth/90) * 2 - window.innerWidth/90);
        let y = ortCamera.position.z + ((event.clientY/window.innerHeight) * (window.innerHeight/90) * 2 - window.innerHeight/90);
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

    createPlanet: () => {
        let randomNum = Math.random();
        let mass = randomNum*(10000000-100000)+100000;
        let radius = randomNum*(0.3-0.05)+0.05;
        let color = Math.random() * (16777215-0)+0;
        let planet = new Planet(
            controller.randomName(Planet.planets),
            controller.pos0.x,
            controller.pos0.y,
            controller.vel0.x,
            controller.vel0.y,
            mass, radius, color);
    }
}



document.getElementsByTagName("canvas")[0].addEventListener('mousedown', controller.firstPoint);
document.getElementsByTagName("canvas")[0].addEventListener('mouseup', controller.secondPoint);