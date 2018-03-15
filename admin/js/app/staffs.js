(function ($) {
    'use strict';

    //添加人员图标绑定
    $('#add_staff_btn').click(function () {
        $('#staff_name').val("");
        $('#staff_email').val("");
        var $modal = $('#add-staff-prompt');
        $modal.modal();
    });

    //添加工作人员确定按钮
    $('#add_staff_submit_btn').click(function () {
        var staff_name = $('#staff_name').val();
        var staff_email = $('#staff_email').val();

        var call_back = function (result) {
            if (result.error == 0) {
                var staff = $('<tr><td data-id="' + result.id + '">' + result.name + '</td><td>' + result.email + '</td><td><button type="button" class="am-btn am-btn-warning">删除</button></td></tr>')
                $('#staff_list').append(staff);
                del_btn_click_event(staff.find('.am-btn-warning'));
            } else {

            }
        }
        //更新issue
        post_json("/admin_addstaff", { "name": staff_name, "email": staff_email }, call_back);
    });

    var del_btn_click_event = function (element) {
        element.click(function () {
            $('#delete-staff-confirm').modal({
                relatedTarget: this,
                onConfirm: function (e) {
                    var staffid = $($(this.relatedTarget).parent().parent().children()[0]).data('id')
                    var row = $(this.relatedTarget).parent().parent();
                    var call_back = function (result) {
                        if (result.error == 0) {
                            row.remove();
                        } else {
                        }
                    }
                    post_json("/admin_delstaff", { "staffid": staffid }, call_back);
                },
                onCancel: function (e) {
                }
            });
        });
    }


    var admin_get_all_staffs = function () {  //获取全部员工
        var call_back = function (result) {
            if (result.error == 0) {
                $.each(result.staffs, function (index, obj) {
                    var staff = $('<tr><td data-id="' + obj.id + '">' + obj.name + '</td><td>' + obj.email + '</td><td><button type="button" class="am-btn am-btn-warning">删除</button></td></tr>')
                    $('#staff_list').append(staff);
                }) // 显示所有员工

                //绑定删除按钮
                del_btn_click_event($('#staff_list').find('.am-btn-warning'));
            }
        }

        get_json("/admin_getstaffs", call_back);
    }
    admin_get_all_staffs();

})(jQuery);