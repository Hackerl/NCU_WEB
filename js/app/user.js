(function($) {
	'use strict';
	$('#user-infochage-btn').click(function(){
	  $(".user-edit-info").css("height",$(document).height());
	  $(".user-edit-info").css("width",$(document).width());
	  $(".user-edit-info").show();
	})

	$('#user-pwdchage-btn').click(function(){
	  $(".user-chage-psw").css("height",$(document).height());
	  $(".user-chage-psw").css("width",$(document).width());
	  $(".user-chage-psw").show();
	})

	$('#cancel_resetpsw_btn').click(function(){
	    $(".user-chage-psw").hide();
	})
	$('#cancel_setinfo_btn').click(function(){
	    $(".user-edit-info").hide();
	})

	$('#reset_password_btn').click(function () { //确认重置密码按钮
		var oldpassword = $("#oldpassword").val()
        var newpassword = $("#newpassword").val()
        var newpassword_confirm = $("#newpassword_confirm").val()

        var call_back = function(result){
            alert(result);
        }
		post_json("/resetpwd",{"oldpassword": oldpassword, "newpassword": newpassword}, call_back);
    });

    $('#set_info_btn').click(function () { //设置用户信息按钮
		var username = $("#username").val()
        var email = $("#email").val()
        var phone = $("#phone").val()

        var call_back = function(result){
            alert(result);
        }
		post_json("/setinfo",{"username": username, "email": email, "phone": phone}, call_back);
    });

    $('#show_issue_info').click(function () {  //查看维权信息
		var issueid = $("#issueid").val()

        var call_back = function(result){
            alert(result);
        }
		post_json("/queryissue", {"issueid": issueid }, call_back);
    });

    $('#show_suggest_info').click(function () { //查看建议信息
		var suggestid = $("#suggestid").val()

        var call_back = function(result){
            alert(result);
        }
		post_json("/querysuggest", {"suggestid": suggestid }, call_back);
    });

    var get_all_suggestions = function(){  //获取全部建议
        var call_back = function(result){
            alert(result);
        }
        get_json("/suggestions", call_back);
    }

    var get_all_issues = function(){  //获取全部维权信息
        var call_back = function(result){
            alert(result);
        }
        get_json("/userissues", call_back);
    }

})(jQuery);
