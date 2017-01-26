"use strict";

// These are core functions that set up and run three.js.
// You generally don't need to change anything here.

var renderer, scene, camera, controls, effect, clock;
var params, manager, lastRender;

function init() {
    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    controls = new THREE.VRControls(camera);
    effect = new THREE.VREffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);

    clock = new THREE.Clock;

    params = {
        hideButton: false,
        isUndistorted: false
    };

    manager = new WebVRManager(renderer, effect, params);

    lastRender = 0;
}

function render(timestamp) {
    var delta = Math.min(timestamp - lastRender, 500);
    lastRender = timestamp;

    controls.update();

    manager.render(scene, camera, timestamp);
}

