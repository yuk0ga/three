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
    
    camera.position.set(0, 0, 2);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    const controls = new OrbitControls(camera, renderer.domElement);

    let texture = new THREE.TextureLoader().load('../assets/images/taxi.jpg', (tex) => {
        tex.needsUpdate = true;
        mesh.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
      }); 
    let mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(), 
        new THREE.MeshBasicMaterial({map: texture})
    )
    scene.add(mesh);

    update(renderer, scene, camera, controls);
}

function update(renderer, scene, camera, controls) {

    renderer.render(scene, camera);

    requestAnimationFrame(() => update(renderer, scene, camera, controls));
    
}