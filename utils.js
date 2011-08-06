function getSize() {
	if( typeof( window.innerWidth ) == 'number' ) {
	//Non-IE
	myWidth = window.innerWidth;
	myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	//IE 6+ in 'standards compliant mode'
	myWidth = document.documentElement.clientWidth;
	myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	//IE 4 compatible
	myWidth = document.body.clientWidth;
	myHeight = document.body.clientHeight;
  }
}


	function sumArray(inputArray) {

		var total = 0;
	
		for (i=0; i<inputArray.length; i++) {

			total = total + inputArray[i];
	
		}
	
		return total;

	}

	function addImg(id, src, x, y) {


		getSize();

		if (!document.getElementById(id)) {

			var newLocation = document.createElement('img');
			newLocation.setAttribute('id', id);
			newLocation.setAttribute('src', src);
			document.getElementById('display').appendChild(newLocation);
			
		}
		var currentLocation = document.getElementById(id);
		currentLocation.style.top = Math.round((myHeight / 35) * x);
		currentLocation.style.left = Math.round((myWidth / 50) * y);
		currentLocation.style.position = 'absolute';
		currentLocation.style.visibility = 'visible';
		currentLocation.height = Math.round(myHeight / 34);
		currentLocation.width = Math.round(myWidth / 49);



	}


//Array clone prototype function

	Array.prototype.clone = function() {

		var newObj = this.slice(0);
	
		for (i=0; i<this.length; i++) {

			if (this[i].clone) {

				newObj[i] = this[i].clone();
				break;
			}
		}

		return newObj;

	}


