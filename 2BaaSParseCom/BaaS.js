'use strict';
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
				}).success(function(data) 
					{
						for (var countries in data.results) 
						{
							var country = data.results[countries];
							var countryName = $('<li>');
							//countryName.text(country.name+" ");
							var countryLink = $("<a href='#'>").text(country.name);
							$(countryLink).data('country', country);
							countryLink.click(countryClicked);
							countryName.append(countryLink).prepend('<p>');
							countryName.append("&ensp;");
							var editBtn = $("<button class = 'editBtn'>Edit</button>");
							editBtn.data('country', country);
							editBtn.click(showEditField);
							editBtn.appendTo(countryName);
							var deleteBtn = $("<button>Delete</button>");
							deleteBtn.data('country', country);
							deleteBtn.click(deleteCountry);
							deleteBtn.appendTo(countryName);
							countryName.appendTo($("#listCountries")).append('<p>');
						}
						var addBtn = $("<button id = 'addBtn'>Add Country</button>");
					    addBtn.click(showAddField);
						addBtn.appendTo($('#listCountries'));
					}
				).error(function() 
					{
						alert('Cannot load countries!');
					});
		
		function countryClicked() {
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
			$.getScript("Towns.js");
			
		}
		
		function showAddField() 
		{
			$('#addBtn').show();
			
			var addInput = $('<input type="text" class="addInput">');
			var submit = $('<input type="submit" value="Add" class="addInput">');
			submit.click(addCountry);
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
			$('#listCountries').append(addInput).append(submit);
		}
		
		function showEditField() 
		{
			//edit only one at a time
			$('.editBtn').hide();
			var country = $(this).data('country');
			var editInput = $('<input type="text" class="editInput">');
			var submit = $('<input type="submit" value="Edit" class="editInput">');
			var cancel = $('<input type="submit" value="Cancel" class="editInput">');
			cancel.click(function(){$('.editBtn').show();$(this).parent().remove();});
			submit.click(countryEditor);
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
			var country = $(this).data('country');
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
	})
})();