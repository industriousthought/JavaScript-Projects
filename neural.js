
//step through a neuralNetwork object and return html with data on neural configuration
	function viewNetwork(netObj) {
		
//setup the final variable to be returned
		htmlOut = '';

//Step through the whole network array in neuralNetwork object
		for (x=0; x<netObj.network.length; x++) {
			
//output the layer number at the start of each x value
			htmlOut = htmlOut + 'layer ' + x + ' - ';

//step through each neuron on the current layer
			for (y=0; y<netObj.network[x].length; y++) {

//output the neuron number and activationThreshold for each neuron
				htmlOut = htmlOut + y + ' - ' + netObj.network[x][y].activationThreshold + '(';


//step through the synapses array in the current neuron object
				for (i=0; i<netObj.network[x][y].synapses.length; i++) {


//output the destination and weight for each synapse. the synapse values will be deliniated by commas
//and the whole group for the neuron will be bracketed by parathesis
					htmlOut = htmlOut + netObj.network[x][y].synapses[i].destination + ' - ' + netObj.network[x][y].synapses[i].weight + ', ';

				}			

				htmlOut = htmlOut + ')';

			}
		
//do a few line breaks between layers
			htmlOut = htmlOut + '<br><br>';

		}

		return htmlOut;

	}


//Builds a pattern for an ANN that the neuralNetwork object can take as a parameter
//the pattern is a generic layout for a neural configuration without specific neural activationThresholds or synaptic weights
//metaPattern is a one dimension array.  
	function buildNeuralPattern(metaPattern, synapticDensityFactor) {


//a three-dimensional array that can be passed to the neuralNetwork constructor.  
		var outputArray = new Array();

//sets up the number of synapses for each neuron.  If there are fewer neurons in the downstream layer than 
//synaptic connections, set to the number of neurons in that layer. 
		var workingDensityFactor = 0;


		for (x=0; x<metaPattern.length; x++) {

			outputArray[x] = new Array();

			if (x < metaPattern.length - 1) {

				if (synapticDensityFactor > metaPattern[x+1]) {

					workingDensityFactor = metaPattern[x+1];

				} else {

					workingDensityFactor = synapticDensityFactor;

				}
			}

			for (y=0; y<metaPattern[x]; y++) {

				if (x < metaPattern.length - 1) {

					outputArray[x][y] = new Array();

					if (y < (workingDensityFactor / 2)) {

						ii = 0;

					} else if (y > (metaPattern[x+1] - Math.floor(.5 * workingDensityFactor))) {

						ii = metaPattern[x+1] - workingDensityFactor;

					} else {

						ii = Math.floor(y - workingDensityFactor / 2);

					}

					
					for (i=0; i<workingDensityFactor; i++) {

						outputArray[x][y][i] = ii;
						ii++;

					}

				} else {
			
				outputArray[x][y] = 0;

				}
			}
		}
	
	return outputArray;

	}


//synapse object. Will be instanciated by nueron object.************************* 
	function synapse(destination, weight) {

//Properties of synapse object. 

//wieght is a multiplier that will be applied to activation voltage from the upstream neuron.
		this.weight = weight;
//destination of downstream neuron this synapse connects to.
		this.destination = destination;

	}




//neuron object. Will be instanciated by neuralNetwork object********************
	function neuron(synapseData, activationThreshold) {
		
//Properties of neuron object



		this.currentState = 0;
//synapses is an array of synapse objects
		this.synapses = new Array();
//activationThreshold is the value at which the neuron fires when the sum of upstream synapses reaches it
		this.activationThreshold = activationThreshold;

//This loop cycles through an array of synapse data and uses it to populate the synapses array with synapse objects
		for (i=0; i<synapseData.length; i++) {

			this.synapses[i] = new synapse(synapseData[i][0], synapseData[i][1]);

		}

	}




//neuralNetwork object. ****************************************************
	function neuralNetwork(neurons, pattern) {


		this.evaluate = function(inputArray) {

			var outputArray = new Array();

			//input array preproccessing.  Needs to be compartmentalized.

			for (i=0; i<inputArray.length; i++) {

				this.network[0][i].currentState = inputArray[i] * 100;

			}

			for (x=0; x<this.network.length-1; x++) {
		
				for (y=0; y<this.network[x].length; y++) {
		
					for (i=0; i<this.network[x][y].synapses.length; i++) {

						if (x == 0 || this.network[x][y].currentState >= this.network[x][y].activationThreshold) {

							this.network[x+1][this.network[x][y].synapses[i].destination].currentState = this.network[x+1][this.network[x][y].synapses[i].destination].currentState + (this.network[x][y].currentState * (this.network[x][y].synapses[i].weight / 100) / this.network[x][y].synapses.length);

						}
					}

				}
	
			}

			for (x=0; x<this.network[this.network.length-1].length; x++) {

				outputArray[x] = this.network[this.network.length-1][x].currentState;

			}

			for (x=0; x<this.network.length; x++) {
		
				for (y=0; y<this.network[x].length; y++) {

					this.network[x][y].currentState = 0;

				}
			}
			return outputArray;

		}

//network is an array of neuron objects
		this.network = new Array();

//These nested loops cycle through the network data and uses it to populate an array with neuron objects.

		if (neurons != null && pattern == null) {
			for (x=0; x<neurons.length; x++) {

				this.network[x] = new Array();

				for (y=0; y<neurons[x].length; y++) {
			
					this.network[x][y] = new neuron(neurons[x][y][0], neurons[x][y][1]);
				}

			}
		}

		if (neurons == null && pattern != null) {
		
			//alert(pattern.length);

			synapseData = new Array();
		
			for (x=0; x<pattern.length; x++) {

				this.network[x] = new Array();
				
				for (y=0; y<pattern[x].length; y++) {


					synapseData.length = 0;			

					for (i=0; i<pattern[x][y].length; i++) {

						synapseData[i] = new Array(pattern[x][y][i], Math.floor(Math.random()*125));
						

					}

					this.network[x][y] = new neuron(synapseData, Math.floor(Math.random()*100));
				}


			}

		}
	}
	

