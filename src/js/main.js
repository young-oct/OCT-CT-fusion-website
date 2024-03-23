import * as THREE from "three";
import "./js/style.css";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

// you will need three things https://www.youtube.com/watch?v=Q7AOvWpIVHU&t=232s&ab_channel=Fireship
// 1. scence 2. camera 3.renderer

// Retrieve the canvas element from the canvascontainer div
const canvasContainer = document.getElementById("canvascontainer");
const canvas = canvasContainer.querySelector("#scene_canvas");

const scene = new THREE.Scene();

//PerspectiveCamera is the most commonly used and it mimics what hunman eye will see
//PerspectiveCamera(FOV, aspect ratio, view frustum, view frustum); view frustum controls where do you see it from
const camera = new THREE.PerspectiveCamera(10, 1, 0.1, 100000); // Aspect ratio will be adjusted later

// Create a Three.js renderer and specify the canvas to render onto
const renderer = new THREE.WebGLRenderer({ canvas, preserveDrawingBuffer: true });
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.setZ(100);

let mesh;

// Define variables to store original camera position and mesh rotation
let originalCameraPosition;
let originalMeshRotation;

const loader = new STLLoader();
loader.load(
  "models/ear.stl",
  function (geometry) {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      // envMap: envTexture,
      metalness: 0.25,
      roughness: 0.1,
      opacity: 0.5,
      transparent: true,
      transmission: 0.8,
      clearcoat: 0.1,
      clearcoatRoughness: 0.25,
    });
    material.metalness = 0.1; // Adjust the metalness factor
    material.roughness = 0.5; // Adjust the roughness factor

    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(15, 15, 15); // Adjust the scale as needed

    // Rotate the mesh 90 degrees around the x-axis
    mesh.rotateX(-Math.PI / 2);
    mesh.rotateY(Math.PI / 30);
    mesh.rotateZ(-Math.PI / 5);
    originalMeshRotation = mesh.rotation.clone();

    // Adjust the position to center the mesh at the scene's origin
    const box = new THREE.Box3().setFromObject(mesh);
    const center = box.getCenter(new THREE.Vector3());
    mesh.position.sub(center);

    scene.add(mesh);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

// Define and add lights
// Define and add lights
const pointLight1 = new THREE.PointLight(0xffffff, 50, 100); // Intensity increased to 1000, radius set to 100
pointLight1.position.set(-5, -5, -5);

const pointLight2 = new THREE.PointLight(0xffffff, 50, 100); // Intensity increased to 10, radius set to 100
pointLight2.position.set(-5, -5, 5);

const pointLight3 = new THREE.PointLight(0xffffff, 50, 100);
pointLight3.position.set(5, -5, -5);

const pointLight4 = new THREE.PointLight(0xffffff, 50, 100);
pointLight4.position.set(5, -5, 5);

const pointLight5 = new THREE.PointLight(0xffffff, 50, 100);
pointLight5.position.set(-5, 5, -5);

const pointLight6 = new THREE.PointLight(0xffffff, 50, 100);
pointLight6.position.set(-5, 5, 5);

const pointLight7 = new THREE.PointLight(0xffffff, 50, 100);
pointLight7.position.set(5, 5, -5);

const pointLight8 = new THREE.PointLight(0xffffff, 50, 100);
pointLight8.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Intensity increased to 0.5

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Intensity increased to 0.5
directionalLight.position.set(5, 5, 5); // Set the direction of the light

scene.add(
  pointLight1,
  pointLight2,
  pointLight3,
  pointLight4,
  pointLight5,
  pointLight6,
  pointLight7,
  pointLight8,
  ambientLight
  // directionalLight
);

// Add light helpers
const pointLightHelper1 = new THREE.PointLightHelper(pointLight1);
const pointLightHelper2 = new THREE.PointLightHelper(pointLight2);
const pointLightHelper3 = new THREE.PointLightHelper(pointLight3);
const pointLightHelper4 = new THREE.PointLightHelper(pointLight4);

const pointLightHelper5 = new THREE.PointLightHelper(pointLight5);
const pointLightHelper6 = new THREE.PointLightHelper(pointLight6);
const pointLightHelper7 = new THREE.PointLightHelper(pointLight7);
const pointLightHelper8 = new THREE.PointLightHelper(pointLight8);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);

const gridHelper = new THREE.GridHelper();

// scene.add(
//   pointLightHelper1,
//   pointLightHelper2,
//   pointLightHelper3,
//   pointLightHelper4,
//   pointLightHelper5,
//   pointLightHelper6,
//   pointLightHelper7,
//   pointLightHelper8,
//   directionalLightHelper,
//   gridHelper
// );

// listens to the renderer.domElement events and do something
const controls = new OrbitControls(camera, renderer.domElement);

function resizeRendererToDisplaySize(renderer) {
  const maxWidth = canvasContainer.clientWidth; // Get the maximum width of the container
  const maxHeight = window.innerHeight * 0.75; // Set the maximum height to one-third of the window height

  const width = Math.min(maxWidth, window.innerWidth); // Limit the width to the window width or container's max width
  const height = Math.min(maxHeight, window.innerHeight); // Limit the height to the window height or container's max height
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  resizeRendererToDisplaySize(renderer);

  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  renderer.setSize(canvasContainer.clientWidth, window.innerHeight * 0.75);
  camera.aspect = canvasContainer.clientWidth / (window.innerHeight * 0.75);
  camera.updateProjectionMatrix();
});

const rotateButton = document.getElementById("rotateButton");
const resetButton = document.getElementById("resetButton");

let isRotating = false;
let rotationInterval;

// // Event listener for rotate button
// rotateButton.addEventListener("click", () => {
//   if (!isRotating) {
//     // Start rotating
//     rotationInterval = setInterval(() => {
//       // Rotate the mesh only around its z-axis
//       if (mesh) {
//         mesh.rotation.z += Math.PI / 360; // Increment z-rotation by 1 degree
//         mesh.updateMatrix();
//       }
//     }, 10);
//     isRotating = true;
//   } else {
//     // Stop rotating
//     clearInterval(rotationInterval);
//     isRotating = false;
//   }
// });
resetButton.addEventListener("click", () => {
  //reset camera position

  camera.position.copy(originalCameraPosition);
  camera.lookAt(0, 0, 0);
  mesh.rotation.copy(originalMeshRotation);

  // If rotating, stop rotation
  if (isRotating) {
    clearInterval(rotationInterval);
    isRotating = false;
  }
});

// Store original camera position
originalCameraPosition = camera.position.clone();

const captureButton = document.getElementById("captureButton");
captureButton.addEventListener("click", () => {
  setTimeout(() => {
    if (isRotating) {
      clearInterval(rotationInterval);
      isRotating = false;
    }
    const canvas = renderer.domElement; // get the canvas element
    const link = document.createElement("a"); // create a temporay link for download
    const dataURL = canvas.toDataURL(); //convert it to a data URL

    //set link properties for downloading the image
    link.href = dataURL;
    link.download = "3D_middle_ear_OCT_image.png";

    link.click(); // click event for the link
  }, 100); //enable delay to let the rendering to be completed
});
