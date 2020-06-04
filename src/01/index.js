// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

    // create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(960, 540);

    // create a scene
    const scene = new THREE.Scene();

    // create a camera
    const camera = new THREE.PerspectiveCamera(45, 960 / 540);
    camera.position.set(0, 0, +1500);

    // create a cube
    const geometry = new THREE.BoxGeometry(500, 500, 500);

    // define a material
    const material = new THREE.MeshNormalMaterial();

    // create a cube mesh with material
    const box = new THREE.Mesh(geometry, material);

    // add cube to scene
    scene.add(box);

    tick();

    function tick() {
        box.rotation.y += 0.1;
        box.rotation.z -= 0.01;

        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }
}