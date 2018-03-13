(function($) {
	'use strict';

	$('#defend_btn').click(function () {
		$(location).attr('href', 'defend.html');
    });
    
    $('#lost_found_btn').click(function () {
		$(location).attr('href', 'login.html');
    });

    $('#wiki_btn').click(function () {
		$(location).attr('href', 'wiki.html');
    });

    $('#suggest_btn').click(function () {
		$(location).attr('href', 'suggest.html');
    });

    $('#contact_btn').click(function () {
		$(location).attr('href', 'chat.html');
    });

    $('#introduce_btn').click(function () {
		$(location).attr('href', 'login.html');
    });

    $('#user_btn').click(function () {
		$(location).attr('href', 'user.html');
    });

    $('#sendmessage_btn').click(function () {
		$(location).attr('href', 'chat.html');
    });

    var get_userinfo = function(){
      var callback = function(result){
        
      }
      get_json("/userinfo", callback)
    }
    //get_userinfo();
})(jQuery);
