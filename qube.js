// シーンの作成
var scene = new THREE.Scene();
// カメラの作成
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
// レンダラの作成
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// キューブのサイズと間隔
var cubeSize = 1;
var gap = 0.1;
// ジオメトリとマテリアルの作成
var geometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
var materials = [
    new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}), // White
    new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide}), // Blue
    new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide}), // Red
    new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide}), // Green
    new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide}), // Yellow
    new THREE.MeshBasicMaterial({color: 0xffa500, side: THREE.DoubleSide})  // Orange
  ];
  
// ルービックキューブの作成
var cubes = [];
for(var x = 0; x < 3; x++) {
    for(var y = 0; y < 3; y++) {
      for(var z = 0; z < 3; z++) {
        var cube = new THREE.Mesh(geometry, materials);
        cube.position.set(
          (x-1)*(cubeSize+gap),
          (y-1)*(cubeSize+gap),
          (z-1)*(cubeSize+gap)
        );
        scene.add(cube);
        cubes.push(cube);
      }
    }
}
// Raycasterとマウスのベクトルの作成
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
// 回転するキューブ
var rotatingCube = null;
// マウスダウンイベントのリスナーを追加
window.addEventListener('mousedown', function (event) {
    // マウスの位置を正規化
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // raycasterを更新
    raycaster.setFromCamera(mouse, camera);
  
    // 交差判定
    var intersects = raycaster.intersectObjects(cubes);
  
    if (intersects.length > 0) {
      // 最初に交差したオブジェクトを回転するキューブに設定
      rotatingCube = intersects[0].object;
    }
  });
// マウスアップイベントのリスナーを追加
window.addEventListener('mouseup', function (event) {
    // 回転するキューブの設定を解除
    rotatingCube = null;
  });
  
// アニメーション
function animate() {
    requestAnimationFrame(animate);
  
    // 回転
    cubes.forEach(function (cube) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    });

  // クリックされたキューブがあれば回転
  if (rotatingCube) {
    rotatingCube.rotation.x += 0.01;
    rotatingCube.rotation.y += 0.01;
  }

    renderer.render(scene, camera);
  }
  animate();