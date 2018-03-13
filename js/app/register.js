(function($) {
	'use strict';

	$('#register_btn').click(function () {
		var username = $("#username").val()
        var password = $("#password").val()
        var password_confirm = $("#password_confirm").val()
        var email = $("#email").val()
        
        var email_r = new RegExp("^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$");
        if(username && password && password_confirm && email){
            if(password == password_confirm){
                if(email_r.test(email)){
                    var call_back = function(result){
                        if(result.error == 0 ){
                            $(location).attr('href', 'login.html');
                        }else{
                            var $modal = $('#result-alert');
                            $modal.modal();
                            $('#post_result_text').text(result.msg);
                        }
                    }
                    post_json("/register",{"username": username, "password": password, "email": email}, call_back);
                }else{ // 邮箱格式不正确
                    
                }
            }else{ // 密码不相同

            }
        }else{ //信息填写不完全

        }
	});
})(jQuery);