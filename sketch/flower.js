class Flower {
	constructor() {
		this.basePos = createVector(
			Math.random() * width, 
			height);
		this.minHeight = 50;
		this.maxHeight = 100;
		this.stemLength = Math.random() * this.maxHeight + this.minHeight;

		this.color = color(50);
		this.centerColor = color(230);
		this.stemWidth = 1;

		this.noOfPetals = 6;
		this.petalSize = this.stemLength * 0.1;
		this.petalToCenterDistance = this.petalSize;

		this.mass = this.stemLength * 0.1;
		this.relativeHeadPos = createVector(0, -this.stemLength); 
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);

		this.maxVel = 5;

		this.standupDesire = 10;

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
		stroke(this.color);
		strokeWeight(this.stemWidth);

		push();
		translate(this.basePos.x, this.basePos.y);
		line(0, 0, this.getRelativeHeadPos().x, this.getRelativeHeadPos().y);

		this.drawPetals(this.getRelativeHeadPos());
		this.drawCenter(this.getRelativeHeadPos());
		pop();
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
