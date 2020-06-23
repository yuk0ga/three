import * as THREE from 'three';
import * as dat from 'dat.gui';
const createGeometry = require('three-bmfont-text');
const loadFont = require('load-bmfont');
const MSDFShader = require('three-bmfont-text/shaders/msdf');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

window.addEventListener('load', init);

function init() {
    // create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(window.innerWidth, window.innerHeight); // width, height
    renderer.setClearColor('#fff');
    
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
    
    camera.position.set(0, 0, 300);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    const controls = new OrbitControls(camera, renderer.domElement);

    // loading the font and geometry
    loadFont('../assets/fonts/Lato-Black.fnt', (err, font) => {
        // Create a geometry of packed bitmap glyphs
        const geometry = createGeometry({
        font,
        text: 'EXCELLENCE'
        });
        
        // Load texture containing font glyphs
        const loader = new THREE.TextureLoader();
        loader.load('../assets/fonts/Lato-Black.png', (texture) => {
            // Start and animate renderer
            createMesh(geometry, texture, scene);
            update(renderer, scene, camera, controls);
        });
    });
}

// creating the text mesh
function createMesh(geometry, texture, scene) {
    // Create material with msdf shader from three-bmfont-text
    const material = new THREE.RawShaderMaterial(MSDFShader({
        map: texture,
        color: 0x000000, // We'll remove it later when defining the fragment shader
        side: THREE.DoubleSide,
        transparent: true,
        negate: false,
    }));

    // Create mesh of text       
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-130, 0, 0); // Move according to text size
    mesh.rotation.set(Math.PI, 0, 0); // Spin to face correctly
    scene.add(mesh);
}

function update(renderer, scene, camera, controls) {

    renderer.render(scene, camera);

    requestAnimationFrame(() => update(renderer, scene, camera, controls));
    
}