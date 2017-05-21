class Flower {
	constructor() {
		this.basePos = createVector(
			Math.random() * width, 
			height);
		this.minHeight = 50;
		this.maxHeight = 100;
		this.stemLength = Math.random() * this.maxHeight + this.minHeight;

		this.color = color(50);
		this.stemWidth = 1;

		this.noOfPetals = 6;
		this.petalSize = this.stemLength * 0.1;
		this.petalToCenterDistance = this.petalSize;
	}

	run() {
		this.update();
		this.display();
	}

	update() {

	}

	display() {
		stroke(this.color);
		strokeWeight(this.stemWidth);
		line(this.basePos.x, this.basePos.y, this.basePos.x, this.basePos.y - this.stemLength);

		this.drawPetals(this.getHeadPos());
	}

	drawPetals(headPos) {
		push();
		translate(headPos.x, headPos.y);

		for (let i=0; i<this.noOfPetals; i++) {
			push();
			rotate(TWO_PI * i / this.noOfPetals);
			this.drawPetal(this.petalToCenterDistance, 0);

			pop();
		}
		pop();
 	}

	drawPetal(x, y) {
		ellipseMode(CENTER);
		stroke(this.color);
		strokeWeight(this.stemWidth);
		ellipse(x, y, this.petalSize);
	}

	getHeadPos() {
		return createVector(this.basePos.x, this.basePos.y - this.stemLength);
	}
}	
