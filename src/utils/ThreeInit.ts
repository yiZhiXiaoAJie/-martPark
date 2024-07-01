import * as THREE from 'three'

let scene: any, camera: any, renderer: any, controls: any
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
;(() => {
  // 创建场景
  scene = new THREE.Scene()
  // 创建相机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  // 创建渲染器
  renderer = new THREE.WebGLRenderer()
  // 设置渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 将渲染器添加到页面中
  // document.body.appendChild(renderer.domElement)
  scene.add(camera)
})()
;(() => {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
})()
;(function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
})()

export { scene, camera, renderer, controls }
