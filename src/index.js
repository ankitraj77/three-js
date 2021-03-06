// import * as THREE from 'three'

import * as THREE from '../node_modules/three/build/three.module.js'

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

// THREE JS SETUP
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// LIGHT
// AMBIENT LIGHT
let light = new THREE.AmbientLight(0x404040, 1.5) // soft white light
scene.add(light)
// White directional light at half intensity shining from the top.
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
directionalLight.position.x = -1
directionalLight.position.y = 0.5
directionalLight.position.z = 1
scene.add(directionalLight)

// CUBE
let geometry = new THREE.BoxGeometry()
let color = new THREE.Color('hsl(0, 50%, 50%)')
let material = new THREE.MeshLambertMaterial({ color: color })
let cube = new THREE.Mesh(geometry, material)
scene.add(cube)
console.log(cube)

// CAMERA
camera.position.z = 5
camera.lookAt(0, 0, 0)

// DEVICE ORIENTATION - GYROSCOPE
let info = document.querySelector('#info')

function handleOrientation(event) {
	let x = event.beta // In degree in the range [-180,180]
	let y = event.gamma // In degree in the range [-90,90]

	info.innerHTML = 'beta : ' + x + '\n'
	info.innerHTML += 'gamma: ' + y + '\n'

	// Because we don't want to have the device upside down
	// We constrain the x value to the range [-90,90]
	if (x > 90) {
		x = 90
	}
	if (x < -90) {
		x = -90
	}

	// To make computation easier we shift the range of
	// x and y to [0,180]
	x += 90
	y += 90
	// Do stuff with the new orientation data
}
window.addEventListener('deviceorientation', handleOrientation, true)

// RENDERING
let newHue = 0
let animate = function() {
	requestAnimationFrame(animate)

	cube.rotation.x += 0.01
	cube.rotation.y += 0.01

	newHue < 360 ? newHue++ : (newHue = 0)
	// newHue = newHue / 100

	cube.material.color.setHSL(newHue * 0.001, 0.5, 0.5)
	// info.innerHTML = newHue

	// cube.material.color = color

	renderer.render(scene, camera)
}

animate()
