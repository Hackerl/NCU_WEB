var post_json = function(post_url, post_data, call_back) {  
	$.ajax({
		type: "POST",
		url: "/api" + post_url,
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(post_data),
		dataType: "json",
		success: function (result) {
			if(result.error == -2){
				$(location).attr('href', '/login.html');
			}
			call_back(result);
		},
		error: function (result) {
		}
	});
}

var get_json = function(get_url, call_back){
	$.getJSON("/api"+ get_url, function(result){
		if(result.error == -2){
			$(location).attr('href', '/login.html');
		}
		call_back(result);
	});
}
