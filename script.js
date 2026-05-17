
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3); 

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; 

const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(10, 10, 10); 
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); 
scene.add(ambientLight);

const loader = new THREE.GLTFLoader();

loader.load('tema5.glb', function (gltf) {
    const model = gltf.scene;
    
    model.traverse((child) => {
        if (child.isMesh && child.material) {
            if (child.material.map) {
                child.material.map.encoding = THREE.sRGBEncoding; 
                child.material.map.needsUpdate = true;
            }
            child.material.needsUpdate = true;
        }
    });

    model.position.set(0, 0, 0);
    scene.add(model);
    console.log("Модель успешно загружена с текстурами на r147!");
}, undefined, function (error) {
    console.error('Ошибка загрузки модели:', error);
});

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.target.set(0, 1, 0); 


window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}
animate();