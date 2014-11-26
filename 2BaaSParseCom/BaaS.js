'use strict';
/*
Buttons have classes instead of ids to edit only one at a time, because of the location.reload()
addTown button is not finished
if addCountry is clicked before country is clicked, on addTown click there is a bug

*/

(function(){
	$(function(){
		var PARSE_APP_ID = "Cg1ozEUcNGVI86HhjTrDksJsiR8VfzhlvTndbd4T";
		var PARSE_REST_API_KEY = "ObeDh1sQfCYT18jo2lrHMTjsW4pcE6ufcT73YBlA";
		$.ajax({
				method: "GET",
				headers: {
				"X-Parse-Application-Id": PARSE_APP_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
				},
				url: "https://api.parse.com/1/classes/Country",
				})
		.success(function(data) 
					{
						for (var countries in data.results) 
						{
							var country = data.results[countries];
							var countryName = $('<li>');
							var stringCountry = 'country';
							var countryLink = $("<a href='#'>").text(country.name);
							$(countryLink).data('country', country);
							countryLink.click(countryClicked);
							countryName.append(countryLink).prepend('<p>');
							countryName.append("&ensp;");
							addButtons(country,countryName,stringCountry);									
							countryName.appendTo($("#listCountries")).append('<p>');
						}
						var addBtn = $("<button class = 'addBtn'>Add Country</button>");
						addBtn.click(showAddField);
						addBtn.appendTo($('#listCountries'));
					}
		)
		.error(function() 
			{
				alert('Cannot load countries!');
			}
		);
		
		function addButtons(element,elementName,stringParam)
		{
			 
			var editBtn = $("<button class = 'editBtn'>Edit</button>");
			editBtn.data(stringParam, element);
			editBtn.click(showEditField);
			editBtn.appendTo(elementName);
			var deleteBtn = $("<button>Delete</button>");
			deleteBtn.data(stringParam, element);
			deleteBtn.click(deleteCountry);
			deleteBtn.appendTo(elementName);
		}
		
		function countryClicked() 
		{
			var country = $(this).data('country');
			$("#towns").show();
			var countryName = country.name;
			$("#towns h2").text(country.name);
			
			var countryId = country.objectId;
			$.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
				},
				url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}}'})
				.success(townsLoaded)
				.error(function() 
					{
						alert('Cannot load Towns!');
					});
		}
		
		function townsLoaded(data)
		{
			
			$("#towns ul").html('');
			for (var towns in data.results) {
				var town = data.results[towns];
				var townName = $('<li>');
				var stringTown = 'town';
				var typeTown = "Town";		
				townName.text(town.name+" ");
				addButtons(town,townName,stringTown);
				townName.appendTo($("#towns ul"));			
			}
			var addBtn = $("<button class = 'addBtn'>Add Town</button>");
			addBtn.data.results;
			addBtn.click(showAddField);
			addBtn.appendTo($('#listTowns'));
		}
		
		function showAddField() 
		{
			
			$('.addBtn').hide();
			var country = $(this).data('country');
			var addInput = $('<input type="text" class="addInput">');
			var submit = $('<input type="submit" value="Add" class="addInput">');
			var cancel = $('<input type="submit" value="Cancel" class="addInput">');
			cancel.click(function(){$('.addBtn').show();$(this).parent().remove();});
			
			$(this).parent().append($('<span id = "adder">').append(addInput).append(submit).append(cancel));
			
			var typeString="";
			if($(this).parent().parent().attr("id")== "towns")
			{
				submit.click(addTown);					
			}
			else
			{
				submit.click(addCountry);
			}
//TOASK			 How to add the country objectId?
			function addTown()
					{
					
					var newTown = addInput.val();
					$.ajax({
					method: "POST",
					headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY
					},
					data: JSON.stringify({
						"name": newTown,
						"country" : {
						"__type": "Pointer",
						"className": "Country",
						"objectId": country.objectId  // ???
					}}),
					url: "https://api.parse.com/1/classes/Town/"
					});
					alert(newTown + " added");	
					location.reload();
					}
			function addCountry()
			{
				
				var newCountry = addInput.val();
				$.ajax({
				method: "POST",
				headers: {
				"X-Parse-Application-Id": PARSE_APP_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
				},
				data: JSON.stringify({"name":newCountry}),
				url: "https://api.parse.com/1/classes/Country/"
				});
				alert(newCountry+" added");
				//uncomment if location.reload() is not recommended 
				//$('#listCountries').append(newCountry+" added");
				//$('#addBtn').show();
				//$('.addInput').remove();	
				location.reload();
			}
			
		}
		
		function showEditField() 
		{
			//edit only one at a time
			$('.editBtn').hide();
			var country = "";
			var town = "";
			var editInput = $('<input type="text" class="editInput">');
			var submit = $('<input type="submit" value="Edit" class="editInput">');
			var cancel = $('<input type="submit" value="Cancel" class="editInput">');
			cancel.click(function(){$('.editBtn').show();$(this).parent().remove();});
			
			if($(this).parent().parent().attr("id")== "listTowns")
			{		
				submit.click(townEditor);
				town = $(this).data('town');
			}
			else
			{
				country = $(this).data('country');
				submit.click(countryEditor);
			}
			function townEditor()
			{
				var editTown = editInput.val();
				$.ajax({
				method: "PUT",
				headers: {
				"X-Parse-Application-Id": PARSE_APP_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
				},
				data: JSON.stringify({"name":editTown}),
				url: "https://api.parse.com/1/classes/Town/"+town.objectId
				});
				alert(town.name +" edited to " + editTown);	
				location.reload();
			}
			
			function countryEditor()
			{
				var editCountry = editInput.val();
				$.ajax({
				method: "PUT",
				headers: {
				"X-Parse-Application-Id": PARSE_APP_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
				},
				data: JSON.stringify({"name":editCountry}),
				url: "https://api.parse.com/1/classes/Country/"+country.objectId
				});
				alert(country.name +" edited to " + editCountry);	
				location.reload();
			}
			//
			$(this).parent().append($('<span id = "editor">').append(editInput).append(submit).append(cancel));
			
		}
		
		function deleteCountry() 
		{
			
			var country = "";
			var town = "";
			if($(this).parent().parent().attr("id")== "listTowns")
			{		
				
				town = $(this).data('town');
				$.ajax({
					method: "DELETE",
					headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY
					},
					url: "https://api.parse.com/1/classes/Town/"+town.objectId
				});
				location.reload();
				alert(town.name +" deleted");
			}
			else
			{
				country = $(this).data('country');
				
				$.ajax({
					method: "DELETE",
					headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY
					},
					url: "https://api.parse.com/1/classes/Country/"+country.objectId
				});
				location.reload();
				alert(country.name +" deleted");
			}
			
			
			
		}			
	})
})();