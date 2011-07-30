
	function surroundingSample(gridObj, x, y, i) {

		

		if (x != 0 && y != 0 && x != gridObj.length - 1 && y != gridObj[x].length - 1) {
			var surroundPattern = new Array(gridObj[x - 1][y][i], gridObj[x][y - 1][i], gridObj[x - 1][y - 1][i], gridObj[x - 1][y + 1][i], gridObj[x + 1][y - 1][i], gridObj[x + 1][y][i], gridObj[x][y + 1][i], gridObj[x + 1][y + 1][i]);
		}

		if (x == 0 && y == 0) {
			var surroundPattern = new Array(gridObj[gridObj.length - 1][y][i], gridObj[x][gridObj[x].length - 1][i], gridObj[gridObj.length - 1][gridObj[x].length - 1][i], gridObj[gridObj.length - 1][y + 1][i], gridObj[x + 1][gridObj[x].length - 1][i], gridObj[x + 1][y][i], gridObj[x][y + 1][i], gridObj[x + 1][y + 1][i]);
		}					

		if (x == gridObj.length - 1 && y == gridObj[x].length - 1) {
			var surroundPattern = new Array(gridObj[x - 1][y][i], gridObj[x][y - 1][i], gridObj[x - 1][y - 1][i], gridObj[x - 1][0][i], gridObj[0][y - 1][i], gridObj[0][y][i], gridObj[x][0][i], gridObj[0][0][i]);
		}					

		if (x == 0 && y == gridObj[x].length - 1) { 
			var surroundPattern = new Array(0, 0, 0, 0, 0, 0, 0, 0); //(gridObj[gridObj.length - 1][y][i], gridObj[x][y - 1][i], gridObj[gridObj.length - 1][y - 1][i], gridObj[gridObj.legnth - 1][0][i], gridObj[x + 1][y - 1][i], gridObj[x + 1][y][i], gridObj[x][0][i], gridObj[x + 1][0][i]);
		}

		if (x == gridObj.length - 1 && y == 0) {
			var surroundPattern = new Array(gridObj[0][y][i], gridObj[x][gridObj[x].length - 1][i], gridObj[x - 1][gridObj[x].length - 1][i], gridObj[x - 1][y + 1][i], gridObj[0][gridObj[x].length - 1][i], gridObj[0][y][i], gridObj[x][y + 1][i], gridObj[gridObj[x].length - 1][y + 1][i]);
		}

		if (y == 0 && x != 0 && x != gridObj.length - 1) {
			var surroundPattern = new Array(gridObj[x - 1][y][i], gridObj[x][gridObj[x].length - 1][i], gridObj[x - 1][gridObj[x].length - 1][i], gridObj[x - 1][y + 1][i], gridObj[x + 1][gridObj[x].length - 1][i], gridObj[x + 1][y][i], gridObj[x][y + 1][i], gridObj[x + 1][y + 1][i]);
		}

		if (y == gridObj[x].length - 1 && x != 0 && x != gridObj.length - 1) {
			var surroundPattern = new Array(gridObj[x - 1][y][i], gridObj[x][y - 1][i], gridObj[x - 1][y - 1][i], gridObj[x - 1][0][i], gridObj[x + 1][y - 1][i], gridObj[x + 1][y][i], gridObj[x][0][i], gridObj[x + 1][0][i]);
		}

		if (x == gridObj.length - 1 && y != 0 && y != gridObj.length - 1) {
			var surroundPattern = new Array(gridObj[x - 1][y][i], gridObj[x][y - 1][i], gridObj[x - 1][y - 1][i], gridObj[x - 1][y + 1][i], gridObj[0][y - 1][i], gridObj[0][y][i], gridObj[x][y + 1][i], gridObj[0][y + 1][i]);
		}

		if (x == 0 && y != 0 && y != gridObj.length - 1) {
			var surroundPattern = new Array(gridObj[gridObj.length - 1][y][i], gridObj[x][y - 1][i], gridObj[gridObj.length - 1][y - 1][i], gridObj[gridObj.length - 1][y + 1][i], gridObj[x + 1][y - 1][i], gridObj[x + 1][y][i], gridObj[x][y + 1][i], gridObj[x + 1][y + 1][i]);
		}
		

		return surroundPattern;


	}




function gridDump(gridObj) {

	gridData = '';

	for (x=0; x<gridObj.length; x++) {

			if (x > 0) {

				gridData = gridData + '-';

			}

			for (y=0; y<gridObj[x].length; y++)  {
						
				gridData = gridData + gridObj[x][y][2];

				if (y < gridObj[x].length - 1) {
					 gridData = gridData +  ',';
				}
			}
	}

	return gridData;

}


	function difussion(gridObj, newGridObj, srcObj) {


		for (x=0; x<gridObj.length; x++) {

			for (y=0; y<gridObj[x].length; y++)  {

				for (i=1; i<srcObj.length; i++) {

					if (dump) {
						alert(gridObj[x][y][i]);
						dump = 0;
					}

					ii = i;

					currentDecay = srcObj[i].decay;
				

					
					
					newGridObj[x][y][i] = sumArray(surroundingSample(gridObj, x, y, i)) / (8 + currentDecay);


					if (currentSource > 0) {
						document.getElementById('location' + x + '-' + y).style.opacity = newGridObj[x][y][currentSource] / 100;
						document.getElementById('location' + x + '-' + y).style.filter = 'alpha(opacity=' + newGridObj[x][y][currentSource] + ')';
					} else {
						document.getElementById('location' + x + '-' + y).style.opacity = 0;
						document.getElementById('location' + x + '-' + y).style.filter = 'alpha(opacity=0)';
					}
					
					i = ii;

				}

			

				
			}
		}



	}




	function source(type, intensity, x, y, decay) {


		this.decay = decay / 100;
		this.type = type;
		this.intensity = intensity;
		this.x = x;
		this.y = y;


	}




