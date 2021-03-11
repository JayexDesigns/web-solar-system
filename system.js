//Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x09061b);
scene.fog = new THREE.Fog(0x09061b, 3, 50);



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
var renderer = new THREE.WebGLRenderer({antialias: true});
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
})



//Class Vector2D
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        let x = this.x + vector.x;
        let y = this.y + vector.y;
        return new Vector2D(x, y);
    }

    sub(vector) {
        let x = this.x - vector.x;
        let y = this.y - vector.y;
        return new Vector2D(x, y);
    }

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

    div(num) {
        let x = this.x/num;
        let y = this.y/num;
        return new Vector2D(x, y);
    }

    abs() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    dist(vector) {
        let vec = this.sub(vector);
        return vec.abs(vec);
    }

    norm() {
        return new Vector2D(this.x/this.abs(), this.y/this.abs());
    }
}



//Class Planet
class Planet {
    static planets = [];
    static grav = 6.674e-11;
    static time = 0.01;

    constructor(posX, posY, vel0X, vel0Y, mass, radius, color, still=false) {
        this.pos = new Vector2D(posX, posY);

        if (!still) {
            this.vel0 = new Vector2D(vel0X, vel0Y);
            this.vel = this.vel0;
        }

        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.still = still;

        this.geometry = new THREE.SphereGeometry(this.radius, this.radius*100, this.radius*100);
        this.material = new THREE.MeshBasicMaterial({color:this.color, wireframe: false});
        this.index = Planet.planets.length;
        this.planet = new THREE.Mesh(this.geometry, this.material);
        this.planet.position.set(this.pos.x, 0, this.pos.y);
        Planet.planets[this.index] = this
        scene.add(this.planet);
    }

    updateVelocity() {
        if (!this.still) {
            for (let i = 0; i < Planet.planets.length; ++i) {
                if (Planet.planets[i] != this) {
                    let forceDir = (Planet.planets[i].pos.sub(this.pos)).norm();
                    let force = forceDir.mul((Planet.grav * this.mass * Planet.planets[i].mass) / (this.pos.dist(Planet.planets[i].pos)));
                    let acc = force.div(this.mass);
                    this.vel = this.vel.add(acc);
                }
            }
        }
    }

    updatePosition() {
        if (!this.still) {
            this.pos = this.pos.add(this.vel);
            this.planet.position.set(this.pos.x, 0, this.pos.y);
        }
    }
}

var sun = new Planet(0, 0, 0, 0, 100000000, 1, 0xffb300, true);
var venus = new Planet (-4, 0, 0, 0.05, 1000000, 0.1, 0x00ffa6);
var earth = new Planet (-6, 0, 0, 0.06, 1000000, 0.1, 0x00ccff);
var mars = new Planet (-8, 0, 0, 0.065, 1000000, 0.1, 0xf44336);



//Drawing Function
var render = function() {
    requestAnimationFrame(render);

    for (let i=0; i < Planet.planets.length; ++i) {
        Planet.planets[i].updateVelocity();
        Planet.planets[i].updatePosition();
    }
    
    Planet.time+=0.01;

    renderer.render(scene, ortCamera);
}

render();