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
  camera.position.set(100,100,500);

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

  // ボックスジオメトリを追加
  let cubeGeometry = new THREE.BoxGeometry(20,20,20);
  let cubeMaterial = new THREE.MeshNormalMaterial();
  let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
  cube.position.set(100,100,100);
  scene.add(cube);

  // ▽▽ここからバッファジオメトリ▽▽
  //バッファジオメトリを追加
  const bufferGeometory = new THREE.BufferGeometry();
  //型付配列で位置情報を作成
  const positionArray = new Float32Array(9);
  //9つ準備
  positionArray[0] = 0;
  positionArray[1] = 0;
  positionArray[2] = 0;

  positionArray[3] = 0;
  positionArray[4] = 100;
  positionArray[5] = 0;

  positionArray[6] = 100;
  positionArray[7] = 0;
  positionArray[8] = 0;
  // 整数の3は三角形の1つの頂点に対して3つの値が必要なため
  const bufferAttribute = new THREE.BufferAttribute(positionArray,3);
  //上の工程を経てジオメトリー作成完了
  bufferGeometory.setAttribute('position',bufferAttribute);
  //マテリアル指定
  const bufferMaterial = new THREE.MeshBasicMaterial(
    {wireframe:true,} //見にくいのでワイヤーフレーム化
  );

  const buffer = new THREE.Mesh(bufferGeometory,bufferMaterial);
  buffer.position.set(-100,-100,-100);
  scene.add(buffer);
  // △△ここまでバッファジオメトリ△△

  //アンビエントライトを追加
  // let anbientLight = new THREE.AmbientLight(0xffffff,0.8);
  // anbientLight.position.set(1,1,1);
  // scene.add(anbientLight);


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
  
  //onWindowResizeを発火
  window.addEventListener("resize" , onWindowResize)
  animate();
})

//ブラウザのリサイズに対応
function onWindowResize() {
  //レンダラーのサイズを随時更新する
  renderer.setSize(window.innerWidth,window.innerHeight);
  //アスペクト比
  camera.aspect = window.innerWidth / window.innerHeight;
  //カメラ関係のプロパティを変更する時には必ず呼び出す必要がある
  camera.updateProjectionMatrix();
  
}
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


