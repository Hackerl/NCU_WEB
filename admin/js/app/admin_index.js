(function($) {
	'use strict';

    if($.cookie('token') == null){ //如果当前有cookie
      var token = localStorage.getItem("token") //取得cookie
      if(token){
        $.cookie('token', token, { expires: 10 }) //设置cookie
      }
    }

	$('#defend_manage_btn').click(function () {
		$(location).attr('href', 'issues.html');
    });
    
    $('#suggestion_box_btn').click(function () {
		$(location).attr('href', 'suggestions.html');
    });

    $('#wiki_btn').click(function () {
		$(location).attr('href', 'wiki.html');
    });

    $('#admin_center_btn').click(function () {
		$(location).attr('href', 'admin_center.html');
    });

    $('#contact_btn').click(function () {
		$(location).attr('href', 'chat.html');
    });

    $('#staff_manage_btn').click(function () {
		$(location).attr('href', 'staffs.html');
    });
})(jQuery);
