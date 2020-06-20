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
    renderer.setClearColor('#ddd');
    renderer.shadowMap.enabled = true;

    const clock = new THREE.Clock();

    let enableFog = false;

    // create a scene
    const scene = new THREE.Scene();
    
    const gui = new dat.GUI();

    const camera = new THREE.OrthographicCamera(
        -200, +200, 160, -160, 1, 1000
    );
    
    camera.position.set(100, 50, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    if (enableFog) {
        scene.fog = new THREE.FogExp2('#aaaaaa', 0.001);
    }

    const directionalLight = getDirectionalLight(0.005);
    directionalLight.position.x = 110;
    directionalLight.position.y = 200;
    directionalLight.position.z = 250;
    scene.add(directionalLight);

    const sphere = getSphere(5);
    directionalLight.add(sphere);

    const cubeGrid = getCubeGrid(15, 10);
    scene.add(cubeGrid);
    cubeGrid.name = 'cubeGrid';

    const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    helper.visible = false;
    scene.add(helper);

    const light = gui.addFolder("Light");
    light.add(directionalLight.position, 'x', -250, 250);
    light.add(directionalLight.position, 'y', 50, 450);
    light.add(directionalLight.position, 'z', -250, 250);
    light.add(directionalLight, 'intensity', 0.001, 10);
    light.add(helper, 'visible', 0, 1);
    // light.add(directionalLight, 'penumbra', 0, 1);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    update(renderer, scene, camera, controls, clock);
}

function update(renderer, scene, camera, controls, clock) {
    renderer.render(scene, camera);

    const timeElapsed = clock.getElapsedTime();

    const cubeGrid = scene.getObjectByName('cubeGrid');
    cubeGrid.children.forEach((child, index) => {
        child.scale.y = Math.sin(timeElapsed * 2 + index / 3) + 5;

        // change color
        var val = Math.sin(timeElapsed / 4) * 210;
        var val2 = Math.sin(timeElapsed / 2) * 210;
        val = val > 130 ? val : 130;
        val2 = val2 > 130 ? val2 : 130;
        child.material.color = new THREE.Color(val, val2, 210);
    });

    requestAnimationFrame(() => update(renderer, scene, camera, controls, clock));
    
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

function getCubeGrid(amount, space) {
    const group = new THREE.Group();

    for (let i=0; i<amount; i++) {
        const cube = getCube(10, 10, 10);
        cube.position.x = i * space;
        cube.position.y = cube.geometry.parameters.height / 2;
        group.add(cube);
        for (let j=0; j<amount; j++) {
            const cube = getCube(10, 10, 10);
            cube.position.x = i * space;
            cube.position.y = cube.geometry.parameters.height / 2;
            cube.position.z = j * space;
            group.add(cube);
        }
    }

    group.position.x = - (space * (amount - 1))/2;
    group.position.z = - (space * (amount - 1))/2;

    return group;
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

function getSpotLight(intensity) {
    const light = new THREE.SpotLight('#ffffff', intensity);
    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    return light;
}

function getDirectionalLight(intensity) {
    const light = new THREE.DirectionalLight('#ffffff', intensity);
    light.castShadow = true;

    light.shadow.camera.left = -150;
    light.shadow.camera.bottom = -150;
    light.shadow.camera.right = 150;
    light.shadow.camera.top = 150;

    return light;
}

function getAmbientLight(intensity) {
    const light = new THREE.AmbientLight('#103050', intensity);
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