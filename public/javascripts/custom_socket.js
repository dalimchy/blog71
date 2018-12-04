var myAllConversations = [];
var myAllSingleConvUsers = [];

$('#updateGeneralInfo').on('click', function(){
    var data ={
        user_id : user_id,
        userFullname : $('#userFristName').val()+" "+$('#userLastName').val(),
        frist_name : $('#userFristName').val(),
        last_name : $('#userLastName').val(),
        mobile_number : $('#userMobilePhone').val(),
        email_address : $('#userEmailAddress').val(),
        home_address : $('#userHomeAddress').val(),
        about_me : $('#userAboutMe').val()
    };
    if(data.frist_name.length > 1){
        socket.emit('update_profile',data, (res)=>{
            if(res.status == "success"){
                var alertDesign  = '<div class="alert alert-success">';
                    alertDesign +=      '<p><strong>Well done! </strong> Profile updated successfully.</p>';
                    alertDesign += '</div>';
                $('#userFristName').val(res.result.frist_name);
                $('#userLastName').val(res.result.last_name);
                $('#userMobilePhone').val(res.result.phone);
                $('#userHomeAddress').val(res.result.home_address);
                $('#userAboutMe').val(res.result.about_me);
                $('#userFullNameTop .user_name').text(res.result.name);
                $('#alertMessage').html("");
                $('#alertMessage').append(alertDesign);
                setTimeout(function() {
                    $('#alertMessage').html("");
                }, 3000);
            }else{
                console.log(res);
            }
        });
    }else{
        var alertDesign  = '<div class="alert alert-warning">';
            alertDesign +=      '<p><strong>Warning! </strong>Name field is required.</p>';
            alertDesign += '</div>';

        $('#alertMessage').html("");
        $('#alertMessage').append(alertDesign);
        setTimeout(function() {
            $('#alertMessage').html("");
        }, 3000);
    }
    
});

$(function(){
    var myAllconv = $('.conversations_Sidebar');
    $.each(myAllconv, function(k,v){
        myAllConversations.push($(v).attr('data-conv-id'));
        myAllSingleConvUsers.push($(v).attr('data-user-id'));
        $('#totalConversation').text(myAllConversations.length);
    });
});


var openConversation = (id)=>{

    var participantsUser = [user_id, id];
    console.log(participantsUser);
    var data = {
        participants : participantsUser,
        conversation_type: 'single',
        create_by :user_id
    };

    if(myAllSingleConvUsers.indexOf(id) !== -1){
        console.log('Conversation already exists');
    }else{
        socket.emit('create_conversation', data,function(res){
            console.log(res);
            myAllSingleConvUsers.push(res.conversation_id);
            myAllSingleConvUsers.push(id);
            $.each(allUserData, function(k,v){
                    if(v._id == id){
                        var design = ' <li onclick="startConversation(\''+res.conversation_id+'\')" class="nav-item conversations_Sidebar" id="conv_'+res.conversation_id+'" data-name="'+v.name+'" data-conv-id="'+res.conversation_id+'" data-user-id="'+id+'" data-conv-type="'+res.conv_type+'" data-tm="'+res.participants.length+'">';
                            design +=      '<a>'
                            design +=           '<i class="fa fa-circle" style="color: rgb(125, 200, 85); font-size: 14px !important; line-height: 19px !important"></i>';
                            design +=           '<span class="user_name">'+v.name+'</span>';
                            design +=      '</a>';
                            design +=  '</li>';

                            $('#directMsgList').prepend(design);
                    }
            });
        });
    }


}


socket.on('newConversation', function(res){
    if(!$('#conv_'+res.conversation_id).is(':visible')){
        if(res.participants.indexOf(user_id) !== -1){
            $.each(res.participants, function(ka,va){
                if(va !== user_id){
                    myAllSingleConvUsers.push(va);
                    myAllSingleConvUsers.push(res.conversation_id);
                    $.each(allUserData, function(k,v){
                        if(v._id == va){
                                var design = ' <li onclick="startConversation(\''+res.conversation_id+'\')" class="nav-item conversations_Sidebar" id="conv_'+res.conversation_id+'" data-name="'+v.name+'" data-conv-id="'+res.conversation_id+'" data-user-id="'+va+'" data-conv-type="'+res.conv_type+'" data-tm="'+res.participants.length+'">';
                                    design +=      '<a>'
                                    design +=           '<i class="fa fa-circle" style="color: rgb(125, 200, 85); font-size: 14px !important; line-height: 19px !important"></i>';
                                    design +=           '<span class="user_name">'+v.name+'</span>';
                                    design +=      '</a>';
                                    design +=  '</li>';
        
                                    $('#directMsgList').prepend(design);
                            }
                    });
                }
            });

        }
    }
});