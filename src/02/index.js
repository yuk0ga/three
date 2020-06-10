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
    renderer.setClearColor('#ffffff');

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

    scene.fog = new THREE.FogExp2('#ffffff', 0.001);

    const cube = getCube(100, 100, 100);
    scene.add(cube);

    const plane = getPlane(500);
    plane.position.y = - cube.geometry.parameters.height / 2
    plane.rotation.x = Math.PI/2;
    scene.add(plane);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    update(renderer, scene, camera, controls);
}

function update(renderer, scene, camera, controls) {

    renderer.render(scene, camera);

    requestAnimationFrame(() => update(renderer, scene, camera, controls));
    
}

function getCube(width, height, depth) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({
        color: '#ff00ff'
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function getPlane(size) {
    const geometry = new THREE.PlaneGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
        color: '#12a12a',
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}