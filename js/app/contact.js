(function($) {
	'use strict';

    var show_msgs_left = function(msg){ //显示聊天信息
        var question = $('<div class="message"><img class="avatar" src="./img/psb.jpg" /><div class="content"><div class="nickname"><span class="time">'+ msg.send_time +'</span></div><div class="bubble bubble_default left"><div class="bubble_cont"><div class="plain"><pre>'+ msg.content +'</pre></div></div></div></div></div>')
        $('#msg_list').append(question);
    }

    var show_msgs_right= function(msg){
        var question = $('<div class="message me"><img class="avatar" src="./img/psb.jpg" /><div class="content"><div class="nickname"><span class="time">'+ msg.send_time +'</span></div><div class="bubble bubble_primary right no_arrow"><div class="bubble_cont"><div class="plain"><pre>'+ msg.content +'</pre></div></div></div></div></div>')
        $('#msg_list').append(question);
    }

    var getallmsg = function(chat_id){
        var call_back = function(result){
            if(result.error == 0){
                var my_userid = result.my_userid
                $.each(result.messages , function(index, msg){
                    if(msg.send_userid == my_userid){
                        show_msgs_right(msg);
                    }else{
                        show_msgs_left(msg);
                    }
                })
            }
        }
        post_json("/chatroom",{"chatid": chat_id}, call_back)
    }

    var hash_str = window.location.hash
    if(hash_str){ //如果指定了chat id
        var chat_id = parseInt(hash_str.substr(1))

        $('#send_btn').click(function () {
            var msg_box = $("#message")
            var message = msg_box.val()
            msg_box.val("")

            var call_back = function(result){
                if(result.error == 0){
                }
            }
            post_json("/sendmsg",{"chatid": chat_id, "content": content}, call_back)
        });

        getallmsg(chat_id);
    }else{ //默认管理员发送消息
        get_json("/adminchat",function(result){ //获取与管理员所在聊天室id
            if(result.error == 0){

                $('#send_btn').click(function () { //绑定发送消息按钮
                    var msg_box = $("#message")
                    var message = msg_box.val()
                    msg_box.val("")

                    var call_back = function(result){
                        if(result.error == 0){
                            show_msgs_right(result)
                        }
                    }
                    post_json("/sendmsg",{"chatid": result.id, "content": message}, call_back);
                });

                getallmsg(result.id); // 获取聊天室所有消息
            }
        });
        
    }
})(jQuery);
