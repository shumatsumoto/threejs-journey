import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");

//Scene
const scene = new THREE.Scene();

//Object
const geomety = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geomety, material);
// mesh.position.x = 1.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;

mesh.scale.set(3, 2, 1);

// mesh.rotation.reorder("YXZ");
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 8;
camera.position.y = 3;
camera.position.x = 1;
scene.add(camera);

camera.lookAt(mesh.position);

console.log(mesh.position.distanceTo(camera.position));

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
