var activeConversation = "";
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


function showRightSection(type){
	if(type == "userList"){
		$('#allUserTable').show();
		$('#dashBoardHead').hide();
		$('#chatContainer').hide();
	}
}

function closeRighSection(type){
	if(type == 'chatPage'){
		$('#chatContainer').hide();
		$('#dashBoardHead').show();
		$('body').css('overflow-y', 'auto');
		activeConversation = "";
	}
}

function startConversation(convID){
	$('#dashBoardHead').hide();
	$('#allUserTable').hide();
	$('#chatContainer').show();
	$('body').css('overflow', 'hidden');
	$('.chat-block').html('');
	// console.log(id);
	$('#writeMsgInput').focus();
	var conver_title = $('#conv_'+convID+ ' .user_name').text();
	console.log(conver_title);
	$('#conversation_title').text(conver_title);
	activeConversation = convID;

}


function writeMsg(e){
	console.log(e);
		var messageText = $('#writeMsgInput').val();
		var keyCode = 'which' in e ? e.which : e.keyCode;
		if(keyCode == 13){
			if($('#writeMsgInput').val() !== ''){
				var data = {
					conversation_id : activeConversation,
					msg_body: messageText,
					msg_sender_id : user_id

				}
				console.log(data);
				socket.emit('sendMessage', data, (res)=>{
					console.log(res);

					// $('.chat-block').append(html);
					$('#writeMsgInput').val('');
					var scrollHeight = $(".chat-block").get(0).scrollHeight;
					$(".chat-block").animate({ scrollTop: scrollHeight });
				});
				
			}
		}
});
// function drawMsg (e){
// 	var msgValue = $('#writeMsgInput').val();

// 	var html = '<div class="row">';
// 	html += '<div class="col-sm-1">';
// 	html += '<img class="img-avatar img-avatar-48" src="/usersImg/dalimchy.jpg" alt="User profile pic">';
// 	html += '</div>';
// 	html += '<div class="col-sm-11">';
// 	html += '<div class="row">';
// 	html += '<h3 class="msg-sendar-name">AH Nayeem</h3>';
// 	html += '<p>'+msgValue+'</p>';
// 	html += '</div>';
// 	html += '</div>';
// 	html += '</div>';

// 	var keyCode = 'which' in e ? e.which : e.keyCode;
// 	if(keyCode == 13){
// 		if($('#writeMsgInput').val() !== ''){

// 			$('.chat-block').append(html);
// 			$('#writeMsgInput').val('');
// 			var scrollHeight = $(".chat-block").get(0).scrollHeight;
// 			$(".chat-block").animate({ scrollTop: scrollHeight });
// 		}
// 	}

// }