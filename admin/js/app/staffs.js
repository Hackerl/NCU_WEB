(function ($) {
    'use strict';

    //添加工作人员按钮
    $('#add_staff_submit_btn').click(function () {

        var staff_name = $('#staff_name').val();
        var staff_email = $('#staff_email').val();

        var call_back = function (result) {
            if (result.error == 0) {

            } else {

            }
        }
        //更新issue
        post_json("/admin_addstaff", { "name": staff_name, "email": staff_email }, call_back);
    });


    var admin_get_all_staffs = function () {  //获取全部员工
        var call_back = function (result) {
            if (result.error == 0) {
                $.each(result.staffs, function (index, obj) {
                    var staff = $('<tr><td data-id="'+ obj.id + '">' + obj.name + '</td><td>' + obj.email + '</td><td><button type="button" class="am-btn am-btn-warning">删除</button></td></tr>')
                    $('#staff_list').append(staff);
                }) // 显示所有员工

                //绑定删除按钮
                $('#staff_list').find('.am-btn-warning').click(function () {
                    var $btn = $(this)
                    var staffid = $($btn.parent().parent().children()[0]).data('id')

                    var call_back = function (result) {
                        if (result.error == 0) {

                        } else {

                        }
                    }
                    //查询意见内容
                    post_json("/admin_delstaff", { "staffid": staffid }, call_back);
                });
            }
        }

        get_json("/admin_getstaffs", call_back);
    }
    admin_get_all_staffs();

})(jQuery);