import * as THREE from 'three'

window.addEventListener('load', init);

function init() {
    // create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(window.innerWidth, window.innerHeight); // width, height

    // create a scene
    const scene = new THREE.Scene();

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

    // create a cube
    const geometry = new THREE.BoxGeometry(300, 300, 300);
    // define a material
    const material = new THREE.MeshNormalMaterial();
    // create a cube mesh with material
    const cubeMesh = new THREE.Mesh(geometry, material);
    cubeMesh.name = 'cube';

    // add cube to scene
    scene.add(cubeMesh);
    update(renderer, scene, camera);
}

function update(renderer, scene, camera) {
    var cube = scene.getObjectByName('cube');
    cube.rotation.y += 0.05;
    cube.rotation.z += 0.05;

    renderer.render(scene, camera);

    requestAnimationFrame(() => update(renderer, scene, camera));
}