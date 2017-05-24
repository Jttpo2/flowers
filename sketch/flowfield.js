class FlowField {
	constructor(width, height, resolution, maxMagnitude) {
		this.resolution = resolution;
		this.rows = height/resolution;
		this.cols = width/resolution;

		this.maxMagnitude = maxMagnitude;

		this.field = [];

		this.up = createVector(0, -1);
		this.vectorLineLength = this.resolution * 0.75;
		this.magScalar = 0.6;

		this.initNoise();
		this.initField();

	}

	initField() {
		for (let i=0; i<this.cols; i++) {
			this.field.push([]);
			for (let j=0; j<this.rows; j++) {
				this.field[i].push(createVector(10, 0));
			}
		}
	}

	initNoise() {
		let octaves = 4;
		let falloff = 0.7;
		noiseDetail(octaves, falloff);

		this.xOff = 0;
		this.xIncrement = 0.01;
		this.yOff = 0;
		this.yIncrement = 0.01;
		this.timeOff = 0;
		this.timeIncrement = 0.005;

	}

	update() {
		this.xOff = 0;
		for (let x=0; x<this.cols; x++) {
			this.yOff = 0;
			for (let y=0; y<this.rows; y++) {
				let r = map(
					noise(this.xOff, this.yOff, this.timeOff),
					0, 1,
					-this.maxMagnitude, this.maxMagnitude
					);
				this.field[x][y].x = r;

				this.yOff += this.yIncrement;
			}
			this.xOff += this.xIncrement;
		}

		this.timeOff += this.timeIncrement;
	}

	display() {
		stroke(100);
		for (let x=0; x<this.cols; x++) {
			for (let y=0; y<this.rows; y++) {
				push();
				
				let v = this.field[x][y];
				translate(x * this.resolution, y * this.resolution);
				let angle = Helper.calcClockwiseAngleBetween(this.up, v);
				// rotate(angle);
				// strokeWeight(v.mag() * this.magScalar);
				strokeWeight(2);
				// line(0, 0, 0, -this.vectorLineLength);
				
				line(0, 0, v.x*1.5, v.y*1.5);

				strokeWeight(3);
				point(0, 0);
				
				pop();
			}
		}
	}

	lookup(pos) {
		let col = floor(constrain(pos.x/this.resolution, 0, this.cols -1));
		let row = floor(constrain(pos.y/this.resolution, 0, this.rows -1));
		return this.field[col][row];
	}
}