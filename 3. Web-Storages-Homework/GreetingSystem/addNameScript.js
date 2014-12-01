'use strict';
(function(){
	$(function(){
		function addName(){
				var greeting = $('#greeting');
				greeting.hide();
				var result = document.getElementById('result');
				var putInStorageButton = document.getElementById('put-btn');
				//Adding Name
				putInStorageButton.addEventListener('click', function (e) {
					var nameText = document.getElementById('name').value;					
					localStorage.setItem('name',nameText);
					result.innerHTML = 'User added: ' + nameText +'<br />';
				});
				//visualise the name
				if(localStorage.getItem("name")!==null)
				{
					var name = document.createElement("h2");;
					greeting.show();
					name.innerHTML = 'Hello ' + localStorage.name +'<br />';
					greeting.append(name);
				}
			}
			addName();
	})
})();