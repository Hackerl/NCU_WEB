(function($) {
	'use strict';

	$('#login_btn').click(function () {
		var username = $("#username").val()
		var password = $("#password").val()

        var call_back = function(result){
            $(location).attr('href', 'index.html');
        }
		post_json("/login",{"username": username, "password": password}, call_back)
	});
})(jQuery);