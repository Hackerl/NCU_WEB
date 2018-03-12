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

    var getallwiki = function(){
        var call_back = function(result){
            alert(result);
        }
        get_json("http://127.0.0.1:5000/wiki", call_back);
    }
    getallwiki();

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


})(jQuery);
