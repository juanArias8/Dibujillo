var messaggesArea = $("#messaggesArea");
var message = $("#message");
var btnSendMessage = $("#btnSendMessage");


btnSendMessage.on("click", function(){
	var messageVal = message.val();
	if(messageVal != "" && typeof messageVal != "undefined"){
		messaggesArea.append(`<div class="messageInArea">
								<small class="textMessageInArea">
									<strong>${nombreVal} : </strong>
									${messageVal}
								</small>
							<div>`);
		message.val("");
		jsonMessage = {"nombre": nombreVal, "message": messageVal};
		sendText(JSON.stringify(jsonMessage));
	} else{
		alert("Debes ingresar un mensage");
		message.val("");
	}
});