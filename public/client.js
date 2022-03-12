import * as THREE from 'three'
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'
// import { OrbitControls } from './jsm/controls/OrbitControls.js'
// import Stats from './jsm/libs/stats.module.js'
// import { GUI } from './jsm/libs/lil-gui.module.min.js'


const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load('./ATILLA_LOGO_(3d).glb', function(glb){
	const root = glb.scene;
	root.scale.set(7,7,7);

	scene.add(root);

	function animate(){
		requestAnimationFrame(animate)
		root.rotation.y += 0.015;
		renderer.render(scene, camera)
	};

	animate();
	

}, function(xhr){
	console.log((xhr.loaded/xhr.total *100) + "% loaded")
});

//const light = new THREE.DirectionalLight(0xffffff, 1);
//light.position.set(2,2,5);
//scene.add(light);


//const geometry = new THREE.BoxGeometry(1,1,1);
//const material = new THREE.MeshBasicMaterial({
//	color: 0x00ff00
//});
//const boxMesh = new THREE.Mesh(geometry,material);
//scene.add(boxMesh);

// Boiler Plate code
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
camera.position.set(0, 0.45, 1);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
	canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOuput = true;
renderer.render(scene, camera)

function animate(){
	requestAnimationFrame(animate)
	loader.rotation += 0.01;
//	boxMesh.rotation.y += 0.01;
	renderer.render(scene, camera)
};

function onWindowResize() {
    // Camera frustum aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

animate();



