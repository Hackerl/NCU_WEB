(function($) {
	'use strict';

	$('#login_btn').click(function () {
		var $btn = $(this)
		var username = $("#username").val()
		var password = $("#password").val()
	  $btn.button('loading');
	  setTimeout(function(){
	      $btn.button('reset');
		}, 5000);
        var call_back = function(result){
            $(location).attr('href', 'index.html');
        }
		post_json("/login",{"username": username, "password": password}, "ok")
	});
})(jQuery);