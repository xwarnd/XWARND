	class Vector2D
	{
		constructor(x = 0, y = 0,)
		{
			this.x = x;
			this.y = y;
		}
	};
		
	class Vector3D
	{
		constructor(x = 0, y = 0, z = 0)
		{
			this.x = x;
			this.y = y;
			this.z = z;
		}

		// Vector addition
		add(v)
		{
			return new Vector3D(
				this.x + v.x,
				this.y + v.y,
				this.z + v.z
			);
		}

		// Vector subtraction
		subtract(v)
		{
			return new Vector3D(
				this.x - v.x,
				this.y - v.y,
				this.z - v.z
			);
		}

		// Multiply vector by scalar
		multiply(s)
		{
			return new Vector3D(
				this.x * s,
				this.y * s,
				this.z * s
			);
		}

		// Divide vector by scalar
		divide(s)
		{
			return new Vector3D(
				this.x / s,
				this.y / s,
				this.z / s
			);
		}

		// Vector length (magnitude)
		length()
		{
			return Math.sqrt(
				this.x * this.x +
				this.y * this.y +
				this.z * this.z
			);
		}

		// Squared vector length
		lengthSquared()
		{
			return (
				this.x * this.x +
				this.y * this.y +
				this.z * this.z
			);
		}

		// Normalize vector
		normalize()
		{
			let len = this.length();

			if (len < 1e-9)
				return new Vector3D(0, 0, 0);

			return this.divide(len);
		}

		// Dot product
		dot(v)
		{
			return (
				this.x * v.x +
				this.y * v.y +
				this.z * v.z
			);
		}

		// Cross product
		cross(v)
		{
			return new Vector3D(
				this.y * v.z - this.z * v.y,
				this.z * v.x - this.x * v.z,
				this.x * v.y - this.y * v.x
			);
		}

		// Distance to another vector
		distance(v)
		{
			return this.subtract(v).length();
		}

		// Distance squared to another vector
		distanceSquared(v)
		{
			return this.subtract(v).lengthSquared();
		}

		// Absolute value of each component
		abs()
		{
			return new Vector3D(
				Math.abs(this.x),
				Math.abs(this.y),
				Math.abs(this.z)
			);
		}

		// Clone vector
		clone()
		{
			return new Vector3D(this.x, this.y, this.z);
		}

		// Convert to string
		toString()
		{
			return `(${this.x}, ${this.y}, ${this.z})`;
		}
	};

	class Segment
	{
		A = new Vector3D();
		B = new Vector3D();

		constructor(A, B)
		{
			this.A = A;
			this.B = B;
		}
	};

	//ToDo: Check these member functions for correct output
	class VectorUtils
	{
		sphericalDistance(theta1_degrees, phi1_degrees, theta2_degrees, phi2_degrees)
		{
			// Convert input angles to radians
			lat1Rad = theta1_degrees * PI / 180.0;
			lon1Rad = phi1_degrees * PI / 180.0;
			lat2Rad = theta2_degrees * PI / 180.0;
			lon2Rad = phi2_degrees * PI / 180.0;

			// Compute the angular distance using Haversine formula
			return (Math.acos(Math.sin(lat1Rad) * Math.sin(lat2Rad) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad))) * 180.0 / PI;
		}

		length(vec)
		{
			return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + Math.pow(vec.z, 2));
		}

		toCartesan(theta_radians, phi_radians, radius)
		{
			let x = radius * Math.cos(phi_radians) * Math.sin(theta_radians);
			let y = radius * Math.sin(phi_radians) * Math.sin(theta_radians);
			let z = radius *Math. cos(theta_radians);

			return new Vector3D(x, y, z);
		}

		toSpherical(x, y, z)
		{
			let radius = vecUtils.length(new Vector3D(x, y, z));
			let theta = Math.atan2(Math.sqrt(x * x + y * y), z);
			let phi = Math.atan2(y, x);

			return new Vector3D(theta, phi, radius);
		}

		dot(input1, input2)
		{
			return input1.x * input2.x + input1.y * input2.y + input1.z * input2.z;
		}

		cross(A, B)
		{
			let crossP = new Vector3D(0, 0, 0);
			crossP.x = A.y * B.z - A.z * B.y;
			crossP.y = A.z * B.x - A.x * B.z;
			crossP.z = A.x * B.y - A.y * B.x;

			return crossP;
		}

		normalize(vec)
		{
			let op1 = new Vector3D();
			op1 = Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + Math.pow(vec.z, 2);
			op1 = Math.sqrt(op1);

			let op = new Vector3D();
			op.x = vec.x / op1;
			op.y = vec.y / op1;
			op.z = vec.z / op1;

			return op;
		}

		//Set the length (magnitude) of a given vector
		setVectorMagnitude(input, newMag)
		{
			let mag = Math.sqrt(input.x * input.x + input.y * input.y + input.z * input.z);

			let new_x = input.x * newMag / mag;
			let new_y = input.y * newMag / mag;
			let new_z = input.z * newMag / mag;

			let op = new Vector3D(new_x, new_y, new_z);
			return op;
		}

		rotateAroundVector(point, axis, theta)
		{
			cos_theta = Math.cos(theta);
			sin_theta = Math.sin(theta);

			let rotated = new Vector3D();

			rotated = (point * cos_theta) + (cross(axis, point) * sin_theta) + (axis * dot(axis, point)) * (1 - cos_theta);

			return rotated;
		}

		arbitraryOrthogonal(vec)
		{
			let b0 = (vec.x < vec.y) && (vec.x < vec.z);
			let b1 = (vec.y <= vec.x) && (vec.y < vec.z);
			let b2 = (vec.z <= vec.x) && (vec.z <= vec.y);

			let op = new Vector3D(0, 0, 0);
			op = this.cross(vec, new Vector3D((b0), (b1), (b2)));

			return op;
		}

		orthogonalSegment(centrePoint, offsetDistance, phi, theta, segmentLength)
		{
			// Calculate radial direction from spherical coordinates
			let sinPhi = Math.sin(phi);

			let radial = new Vector3D(
				sinPhi * Math.cos(theta),
				Math.cos(phi),
				sinPhi * Math.sin(theta)
			);

			// Calculate midpoint
			let midPoint = new Vector3D(
				centrePoint.x + radial.x * offsetDistance,
				centrePoint.y + radial.y * offsetDistance,
				centrePoint.z + radial.z * offsetDistance
			);

			// Generate a random vector
			let randomDir = new Vector3D(
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1
			);

			// Cross product produces a perpendicular direction
			let dir = new Vector3D(
				radial.y * randomDir.z - radial.z * randomDir.y,
				radial.z * randomDir.x - radial.x * randomDir.z,
				radial.x * randomDir.y - radial.y * randomDir.x
			);

			// Normalize direction
			let len = Math.sqrt(
				dir.x * dir.x +
				dir.y * dir.y +
				dir.z * dir.z
			);

			if (len < 1e-9)
				return null;

			dir.x /= len;
			dir.y /= len;
			dir.z /= len;

			// Calculate endpoints
			let halfLength = segmentLength / 2;

			let A = new Vector3D(
				midPoint.x - dir.x * halfLength,
				midPoint.y - dir.y * halfLength,
				midPoint.z - dir.z * halfLength
			);

			let B = new Vector3D(
				midPoint.x + dir.x * halfLength,
				midPoint.y + dir.y * halfLength,
				midPoint.z + dir.z * halfLength
			);

			let result = new Segment();
			result.A = A;
			result.B = B;

			return result;
		}

	    randomParallelLines(start, end, radius, count, angle, heads, tails)
		{
			curTail = start;
			curHead = end;
			base = curHead;
			length = utils.dist(curHead.x, curHead.y, curHead.z, curTail.x, curTail.y, curTail.z);
			aVec = normalize(curTail - curHead);
			arb = normalize(arbitraryOrthogonal(aVec));

			for (var a = 0; a < count; a++)
			{
				f = angle;// utils.random_2(0, 360);
				arb = setVectorMagnitude(arb, utils.random_2(0, radius));
				p1 = Vector3D(arb.x, arb.y, arb.z);
				p2 = Vector3D(arb.x, arb.y, arb.z);

				p3 = rotateAroundVector(p2, aVec, f * 3.14 / 180);
				heads[a] = curTail + p3;

				p4 = rotateAroundVector(p1, aVec, f * 3.14 / 180);
				tails[a] = curHead + p4;
			}
		}

		lerp3D(a, b, scale)
		{
			let op0 = new Vector3D();

			//End-Start
			op0.x = b.x - a.x;
			op0.y = b.y - a.y;
			op0.z = b.z - a.z;
			op0 *= scale;

			let op1 = new Vector3D();
			op1.x = a.x + op0.x;
			op1.y = a.y + op0.y;
			op1.z = a.z + op0.z;

			return(op1);
		}

		displaceVectorTowards(a, b, amount)
		{
			let dx = b.x - a.x;
			let dy = b.y - a.y;
			let dz = b.z - a.z;

			let vLen = Math.sqrt(dx * dx + dy * dy + dz * dz);

			if (vLen <= 0.0)
			{
				return new Vector3D(a.x, a.y, a.z);
			}

			// Normalise direction and scale by amount
			let scale = amount / vLen;

			return new Vector3D(
				a.x + dx * scale,
				a.y + dy * scale,
				a.z + dz * scale
			);
		}
		
		calculate2DPosition(x_origin, y_origin, angle_degrees, displacement)
		{
			// Convert angle from degrees to radians
			let angle_radians = angle_degrees * PI / 180.0;

			// Calculate new position
			let new_x = x_origin + displacement * Math.cos(angle_radians);
			let new_y = y_origin + displacement * Math.sin(angle_radians);

			return [ new_x, new_y ];
		}

		randomPointAwayFromSegment(A, B, minDist, maxDist)
		{
			// 1. Random point on segment
			let t = Math.random();

			let P = new Vector3D(
				A.x + t * (B.x - A.x),
				A.y + t * (B.y - A.y),
				A.z + t * (B.z - A.z)
			);

			// 2. Direction perpendicular to AB
			let dir = this.normalize(B.subtract(A));

			let tmp = (Math.abs(dir.x) > 0.9)
				? new Vector3D(0, 1, 0)
				: new Vector3D(1, 0, 0);

			let u = this.normalize(this.cross(dir, tmp));
			let v = this.cross(dir, u);

			// 3. Rotate by random angle
			let angle = 2 * Math.PI * Math.random();

			let offset = u.multiply(Math.cos(angle))
						.add(v.multiply(Math.sin(angle)));

			// 4. Random distance
			let distance = minDist + Math.random() * (maxDist - minDist);

			return P.add(offset.multiply(distance));
		}

		// Random number between 0 and 1
		rnd01()
		{
			return Math.random();
		}

		// Distance from point P to line segment AB
		distPointSegment(P, A, B)
		{
			let AB = B.subtract(A);
			let AP = P.subtract(A);

			let denom = AB.dot(AB);

			// Handle zero-length segment
			if (denom === 0)
				return P.distance(A);

			let t = AP.dot(AB) / denom;

			t = Math.max(0.0, Math.min(1.0, t));

			let proj = A.add(AB.multiply(t));

			return P.distance(proj);
		}

		// Generate candidate point at distance within [minDist, maxDist] from line segment
		randomCandidate(A, B, minDist, maxDist)
		{
			// Random point on the segment
			let t = rnd01();

			let P = new Vector3D(
				A.x + t * (B.x - A.x),
				A.y + t * (B.y - A.y),
				A.z + t * (B.z - A.z)
			);

			// Orthonormal basis perpendicular to segment
			let dir = B.subtract(A).normalize();

			let tmp = (Math.abs(dir.x) > 0.9)
				? new Vector3D(0, 1, 0)
				: new Vector3D(1, 0, 0);

			let u = dir.cross(tmp).normalize();
			let v = dir.cross(u);

			// Random angle and radius
			let angle = 2 * Math.PI * rnd01();

			let r2 = minDist * minDist +
				rnd01() * (maxDist * maxDist - minDist * minDist);

			let r = Math.sqrt(r2);

			let offset = u.multiply(Math.cos(angle) * r)
				.add(v.multiply(Math.sin(angle) * r));

			return P.add(offset);
		}

		// Generate candidate point at distance within [minDist, maxDist] from line segment
		randomCandidate(A, B, minDist, maxDist)
		{
			// Random point on the segment
			let t = Math.random();

			let P = new Vector3D(
				A.x + t * (B.x - A.x),
				A.y + t * (B.y - A.y),
				A.z + t * (B.z - A.z)
			);

			// Orthonormal basis perpendicular to segment
			let dir = B.subtract(A).normalize();

			let tmp = (Math.abs(dir.x) > 0.9)
				? new Vector3D(0, 1, 0)
				: new Vector3D(1, 0, 0);

			let u = dir.cross(tmp).normalize();
			let v = dir.cross(u);

			// Random angle and radius
			let angle = 2 * Math.PI * Math.random();

			let r2 = minDist * minDist +
				Math.random() * (maxDist * maxDist - minDist * minDist);

			let r = Math.sqrt(r2);

			let offset = u.multiply(Math.cos(angle) * r)
				.add(v.multiply(Math.sin(angle) * r));

			return P.add(offset);
		}

		generatePoints2(segStart, segEnd, N, minDist, maxDist)
		{
			let pts = [];
			let attempts = 0;
			let maxAttempts = 20000;

			while (pts.length < N && attempts < maxAttempts)
			{
				let p = this.randomCandidate(segStart, segEnd, minDist, maxDist);

				// Check segment distance
				let d = this.distPointSegment(p, segStart, segEnd);

				let dToX = Math.sqrt(p.y * p.y + p.z * p.z); // Distance to X-axis
				let dToY = Math.sqrt(p.x * p.x + p.z * p.z); // Distance to Y-axis
				let dToZ = Math.sqrt(p.x * p.x + p.y * p.y); // Distance to Z-axis

				let minDistToXAxis = 0.55;

				if (d < minDist || d > maxDist || dToX < minDistToXAxis)
				{
					attempts++;
					continue;
				}

				// Check against all previous points
				let ok = true;

				for (let q of pts)
				{
					if (this.length(p.subtract(q)) < minDist)
					{
						ok = false;
						break;
					}
				}

				if (!ok)
				{
					attempts++;
					continue;
				}

				pts.push(p);
			}

			return pts;
		}

		makePerpendicularSegmentOffset(center, phiDeg, thetaDeg, offset, length)
		{
			// 1. Direction vector
			let phi = phiDeg * (Math.PI / 180.0);
			let theta = thetaDeg * (Math.PI / 180.0);

			let dir = new Vector3D(
				Math.cos(theta) * Math.cos(phi),
				Math.cos(theta) * Math.sin(phi),
				Math.sin(theta)
			);

			dir = this.normalize(dir);

			// 2. Midpoint offset
			let midpoint = center.add(dir.multiply(offset));

			// 3. Build perpendicular
			let up = new Vector3D(0, 0, 1);

			if (Math.abs(this.dot(dir, up)) > 0.999)
				up = new Vector3D(0, 1, 0);

			let perp = this.normalize(this.cross(dir, up));

			// 4. Half length
			let half = length / 2.0;

			// 5. Endpoints
			let start = midpoint.add(perp.multiply(half));
			let end = midpoint.subtract(perp.multiply(half));

			// Return both endpoints
			return { start: start, end: end };
		}

		dist(a, b)
		{
			return(sqrt(Math.pow((float)(b.x - a.x), 2) + Math.pow((float)(b.y - a.y), 2) + Math.pow((float)(b.z - a.z), 2)));
		}

		orthogonalPointAtAngle(center, normal, radius, thetaRadians)
		{
			let n = vecUtils.normalize(normal);

			// Pick an arbitrary vector not parallel to n
			let arbitrary = (Math.abs(n.x) < 0.9)
				? new Vector3D(1, 0, 0)
				: new Vector3D(0, 1, 0);

			// Create tangent basis vectors
			let tangent1 = vecUtils.normalize(vecUtils.cross(n, arbitrary));
			let tangent2 = vecUtils.normalize(vecUtils.cross(n, tangent1));

			// Compute rotated vector in the plane
			let dir = tangent1.multiply(Math.cos(thetaRadians)).add(tangent2.multiply(Math.sin(thetaRadians)));

			// Scale by radius and offset by center
			return center.add(dir.multiply(radius));
		}

		distancePointToSegment(point, segment)
		{
			if (!point || !segment || !segment.A || !segment.B)
			{
				console.error("Invalid point or segment:", point, segment);
				return Infinity;
			}

			let AB = new Vector3D(
				segment.A.x - segment.B.x,
				segment.A.y - segment.B.y,
				segment.A.z - segment.B.z
			);

			let AP = new Vector3D(
				point.x - segment.B.x,
				point.y - segment.B.y,
				point.z - segment.B.z
			);

			let len2 = AB.dot(AB);

			if (len2 < 0.000001)
				return point.distance(segment.B);

			let t = AP.dot(AB) / len2;
			t = Math.max(0, Math.min(1, t));

			let closest = new Vector3D(
				segment.B.x + AB.x * t,
				segment.B.y + AB.y * t,
				segment.B.z + AB.z * t
			);

			return point.distance(closest);
		}

		distanceSegmentToSegment(A, B, C, D)
		{
			const EPS = 1e-9;

			// Allow two Segment arguments
			if (A instanceof Segment && B instanceof Segment)
			{
				C = B.A;
				D = B.B;

				B = A.B;
				A = A.A;
			}

			// Validate input
			if (!A || !B || !C || !D)
			{
				console.error("distanceSegmentToSegment: Undefined argument",
				{
					A, B, C, D
				});

				return Infinity;
			}

			// Calculate direction vectors
			let u = new Vector3D(
				B.x - A.x,
				B.y - A.y,
				B.z - A.z
			);

			let v = new Vector3D(
				D.x - C.x,
				D.y - C.y,
				D.z - C.z
			);

			let w = new Vector3D(
				A.x - C.x,
				A.y - C.y,
				A.z - C.z
			);

			let dot = (p, q) =>
				p.x * q.x + p.y * q.y + p.z * q.z;

			let a = dot(u, u);
			let b = dot(u, v);
			let c = dot(v, v);
			let d = dot(u, w);
			let e = dot(v, w);

			let s = 0;
			let t = 0;

			// Both segments are points
			if (a < EPS && c < EPS)
				return A.distance(C);

			// First segment is a point
			if (a < EPS)
			{
				t = Math.max(0, Math.min(1, e / c));
			}
			// Second segment is a point
			else if (c < EPS)
			{
				s = Math.max(0, Math.min(1, -d / a));
			}
			else
			{
				let denom = a * c - b * b;

				if (denom > EPS)
				{
					s = Math.max(0, Math.min(1,
						(b * e - c * d) / denom));
				}

				t = (b * s + e) / c;

				if (t < 0)
				{
					t = 0;
					s = Math.max(0, Math.min(1, -d / a));
				}
				else if (t > 1)
				{
					t = 1;
					s = Math.max(0, Math.min(1, (b - d) / a));
				}
			}

			// Calculate closest points
			let Pc = new Vector3D(
				A.x + u.x * s,
				A.y + u.y * s,
				A.z + u.z * s
			);

			let Qc = new Vector3D(
				C.x + v.x * t,
				C.y + v.y * t,
				C.z + v.z * t
			);

			return Pc.distance(Qc);
		}

		isSegmentClear(candidate, points, segments, minClearance)
		{
			// Check clearance against all points
			for (let a = 0; a < points.length; a++)
			{
				if (this.distancePointToSegment(
					points[a],
					candidate.A,
					candidate.B) < minClearance)
				{
					return false;
				}
			}

			// Check clearance against all existing segments
			for (let a = 0; a < segments.length; a++)
			{
				if (this.distanceSegmentToSegment(
					candidate.A,
					candidate.B,
					segments[a].A,
					segments[a].B) < minClearance)
				{
					return false;
				}
			}
			
			return true;
		}

		leftOrRightAxisPoint(origin, dir, up, vecOffset, lrOffset)
		{
			let pt = this.displaceVectorTowards(origin, dir, vecOffset);

			let forward = dir.normalize();

			let left = up.cross(forward).normalize();

			return pt.add(left.multiply(lrOffset));
		}

		rotate90AroundNormal(v, normal)
		{
			let n = normal.normalize();

			return n.cross(v);  // 90° rotation
		}

		generateConstrainedSegment(centralPoint, avoidancePoints, avoidanceSegments, minDist, maxDist, minClearance, segmentLength)
		{
			const maxAttempts = 2048;
			//const segmentLength = minClearance * 2;

			// Generate candidate segments
			for (let attempt = 0; attempt < maxAttempts; attempt++)
			{
				// Random direction from central point
				let dir = new Vector3D(
					Math.random() * 2 - 1,
					Math.random() * 2 - 1,
					Math.random() * 2 - 1
				);

				let len = Math.sqrt(
					dir.x * dir.x +
					dir.y * dir.y +
					dir.z * dir.z
				);

				if (len < 0.000001)
					continue;

				dir = new Vector3D(
					dir.x / len,
					dir.y / len,
					dir.z / len
				);

				// Random starting position
				let radius = minDist + Math.random() * (maxDist - minDist);

				let B = new Vector3D(
					centralPoint.x + dir.x * radius,
					centralPoint.y + dir.y * radius,
					centralPoint.z + dir.z * radius
				);

				// Random segment direction
				let segDir = new Vector3D(
					Math.random() * 2 - 1,
					Math.random() * 2 - 1,
					Math.random() * 2 - 1
				);

				len = Math.sqrt(
					segDir.x * segDir.x +
					segDir.y * segDir.y +
					segDir.z * segDir.z
				);

				if (len < 0.000001)
					continue;

				segDir = new Vector3D(
					segDir.x / len,
					segDir.y / len,
					segDir.z / len
				);

				// Calculate other endpoint
				let A = new Vector3D(
					B.x + segDir.x * segmentLength,
					B.y + segDir.y * segmentLength,
					B.z + segDir.z * segmentLength
				);

				let candidate = new Segment(A, B);

				// Check clearance
				if (this.isSegmentClear(
					candidate,
					avoidancePoints,
					avoidanceSegments,
					minClearance))
				{
					return candidate;
				}
			}

			return null;
		}

		my_min(a, b)
		{
			return (a < b) ? a : b;
		}

		my_max(a, b)
		{
			return (a > b) ? a : b;
		}

		my_clamp2(value, minVal, maxVal)
		{
			return this.my_max(minVal, this.my_min(value, maxVal));
		}

		// Helper: closest point on segment AB to P
		closestPointOnSegment(P, A, B)
		{
			let AB = B.subtract(A);
			let AP = P.subtract(A);

			let denom = vecUtils.dot(AB, AB);

			if (denom < 1e-12)
				return A; // degenerate segment

			let t = this.my_clamp2(vecUtils.dot(AB, AP) / denom, 0.0, 1.0);

			return A.add(AB.multiply(t));
		}


		moveAwayFromSegmentAndPoints(P, A, B, points, minDist)
		{
			// --- Check segment distance ---
			let C = this.closestPointOnSegment(P, A, B);

			let segDir = P.subtract(C);
			let distSeg = segDir.length();

			let minDistance = distSeg;
			let closestDir = segDir;

			// --- Check all points ---
			for (let Q of points)
			{
				let d = P.subtract(Q);
				let dist = d.length();

				if (dist < minDistance)
				{
					minDistance = dist;
					closestDir = d;
				}
			}

			// --- Decide how to move ---
			if (minDistance >= minDist)
				return P; // Already far enough

			let moveDir;

			if (closestDir.length() < 1e-9)
			{
				// Exactly overlapping: pick a perpendicular to the segment
				moveDir = this.perpendicularTo(B.subtract(A));
			}
			else
			{
				moveDir = closestDir.normalize();
			}

			let moveAmount = minDist - minDistance;

			return P.add(moveDir.multiply(moveAmount));
		}

		pointAwayFromOtherPoints(input, points, minDist, maxDist)
		{
			const maxAttempts = 1024;

			let found = false;
			let result = input.clone();

			for (let n = 0; n < maxAttempts; n++)
			{
				let testPoint = new Vector3D(
					input.x + utils.random_2(-maxDist, maxDist),
					input.y + utils.random_2(-maxDist, maxDist),
					input.z + utils.random_2(-maxDist, maxDist)
				);

				let valid = true;

				for (let a = 0; a < points.length; a++)
				{
					let d1 = testPoint.distance(points[a]);

					if (d1 < minDist)
					{
						valid = false;
						break;
					}
				}

				if (valid)
				{
					result = testPoint;
					found = true;
					break;
				}
			}

			return {
				found: found,
				output: result
			};
		}

		// Generate points on the perpendicular plane at the tip of a vector
		generatePointsOnPlane(v, N, minSeparation)
		{
			let points = [];

			let n = v.normalize();  // Normal vector to the plane
			let tip = v.clone();    // Plane passes through the tip of v

			// Find two perpendicular unit vectors u and w
			let arbitrary = (Math.abs(n.x) < 0.9)
				? new Vector3D(1, 0, 0)
				: new Vector3D(0, 1, 0);

			let u = n.cross(arbitrary).normalize();
			let w = n.cross(u).normalize();

			// Arrange points in a grid pattern centred at the tip
			let gridSize = Math.ceil(Math.sqrt(N));
			let halfSize = (gridSize - 1) * minSeparation / 2.0;

			for (let i = 0; i < gridSize && points.length < N; i++)
			{
				for (let j = 0; j < gridSize && points.length < N; j++)
				{
					let a = -halfSize + i * minSeparation;
					let b = -halfSize + j * minSeparation;

					let p = tip
						.add(u.multiply(a))
						.add(w.multiply(b));

					points.push(p);
				}
			}

			return points;
		}

		// Move all points away from parameter axis and each other
		relaxPoints(points, axisOrigin, axisDir, minDist)
		{
			let iterations = 16;

			let D = axisDir.normalize();

			for (let iter = 0; iter < iterations; iter++)
			{
				// --- 1. Push points away from axis ---
				for (let p of points)
				{
					let OP = p.subtract(axisOrigin);
					let proj = D.multiply(OP.dot(D));
					let perp = OP.subtract(proj);

					let dist = perp.length();

					if (dist < minDist && dist > 1e-9)
					{
						let n = perp.normalize();

						let moved = p.add(n.multiply(minDist - dist));

						p.x = moved.x;
						p.y = moved.y;
						p.z = moved.z;
					}
				}

				// --- 2. Push points away from each other ---
				for (let i = 0; i < points.length; i++)
				{
					for (let j = i + 1; j < points.length; j++)
					{
						let diff = points[i].subtract(points[j]);
						let dist = diff.length();

						if (dist < minDist && dist > 1e-9)
						{
							let n = diff.normalize();
							let push = 0.5 * (minDist - dist);

							let p1 = points[i].add(n.multiply(push));
							let p2 = points[j].subtract(n.multiply(push));

							points[i].x = p1.x;
							points[i].y = p1.y;
							points[i].z = p1.z;

							points[j].x = p2.x;
							points[j].y = p2.y;
							points[j].z = p2.z;
						}
					}
				}
			}
		}

		// Move point away from axis
		moveAwayFromAxis(point, axisOrigin, axisDir, minDist)
		{
			let D = axisDir.normalize();
			let OP = point.subtract(axisOrigin);

			// Project onto axis
			let proj = D.multiply(OP.dot(D));

			// Perpendicular component
			let perp = OP.subtract(proj);
			let dist = perp.length();

			if (dist < minDist && dist > 1e-9)
			{
				let n = perp.normalize();

				return point.add(n.multiply(minDist - dist));
			}

			return point; // Already far enough
		}

		// Distance from point P to segment AB

		pointToSegmentDistance(P1, seg)
		{
			let P = new Vector3D(P1.x, P1.y, P1.z);

			let SegmentA = new Vector3D(seg.A.x, seg.A.y, seg.A.z);
			let SegmentB = new Vector3D(seg.B.x, seg.B.y, seg.B.z);

			let AB = SegmentB.subtract(SegmentA);
			let AP = P.subtract(SegmentA);

			let denom = AB.dot(AB);

			if (denom === 0.0)
				return P.distance(SegmentA);

			let t = AP.dot(AB) / denom;

			if (t < 0.0)
				t = 0.0;
			else if (t > 1.0)
				t = 1.0;

			let closest = SegmentA.add(AB.multiply(t));

			return P.distance(closest);
		}

		// Approximate segment-to-segment distance (via endpoints)
		segmentToSegmentDistance(s1, s2)
		{
			let d1 = this.pointToSegmentDistance(s1.A, s2);
			let d2 = this.pointToSegmentDistance(s1.B, s2);
			let d3 = this.pointToSegmentDistance(s2.A, s1);
			let d4 = this.pointToSegmentDistance(s2.B, s1);

			return Math.min(d1, d2, d3, d4);
		}

		randRange(min, max)
		{
			return min + Math.random() * (max - min);
		}

		randomPointAround(tgt, minR, maxR)
		{
			// Random direction uniformly distributed over a sphere
			let u = this.randRange(-1.0, 1.0);
			u = Math.max(-1.0, Math.min(1.0, u));

			let theta = this.randRange(0.0, 2.0 * Math.PI);
			let phi = Math.acos(u);

			// Random radius
			let r = this.randRange(minR, maxR);

			let sinPhi = Math.sin(phi);

			return new Vector3D(
				tgt.x + r * sinPhi * Math.cos(theta),
				tgt.y + r * sinPhi * Math.sin(theta),
				tgt.z + r * Math.cos(phi)
			);
		}

		generateConstrainedSegment_3(
			tgt,
			points,
			segs,
			minClearance,
			minDistA,
			maxDistA,
			minDistB,
			maxDistB)
		{
			let maxAttempts = 10000;

			for (let attempt = 0; attempt < maxAttempts; attempt++)
			{
				let A = this.randomPointAround(tgt, minDistA, maxDistA);
				let B = this.randomPointAround(tgt, minDistB, maxDistB);

				let cand = new Segment(A, B);

				let valid = true;

				// Check clearance from points
				for (let p of points)
				{
					if (this.pointToSegmentDistance(p, cand) < minClearance)
					{
						valid = false;
						break;
					}
				}

				// Check clearance from other segments
				if (valid && segs.length > 0)
				{
					for (let s of segs)
					{
						if (this.segmentToSegmentDistance(cand, s) < minClearance)
						{
							valid = false;
							break;
						}
					}
				}

				if (valid)
					return cand;
			}

			// Failed to generate segment
			return null;
		}

		rnd()
		{
			return Math.random();
		}

		randInt(min, max)
		{
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		generateSurroundingSegments_2(center, N, disp)
		{
			if (N <= 0)
				return [];

			if (disp <= 0.0)
				return [center];

			let dir = center.B.subtract(center.A);
			let len = dir.length();

			if (len === 0.0)
				throw new Error("Zero-length segment");

			let u = dir.divide(len);

			// Build perpendicular plane basis (v1, v2)
			let tmp = (Math.abs(u.x) < 0.9)
				? new Vector3D(1, 0, 0)
				: new Vector3D(0, 1, 0);

			let v1 = u.cross(tmp).normalize();
			let v2 = u.cross(v1);

			let result = [];

			for (let i = 0; i < N; i++)
			{
				let theta = 2.0 * Math.PI * i / N;

				let offset = v1.multiply(disp * Math.cos(theta))
					.add(v2.multiply(disp * Math.sin(theta)));

				result.push(new Segment(
					center.A.add(offset),
					center.B.add(offset)
				));
			}

			return result;
		}

		randomOffsetSegmentInOrthogonalPlane(A, B, radius)
		{
			// Direction of AB
			let v = B.subtract(A).normalize();

			// Pick a reference axis not parallel to v
			let ref;

			if (Math.abs(v.y) < 0.99)
				ref = new Vector3D(0, 1, 0);
			else
				ref = new Vector3D(1, 0, 0);

			// Two perpendicular unit vectors
			let u = v.cross(ref).normalize();
			let w = v.cross(u).normalize();

			// Random displacements for each endpoint
			let a = this.randInCircle(radius);
			let b = this.randInCircle(radius);

			// Offset endpoints
			let A_out = A.add(u.multiply(a.x))
						.add(w.multiply(a.y));

			let B_out = B.add(u.multiply(b.x))
						.add(w.multiply(b.y));

			return {
				A: A_out,
				B: B_out
			};
		}

		randomParallelSegment(seg, disp)
		{
			let dir = seg.B.subtract(seg.A);
			let len = dir.length();

			if (len === 0.0)
				throw new Error("Segment has zero length");

			let u = dir.divide(len);

			if (disp === 0.0)
				return seg;

			// Pick a non-parallel vector
			let tmp = (Math.abs(u.x) < 0.9)
				? new Vector3D(1, 0, 0)
				: new Vector3D(0, 1, 0);

			let v1 = u.cross(tmp).normalize();
			let v2 = u.cross(v1);

			let theta = Math.random() * 2.0 * Math.PI;

			let offset = v1.multiply(disp * Math.cos(theta))
				.add(v2.multiply(disp * Math.sin(theta)));

			return new Segment(
				seg.A.add(offset),
				seg.B.add(offset)
			);
		}

		randInCircle(radius)
		{
			let r = radius * Math.sqrt(Math.random());
			let theta = 2.0 * Math.PI * Math.random();

			return {
				x: r * Math.cos(theta),
				y: r * Math.sin(theta)
			};
		}

		randomInOrthogonalPlane(dir, radius)
		{
			// Normalize the direction
			let v = dir.normalize();

			// Pick an arbitrary vector not parallel to v
			let ref;

			if (Math.abs(v.y) < 0.99)
				ref = new Vector3D(0, 1, 0);
			else
				ref = new Vector3D(1, 0, 0);

			// Build an orthonormal basis
			let u = v.cross(ref).normalize();
			let w = v.cross(u).normalize();

			// Random coordinates in the plane
			let p = this.randInCircle(radius);

			// Combine them
			return u.multiply(p.x).add(w.multiply(p.y));
		}

		randInAnnulus(minDist, maxDist)
		{
			// Generate radius uniformly in area
			let r = Math.sqrt(
				(maxDist * maxDist - minDist * minDist) * Math.random()
				+ minDist * minDist
			);

			let theta = 2.0 * Math.PI * Math.random();

			return {
				x: r * Math.cos(theta),
				y: r * Math.sin(theta)
			};
		}

		randomPointsInOrthogonalPlane(dir, minDist, maxDist, minSeparation, N)
		{
			let maxAttempts = 5000;

			let v = dir.normalize();

			// Pick an arbitrary vector not parallel to v
			let ref = (Math.abs(v.y) < 0.99)
				? new Vector3D(0, 1, 0)
				: new Vector3D(1, 0, 0);

			// Build orthonormal basis
			let u = v.cross(ref).normalize();
			let w = v.cross(u).normalize();

			let points = [];
			let attempts = 0;

			while (points.length < N && attempts < maxAttempts)
			{
				attempts++;

				let p = this.randInAnnulus(minDist, maxDist);

				let candidate = u.multiply(p.x)
					.add(w.multiply(p.y));

				let tooClose = false;

				for (let existing of points)
				{
					if (candidate.distance(existing) < minSeparation)
					{
						tooClose = true;
						break;
					}
				}

				if (!tooClose)
					points.push(candidate);
			}

			return points;
		}

		perpendicularDirection(lineDirection)
		{
			let v = lineDirection.normalize();

			// Choose a reference vector not parallel to v
			let reference;

			if (Math.abs(v.x) < 0.9)
				reference = new Vector3D(1, 0, 0);
			else
				reference = new Vector3D(0, 1, 0);

			return reference.cross(v);
		}

		displaceOrthogonally(centroid, pointOnLine, distance)
		{
			let lineDirection = pointOnLine.subtract(centroid);

			let perpendicular = this.perpendicularDirection(lineDirection);

			return pointOnLine.add(perpendicular.multiply(distance));
		}

		displaceOrthogonallyXY(centroid, pointOnLine, distance)
		{
			// Direction projected onto XY
			let lineDirection = new Vector3D(
				pointOnLine.x - centroid.x,
				pointOnLine.y - centroid.y,
				0.0
			);

			let lengthXY = Math.sqrt(
				lineDirection.x * lineDirection.x +
				lineDirection.y * lineDirection.y
			);

			if (lengthXY === 0.0)
			{
				throw new Error(
					"Centroid and point must differ in the XY plane"
				);
			}

			// 90-degree perpendicular direction in XY
			let perpendicular = new Vector3D(
				-lineDirection.y / lengthXY,
				lineDirection.x / lengthXY,
				0.0
			);

			// Displace only in XY; preserve Z
			return new Vector3D(
				pointOnLine.x + distance * perpendicular.x,
				pointOnLine.y + distance * perpendicular.y,
				pointOnLine.z
			);
		}

		RandomPointAwayFromPointAndSegments_2(
			centre,
			segments,
			minDistance,
			maxDistance,
			minSegmentClearance,
			maxAttempts)
		{
			let Random01 = () => Math.random();

			for (let attempt = 0; attempt < maxAttempts; attempt++)
			{
				// Random direction
				let direction = new Vector3D(
					Random01() * 2.0 - 1.0,
					Random01() * 2.0 - 1.0,
					Random01() * 2.0 - 1.0
				);

				let len = direction.length();

				if (len < 0.0001)
					continue;

				direction = direction.divide(len);

				// Random distance from the given point
				let distance = minDistance +
					Random01() * (maxDistance - minDistance);

				let candidate = centre.add(
					direction.multiply(distance)
				);

				// Check against every segment
				let segmentDistance =
					this.DistanceToNearestSegment_2(candidate, segments);

				if (segmentDistance >= minSegmentClearance &&
					segmentDistance <= maxDistance)
				{
					return {
						success: true,
						result: candidate
					};
				}
			}

			return {
				success: false,
				result: null
			};
		}
	};
