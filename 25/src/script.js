import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh) {
      // Activate shadow here
    }
  });
};

/**
 * Environment map
 */
// Intensity
scene.environmentIntensity = 1;
gui.add(scene, "environmentIntensity").min(0).max(10).step(0.001);

// HDR (RGBE) equirectangular
rgbeLoader.load("/environmentMaps/0/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Directional light
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(3, 7, 6);
scene.add(directionalLight);

gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(10)
  .step(0.001)
  .name("Light Intensity");
gui
  .add(directionalLight.position, "x")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("Light Position X");
gui
  .add(directionalLight.position, "y")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("Light Position Y");
gui
  .add(directionalLight.position, "z")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("Light Position Z");

// Shadows
directionalLight.castShadow = true;
gui.add(directionalLight, "castShadow").name("Cast Shadow");

// Helper
const directionalLightHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightHelper.visible = true;
scene.add(directionalLightHelper);

// Target
directionalLight.target.position.set(0, 4, 0);
directionalLight.target.updateWorldMatrix();

/**
 * Models
 */
// Helmet
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);

  updateAllMaterials();
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Tone mapping
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;

gui.add(renderer, "toneMapping", {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
});

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
