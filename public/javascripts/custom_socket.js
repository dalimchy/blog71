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
