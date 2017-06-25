new p5();

let backgroundColor;

let flowers = [];
let numberOfFlowers = 20;

let maxWindForce = 20;
let windForce = createVector(10, 0);

let xOff = 0;
let xIncrement = 0.001;

let tulipImage1;
let tulipImage2;

let flowField;

function preload() {
	tulipImage1 = loadImage('img/tulip1.2.png');
	tulipImage2 = loadImage('img/tulip2.2.png');
}

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

	flowField = new FlowField(width, height, 30, maxWindForce);
}

function draw() {
	rotateOnNarrowScreens();
	background(backgroundColor);
	
	updateWind();
	applyWind();
	drawFlowers();

	flowField.update();
	// flowField.display();
}

function windowResized() {
	reset();
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
		let flowFieldWindForce = flowField.lookup(flower.headPos);
		flower.applyForce(
			p5.Vector.mult(
				flowFieldWindForce, 
				getWindFlicker(
					flowFieldWindForce
					)
				)
			);
	});
}

function getWindFlicker(windForce) {
	return randomGaussian(
					1, // Median
					0.3 * windForce.x // Standard deviation, larger with more wind force - more 'shakes'
					);
}

function getGaussianWind() {
	
}

function initWind() {
	noiseDetail(4, 0.5);
}

function updateWind() {
	xOff += xIncrement;
	windForce.x = map(noise(xOff), 0, 1,  -maxWindForce, maxWindForce);
}

function rotateOnNarrowScreens() {
	if (height > width) {
		rotate(-HALF_PI);
		translate(-(height+width)/2, width-height);
	}
}

function reset() {
	flowers = [];
	for (let i=0; i<numberOfFlowers; i++) {
		let flower = new Flower();
		flowers.push(flower); 
	}
}
