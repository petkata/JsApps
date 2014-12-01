'use strict';
(function(){
	$(function(){
		//Clear SessionStorage to reset the sessionCounter
			function clearSessionStorage(){
				var clearStorageButton = document.getElementById('clear-sessionStorage');
				clearStorageButton.addEventListener('click', function (e) {	
					sessionStorage.clear();
					document.getElementById('result').innerHTML = 'SessionStorage cleared <br />';
				});
			}
			clearSessionStorage();
	})
})();