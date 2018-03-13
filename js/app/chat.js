(function($) {
	'use strict';

    var my_head = "";
    var my_username = "";
    $(function(){
        var callback = function(result){
            if(result.error == 0){
                my_head = result.head;
                my_username = result.username;
            }
        }
        get_json("/userinfo", callback);
    })


	/*发送消息*/
	function send(headSrc,str){
		var html="<div class='send'><div class='msg'><img src="+headSrc+" />"+
		"<p><i class='msg_input'></i>"+str+"</p></div></div>";
		upView(html);
	}
	/*接受消息*/
	function show(headSrc,str){
		var html="<div class='show'><div class='msg'><img src="+headSrc+" />"+
		"<p><i class='msg_input'></i>"+str+"</p></div></div>";
		upView(html);
	}
	/*更新视图*/
	function upView(html){
		$('.message').append(html);
		$('body').animate({scrollTop:$('.message').outerHeight()-window.innerHeight},200)
	}
	function sj(){
		return parseInt(Math.random()*10)
	}
	$(function(){
		$('.footer').on('keyup','input',function(){
			if($(this).val().length>0){
				$(this).next().css('background','#114F8E').prop('disabled',true);
			
			}else{
				$(this).next().css('background','#ddd').prop('disabled',false);
			}
		})
	})

	/*测试数据*/
	/*
	var arr=['我是小Q','好久没联系了！','你在想我么','怎么不和我说话','跟我聊会天吧'];
	var imgarr=['img/touxiang.png','img/touxiangm.png']
	test()
	function test(){
		$(arr).each(function(i){
			setTimeout(function(){
				send("img/touxiang.png",arr[i])
			},sj()*500)
		})
	}
	*/

    var getallmsg = function(chat_id){
        var call_back = function(result){
            if(result.error == 0){
                var my_userid = result.my_userid
                $('#chatroom_users').text( result.chatroom_users);
                $.each(result.messages , function(index, msg){
                    if(msg.send_userid == my_userid){
                        show(msg.head , msg.content);
                    }else{
                        send(msg.head , msg.content);
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
                            show(my_head , result.content);
                        }
                    }
                    post_json("/sendmsg",{"chatid": result.id, "content": message}, call_back);
                });

                getallmsg(result.id); // 获取聊天室所有消息
            }
        });
        
    }
})(jQuery);

