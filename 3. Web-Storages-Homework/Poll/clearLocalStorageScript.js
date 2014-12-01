'use strict';
(function(){
	$(function(){
		//Clear localStorage to reset the totalCounter and Name	
			function clearLocalStorage(){						
				var clearStorageButton = document.getElementById('clear-localStorage');
				clearStorageButton.addEventListener('click', function (e) {	
					localStorage.clear();
				});
			}
			clearLocalStorage();
	})
})();