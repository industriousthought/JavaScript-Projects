

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

//An array that contains the settings for different substances.  Will contains substance objects.
		var sources = new Array();


		for (i=0; i<4; i++) {

			if (i > 0) {
			sources[i] = new source(i, /*Math.floor(Math.random()*100)*/ 90, Math.floor(Math.random()*30), Math.floor(Math.random()	*30), 10);
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


		for (i=0; i<5; i++) {
		ii = i;
		alert(ii + ', ' + i);
			germs[i] = new bacterium( Math.floor(Math.random()*30),  Math.floor(Math.random()*30), i, neuralMetaPattern);
		i = ii;
		alert(ii + ', ' + i);
		}


		this.analytics = function() {
			anltWindow = null;
			anltWindow = window.open('analytics.html?' + gridDump(grid), '', '');
			anltWindow.focus();	
		}

		this.cycle = function() {
			difussion(grid, newGrid, sources);

			for (i=0; i<germs.length; i++) {
				ii = i;
				if (germs[i]) {

					if (germs[i].cellDeath == false) {

						bacIterate(germs[i], grid);
	
					} else {
	
						document.getElementById('germ' + i).height = 0;
						document.getElementById('germ' + i).width = 0;
						delete germs[i];
					}


				}
				i = ii;

			}

		
	
			for (i=1; i<sources.length; i++) {
		
				newGrid[sources[i].x][sources[i].y][i] = sources[i].intensity;

			}


			grid = newGrid.clone();

		}
	}
		


