function flatDistribution(dataSetObj) {

	var valueDistribution = new Array();

	for (i=0; i<100; i++) {

		valueDistribution[i] = 0;

	}


	for (x=0; x<dataSetObj.length; x++) {

		for (y=0; y<dataSetObj[x].length; y++) {

			valueDistribution[Math.floor(dataSetObj[x][y])]++;

		}	

	}

	return valueDistribution;
}

function polarDifferenceSense(dataSetObj, x, y) {

	var output = new Array();


	for (i=0; i<3; i++) {

		surroundArray = surroundingSample(dataSetObj, x, y, i);

			
		if (surroundArray[0] - surroundArray[5] < 0) {
			output[0 + (i * 4)] = normalizeInputs(Math.abs(surroundArray[0] - surroundArray[5]));
		} else {
			output[0 + (i * 4)] = normalizeInputs(surroundArray[0] - surroundArray[5]) + 50;
		}
		if (surroundArray[2] - surroundArray[7] < 0) {
			output[1 + (i * 4)] = normalizeInputs(Math.abs(surroundArray[2] - surroundArray[7]));
		} else {
			output[1 + (i * 4)] = normalizeInputs(surroundArray[2] - surroundArray[7]) + 50;
		}
		if (surroundArray[1] - surroundArray[6] < 0) {
			output[2 + (i * 4)] = normalizeInputs(Math.abs(surroundArray[1] - surroundArray[6]));
		} else {
			output[2 + (i * 4)] = normalizeInputs(surroundArray[1] - surroundArray[6]) + 50;
			}
		if (surroundArray[4] - surroundArray[3] < 0) {
			output[3 + (i * 4)] = normalizeInputs(Math.abs(surroundArray[4] - surroundArray[3]));
		} else {
			output[3 + (i * 4)] = normalizeInputs(surroundArray[4] - surroundArray[3]) + 50;
		}	
	}

	return output;


}


function polarDifferenceDistribution(dataSetObj) {

	var pVD = new Array();
	var negValueDistribution = new Array();

	for (i=0; i<1000; i++) {

		pVD[i] = 0;
		negValueDistribution[i] = 0;

	}



	for (x=0; x<dataSetObj.length; x++) {

		for (y=0; y<dataSetObj[x].length; y++) {

			dataSetObj[x][y] = new Array(dataSetObj[x][y]);
		}
	}


	for (x=0; x<dataSetObj.length; x++) {


		for (y=0; y<dataSetObj[x].length; y++) {

			surroundArray = surroundingSample(dataSetObj, x, y, 0);

			
			if (surroundArray[0] - surroundArray[5] <= 0) {
				negValueDistribution[Math.floor(normalizeInputs(Math.abs(surroundArray[0] - surroundArray[5])))]--;
			} else if (surroundArray[0] - surroundArray[5] >= 0) {
				pVD[Math.floor(normalizeInputs(surroundArray[0] - surroundArray[5]))]++;
			}
			if (surroundArray[2] - surroundArray[7] <= 0) {
				negValueDistribution[Math.floor(normalizeInputs(Math.abs(surroundArray[2] - surroundArray[7])))]--;
			} else if (surroundArray[2] - surroundArray[7] >= 0) {
				pVD[Math.floor(normalizeInputs(surroundArray[2] - surroundArray[7]))]++;
			}
			if (surroundArray[1] - surroundArray[6] <= 0) {
				negValueDistribution[Math.floor(normalizeInputs(Math.abs(surroundArray[1] - surroundArray[6])))]--;
			} else if (surroundArray[1] - surroundArray[6] >= 0) {
				pVD[Math.floor(normalizeInputs(surroundArray[1] - surroundArray[6]))]++;
			}
			if (surroundArray[4] - surroundArray[3] <= 0) {
				negValueDistribution[Math.floor(normalizeInputs(Math.abs(surroundArray[4] - surroundArray[3])))]--;
			} else if (surroundArray[4] - surroundArray[3] >= 0) {
				pVD[Math.floor(normalizeInputs(surroundArray[4] - surroundArray[3]))]++;
			}	

/*			valueDistribution[valueDistribution.length] = Math.abs(surroundArray[0] - surroundArray[5]);
			valueDistribution[valueDistribution.length] = Math.abs(surroundArray[2] - surroundArray[7]);
			valueDistribution[valueDistribution.length] = Math.abs(surroundArray[1] - surroundArray[6]);
			valueDistribution[valueDistribution.length] = Math.abs(surroundArray[4] - surroundArray[3]);

*/
		}
	}

	alert(pVD + ',  ' + negValueDistribution);
	
	valDist = new valueDistribution(pVD, negValueDistribution);


	return valDist;

}

function valueDistribution (positive, negative) {

	this.positive = positive;
	this.negative = negative;

}

function normalizeInputs(x) {

		x = 50 - (100 / ((x + 1.42) * (x + 1.42)));

		if (x > 50) {x = 50};


	return x;


}

