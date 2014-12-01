'use strict';
(function(){
	$(function(){
		//Session Counter
			function incrementSessionCounter() {
				if (!sessionStorage.counter) {
					sessionStorage.setItem("counter", 0);
				}
				var currentCount = parseInt(sessionStorage.getItem("counter"));
				currentCount++;
				sessionStorage.setItem("counter", currentCount);
				document.getElementById("sessionCountDiv").innerHTML += currentCount;
			}
			incrementSessionCounter();
	})
})();