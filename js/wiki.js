(function($) {
	'use strict';

  $('.am-panel-hd').click(function () {
    $(".am-panel-hd").attr("class","am-panel-hd");
		$(this).attr("class",' am-panel-hd am-panel-bd-hover');
    $(".am-panel-bd-display").attr("class",'am-panel-bd')
    $(this).next().attr("class",'am-panel-bd-display')
    $('i.am-icon-angle-down').attr("class",'am-icon-angle-right am-icon-fw')
    $(this).children().children().attr("class",'am-icon-angle-down am-icon-fw')
    });

  })(jQuery);
