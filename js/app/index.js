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
		$(location).attr('href', 'contact.html');
    });

    $('#introduce_btn').click(function () {
		$(location).attr('href', 'login.html');
    });

<<<<<<< HEAD:js/index.js
    $('#user_btn').click(function () {
		$(location).attr('href', 'user.html');
    });

    $('#sendmessage_btn').click(function () {
		$(location).attr('href', 'contact.html');
    });

=======
    var get_userinfo = function(){
      var callback = function(result){
        
      }
      get_json("/userinfo", callback)
    }
    //get_userinfo();
>>>>>>> d3c30a9c1958204a603ba4afa6b6a8a5142e845f:js/app/index.js
})(jQuery);
