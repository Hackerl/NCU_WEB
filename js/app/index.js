(function($) {
	'use strict';

    if($.cookie('token') == null){ //如果当前有cookie
      var token = localStorage.getItem("token") //取得cookie
      if(token){
        $.cookie('token', token, { expires: 10 }) //设置cookie
      }
    }
    
	  $('#defend_btn').click(function () {
		$(location).attr('href', 'defend.html');
    });
    
    $('#lost_found_btn').click(function () {
		$(location).attr('href', 'lost_found.html');
    });

    $('#wiki_btn').click(function () {
		$(location).attr('href', 'wiki.html');
    });

    $('#suggest_btn').click(function () {
		$(location).attr('href', 'user.html');
    });

    $('#contact_btn').click(function () {
		$(location).attr('href', 'chat.html');
    });

    $('#introduce_btn').click(function () {
		$(location).attr('href', 'about.html');
    });

    var get_userinfo = function(){
      var callback = function(result){
        
      }
      get_json("/userinfo", callback)
    }
    get_userinfo();
})(jQuery);
