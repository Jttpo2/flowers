new p5();

let backgroundColor;

let flowers = [];
let numberOfFlowers = 100;

let maxWindForce = 10;
let windForce = createVector(10, 0);

let xOff = 0;
let xIncrement = 1;

function setup() {
	let canvas = createCanvas(
		window.innerWidth,
		window.innerHeight
		);

	backgroundColor = color(200);

	for (let i=0; i<numberOfFlowers; i++) {
		let flower = new Flower();
		flowers.push(flower); 
	}

	initWind();
}

function draw() {
	background(backgroundColor);
	
	updateWind();
	applyWind();
	drawFlowers();
}

function windowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight);
}

function drawFlowers() {
	flowers.forEach(function(flower) {
		flower.run();
	});
}

function applyWind() {
	flowers.forEach(function(flower) {
		
		flower.applyForce(
			p5.Vector.mult(
				windForce, 
				randomGaussian(
					1, // Median
					0.4 // Standard deviation
					)));
	});
}

function initWind() {
	noiseDetail(4, 0.5);
}

function updateWind() {
	xOff += xIncrement;
	windForce.x = noise(xOff) * maxWindForce;
}
