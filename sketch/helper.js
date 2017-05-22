class Helper {
	// From: http://stackoverflow.com/questions/14066933/direct-way-of-computing-clockwise-angle-between-2-vectors
	// Clockwise angle between two vectors
	static calcClockwiseAngleBetween(v1, v2) {
		let dot = v1.x*v2.x + v1.y*v2.y;	// dot product between [x1, y1] and [x2, y2]
		let det = v1.x*v2.y - v1.y*v2.x;    // determinant
		let angle = atan2(det, dot);		// atan2(y, x) or atan2(sin, cos)
		if (angle < 0) {
			angle += TWO_PI;
		}
		return angle;
	}
}