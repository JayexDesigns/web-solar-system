var input = document.getElementById("velInput");
var butt = document.getElementById("setButton");

butt.addEventListener('click', () => {
    earth.vel = earth.vel.mul(input.value);
    input.value = "";
});