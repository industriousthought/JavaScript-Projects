

//Set up global variables

//Boolean switch, trigger to dump properties for trouble-shooting
	var dump=0;

//This sets which substance to display on the grid. Set to zero for none.
	var currentSource = 0;


//Height and width values for browser window.
	var myHeight = 0;
	var myWidth = 0;





	function cycleTime() {

		var neuralMetaPattern = new Array(12, 24, 6, 2);

//A three-dimensional array that contains the levels for each substance at each point on the grid.
		var grid = new Array();

//As the substance diffussion pattern is calculated the results are placed in this array. At the end
//of the iteration, this is cloned back to grid[]
		var newGrid = new Array();

//An array of bacterium objects. 
		var germs = new Array();

		var germScore = new Array(0, 0, 0, 0, 0);

		var germNets = new Array();;

		var generation = 0;

		var populationCount = 0;

		var groupScore = 0;
		
		var scoreHistory = new Array();

//An array that contains the settings for different substances.  Will contains substance objects.
		var sources = new Array();

		var self = this;

		var i = 0;

		var j = 0;


		for (i=0; i<4; i++) {

			if (i > 0) {

				sources[i] = new source(i, /*Math.floor(Math.random()*100)*/ 90, Math.floor(Math.random()*30), Math.floor(Math.random()	*30), 12, Math.floor(Math.random()*360), (Math.random() / 2) + .5);

			}

			var buttonHTML = '<input type=\"radio\" name=\"sourceButtons\" id=\"sourceButton' + i + '\" onClick=\"currentSource=' + i + '\"> ' + i + '<br>';
			document.getElementById('controlPanel').innerHTML = document.getElementById('controlPanel').innerHTML + buttonHTML;
		}
				



	
		for (x=0; x<30; x++)	{
		
			grid[x] = new Array();
			newGrid[x] = new Array();
	
			for (y=0; y<30; y++)	{

				addImg('location' + x + '-' + y, 'dot.gif', x, y);
	
				grid[x][y] = new Array(0,0,0,0,0,0);
				newGrid[x][y] = new Array(0,0,0,0,0,0);
			
						
	
			}
		}

		this.populate = function() {

			populationCount = 5;

			
			if (germNets.length == 0) {

				for (j=0; j<populationCount; j++) {
					germs[j] = new bacterium( Math.floor(Math.random()*30),  Math.floor(Math.random()*30), j, neuralMetaPattern);
					germNets[j] = germs[j].neuralNet;

				}



			} else {

				for (j=0; j<populationCount; j++) {
					delete germs[j];
//					alert(germNets[j].network[1].length);
					germs[j] = new bacterium( Math.floor(Math.random()*30),  Math.floor(Math.random()*30), j, germNets[j]);
				}

			}
		}		

		self.populate();


		this.analytics = function() {
			anltWindow = null;
			anltWindow = window.open('analytics.html?' + gridDump(grid), '', '');
			anltWindow.focus();	
		}

		this.cycle = function() {

			var jj = 0;
			var i = 0;

			difussion(grid, newGrid, sources);

			if (populationCount == 0) {

				if (generation < 10) {

					self.populate();
					generation++;


				} else {
//needs cleaning up
	newLocation = document.createElement('img');
	newLocation.setAttribute('id', 'scoreDot' + scoreHistory.length);
	newLocation.setAttribute('src', 'dot.gif');
	document.getElementById('display').appendChild(newLocation);
	currentLocation = document.getElementById('scoreDot' + scoreHistory.length);
	currentLocation.style.bottom = 50 + (groupScore / 100);
	currentLocation.style.right = 200 - scoreHistory.length;
	currentLocation.style.position = 'absolute';
	currentLocation.height = 1;
	currentLocation.width = 1;

					document.getElementById('inspector2').innerHTML = groupScore;
					scoreHistory[scoreHistory.length] = groupScore;
					groupScore = 0;
					generation = 0;
					germNets = crossOver(germNets, germScore);
					for (i=i; i<germScore.length; i++) {germScore[i] = 0;}			
					self.populate();

				}
				
			}

			for (j=0; j<germs.length; j++) {
				i = germs[j].i;
				jj = j;

				if (germs[j].cellDeath == true) {

					populationCount--;
					germScore[i] = germScore[i] + (germs[j].counter);
					document.getElementById('germ' + i).style.visibilty = 'hidden';
					germs.splice(j, 1);



				} else {

					groupScore++;
					bacIterate(germs[j], grid);

				}
			
				j = jj;

			}

			var angle = 0;
			var distance = 0; 
	
			for (j=1; j<sources.length; j++) {
				
				distance = sources[j].distance;

				sources[j].angle = sources[j].angle + (Math.floor(Math.random() * 10) - 5)

				if (sources[j].angle < 0) {	
					sources[j].angle = sources[j].angle + 360;
				}

				if (sources[j].angle > 360) {	
					sources[j].angle = sources[j].angle - 360;
				}

				if (sources[j].angle != 0) {
					angle = Math.PI * (sources[j].angle / 180);
				} else {
	
					angle = 0;
				}

		
				var xoffset = Math.cos(angle) * distance;

				if (angle > Math.PI) {

					var yoffset = Math.sqrt((distance * distance) - (xoffset * xoffset));

				} else {

					var yoffset = 0 - (Math.sqrt((distance * distance) - (xoffset * xoffset)));

				}
				sources[j].x = sources[j].x - xoffset;
				sources[j].y = sources[j].y + yoffset;

				if (sources[j].x > 30) {
					sources[j].x = sources[j].x - 30;
				}

				if (sources[j].y > 30) {
					sources[j].y = sources[j].y - 30;
				}

				if (sources[j].x < 0) {
					sources[j].x = sources[j].x + 30;
				}

				if (sources[j].y < 0) {
					sources[j].y = sources[j].y + 30;
				}


				newGrid[Math.floor(sources[j].x)][Math.floor(sources[j].y)][j] = sources[j].intensity;
				
			}


			grid = newGrid.clone();

		}
	}
		


