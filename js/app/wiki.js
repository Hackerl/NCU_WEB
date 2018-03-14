(function($) {
	'use strict';

	$('#search_btn').click(function () {
        var keyword = $("#keyword").val()

        var call_back = function(result){
            if(result.error == 0){
                create_questions(result.questions);
            }
        }
		post_json("/searchwiki",{"keyword": keyword}, call_back)
    });

    var create_questions = function(questions){
        $('#wiki_list').empty();
        $.each( questions, function(index, obj){
            var question = $('<div class="am-panel am-panel-default"><div class="am-panel-hd" data-am-collapse="{parent: '#accordion', target: '#do-not-say-1'}"><h4 class="am-panel-title">'+ obj.title +'</h4><span class="am-icon-caret-left"></span></div><div id="do-not-say-1" class="am-panel-collapse am-collapse"><div class="am-panel-bd">'+ obj.content +'</div></div></div>')
            $('#wiki_list').append(question);
        })
    }

    var getallwiki = function(){
        var call_back = function(result){
            if(result.error == 0){
                create_questions(result.questions);
            }
        }
        get_json("/wiki", call_back);
    }
    getallwiki();
})(jQuery);
