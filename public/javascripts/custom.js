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

function startConversation(convID){
	$('#dashBoardHead').hide();
	$('#allUserTable').hide();
	$('#chatContainer').show();
	// console.log(id);

}