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
	$('.nav-item').removeClass('active');
	if(type == "userList"){
		$('#allUserTable').show();
		$('#dashBoardHead').hide();
		$('#chatContainer').hide();
		$('#DirMsg').addClass('active');
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
	$('.nav-item').removeClass('active');
	$('#conv_'+convID).addClass('active');
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

	socket.emit('get_conversation_history', activeConversation, function(res){
		$.each(res, function(k,v){
			drawMsg(v);
		});
	});

}


function writeMsg(e){
		var messageText = $('#writeMsgInput').val();
		var keyCode = 'which' in e ? e.which : e.keyCode;
		if(keyCode == 13){
			if($('#writeMsgInput').val() !== ''){
				var data = {
					conversation_id : activeConversation,
					msg_body: messageText,
					msg_sender_id : user_id,
					msg_sender_name : user_name,
					nsg_sender_img : user_avatar

				}
				console.log(data);
				socket.emit('sendMessage', data, (res)=>{
					console.log(res);
					drawMsg(res);
					$('#writeMsgInput').val('');
					var scrollHeight = $(".chat-block").get(0).scrollHeight;
					$(".chat-block").animate({ scrollTop: scrollHeight });
				});
				
			}
		}
};


function drawMsg(data){
	var html  = '<div class="row" id="msg_'+data.message_id+'">';
		html += '	<div class="col-sm-1">';
		html += '		<img class="img-avatar img-avatar-48" src="/usersImg/'+data.msg_sender_img+'" alt="User profile pic">';
		html += '	</div>';
		html += '	<div class="col-sm-11">';
		html += '		<div class="row">';
		html += '			<h3 class="msg-sendar-name">'+data.msg_sender_name+'</h3>';
		html += '			<p>'+data.msg_body+'</p>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		
	$('.chat-block').append(html);
}


socket.on('newMessage', function(data){
	if(activeConversation == data.conversation_id){
		if(user_id !== data.msg_sender_id){
			drawMsg(data);
			var scrollHeight = $(".chat-block").get(0).scrollHeight;
			$(".chat-block").animate({ scrollTop: scrollHeight });
		}
	}
});

