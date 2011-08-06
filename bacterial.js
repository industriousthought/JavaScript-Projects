
//bacterium object. ***************************************************************
	function bacterium(x, y, i, pattern) {

//Displays germ image in correct location on the grid
		addImg('germ' + i, 'germ.gif', x, y);

//Properties for bacterium object

		this.cellDeath = false;

//Tracks number of iterations
		this.counter = 0;
//ATP level for bacterium.
		this.atp = 20;
//Integrity of cell wall
		this.cellWall = 100;
//Protein level
		this.protein = 20;
//X-coordinate for position
		this.x = x;
//Y-coordinate for position
		this.y = y;
		this.i = i;



		if (pattern.network) {
			this.neuralNet = pattern;//new neuralNetwork(pattern, null);
		} else {
			this.neuralNet = new neuralNetwork(null, buildNeuralPattern(pattern, 5));
		}

/*		document.getElementById('germ' + i).onclick = function() {

			document.getElementById('inspector').innerHTML = 'atp ' + germs[i].atp + '<br>Protein ' + germs[i].protein + '<br>Cellwall ' + germs[i].cellWall + '<br>counter ' + germs[i].counter;

		}*/


	}




	function bacIterate(parentObj, gridObj) {


//Increment the counter on each iteration
		parentObj.counter++;


//Get average values for substances around bacterium		
		avgGlucose = sumArray(surroundingSample(gridObj, Math.floor(parentObj.x), Math.floor(parentObj.y), 1)) / 8;
		avgProtein = sumArray(surroundingSample(gridObj, Math.floor(parentObj.x), Math.floor(parentObj.y), 2)) / 8;
		avgCilian = sumArray(surroundingSample(gridObj, Math.floor(parentObj.x), Math.floor(parentObj.y), 3)) / 8;
//			avgCaffeine = sumArray(surroundingSample(gridObj, parentObj.x, parentObj.y, 4)) / 8;


//Only aquire atp if levels within bacterium are below 200
		if (parentObj.atp < 200) {

//if avgGlucose is less than or equal to one absorb glucose at slighly lower level
			if (avgGlucose <= 1) {
				parentObj.atp = parentObj.atp + (avgGlucose * 5);
			}				

//if avgGlucose is between one and two absorb at a slightly higher level
			if (avgGlucose > 1 && avgGlucose < 2) {
				parentObj.atp = parentObj.atp + (avgGlucose * 7);
			}	

//Absorb a maximum of 14 atp per interation
			if (avgGlucose >= 2) {
				parentObj.atp = parentObj.atp + (2 * 7);
			}
		}


//Only aquire protein if levels within bacterium are below 200
		if (parentObj.protein < 200) {

//if avgProtein is less than or equal to one absorb protein at slighly lower level
			if (avgProtein <= 1) {
				parentObj.protein = parentObj.protein + (avgProtein * 5);
			}

//if avgProtein is between one and two absorb at a slightly higher level
			if (avgProtein > 1 && avgProtein < 2) {
				parentObj.protein = parentObj.protein + (avgProtein * 7);
			}

//Absorb a maximum of 14 protein per interation
			if (avgProtein >= 2) {
				parentObj.protein = parentObj.protein + (2 * 7);
			}
		}
			



//if avgCilian is less than or equal to one absorb protein at slighly lower level
		if (avgCilian <= 1) {
			parentObj.cellWall = parentObj.cellWall - (avgCilian * 5);
		}

//if avgCilian is between one and two absorb at a slightly higher level
		if (avgCilian > 1 && avgCilian < 2) {
			parentObj.cellWall = parentObj.cellWall - (avgCilian * 7);
		}

//if avgCilian is greater than two absorb at a much higher level
		if (avgCilian >= 2) {
			parentObj.cellWall = parentObj.cellWall - (avgCilian * 15);
		}




		if (parentObj.cellWall < 100 && parentObj.cellWall > 90) {

			parentObj.atp = parentObj.atp - ((100 - parentObj.cellWall) / 5);
			parentObj.protein = parentObj.protein - ((100 - parentObj.cellWall) / 5);
			parentObj.cellWall = parentObj.cellWall + ((100 - parentObj.cellWall) / 5)

		}

		if (parentObj.cellWall <= 90 && parentObj.cellWall > 70) {

			parentObj.atp = parentObj.atp - ((100 - parentObj.cellWall) / 3);
			parentObj.protein = parentObj.protein - ((100 - parentObj.cellWall) / 3);
			parentObj.cellWall = parentObj.cellWall + ((100 - parentObj.cellWall) / 4)

		}

		if (parentObj.cellWall <= 70) {

			parentObj.atp = parentObj.atp - ((100 - parentObj.cellWall) / 2);
			parentObj.protein = parentObj.protein - ((100 - parentObj.cellWall) / 2);
			parentObj.cellWall = parentObj.cellWall + ((100 - parentObj.cellWall) / 3)

		}


		if (parentObj.cellWall <= 50) {

			parentObj.cellDeath = true;

		}

		netOutput = parentObj.neuralNet.evaluate(polarDifferenceSense(gridObj, Math.floor(parentObj.x), Math.floor(parentObj.y)));

		angle = netOutput[0] * 3.6;
		distance = Math.floor(netOutput[1]) / 100;

		if (angle > 360) { angle = 360; }

//		angle = Math.random()*360;
//		distance = 1; //Math.random();

		if (angle != 0) {
			angle = Math.PI * (angle / 180);
		} else {
	
			angle = 0;
		}


		var xoffset = Math.cos(angle) * distance;

		if (angle > Math.PI) {

			var yoffset = Math.sqrt((distance * distance) - (xoffset * xoffset));

		} else {

			var yoffset = 0 - (Math.sqrt((distance * distance) - (xoffset * xoffset)));

		}
		parentObj.x = parentObj.x - xoffset;
		parentObj.y = parentObj.y + yoffset;

		if (parentObj.x > 30) {
			parentObj.x = parentObj.x - 30;
		}

		if (parentObj.y > 30) {
			parentObj.y = parentObj.y - 30;
		}

		if (parentObj.x < 0) {
			parentObj.x = parentObj.x + 30;
		}

		if (parentObj.y < 0) {
			parentObj.y = parentObj.y + 30;
		}

		document.getElementById('germ' + parentObj.i).style.top = Math.round((myHeight / 35) * parentObj.x);
		document.getElementById('germ' + parentObj.i).style.left = Math.round((myWidth / 50) * parentObj.y);


//			document.getElementById('inspector').innerHTML = 'atp ' + this.atp + '<br>Protein ' + this.protein + '<br>Cellwall ' + this.cellWall + '<br>avgGlucose ' + avgGlucose + '<br>avgProtein ' + avgProtein + '<br>avgCilian ' + avgCilian + '<br>counter ' + counter;
	
	}


