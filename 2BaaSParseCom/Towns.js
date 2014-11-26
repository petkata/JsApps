'use strict';
(function(){
	$(function(){
		$("#towns ul").html('');
			for (var towns in data.results) {
				var town = data.results[towns];
				var townItem = $('<li>');
				townItem.text(town.name);
				//var button = $("<a href='#'>[Vote]</à>");
				/*button.data('answer', answer);
				button.click(voteButtonClicked);
				button.appendTo(answerItem);*/
				townItem.appendTo($("#towns ul"));			
			}
				
	})
})();