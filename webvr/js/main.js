"use strict";

// 1. Wrap everything inside a function called main() that runs after the page has loaded.
// 2. init() from core runs first.
// 3. Do all your setup.
// 4. animate() is your animation loop.

var geometry, material, cube, light;
var animation, ground, groundMaterial, planeGeometry;
var skySphere, skySphereGeo, skySphereMat, skySphereTextureLoader;

function main() {
    init();

    light = new THREE.HemisphereLight( 0xffffff, 0x003300, 1 );
    light.position.set( - 80, 500, 50 );
    scene.add(light);

    skySphereTextureLoader = new THREE.TextureLoader();
    skySphereTextureLoader.load("./textures/pano.jpg", onSkySphereTextureLoaded);

    groundMaterial = new THREE.MeshPhongMaterial( { color: 0xaa0000 } );
    planeGeometry = new THREE.PlaneBufferGeometry( 16000, 16000 );
    ground = new THREE.Mesh( planeGeometry, groundMaterial );
    ground.position.set( 0, -250, 0 );
    ground.rotation.x = -Math.PI/2;
    scene.add(ground);

    function onSkySphereTextureLoaded(texture) {
        skySphereGeo = new THREE.SphereGeometry(500, 60, 40);
        skySphereGeo.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
        skySphereMat = new THREE.MeshBasicMaterial({ map : texture });
        skySphere = new THREE.Mesh(skySphereGeo, skySphereMat);
        scene.add(skySphere);
    }

    geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    material = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -3);
    scene.add(cube);

    function animate(timestamp) {
        var delta = clock.getDelta();

        cube.rotation.y += delta * 0.5;

        render(timestamp);
        requestAnimationFrame(animate);
    }

    animate(performance ? performance.now() : Date.now());
}

window.onload = main;
