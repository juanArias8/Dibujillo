var messaggesArea = $("#messaggesArea");
var message = $("#message");
var btnSendMessage = $("#btnSendMessage");


btnSendMessage.on("click", drawMessageClient);

function drawMessageClient(){
	var messageVal = message.val();
	if(messageVal != "" && typeof messageVal != "undefined"){
		messaggesArea.append(`<div class="messageInArea">
								<small class="textMessageInArea">
									<strong>${nombreVal} : </strong>
									${messageVal}
								</small>
							<div>`);
		message.val("");
		var jsonMessage = {"nombre": nombreVal, "message": messageVal};
		sendText(JSON.stringify(jsonMessage));
	} else{
		alert("Debes ingresar un mensage");
		message.val("");
	}
}

function drawMessage(json){
	var json = JSON.parse(json);
	var nombreReceived = json.nombre;
	var messageReceived = json.message;
	messaggesArea.append(`<div class="messageInArea">
								<small class="textMessageInArea">
									<strong>${nombreReceived} : </strong>
									${messageReceived}
								</small>
							<div>`);

}