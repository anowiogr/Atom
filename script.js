//podlinokowanie paczek three,js wykorzystywanych w projekcie
import { color, fog, shininess } from "three/examples/jsm/nodes/Nodes.js";
import * as THREE from "./node_modules/three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

//podstawowe ustawienia sceny i obserwatora
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,50);
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//ustawienia zmiany rozmiaru elementów przy zmianie rozmiaru okna www
const handleResize = () => {
  const {innerWidth, innerHeight} = window;
  renderer.setSize(innerWidth,innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};

//ciało projektu - rysowanie zawartości

//rysuj kule
const createSphere = (r = 1, color = 0xffffff) => {
  const sphereMat = new THREE.MeshPhongMaterial({color, shininess: 30});
  const sphereGo = new THREE.SphereGeometry(r, 20, 20);
  return new THREE.Mesh(sphereGo,sphereMat);
};

//rysuj światło
const createLight = (i = 1, color = 0xffffff) => {
  return new THREE.PointLight(color,i);
};

//kreuj elektrony
const createElectron = (r = 0.4, color = 0xffffff) => {
  const sphere = createSphere(r, color);
  const pivot = new THREE.Object3D();
  pivot.add(sphere);
  return{
    sphere,
    pivot
  }
};

const nucleus = createSphere(3, 0x00ff00);
const l1 = createLight(.8);
const l2 = createLight(.9);
l1.position.set(60,20,60);
l2.position.set(-30,0,20);

scene.add(nucleus, l2);
nucleus.add(l1);

const e1 = createElectron(.4);
const e2 = createElectron(.4);
const e3 = createElectron(.4);
const e4 = createElectron(.4);

e1.sphere.position.set(10,0,0);
e2.sphere.position.set(5,0,0);
e3.sphere.position.set(-5,0,0);
e4.sphere.position.set(-10,0,0);

nucleus.add(e1.pivot,e2.pivot,e3.pivot,e4.pivot);

e1.pivot.rotation.y = 90;
e2.pivot.rotation.y = 80;
e3.pivot.rotation.y = -60;
e4.pivot.rotation.y = -90;

//scene.fog = new THREE.Fog(0xffffff, 100, 2 );

//funkcja z pętlą generującą scenę i obserwatora
const loop = () => {
  e1.pivot.rotation.z += 0.01;
  e2.pivot.rotation.z += 0.01;
  e3.pivot.rotation.z += 0.01;
  e4.pivot.rotation.z += 0.01;
  nucleus.rotation.z += 0.001; 
  nucleus.rotation.x += 0.002; 
  nucleus.rotation.y += 0.003; 
  renderer.render(scene,camera);
  requestAnimationFrame(loop);
}

loop();
window.addEventListener('resize', handleResize);