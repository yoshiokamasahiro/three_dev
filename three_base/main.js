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
camera.position.set(0,0,500);

//レンダーを追加
renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//ジオメトリを作成
let ballGeometory = new THREE.SphereGeometry(100,64,32);
//マテリアルを追加
let ballMaterial = new THREE.MeshPhysicalMaterial();
//メッシュを追加
let ballMesh = new THREE.Mesh(ballGeometory,ballMaterial);
scene.add(ballMesh);


renderer.render(scene,camera);