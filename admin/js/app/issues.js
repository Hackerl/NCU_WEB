(function ($) {
    'use strict';

    var admin_get_all_issues = function () {  //获取全部issue
        var call_back = function (result) {
            if (result.error == 0) {
                $.each(result.issues, function (index, obj) {
                    switch (obj.status) {
                        case 0:
                            var issue = $('<tr><td>' + obj.id + '</td><td>' + obj.title + '</td><td><button type="button" class="am-btn am-btn-success">查看</button><button type="button" class="am-btn am-btn-primary">处理</button><button type="button" class="am-btn am-btn-warning">删除</button></td></tr>')
                            $('#issues_table_waiting').append(issue);
                            break;
                        case 1:
                            var issue = $('<tr><td>' + obj.id + '</td><td>' + obj.title + '</td><td><button type="button" class="am-btn am-btn-success">查看</button><button type="button" class="am-btn am-btn-primary">处理</button><button type="button" class="am-btn am-btn-warning">删除</button></td></tr>')
                            $('#issues_table_working').append(issue);
                            break;
                        case 2:
                            var issue = $('<tr><td>' + obj.id + '</td><td>' + obj.title + '</td><td><button type="button" class="am-btn am-btn-success">查看</button><button type="button" class="am-btn am-btn-primary">处理</button><button type="button" class="am-btn am-btn-warning">删除</button></td></tr>')
                            $('#issues_table_finish').append(issue);
                            break;
                        default:
                            break;
                    }
                }) // 显示所有issue

                //绑定删除issue按钮
                $('#issues_list').find('.am-btn-warning').click(function () {
                    $('#delete-issue-confirm').modal({
                        relatedTarget: this,
                        onConfirm: function (e) {
                            var issueid = $(this.relatedTarget).parent().parent().children()[0].innerText;
                            var call_back = function (result) {
                                if (result.error == 0) {

                                } else {

                                }
                            }
                            post_json("/admin_delissue", { "issueid": issueid }, call_back); //删除issue
                        },
                        onCancel: function (e) {
                        }
                    });
                });

                //绑定处理按钮
                $('#issues_list').find('.am-btn-primary').click(function () {
                    var $btn = $(this)
                    var issueid = $btn.parent().parent().children()[0].innerText
                    var $modal = $('#update-issue-prompt');
                    $modal.modal();

                    //绑定确定按钮 更新issue
                    $('#update_issue_btn').click(function () {

                        var update_status = $('#update_status').val();
                        var update_comment = $('#update_comment').val();

                        var call_back = function (result) {
                            if (result.error == 0) {

                            } else {

                            }
                        }
                        //更新issue
                        post_json("/updateissue", { "status": update_status, "comment": update_comment, "issueid": issueid }, call_back);
                    });
                });

                //绑定查看按钮
                $('#issues_list').find('.am-btn-success').click(function () {
                    var $btn = $(this)
                    var issueid = $btn.parent().parent().children()[0].innerText
                    var $modal = $('#show-issue-modal');
                    $modal.modal();

                    var call_back = function (result) {
                        if (result.error == 0) {
                            $('#issue_content').text(result.content);
                        } else {

                        }
                    }
                    //更新issue
                    post_json("/getissue", { "issueid": issueid }, call_back);
                });
            }

        }

        get_json("/allissues", call_back);
    }
    admin_get_all_issues();

})(jQuery);
