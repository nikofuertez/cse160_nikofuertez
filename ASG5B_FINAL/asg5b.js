// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.30;

const loader = new THREE.CubeTextureLoader();
const skyboxTexture = loader.load([
    'lib/px.png', 'lib/nx.png',
    'lib/py.png', 'lib/ny.png',
    'lib/pz.png', 'lib/nz.png'
]);
scene.background = skyboxTexture;

const planeGeometry = new THREE.PlaneGeometry(15, 10, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
scene.add(plane);

const prismGeometry = new THREE.BoxGeometry(4, 4, 10);
const prismMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D });
const prism = new THREE.Mesh(prismGeometry, prismMaterial);
prism.position.x = -7;
prism.position.y = 2;
scene.add(prism);

const prismGeometry2 = new THREE.BoxGeometry(12, 1.5, 2);
const prismMaterial2 = new THREE.MeshStandardMaterial({ color: 'grey' });
const lane = new THREE.Mesh(prismGeometry2, prismMaterial2);
lane.position.x = 1;
lane.position.y = .75;
lane.position.z = 4;
scene.add(lane);

const prismGeometry3 = new THREE.BoxGeometry(20, 1.5, 10);
const prismMaterial3 = new THREE.MeshStandardMaterial({ color: 'grey' });
const tile = new THREE.Mesh(prismGeometry3, prismMaterial3);
tile.position.x = 13.5;
tile.position.y = .75;
tile.position.z = 0;
scene.add(tile);

const prismGeometry4 = new THREE.BoxGeometry(9, 4, .5);
const prismMaterial4 = new THREE.MeshStandardMaterial({ color: 0xA0522D });
const wall = new THREE.Mesh(prismGeometry4, prismMaterial4);
wall.position.x = -1;
wall.position.y = 2;
wall.position.z = -4.7;
scene.add(wall);

const prismGeometry5 = new THREE.BoxGeometry(4, 4, 6);
const prismMaterial5 = new THREE.MeshStandardMaterial({ color: 0xF5F5DC });
const spambox = new THREE.Mesh(prismGeometry5, prismMaterial5);
spambox.position.x = 5.5;
spambox.position.y = 3.5;
scene.add(spambox);

const prismGeometry7 = new THREE.BoxGeometry(2, .1, 6);
const prismMaterial7 = new THREE.MeshStandardMaterial({ color: 0xF5F5DC });
const spamboxr = new THREE.Mesh(prismGeometry7, prismMaterial7);
spamboxr.position.x = 8.5;
spamboxr.position.y = 5.48;
scene.add(spamboxr);

const prismGeometry8 = new THREE.BoxGeometry(1, 4, .5);
const prismMaterial8 = new THREE.MeshStandardMaterial({ color: 0xF5F5DC });
const spamboxrw = new THREE.Mesh(prismGeometry8, prismMaterial8);
spamboxrw.position.x = 7.9;
spamboxrw.position.y = 3.5;
spamboxrw.position.z = 2.7;
scene.add(spamboxrw);

const spamboxrwb = new THREE.Mesh(prismGeometry8, prismMaterial8);
spamboxrwb.position.x = 7.9;
spamboxrwb.position.y = 3.5;
spamboxrwb.position.z = -2.7;
scene.add(spamboxrwb);

const prismGeometry6 = new THREE.BoxGeometry(4, 10, 6);
const prismMaterial6 = new THREE.MeshStandardMaterial({ color: 0xF5F5DC });
const market = new THREE.Mesh(prismGeometry6, prismMaterial6);
market.position.x = 20;
market.position.y = 6;
scene.add(market);

const prismGeometry9 = new THREE.BoxGeometry(4, 1.5, 4);
const prismMaterial9 = new THREE.MeshStandardMaterial({ color: 0xF5F5DC });
const marketf = new THREE.Mesh(prismGeometry9, prismMaterial9);
marketf.position.x = 17;
marketf.position.y = 2;
marketf.position.z = -1;
scene.add(marketf);

const logGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 16);
const logMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const numLogs = 5;

for (let i = 0; i < numLogs; i++) {
    const log = new THREE.Mesh(logGeometry, logMaterial);
    log.position.set(17, 1.8 + i * 0.3, 1.2);
    log.rotation.z = Math.PI / 2;
    scene.add(log);
}
const blog = new THREE.Mesh(logGeometry, logMaterial);
blog.position.set(17, 1.5, 1.2);
blog.rotation.z = Math.PI / 2;
scene.add(blog);

const logGeometry2 = new THREE.CylinderGeometry(0.2, 0.2, 2, 16);
const logMaterial2 = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const numLogs2 = 4;

// chat gpt helped me with this for loop!
for (let i = 0; i < numLogs2; i++) {
    const log2 = new THREE.Mesh(logGeometry2, logMaterial2);
    log2.position.set(17, 1.8 + i * 0.3, 1.6);
    log2.rotation.z = Math.PI / 2;
    scene.add(log2);
}
const blog2 = new THREE.Mesh(logGeometry, logMaterial);
blog2.position.set(17, 1.5, 1.6);
blog2.rotation.z = Math.PI / 2;
scene.add(blog2);

const prismGeometry10 = new THREE.BoxGeometry(9, 5, .5);
const prismMaterial10 = new THREE.MeshStandardMaterial({ color: '0xF5F5DC' });
const wall2 = new THREE.Mesh(prismGeometry10, prismMaterial10);
wall2.position.x = 8;
wall2.position.y = 3;
wall2.position.z = -4.7;
scene.add(wall2);

const wall22 = new THREE.Mesh(prismGeometry10, prismMaterial10);
wall22.position.x = 20;
wall22.position.y = 3;
wall22.position.z = -4.7;
scene.add(wall22);

const prismGeometry11 = new THREE.BoxGeometry(3, 5, .5);
const prismMaterial11 = new THREE.MeshStandardMaterial({ color: '0xF5F5DC' });
const wallm = new THREE.Mesh(prismGeometry11, prismMaterial11);
wallm.position.x = 3;
wallm.position.y = 2.6;
wallm.position.z = 2.74;
scene.add(wallm);

const directionalLight = new THREE.DirectionalLight('white', 3);
directionalLight.position.set(0, 1, 0.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight('purple', 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight('orange', 100); // git test
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x77DD77 });

const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube1.position.set(-.5, 0.5, 0.6);
cube1.rotation.y = Math.PI / 10;
scene.add(cube1);

const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube2.position.set(-0.9, 0.5, 0.0);
cube2.rotation.y = Math.PI / 10;
scene.add(cube2);

const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube3.position.set(-.7, 1.5, .3);
cube3.rotation.y = Math.PI / 70;
scene.add(cube3);

const cube4 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube4.position.set(0, .5, -4);
scene.add(cube4);

const cube5 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube5.position.set(0, 1.5, -4);
cube5.rotation.y = Math.PI / 70;
scene.add(cube5);

camera.position.z = 18;
camera.position.y = 10;
camera.position.x = 3;
camera.lookAt(scene.position);

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

animate();