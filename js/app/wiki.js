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

    /*
    var show_question = function(){
        var $question = $(this)
        var questionid = $question.id

        var call_back = function(result){
            alert(result);
        }
        post_json("http://127.0.0.1:5000/querywiki",{"questionid": questionid}, call_back)
    }*/

    var create_questions = function(questions){
        $('#wiki_list').empty();
        $.each( questions, function(index, obj){
            var question = $('<li class="am-panel-li"><div class="am-panel-wrap"><div class="am-panel-hd">'+ obj.title +' <span class="am-fr"><i class="am-icon-angle-right am-icon-fw"></i><i class="am-icon-angle-down am-icon-fw"></i></span></div><div class="am-panel-bd"><div class="am-article-bd">'+ obj.content +'</div></div></div></li>')
            $('#wiki_list').append(question);
        })

        $('.am-panel-hd').click(function () {
            $(this).next().toggle(10);
            $(this).children().children().toggle();
            $(".am-panel-hd").attr("class","am-panel-hd");
                $(this).attr("class",' am-panel-hd am-panel-bd-hover');
            // $(".am-panel-bd-display").attr("class",'am-panel-bd')
            // $(this).next().attr("class",'am-panel-bd-display')
            // $('i.am-icon-angle-down').attr("class",'am-icon-angle-right am-icon-fw')
            // $(this).children().children().attr("class",'am-icon-angle-down am-icon-fw')
        });
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
