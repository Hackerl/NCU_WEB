(function($) {
	'use strict';

	$('#submit_btn').click(function () {
		var $btn = $(this)
		var title = $("#title").val()
		var content = $("#content").val()

		if(title == "" || content == ""){

		}else{
			var $modal = $('#result-alert');
			$modal.modal();
			var call_back = function(result){
				if(result.error == 0){
					$('#post_result_text').text("提交成功");
					$('#confirm_btn').click(function () {
						$(location).attr('href', 'index.html');
					});
				}else{
					$('#post_result_text').text(result.msg);
				}
			}
			post_json("/newsuggest",{"title": title, "content": content}, call_back);
		}
	}
	);
})(jQuery);