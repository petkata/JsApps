'use strict';
(function(){
	$(function(){
		//Total Counter
			function incrementTotalCounter() {
				if (!localStorage.counter) {
					localStorage.setItem("counter", 0);
				}
				var currentCount = parseInt(localStorage.getItem("counter"));
				currentCount++;
				localStorage.setItem("counter", currentCount);
				document.getElementById("totalCountDiv").innerHTML += currentCount;
			}
			incrementTotalCounter();
	})
})();