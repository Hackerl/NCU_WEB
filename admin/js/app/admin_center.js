(function ($) {
    'use strict';

    //获取用户信息
    $(function () {
        var callback = function (result) {
            if (result.error == 0) {
                $('#head_picture').attr('src', result.head);
                $('#show_head_picture_btn').attr('href', result.head);
                $('#username').val(result.username)
                $('#email').val(result.email)
                $('#phone').val(result.phone)
            }
        }
        get_json("/userinfo", callback);
    })

    $(function () { //上传按钮
        $('#upload_btn').upload({
            header: {
                url: '/api/upload',
                complete: function (res) {
                    var result = res.responseJSON;
                    if (result.error == 0) {
                        $('#sethead_btn').click(function () {   //绑定确定按钮
                            var call_back = function (result_j) {
                            }
                            post_json("/sethead", { "head_url": result.picture_url }, call_back);
                        })
                    } else {//上传失败 显示悬浮窗
                        var $modal = $('#result-alert');
                        $modal.modal();
                        $('#post_result_text').text(result.msg);
                    }
                },
                error: function (res) {
                    console.log(res)
                }
            }
        })
    })


    $('#reset_password_btn').click(function () { //确认重置密码按钮
        var oldpassword = $("#oldpassword").val()
        var newpassword = $("#newpassword").val()
        var newpassword_confirm = $("#newpassword_confirm").val()

        if (oldpassword && newpassword) {
            var $modal = $('#result-alert');  //结果悬浮窗
            $modal.modal();

            if (newpassword == newpassword_confirm) {
                var call_back = function (result) {
                    if (result.error == 0) {
                        $('#post_result_text').text("修改成功");
                    } else {
                        $('#post_result_text').text(result.msg);
                    }
                }
                post_json("/resetpwd", { "oldpassword": oldpassword, "newpassword": newpassword }, call_back);
            } else {
                $('#post_result_text').text("密码不一致");
            }
        }
    });

    $('#set_info_btn').click(function () { //设置用户信息按钮
        var username = $("#username").val()
        var email = $("#email").val()
        var phone = $("#phone").val()

        if (username && email && phone) {
            var $modal = $('#result-alert');  //结果悬浮窗
            $modal.modal();

            var call_back = function (result) {
                if (result) {
                    $('#post_result_text').text("修改成功");
                } else {
                    $('#post_result_text').text(result.msg);
                }
            }
            post_json("/setinfo", { "username": username, "email": email, "phone": phone }, call_back);
        }
    });

})(jQuery);
