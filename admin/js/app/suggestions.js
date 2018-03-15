(function ($) {
    'use strict';

    var admin_get_all_suggestions = function () {  //获取全部suggestions
        var call_back = function (result) {
            if (result.error == 0) {
                $.each(result.suggestions, function (index, obj) {
                    var suggestion = $('<tr><td>' + obj.id + '</td><td>' + obj.title + '</td><td><button type="button" class="am-btn am-btn-success">查看</button></td></tr>')
                    $('#suggetion_table').append(suggestion);
                }) // 显示所有意见

                //绑定查看按钮
                $('#suggetion_list').find('.am-btn-success').click(function () {
                    var $btn = $(this)
                    var suggestid = $btn.parent().parent().children()[0].innerText
                    var $modal = $('#show-suggestion-modal');
                    $modal.modal();

                    var call_back = function (result) {
                        if (result.error == 0) {
                            $('#suggestion_content').text(result.content);
                        } else {

                        }
                    }
                    //查询意见内容
                    post_json("/admin_query_suggestion", { "suggestid": suggestid }, call_back);
                });
            }

        }

        get_json("/admin_all_suggestions", call_back);
    }
    admin_get_all_suggestions();

})(jQuery);

