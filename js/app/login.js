(function($) {
	'use strict';

	$('#login_btn').click(function () {
		var username = $("#username").val()
		var password = $("#password").val()

		if(username && password){
			var call_back = function(result){
				if(result.error == 0 ){
					var token = $.cookie('token')
					if(token){  //如果返回了cookie
						localStorage.setItem("token", token); //储存cookie
					}
					$(location).attr('href', 'index.html');
				}else{
					var $modal = $('#result-alert');
					$modal.modal();
					$('#post_result_text').text(result.msg);
				}
			}
			post_json("/login",{"username": username, "password": password}, call_back)
		}
	});

	$('#register_btn').click(function () {
        $(location).attr('href', 'register.html');
	});

})(jQuery);