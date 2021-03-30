//Scene
var scene = new THREE.Scene();



//Perspective Camera
var persCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.01,
    1000
);

persCamera.position.set(0,15,0);
persCamera.rotation.set(0,0,0);
persCamera.lookAt(scene.position);

//Orthographic Camera
var ortCamera = new THREE.OrthographicCamera(
    -window.innerWidth/90,
    window.innerWidth/90,
    window.innerHeight/90,
    -window.innerHeight/90,
    0.01,
    1000
);

ortCamera.position.set(0,15,0);
ortCamera.rotation.set(0,0,0);
ortCamera.lookAt(scene.position);



//Renderer
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


//No Deformation When Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    persCamera.aspect = window.innerWidth / window.innerHeight;
    persCamera.updateProjectionMatrix();
    ortCamera.left = -window.innerWidth/90;
    ortCamera.right = window.innerWidth/90;
    ortCamera.top = window.innerHeight/90;
    ortCamera.bottom = -window.innerHeight/90;
    ortCamera.updateProjectionMatrix();
});



//Class Vector2D
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //Adds A Vector To The Instance Vector
    add(vector) {
        let x = this.x + vector.x;
        let y = this.y + vector.y;
        return new Vector2D(x, y);
    }

    //Subtracts A Vector To The Instance Vector
    sub(vector) {
        let x = this.x - vector.x;
        let y = this.y - vector.y;
        return new Vector2D(x, y);
    }

    //Multiplies The Vector By A Scalar Or Another Vector
    mul(arg) {
        if (arg instanceof Vector2D) {
            let x = this.x * arg.x;
            let y = this.y * arg.y;
            return new Vector2D(x, y);
        }
        else {
            let x = this.x * arg
            let y = this.y * arg
            return new Vector2D(x, y);
        }
    }

    //Divides The Vector By A Scalar
    div(num) {
        let x = this.x/num;
        let y = this.y/num;
        return new Vector2D(x, y);
    }

    //Returns The Module Of The Vector
    abs() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    //Calculates The Distance Of Two Points
    dist(vector) {
        let vec = this.sub(vector);
        return vec.abs(vec);
    }

    //Returns A Vector That Has The Same Direction As The Instance But Has Module 1
    norm() {
        return new Vector2D(this.x/this.abs(), this.y/this.abs());
    }

    //Returns The Max Value Of A Vector, Max Value Specified By The Parameter
    max(num) {
        let x = num * this.x/this.abs();
        let y = num * this.y/this.abs();
        return new Vector2D(x, y);
    }
}



//Class Planet
class Planet {
    //Class Attributes
    static planets = [];
    static grav = 6.674e-11;
    static velCap = true;
    static velCapVal = 0.25;
    static collisionSystem = false;

    //Constructor Of The Class, Adds Planet To The Three Js Scene
    constructor(name, posX, posY, vel0X, vel0Y, mass, radius, color, still=false) {
        this.pos = new Vector2D(posX, posY);

        if (!still) {
            this.vel0 = new Vector2D(vel0X, vel0Y);
            this.vel = this.vel0;
        }

        this.name = name;

        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.still = still;

        this.geometry = new THREE.SphereGeometry(this.radius, this.radius*100, this.radius*100);
        this.material = new THREE.MeshBasicMaterial({color:this.color, wireframe: false});
        this.index = Planet.planets.length;
        this.planet = new THREE.Mesh(this.geometry, this.material);

        this.planet.position.set(this.pos.x, 0, this.pos.y);
        Planet.planets[this.index] = this;

        this.planet.name = this.name;
        scene.add(this.planet);

        try {
            if (menuDisplayed) {
                makePlanetList();
            }
        }
        catch {
            return;
        }
    }

    //Calculates The Force And Velocity Of The Instance
    updateVelocity() {
        if (!this.still) {
            for (let i = 0; i < Planet.planets.length; ++i) {
                if (Planet.planets[i] != this) {
                    let forceDir = (Planet.planets[i].pos.sub(this.pos)).norm();
                    let force = forceDir.mul((Planet.grav * this.mass * Planet.planets[i].mass) / (this.pos.dist(Planet.planets[i].pos)));
                    let acc = force.div(this.mass);
                    this.vel = this.vel.add(acc);
                    if (Planet.velCap && this.vel.abs() > Planet.velCapVal) {
                        this.vel = this.vel.max(Planet.velCapVal - 0.001);
                    }
                }
            }
        }
    }

    //Updates The Position Of The Instance
    updatePosition() {
        if (!this.still) {
            this.pos = this.pos.add(this.vel);
            this.planet.position.set(this.pos.x, 0, this.pos.y);
        }
    }

    //Remove The Planet Instance
    removePlanet() {
        scene.remove(scene.getObjectByName(this.name));
        for (let i = 0; i < Planet.planets.length; ++i) {
            if (Planet.planets[i].name == this.name) {
                Planet.planets.splice(i, 1);
            }
        }
    }

    //Collision Detection Method (Resource Intensive)
    collisionDetection() {
        for (let i = 0; i < Planet.planets.length; ++i) {
            if (Planet.planets[i] != this) {
                if (this.pos.dist(Planet.planets[i].pos) < this.radius + Planet.planets[i].radius) {
                    if (this.mass < Planet.planets[i].mass) {
                        Planet.planets[i].mass += this.mass;
                        console.log(`${Planet.planets[i].name} ate ${this.name}`);
                        removePlanet(this);
                    }
                    else if (this.mass > Planet.planets[i].mass) {
                        this.mass += Planet.planets[i].mass;
                        console.log(`${this.name} ate ${Planet.planets[i].name}`);
                        removePlanet(Planet.planets[i]);
                    }
                    else {
                        if (Math.random >= 0.5) {
                            Planet.planets[i].mass += this.mass;
                            console.log(`${Planet.planets[i].name} ate ${this.name}`);
                            removePlanet(this);
                        }
                        else {
                            this.mass += Planet.planets[i].mass;
                            console.log(`${this.name} ate ${Planet.planets[i].name}`);
                            removePlanet(Planet.planets[i]);
                        }
                    }
                }
            }
        }
    }
}



//Default Planets
var sun = new Planet("Sun", 0, 0, 0, 0, 100000000, 1, 0xffb300);
var venus = new Planet ("Venus", -4, 0, 0, 0.08, 1000000, 0.1, 0x00ffa6);
var earth = new Planet ("Earth", -6, 0, 0, 0.085, 1000000, 0.1, 0x00ccff);
var mars = new Planet ("Mars", -8, 0, 0, 0.087, 1000000, 0.1, 0xf44336);



//Drawing Function
var render = function() {
    requestAnimationFrame(render);

    for (let i=0; i < Planet.planets.length; ++i) {
        Planet.planets[i].updateVelocity();
        Planet.planets[i].updatePosition();
        if (Planet.collisionSystem) {
            Planet.planets[i].collisionDetection();
        }
    }
    
    ortCamera.position.set(sun.pos.x, 15, sun.pos.y);

    renderer.render(scene, ortCamera);
}

render();