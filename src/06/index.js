import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
const vertexShader = require('./shaders/vertex.glsl');
const fragmentShader = require('./shaders/fragment.glsl');
var uMouse = new THREE.Vector2(0,0);
var customPass;

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
    
    camera.position.set(0, 0, 1.5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    // const controls = new OrbitControls(camera, renderer.domElement);

    let texture = new THREE.TextureLoader().load('../assets/images/taxi.jpg', (tex) => {
        tex.needsUpdate = true;
        mesh.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
      }); 

    let mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(), 
        new THREE.MeshBasicMaterial({map: texture})
    );

    scene.add(mesh);

    let composer = new EffectComposer(renderer);
    let renderPass = new RenderPass(scene, camera);

    composer.addPass(renderPass);

    let uniforms = {
        "tDiffuse": { value: null },
        "resolution": { value: new THREE.Vector2(1.,window.innerHeight/window.innerWidth) },
        "uMouse": { value: new THREE.Vector2(-10,-10) },
        "uVelo": { value: 0 },
    }

    customPass = new ShaderPass({uniforms, vertexShader, fragmentShader});

    customPass.renderToScreen = true;
    composer.addPass(customPass);

    update(composer, scene, camera);
}

document.addEventListener('mousemove', (e) => {
    // mousemove / touchmove
    uMouse.x = ( e.clientX / window.innerWidth ) ;
    uMouse.y = 1. - ( e.clientY/ window.innerHeight );
  });

function update(composer, scene, camera) {
    customPass.uniforms.uMouse.value = uMouse;

    composer.render();

    requestAnimationFrame(() => update(composer, scene, camera));
    
}