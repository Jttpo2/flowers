class Flower {
	constructor() {
		this.basePos = createVector(
			Math.random() * width, 
			height);

		this.averageHeight = 70;
		this.heightStandardDev = 20;
		this.minStemWidth = 0.2;

		this.stem = {
			length: randomGaussian(
				this.averageHeight, 
				this.heightStandardDev
				),
			width: max(
				randomGaussian(1, 0.5), 
				this.minStemWidth),
			color: color(50),
			startControl: createVector(0, 0),
			start: createVector(0, 0),
			init: function() {
				this.end = createVector(0, -this.length);
				this.endControl = createVector(0, -this.length);	
				return this;
			},
			get relativeHeadPos() {
				return this.end;
			},
			set relativeHeadPos(pos) {
				this.end = pos;
			}
			
		}.init();
	
		this.mass = this.stem.length * this.stem.width * 0.1;
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxVel = 5;

		this.standupDesire = 1000 * this.stem.width * (1/this.stem.length);
		this.up = createVector(0, -1);

		this.centerColor = color(230);

		this.noOfPetals = 6;
		this.petalSize = this.stem.length * 0.1;
		this.petalToCenterDistance = this.petalSize;

		this.type = Math.floor(random() * 2);
		if (this.type === 0) {
			this.tulipImage = tulipImage1;
		} else {
			this.tulipImage = tulipImage2;
		}
	}

	run() {
		this.update();
		this.display();
	}

	update() {
		this.workTowardsStandingUpStraight();
		
		this.vel.add(this.acc);
		this.vel.limit(this.maxVel);
		this.acc.mult(0);

		this.updateRelativeHeadPos();
		this.updateStem();
	}

	updateRelativeHeadPos() {
		let desiredHeadPos = p5.Vector.add(
			this.getRelativeHeadPos(), 
			this.vel);

		desiredHeadPos.setMag(this.stem.length);
		this.stem.relativeHeadPos = desiredHeadPos;
	}

	display() {
		push();
		translate(this.basePos.x, this.basePos.y);
		
		this.drawHead(this.getRelativeHeadPos());
		this.drawStem();
		pop();
	}

	updateStem() {
		let endOffset = createVector(
			0, 
			this.stem.length * 0.5
			);
		this.stem.endControl = p5.Vector.add(
			this.stem.relativeHeadPos,
			endOffset
			);

		this.stem.startControl = createVector(
			0, 
			this.stem.length * 
			3
			);
	}

	drawStem() {
		let stem = this.stem;

		stroke(this.stem.color);
		strokeWeight(this.stem.width);
		noFill();

		curve(
			stem.startControl.x, stem.startControl.y, 
			stem.start.x, stem.start.y, 
			stem.end.x, stem.end.y, 
			stem.endControl.x, stem.endControl.y
			);
	}

	drawHead(headPos) {
		// let rotationAngle = p5.Vector.angleBetween(this.up, headPos);
		let rotationAngle = Helper.calcClockwiseAngleBetween(this.up,  this.stem.endControl);
		// let rotationAngle = p5.Vector.angleBetween(this.up, this.stem.endControl);
		
		let scalar = 0.004;
		let scaledWidth = this.tulipImage.width * this.stem.length * this.stem.width * scalar;
		let scaledHeight = this.tulipImage.height * this.stem.length * this.stem.width * scalar;

		push();
		translate(headPos.x, headPos.y);
		rotate(rotationAngle);
		
		imageMode(CENTER);
		image(
			this.tulipImage, 
			0, -scaledHeight/2, 
			scaledWidth, scaledHeight
			);
		
		pop();
		// this.drawPetals(headPos);
		// this.drawCenter(headPos);
	}

	// drawPetals(headPos) {
	// 	push();
	// 	translate(headPos.x, headPos.y);
	// 	let rotationAngle = p5.Vector.angleBetween(this.up, headPos);
	// 	rotate(rotationAngle);

	// 	for (let i=0; i<this.noOfPetals; i++) {
	// 		push();
	// 		rotate(TWO_PI * i / this.noOfPetals);
	// 		this.drawPetal(this.petalToCenterDistance, 0);

	// 		pop();
	// 	}
	// 	pop();
 // 	}

	// drawPetal(x, y) {
	// 	ellipseMode(CENTER);
	// 	stroke(this.color);
	// 	fill(this.color);
	// 	strokeWeight(this.stem.width);
	// 	ellipse(x, y, this.petalSize);
	// }

	getRelativeHeadPos() {
		return this.stem.relativeHeadPos;	
	}

	applyForce(force) {
		this.acc.add(p5.Vector.div(force, this.mass));
	}

	workTowardsStandingUpStraight() {
		this.applyForce(createVector(0, -this.standupDesire));
	}

	// drawCenter(pos) {
	// 	ellipseMode(CENTER);
	// 	noStroke();
	// 	fill(this.centerColor);
		
	// 	push();
	// 	translate(pos.x, pos.y);
	// 	ellipse(0, 0, this.petalSize*0.8);
	// 	pop();
	// }
}	
