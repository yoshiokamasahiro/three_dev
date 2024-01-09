import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls;

// ページが読み込まれたら

window.addEventListener("load", ()=> {
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

  //レンダラーを追加(共通項的な理解でOKかと思う)
  renderer = new THREE.WebGLRenderer({alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight); //画面サイズに応じる
  renderer.setPixelRatio(window.devicePixelRatio); //デバイスサイズに応じた画像解像度
  document.body.appendChild(renderer.domElement);

  //テクスチャー
  let ballTexture = new THREE.TextureLoader().load("./images/textures/earth.jpg");
  //ジオメトリを作成
  let ballGeometory = new THREE.SphereGeometry(100,64,32);
  //マテリアルを追加
  let ballMaterial = new THREE.MeshPhysicalMaterial({map:ballTexture});
  //メッシュを追加
  let ballMesh = new THREE.Mesh(ballGeometory,ballMaterial);
  scene.add(ballMesh);

  //並行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff,2);
  directionalLight.position.set(1,1,1);
  scene.add(directionalLight);

  //ポイントライトを追加(グローバルに入れる)
  pointLight = new THREE.PointLight(0xffffff,1);
  pointLight.decay = 1;
  pointLight.power = 1000;
  // pointLight.position.set(200,200,-200);
  scene.add(pointLight);

  //ポイントライトがどこから入っているのか確認する
  let pointLightHelper = new THREE.PointLightHelper(pointLight,30);
  scene.add(pointLightHelper);

  //マウス操作
  controls = new OrbitControls(camera, renderer.domElement);

  animate();
})




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


