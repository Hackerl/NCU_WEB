var my_head = "";
var my_username = "";
var SelectImg = null;

$(function () {
    var callback = function (result) {
        if (result.error == 0) {
            my_head = result.head;
            my_username = result.username;
        }
    }
    get_json("/userinfo", callback);
})

var get_nowtime = function () {
    function p(s) {
        return s < 10 ? '0' + s : s;
    }
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)

    var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m)
    return now;
}


var initwindows = function () {
    function screenFuc() {
        var topHeight = $(".chatBox-head").innerHeight();//聊天头部高度
        //屏幕小于768px时候,布局change
        var winWidth = $(window).innerWidth();
        if (winWidth <= 768) {
            var totalHeight = $(window).height(); //页面整体高度
            $(".chatBox-info").css("height", totalHeight - topHeight);
            var infoHeight = $(".chatBox-info").innerHeight();//聊天头部以下高度
            //中间内容高度
            $(".chatBox-content").css("height", infoHeight - 46);
            $(".chatBox-content-demo").css("height", infoHeight - 46);

            $(".chatBox-list").css("height", totalHeight - topHeight);
            $(".chatBox-kuang").css("height", totalHeight - topHeight);
            $(".div-textarea").css("width", winWidth - 106);
        } else {
            $(".chatBox-info").css("height", 495);
            $(".chatBox-content").css("height", 448);
            $(".chatBox-content-demo").css("height", 448);
            $(".chatBox-list").css("height", 495);
            $(".chatBox-kuang").css("height", 495);
            $(".div-textarea").css("width", 260);
        }
    }
    screenFuc();
    (window.onresize = function () {
        screenFuc();
    })();
}

var init_chatBox_click = function () {
    //打开/关闭聊天框
    $(".chat-close").click(function () {
        history.go(-1);
    })

}


var show_msg_my = function (msg) {
    $(".chatBox-content-demo").append('<div class="clearfloat"><div class="author-name"><small class="chat-date">' + msg.send_time + '</small></div><div class="right"><div class="chat-message">' + msg.content + '</div><div class="chat-avatars"><img src="' + msg.head + '" alt="头像" /></div></div></div>');
}
var show_msg_other = function (msg) {
    $(".chatBox-content-demo").append('<div class="clearfloat"><div class="author-name"><small class="chat-date">' + msg.send_time + '</small></div><div class="left"><div class="chat-avatars"><img src="' + msg.head + '" alt="头像"></div><div class="chat-message">' + msg.content + '</div></div></div>');
}

var show_img_my = function (msg) {
    $(".chatBox-content-demo").append('<div class="clearfloat"><div class="author-name"><small class="chat-date">' + msg.send_time + '</small></div><div class="right"><div class="chat-message"><img src="' + msg.content + '"></div><div class="chat-avatars"><img src="' + msg.head + '" alt="头像" /></div></div></div>');
}
var show_img_other = function (msg) {
    $(".chatBox-content-demo").append('<div class="clearfloat"><div class="author-name"><small class="chat-date">' + msg.send_time + '</small></div><div class="left"><div class="chat-avatars"><img src="' + msg.head + '" alt="头像"></div><div class="chat-message"><img src="' + msg.content + '"></div></div></div>');
}


//获取完消息列表后，绑定消息点击事件
var init_chat_list = function () {
    //未读信息数量为空时
    var totalNum = $(".chat-message-num").html();
    if (totalNum == "") {
        $(".chat-message-num").css("padding", 0);
    }
    $(".message-num").each(function () {
        var wdNum = $(this).html();
        if (wdNum == "") {
            $(this).css("padding", 0);
        }
    });

    //进聊天页面
    $(".chat-list-people").each(function () {
        $(this).click(function () {
            var n = $(this).index();
            $(".chatBox-head-one").toggle();
            $(".chatBox-head-two").toggle();
            $(".chatBox-list").fadeToggle();
            $(".chatBox-kuang").fadeToggle();

            //清除旧的消息
            $(".chatBox-content-demo").empty()

            //传名字
            $(".ChatInfoName").text($(this).children(".chat-name").children("p").eq(0).html());

            var chat_id = $(this).data('id');
            //设置聊天室id
            $('#user-chatBox').data("id", chat_id);

            //传头像
            $(".ChatInfoHead>img").attr("src", $(this).children().eq(0).children("img").attr("src"));

            //获取聊天室所有消息

            var getallmsg = function (chatid) {
                var call_back = function (result) {
                    if (result.error == 0) {
                        var my_userid = result.my_userid

                        $.each(result.messages, function (index, msg) {
                            switch (msg.type) {
                                case 0:
                                    if (msg.send_userid == my_userid) {
                                        show_msg_my(msg);
                                    } else {
                                        show_msg_other(msg);
                                    }
                                    break;
                                case 1:
                                    if (msg.send_userid == my_userid) {
                                        show_img_my(msg);
                                    } else {
                                        show_img_other(msg);
                                    }
                                    break;
                            }

                        })
                        //聊天框默认最底部
                        $(document).ready(function () {
                            $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
                        });
                    }
                }
                post_json("/chatroom", { "chatid": chatid }, call_back)
            }
            getallmsg(chat_id);
        })
    });
}

//初始化聊天界面功能
var init_chat_windows = function () {
    //返回列表按钮
    $(".chat-return").click(function () {
        $(".chatBox-head-one").toggle(1);
        $(".chatBox-head-two").toggle(1);
        $(".chatBox-list").fadeToggle(1);
        $(".chatBox-kuang").fadeToggle(1);
    });

    //      发送信息
    $("#chat-fasong").click(function () {
        var textContent = $(".div-textarea").html().replace(/[\n\r]/g, '<br>')
        if (textContent != "") {
            show_msg_my({ "content": textContent, "send_time": get_nowtime(), "head": my_head });

            //发送至服务器
            //获取chatid
            var chatid = $('#user-chatBox').data("id")
            var call_back = function (result) {
                if (result.error == 0) {
                }
            }
            post_json("/sendmsg", { "chatid": chatid, "content": textContent, "type": 0 }, call_back);

            //发送后清空输入框
            $(".div-textarea").html("");
            //聊天框默认最底部
            $(document).ready(function () {
                $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
            });
        }
    });

    //表情按钮 出现悬浮框 发送表情
    $("#chat-biaoqing").click(function () {
        $(".biaoqing-photo").toggle();
    });
    //点击表情框以外的地方 隐藏表情框
    $(document).click(function () {
        $(".biaoqing-photo").css("display", "none");
    });
    $("#chat-biaoqing").click(function (event) {
        event.stopPropagation();//阻止事件
    });


    //表情发送事件绑定
    $(".emoji-picker-image").each(function () {
        $(this).click(function () {
            var bq = $(this).parent().html();
            console.log(bq)
            $(".chatBox-content-demo").append("<div class=\"clearfloat\">" +
                "<div class=\"author-name\"><small class=\"chat-date\">2017-12-02 14:26:58</small> </div> " +
                "<div class=\"right\"> <div class=\"chat-message\"> " + bq + " </div> " +
                "<div class=\"chat-avatars\"><img src=\"img/icon01.png\" alt=\"头像\" /></div> </div> </div>");
            //发送后关闭表情框
            $(".biaoqing-photo").toggle();
            //聊天框默认最底部
            $(document).ready(function () {
                $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
            });
        })
    });

    //发送图片
    SelectImg = function selectimg(pic) {
        if (!pic.files || !pic.files[0]) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            var images = evt.target.result;
            console.log(images)
            $(".chatBox-content-demo").append("<div class=\"clearfloat\">" +
                "<div class=\"author-name\"><small class=\"chat-date\">2017-12-02 14:26:58</small> </div> " +
                "<div class=\"right\"> <div class=\"chat-message\"><img src=" + images + "></div> " +
                "<div class=\"chat-avatars\"><img src=\""+ my_head +"\" alt=\"头像\" /></div> </div> </div>");
            //聊天框默认最底部
            $(document).ready(function () {
                $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
            });
        };
        console.log(pic.files[0])
        reader.readAsDataURL(pic.files[0]);

        var formData = new FormData();
        formData.append('file', pic.files[0]);  //添加图片信息的参数
        $.ajax({
            url: '/api/upload',
            type: 'POST',
            cache: false, //上传文件不需要缓存
            data: formData,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            success: function (result) {
                if (result.error == 0) {
                    var call_back = function (result_r) {
                    }
                    var chatid = $('#user-chatBox').data("id")
                    post_json("/sendmsg", { "chatid": chatid, "content": result.picture_url, "type": 1 }, call_back);
                } else {
                }
            },
            error: function (result) {
                tipTopShow("上传失败");
            }
        })
    }
}

var get_chat_list = function () {
    var call_back = function (result) {
        if (result.error == 0) {
            $.each(result.chats, function (index, obj) {
                if(obj.new_num == 0){
                    new_msg_num = ""
                }else{
                    new_msg_num = obj.new_num
                }
                var chat = $('<div data-id="' + obj.chatroom.id + '" class="chat-list-people"><div><img src="' + obj.head + '" alt="头像"></div><div class="chat-name"><p>' + obj.name + '</p></div><div class="message-num">'+ new_msg_num +'</div></div>')
                $('#chatroom_list').append(chat);
            })
            init_chat_list() // 获取全部聊天消息 并列出后 绑定每个私信点击事件
        }
    }
    get_json("/messages", call_back);
}

initwindows()  //初始化窗口界面
init_chatBox_click()  //绑定关闭 开启主界面按钮
get_chat_list(); //获取用户聊天信息

init_chat_windows() // 初始化聊天界面