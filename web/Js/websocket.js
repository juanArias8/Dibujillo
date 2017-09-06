var wsUri = "ws://" + document.location.host + document.location.pathname + "tablero";
var websocket = new WebSocket(wsUri);

websocket.onerror = function (evt) {
    onError(evt);
};

websocket.onmessage = function (evt) {
    onMessage(evt);
};

websocket.onopen = function (evt) {
    onOpen(evt);
};

websocket.onclose = function(evt){
    onClose(evt);
};

function onError(evt) {
    console.log(evt.data);
}

function onOpen() {
    console.log("Connected to:" + wsUri);
}

function onClose(){
    console.log("Disconected from: " + wsUri);
}

function onMessage(evt) {
    console.log('Received ==>' + evt.data); 
    var jsonReceived = JSON.parse(evt.data);
    var keys = Object.keys(jsonReceived);
    if(keys.length == 5){
        var i = 0;
        for (var prop in jsonReceived){
            nombres[i] = jsonReceived[prop];
            i++;
        }
        drawPlayer(evt.data);
        initGame();
    }
    var option = keys[1];
    if(option == "x"){
        draw(evt.data);
    } else if(option == "message"){
        drawMessage(evt.data);
    } else if(option == "word"){
        drawWord(evt.data);
    } else if (option == "score") {
        nombres.push(jsonReceived.nombre);
        if(nombres.length == 5){
           loadPlayers();
        }
    } else if(option == "palabra"){
        verificarPartida(evt.data);
    }
}

function sendText(json) {
    console.log("sending text: " + json);
    websocket.send(json);
}
