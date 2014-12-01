'use strict';
(function(){
	$(function(){	
		for ( var j = 1; j < 5; j++ ) {
			var q = j;
			$('#form').append('<div>Question '+q);
			$('#form').append('<div id="question'+q+'">').append('<hr>');
			for ( var i = 1; i < 5; i++ ) {				
				var ans = i;
				var character = 64+i;
				$('#question'+q).append('<input type="radio" class="radiobox" name="question'+q+'" value="q'+q+'a'+ans+'">');
				$('#question'+q).append('<label for="q'+q+'a'+ans+'">&#'+character+'</label>');				
			}
		}
		//add answers to local storage
		$(':radio').each(function(i){
			$('input[name=question'+i+']').change(function(){			
					localStorage.setItem('Ans'+i,$('input[name=question'+i+']:checked').val());
			});
			//select answers given by user on pageLoad
			$('input[name=question'+i+'][value='+localStorage.getItem('Ans'+i)+']').prop( "checked", true );
		});
		//disable clicking
		if(localStorage.getItem('isRunning')=='false')
			{
				$(":radio").attr("disabled", "disabled");
			}			
	})
})();