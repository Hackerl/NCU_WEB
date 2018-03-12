(function($) {
	'use strict';

	$('#search_btn').click(function () {
		var keyword = $("#keyword").val()

        var call_back = function(result){
            alert(result);
        }
		post_json("/searchwiki",{"keyword": keyword}, call_back)
    });

    var show_question = function(){
        var $question = $(this)
        var questionid = $question.id

        var call_back = function(result){
            alert(result);
        }
        post_json("http://127.0.0.1:5000/querywiki",{"questionid": questionid}, call_back)
    }

    (function(){
        var call_back = function(result){
        alert(result);
        }
        get_json("http://127.0.0.1:5000/wiki", call_back);
    })();

})(jQuery);