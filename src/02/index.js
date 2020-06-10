import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

window.addEventListener('load', init);

function init() {
    // create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(window.innerWidth, window.innerHeight); // width, height
    renderer.setClearColor('#aaaaaa');
    renderer.shadowMap.enabled = true;

    let enableFog = false;

    // create a scene
    const scene = new THREE.Scene();
    
    const gui = new dat.GUI();
    
    // create a camera
    const camera = new THREE.PerspectiveCamera(
        45, // field of view
        window.innerWidth / window.innerHeight, // aspect ratio
        1, // near clipping plane
        2000 // far clipping plane
        );
    // anything beyond the near-far clipping plane
    // will not be displayed/calculated
    
    camera.position.set(0, 200, 1500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    if (enableFog) {
        scene.fog = new THREE.FogExp2('#aaaaaa', 0.001);
    }

    const cube = getCube(100, 100, 100);
    scene.add(cube);

    const plane = getPlane(500);
    plane.position.y = - cube.geometry.parameters.height / 2
    plane.rotation.x = Math.PI/2;
    scene.add(plane);

    const pointLight = getPointLight(1);
    pointLight.position.y = 101;
    scene.add(pointLight);

    const sphere = getSphere(5);
    pointLight.add(sphere);

    gui.add(pointLight.position, 'x', -250, 250);
    gui.add(pointLight.position, 'y', 50, 450);
    gui.add(pointLight.position, 'z', -250, 250);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    update(renderer, scene, camera, controls);
}

function update(renderer, scene, camera, controls) {

    renderer.render(scene, camera);

    requestAnimationFrame(() => update(renderer, scene, camera, controls));
    
}

function getCube(width, height, depth) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
        color: '#aaaaaa'
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    return mesh;
}

function getPlane(size) {
    const geometry = new THREE.PlaneGeometry(size, size, size);
    const material = new THREE.MeshPhongMaterial({
        color: '#aaaaaa',
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    return mesh;
}

function getPointLight(intensity) {
    const light = new THREE.PointLight('#ffffff', intensity);
    light.castShadow = true;
    return light;
}

function getSphere(size) {
    const geometry = new THREE.SphereGeometry(size, 24, 24);
    const material = new THREE.MeshBasicMaterial({
        color: '#fff'
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}