//Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);
scene.fog = new THREE.Fog(0x1a1a1a, 3, 50);



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

    abs() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
}



//Class Planet
class Planet {
    static planets = [];

    constructor(posX, posY, vel0X, vel0Y, mass, radius, color, still=false) {
        this.pos = new Vector2D(posX, posY);

        if (!still) {
            this.vel0 = new Vector2D(vel0X, vel0Y);
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

    updatePosition() {
        if (!this.still) {
            this.pos.x += 0.1;
            this.pos.y += 0.1;
            this.planet.position.set(this.pos.x, 0, this.pos.y);
        }
    }
}

var sun = new Planet(0, 0, 0, 0, 1, 1, 0xfebe40, true);
var earth = new Planet (-4, 0, 2, 2, 0.1, 0.1, 0x00ccff);
var earth2 = new Planet (4, 0, 1, 1, 0.1, 0.1, 0x00ffcc);
var earth3 = new Planet (2, 0, 3, 3, 0.1, 0.1, 0x7b00ff);



//Drawing Function
var render = function() {
    requestAnimationFrame(render);

    for (let i=0; i < Planet.planets.length; ++i) {
        Planet.planets[i].updatePosition();
    }

    renderer.render(scene, ortCamera);
}

render();