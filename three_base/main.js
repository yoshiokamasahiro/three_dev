import * as THREE from "./node_modules/three/build/three.module.js";

let scene, camera, renderer, pointLight;

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

//並行光源を追加
let directionalLight = new THREE.DirectionalLight(0xffffff,2);
directionalLight.position.set(1,1,1);
scene.add(directionalLight);

//ポイントライトを追加(グローバルに入れる)
pointLight = new THREE.PointLight(0xffffff, 5000);
// pointLight.position.set(200,200,-200);
scene.add(pointLight);

//ポイントライトがどこから入っているのか確認する
let pointLightHelper = new THREE.PointLightHelper(pointLight,30);
scene.add(pointLightHelper);

//ポイント光源を球体周りで移動させる
function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  //フィレーム単位で動かす(Three.js)
  requestAnimationFrame(animate);
  //レンダリング
  renderer.render(scene,camera);
}

animate();

