new p5();

let backgroundColor;

let flowers = [];
let numberOfFlowers = 10;

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
}

function draw() {
	background(backgroundColor);
	
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

