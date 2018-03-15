(function ($) {
    'use strict';

    //添加图标绑定
    $('#add_wiki_btn').click(function () {
        $('#add_question_title').val("");
        $('#add_question_content').val("");
        var $modal = $('#add-question-prompt');
        $modal.modal();
    });
    

    //添加问题确定按钮
    $('#add_wiki_submit_btn').click(function () {

        var question_title = $('#add_question_title').val();
        var question_content = $('#add_question_content').val();

        var call_back = function (result) {
            if (result.error == 0) {

            } else {

            }
        }
        //更新issue
        post_json("/newwiki", { "title": question_title, "content": question_content }, call_back);
    });

    var admin_get_all_questions = function () {  //获取全部wiki
        var call_back = function (result) {
            if (result.error == 0) {
                $.each(result.questions, function (index, obj) {
                    var question = $('<tr><td data-id="' + obj.id + '">' + obj.title + '</td><td><button type="button" class="am-btn am-btn-success">查看</button><button type="button" class="am-btn am-btn-warning">删除</button></td></tr>')
                    $('#wiki_list').append(question);
                }) // 显示所有wiki

                //绑定删除wiki按钮
                $('#wiki_list').find('.am-btn-warning').click(function () {
                    $('#delete-question-confirm').modal({
                        relatedTarget: this,
                        onConfirm: function (e) {
                            var questionid = $($(this.relatedTarget).parent().parent().children()[0]).data('id')
                            var call_back = function (result) {
                                if (result.error == 0) {

                                } else {

                                }
                            }
                            post_json("/delwiki", { "questionid": questionid }, call_back); //删除wiki
                        },
                        onCancel: function (e) {
                        }
                    });
                });

                //绑定查看按钮
                $('#wiki_list').find('.am-btn-success').click(function () {
                    var $btn = $(this)
                    var questionid =  $($btn.parent().parent().children()[0]).data('id')
                    var $modal = $('#show-question-modal');
                    $modal.modal();

                    var call_back = function (result) {
                        if (result.error == 0) {
                            $('#question_content').text(result.content);
                        } else {

                        }
                    }
                    //查看question
                    post_json("/querywiki", { "questionid": questionid }, call_back);
                });
            }

        }

        get_json("/allwiki", call_back);
    }
    admin_get_all_questions();

})(jQuery);
