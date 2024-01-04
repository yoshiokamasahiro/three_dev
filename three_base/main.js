import * as THREE from "./node_modules/three/build/three.module.js";

let scene, camera, renderer;

//シーンを追加
scene = new THREE.Scene();
//カメラを追加
camera = new THREE.PerspectiveCamera(
  50, //視野角
  window.innerWidth / window.innerHeight, //アスペクト比
  0.1, //開始距離
  1000 //終了距離
);

//レンダーを追加
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene,camera);