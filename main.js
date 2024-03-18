import * as THREE from "three";
import "./style.css";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// you will need three things https://www.youtube.com/watch?v=Q7AOvWpIVHU&t=232s&ab_channel=Fireship
// 1. scence 2. camera 3.renderer

// Retrieve the canvas element from the canvascontainer div
const canvasContainer = document.getElementById("canvascontainer");
const canvas = canvasContainer.querySelector("#bg");

const scene = new THREE.Scene();

//PerspectiveCamera is the most commonly used and it mimics what hunman eye will see
//PerspectiveCamera(FOV, aspect ratio, view frustum, view frustum); view frustum controls where do you see it from
const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000); // Aspect ratio will be adjusted later

// Create a Three.js renderer and specify the canvas to render onto
const renderer = new THREE.WebGLRenderer({ canvas, preserveDrawingBuffer: true });
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.setZ(100);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  roughness: 0.5, // Adjust roughness property
  metalness: 0.9, // Adjust metalness property
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 100; // Adjust intensity as needed

pointLight.position.set(15, 15, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper();
scene.add(lightHelper, gridHelper);

// listens to the renderer.domElement events and do something
const controls = new OrbitControls(camera, renderer.domElement);

function resizeRendererToDisplaySize(renderer) {
  const maxWidth = canvasContainer.clientWidth; // Get the maximum width of the container
  const maxHeight = window.innerHeight / 3; // Set the maximum height to one-third of the window height

  const width = Math.min(maxWidth, window.innerWidth); // Limit the width to the window width or container's max width
  const height = Math.min(maxHeight, window.innerHeight); // Limit the height to the window height or container's max height
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;

  resizeRendererToDisplaySize(renderer);

  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  resizeRendererToDisplaySize(renderer);
});

const rotateButton = document.getElementById("rotateButton");
const resetButton = document.getElementById("resetButton");

let isRotating = false;
let rotationInterval;

rotateButton.addEventListener("click", () => {
  if (!isRotating) {
    //start rotating along specified axes
    rotationInterval = setInterval(() => {
      torus.rotation.y += 0.01;
    }, 10);
    isRotating = true;
  } else {
    //stop rotating
    clearInterval(rotationInterval);
    isRotating = false;
  }
});

resetButton.addEventListener("click", () => {
  //reset camera position
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  torus.rotation.set(0, 0, 0);

  // If rotating, stop rotation
  if (isRotating) {
    clearInterval(rotationInterval);
    isRotating = false;
  }
});

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
