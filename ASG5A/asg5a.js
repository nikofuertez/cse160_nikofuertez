import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { TextureLoader } from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color('grey');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const objLoader = new OBJLoader();
const renderer = new THREE.WebGLRenderer();
const textLoad = new THREE.TextureLoader();
const textureWater = textLoad.load('lib/water.avif');

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 'green' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geoSphere = new THREE.SphereGeometry(1, 32, 32);
const materialSphere = new THREE.MeshStandardMaterial({ map: textureWater });
const sphere = new THREE.Mesh(geoSphere, materialSphere);
scene.add(sphere);

const ringGeo = new THREE.TorusGeometry(.5, 0.1, 20, 1000);
const materialRing = new THREE.MeshStandardMaterial({ color: 'gold' });
const ring = new THREE.Mesh(ringGeo, materialRing);
scene.add(ring);

// positions
camera.position.z = 6;
camera.position.y = 1;

sphere.position.x = -3;
sphere.position.y = -1;

ring.position.x = -3;
ring.position.y = 2;

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('lib/Red_Color.jpg');

// Sussy Imposter by J-Toastie [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/HjvIFmodJV)
objLoader.load(
    'lib/SussyImposter/SussyImposter.obj',
    function(object) {
        // position and sizing
        object.scale.set(.05, 0.05, 0.05);
        object.position.x = 3;

        // jpg material
        const material = new THREE.MeshStandardMaterial({ map: texture });
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
        crewmate = object;
        scene.add(object);
    },
    function(xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    function(error) {

        console.log('.obj file error');

    }
);
let crewmate;

function animate() {
    requestAnimationFrame(animate);

    if (crewmate) {
        crewmate.rotation.x += -0.01;
        crewmate.rotation.y += 0.01;
        crewmate.rotation.y += 0.01;
    }

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.z += 0.01;

    ring.rotation.x += 0.01;
    ring.rotation.z += 0.01;
    renderer.render(scene, camera);
}

// lighting
const directionalLight = new THREE.DirectionalLight('white', 3);
directionalLight.position.set(0, 1, 0.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight('white', 0.1); // White light with intensity 0.5
scene.add(ambientLight);

if (WebGL.isWebGLAvailable()) {
    animate();

} else {

    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);

}
