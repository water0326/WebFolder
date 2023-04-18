import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js';

//---------------- variasble init----------------//
//---------------- variasble init----------------//

var scene;
var camera;
var renderer;
var controls;
var pixelRatio;
var layerRadius;
var layerCount;
var layerAddButton = document.getElementById('layer_add');
var editButtons = document.getElementsByClassName('edit_buttons');
const edit_states = ['draw', 'erase', 'move'];
let sphere_geom;
let sphere_mat;
let sphere_mesh;
let detail;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let ismouseDown;
let status;


//---------------- init setting & assign----------------//
//---------------- init setting & assign----------------//

function variable_assign() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 15;

  controls = new OrbitControls( camera, renderer.domElement );
  pixelRatio = 0.25;
  detail = 5;
  layerRadius = 4;
  layerCount = -1;
  sphere_geom = [];
  sphere_mat = [];
  sphere_mesh = [];
  status = "move";
}

function init_setting() {
  scene.background = new THREE.Color('#222222');
  layerAddButton.onclick = () => {layer_add(0.3)};
  ismouseDown = false;

  editButtons[0].onclick = () => {set_status(edit_states[0])};
  editButtons[1].onclick = () => {set_status(edit_states[1])};
  editButtons[2].onclick = () => {set_status(edit_states[2])};
  
}

//---------------- tool manage----------------//
//---------------- tool manage----------------//

function layer_add(init_opacity) {
  layerCount++;
  layerRadius += 1;

  sphere_geom.push(new THREE.IcosahedronGeometry(layerRadius, detail));

  sphere_mat.push([]);
  for(var i = 0 ; i <= 10 ; i++) {
    sphere_mat[layerCount].push(new THREE.MeshLambertMaterial( {
      vertexColors: true,
      color: "white",
      transparent: 1,
      opacity    : i * 0.1
    } ));
  }






//---------------- object manage----------------//
//---------------- object manage----------------//



  sphere_mesh.push(new THREE.Mesh(sphere_geom[layerCount], sphere_mat[layerCount]));
  for(var item of sphere_mesh[layerCount].geometry.faces) {
      item.materialIndex = Math.floor(init_opacity * 10);
  }
  scene.add(sphere_mesh[layerCount]);
}

function init_layer_gen() {
  layer_add(1);
}

function light_gen() {
  const light = new THREE.DirectionalLight(
    0xFFFFFF,
    1
  )
  //light.position.set(0, 0, 10);
  //var d = 10;
  //light.shadow.camera.left = -d
  //light.shadow.camera.right = d
  //light.shadow.camera.top = d
  //light.shadow.camera.bottom = -d
  //THREE.CameraHelper(light.shadow.camera, true);
  scene.add(light);
}

function obJectGen() {
  init_layer_gen();
  light_gen();
}

//---------------- Main Rendering----------------//
//---------------- Main Rendering----------------//

function raycaster_layer() {
  raycaster.setFromCamera( pointer, camera );
  
	const intersects = raycaster.intersectObjects( scene.children );
  if ( intersects.length > 0 ) {
	
		const intersection = intersects[0];
    const faceIndex = intersection.faceIndex;
		const object = intersection.object;


    if(ismouseDown) {
      if(status == "draw") {
        object.geometry.faces[ faceIndex ].color.set( currentColor );    
        object.geometry.faces[ faceIndex ].materialIndex = object.material.length - 1;
        
        object.geometry.colorsNeedUpdate = true;
        object.geometry.groupsNeedUpdate = true;
      }
      else if(status == "erase") {
        object.geometry.faces[ faceIndex ].color.set( 0x000000 );
        object.geometry.faces[ faceIndex ].materialIndex = 0;

        object.geometry.colorsNeedUpdate = true;
        object.geometry.groupsNeedUpdate = true;
      }
    }
	}

  renderer.setPixelRatio(pixelRatio);
  renderer.render(scene, camera);
  
  
  requestAnimationFrame(render);
}

var render = function() {
  if(status == "move") {
    controls.enabled = true;
  }
  else {
    controls.enabled = false;
  }
  controls.update();
  raycaster_layer();
	
};

function main() {
  // init //
  variable_assign();
  init_setting();

  // object init //
  obJectGen();

  // update //

  // rendering //
  render();
}

main();

//---------------- event function----------------//
//---------------- event function----------------//

function on_pointer_move( event ) {

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function set_status(state) {
  console.log(state);
  status = state;
}

function on_window_resize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( window.innerWidth, window.innerHeight );

}

window.addEventListener( 'resize', on_window_resize, false );
window.addEventListener( 'pointermove', on_pointer_move );
window.addEventListener( 'mousedown', () => { ismouseDown = true; } );
window.addEventListener( 'mouseup', () => { ismouseDown = false; } )