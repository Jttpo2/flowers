class Flower { 
	constructor() {
		this.basePos = createVector(
			Math.random() * width, 
			height);

		this.averageHeight = 90;
		this.heightStandardDev = 30;
		this.minStemWidth = 0.2;

		this.stem = {
			length: randomGaussian(
				this.averageHeight, 
				this.heightStandardDev
				),
			width: max(
				randomGaussian(1, 0.5), 
				this.minStemWidth),
			color: 50,
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

		this.standupDesire = 3500 * this.stem.width * (1/this.stem.length);
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

		// For optimization
		this.endOffset = null;
		this.rotationAngle = 0;

		this.headScalar = 0.004;
		this.widthScalar = 0.8;
		this.scaledWidth = this.tulipImage.width * this.stem.length * (this.stem.width * this.widthScalar) * this.headScalar;
		this.scaledHeight = this.tulipImage.height * this.stem.length * (this.stem.width * this.widthScalar) * this.headScalar;

		this.standUpVector = createVector(0, -this.standupDesire);
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
		this.stem.relativeHeadPos.add(this.vel);
		this.stem.relativeHeadPos.setMag(this.stem.length);
	}

	display() {
		push();
		translate(this.basePos.x, this.basePos.y);
		
		this.drawHead(this.getRelativeHeadPos());
		this.drawStem();
		pop();
	}

	updateStem() {
		this.endOffset = createVector(
			0, 
			this.stem.length * 0.5
			);
		this.stem.endControl = p5.Vector.add(
			this.stem.relativeHeadPos,
			this.endOffset
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
		this.rotationAngle = Helper.calcClockwiseAngleBetween(this.up,  this.stem.endControl);
		
		push();
		translate(headPos.x, headPos.y);
		rotate(this.rotationAngle);
		
		imageMode(CENTER);
		image(
			this.tulipImage, 
			0, -this.scaledHeight/2, 
			this.scaledWidth, this.scaledHeight
			);
		pop();
	}

	getRelativeHeadPos() {
		return this.stem.relativeHeadPos;	
	}

	applyForce(force) {
		this.acc.add(p5.Vector.div(force, this.mass));
	}

	workTowardsStandingUpStraight() {
		this.applyForce(this.standUpVector);
	}

	get headPos() {
		return p5.Vector.add(this.basePos, this.getRelativeHeadPos());
	}
}	
