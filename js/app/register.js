(function($) {
	'use strict';

	$('#register_btn').click(function () {
		var username = $("#username").val()
        var password = $("#password").val()
        var password_confirm = $("#password_confirm").val()
        var email = $("#email").val()
        
        var call_back = function(result){
            $(location).attr('href', 'login.html');
        }
		post_json("/register",{"username": username, "password": password, "email": email}, call_back)
	});
})(jQuery);