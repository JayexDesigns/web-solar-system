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



//Grid Helper
var gridHelper = new THREE.GridHelper(100, 200, 0xFF0066, 0x2a2a2a);
// scene.add(gridHelper);



//Sun
var geometry = new THREE.SphereGeometry(1, 100, 100);
var material = new THREE.MeshBasicMaterial({color:0xfebe40, wireframe: false});
var sun = new THREE.Mesh(geometry, material);
sun.position.set(0,0,0);
scene.add(sun);



//Mercury
var mercuryVar = 0;
var mercuryVel = 0.01;
var mercuryDis = 2;
var mercurySize = 0.0035036*5;
var geometry = new THREE.SphereGeometry(mercurySize, 20, 20);
var material = new THREE.MeshBasicMaterial({color:0xd0ad9a, wireframe: false});
var mercury = new THREE.Mesh(geometry, material);
mercury.position.set(0,0,mercuryDis);
scene.add(mercury);



//Venus
var venusVar = 0;
var venusVel = 0.0073155;
var venusDis = 3;
var venusSize = 0.0086908*5;
var geometry = new THREE.SphereGeometry(venusSize, 20, 20);
var material = new THREE.MeshBasicMaterial({color:0x50b86b, wireframe: false});
var venus = new THREE.Mesh(geometry, material);
venus.position.set(0,0,venusDis);
scene.add(venus);



//Earth
var earthVar = 0;
var earthVel = 0.0062248;
var earthDis = 4;
var earthSize = 0.0091492*5;
var geometry = new THREE.SphereGeometry(earthSize, 20, 20);
var material = new THREE.MeshBasicMaterial({color:0x2bb3cd, wireframe: false});
var earth = new THREE.Mesh(geometry, material);
earth.position.set(0,0,earthDis);
scene.add(earth);



//Mars
var marsVar = 0;
var marsVel = 0.0050294;
var marsDis = 5;
var marsSize = 0.0048675*5;
var geometry = new THREE.SphereGeometry(marsSize, 20, 20);
var material = new THREE.MeshBasicMaterial({color:0xec7523, wireframe: false});
var mars = new THREE.Mesh(geometry, material);
mars.position.set(0,0,marsDis);
scene.add(mars);



//Jupiter
var jupiterVar = 0;
var jupiterVel = 0.0027301;
var jupiterDis = 6.5;
var jupiterSize = 0.1003977*5;
var geometry = new THREE.SphereGeometry(jupiterSize, 20, 20);
var material = new THREE.MeshBasicMaterial({color:0x66342d, wireframe: false});
var jupiter = new THREE.Mesh(geometry, material);
jupiter.position.set(0,0,jupiterDis);
scene.add(jupiter);



//Saturn
var saturnVar = 0;
var saturnVel = 0.00202004;
var saturnDis = 8;
var saturnSize = 0.0836258*5;
var geometry = new THREE.SphereGeometry(saturnSize, 20, 20);
var material = new THREE.MeshBasicMaterial({color:0xfed883, wireframe: false});
var saturn = new THREE.Mesh(geometry, material);
saturn.position.set(0,0,saturnDis);
scene.add(saturn);

var geometry = new THREE.RingGeometry(saturnSize + 0.05, saturnSize + 0.2, 40);
var material = new THREE.MeshBasicMaterial({color:0xfed883, side: THREE.DoubleSide});
var saturnRing = new THREE.Mesh(geometry, material);
saturnRing.position.set(0,0,saturnDis);
saturnRing.rotation.x = Math.PI/2;
scene.add(saturnRing)



//Uranus
var uranusVar = 0;
var uranusVel = 0.0014225;
var uranusDis = 9;
var uranusSize = 0.0364218*5;
var geometry = new THREE.SphereGeometry(uranusSize, 20, 20);
var material = new THREE.MeshBasicMaterial({color:0x30b1ad, wireframe: false});
var uranus = new THREE.Mesh(geometry, material);
uranus.position.set(0,0,uranusDis);
scene.add(uranus);



//Neptune
var neptuneVar = 0;
var neptuneVel = 0.0011442;
var neptuneDis = 10;
var neptuneSize = 0.0353591*5;
var geometry = new THREE.SphereGeometry(neptuneSize, 20, 20);
var material = new THREE.MeshBasicMaterial({color:0x1d5c87, wireframe: false});
var neptune = new THREE.Mesh(geometry, material);
neptune.position.set(0,0,neptuneDis);
scene.add(neptune);



//Light
var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);



//Drawing Function
var render = function() {
    requestAnimationFrame(render);

    mercury.position.x = Math.sin(mercuryVar)*mercuryDis;
    mercury.position.z = Math.cos(mercuryVar)*mercuryDis;
    mercuryVar += mercuryVel;

    venus.position.x = Math.sin(venusVar)*venusDis;
    venus.position.z = Math.cos(venusVar)*venusDis;
    venusVar += venusVel;

    earth.position.x = Math.sin(earthVar)*earthDis;
    earth.position.z = Math.cos(earthVar)*earthDis;
    earthVar += earthVel;

    mars.position.x = Math.sin(marsVar)*marsDis;
    mars.position.z = Math.cos(marsVar)*marsDis;
    marsVar += marsVel;

    jupiter.position.x = Math.sin(jupiterVar)*jupiterDis;
    jupiter.position.z = Math.cos(jupiterVar)*jupiterDis;
    jupiterVar += jupiterVel;

    saturn.position.x = Math.sin(saturnVar)*saturnDis;
    saturn.position.z = Math.cos(saturnVar)*saturnDis;
    saturnRing.position.x = Math.sin(saturnVar)*saturnDis;
    saturnRing.position.z = Math.cos(saturnVar)*saturnDis;
    saturnVar += saturnVel;

    uranus.position.x = Math.sin(uranusVar)*uranusDis;
    uranus.position.z = Math.cos(uranusVar)*uranusDis;
    uranusVar += uranusVel;

    neptune.position.x = Math.sin(neptuneVar)*neptuneDis;
    neptune.position.z = Math.cos(neptuneVar)*neptuneDis;
    neptuneVar += neptuneVel;

    renderer.render(scene, ortCamera);
}

render();