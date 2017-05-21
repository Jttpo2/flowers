class Flower {
	constructor() {
		this.basePos = createVector(
			Math.random() * width, 
			height);
		this.averageHeight = 70;
		this.heightStandardDev = 20;
		this.stemLength = randomGaussian(this.averageHeight, this.heightStandardDev);
		// this.stemLength = 70;

		this.color = color(50);
		this.centerColor = color(230);
		this.stemWidth = randomGaussian(3, 2);
		this.stemWidth = max(0.2, this.stemWidth); 
		

		this.noOfPetals = 6;
		this.petalSize = this.stemLength * 0.1;
		this.petalToCenterDistance = this.petalSize;

		this.mass = this.stemLength * 0.1;
		this.relativeHeadPos = createVector(0, -this.stemLength); 
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);

		this.maxVel = 5;

		this.standupDesire = 1000 * this.stemWidth * (1/this.stemLength);

		this.up = createVector(0, -1);
	}

	run() {
		this.update();
		this.display();
	}

	update() {

		this.workTowardsStandingUpStraight();

		this.vel.add(this.acc);
		this.vel.limit(this.maxVel);

		let desiredHeadPos = p5.Vector.add(
			this.relativeHeadPos, 
			this.vel);

		desiredHeadPos.setMag(this.stemLength);
		this.relativeHeadPos = desiredHeadPos;

		this.acc.mult(0);
	}

	display() {
		push();
		translate(this.basePos.x, this.basePos.y);
		
		this.drawStem();
		this.drawPetals(this.getRelativeHeadPos());
		this.drawCenter(this.getRelativeHeadPos());
		pop();
	}

	drawStem() {
		stroke(this.color);
		strokeWeight(this.stemWidth);
		noFill();
		
		// line(0, 0, this.getRelativeHeadPos().x, this.getRelativeHeadPos().y);
		
		// let test = this.getRelativeHeadPos().copy();

		let startControl = createVector(0, 0);
		let start = {x: 0, y:0};
		let end = this.getRelativeHeadPos();
		let endControl = this.getRelativeHeadPos().copy();
		
		let endOffset = createVector(
			0, 
			this.stemLength
			*2
			);
		endControl.add(endOffset);

		let startOffset = createVector(
			0, 
			this.stemLength * 
			// (1/this.stemWidth) * 
			3
			);
		startControl.add(startOffset);

		curve(
			startControl.x, startControl.y, 
			start.x, start.y, 
			end.x, end.y, 
			endControl.x, endControl.y
			);
	}

	drawPetals(headPos) {
		push();
		translate(headPos.x, headPos.y);
		let rotationAngle = p5.Vector.angleBetween(this.up, headPos);
		rotate(rotationAngle);

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
		fill(this.color);
		strokeWeight(this.stemWidth);
		ellipse(x, y, this.petalSize);
	}

	getRelativeHeadPos() {
		return this.relativeHeadPos;	
	}

	applyForce(force) {
		this.acc.add(p5.Vector.div(force, this.mass));
	}

	workTowardsStandingUpStraight() {
		this.applyForce(createVector(0, -this.standupDesire));
	}

	drawCenter(pos) {
		ellipseMode(CENTER);
		noStroke();
		fill(this.centerColor);
		
		push();
		translate(pos.x, pos.y);
		ellipse(0, 0, this.petalSize*0.8);
		pop();
	}
}	
