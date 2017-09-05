var wsUri = "ws://" + document.location.host + document.location.pathname + "tablero";
var websocket = new WebSocket(wsUri);
/*
var output = document.getElementById("output");

var mensajes = document.getElementById('conversacion');
var boton = document.getElementById('btnEnviar');
var nombre = document.getElementById('usuario');
var mensaje = document.getElementById('mensaje');*/

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

//boton.addEventListener('click', enviar);


function onError(evt) {
    console.log(evt.data);
}

function onOpen() {
    console.log("Connected to:" + wsUri);
}

function onMessage(evt) {
    console.log('Received ==>' + evt.data);
    var obj = JSON.parse(evt.data);
    draw(evt.data);   
}

function sendText(json) {
    console.log("sending text: " + json);
    websocket.send(json);
}



/*function enviar() {
    var msg = {
        nombre: nombre.value,
        mensaje: mensaje.value
    };
    websocket.send(JSON.stringify(msg));
    console.log('Mensaje: Nombre: ' + msg.nombre + ' ==> Mensaje: ' + msg.mensage);
    mensajes.innerHTML += '<div class="well well-sm"\n\
                            style="overflow:auto"><strong>' + msg.nombre + '</strong>:' + msg.mensaje + '</div>';
    mensaje.value = '';
}*/