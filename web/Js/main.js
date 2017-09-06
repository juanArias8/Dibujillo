$( document ).ready(function() {
	var landing = $("#landing");
	var mainContent = $("#mainContent");
	var alertWin = $("#alertWin");
	var alertMain = $("#alertMain");
	var slideTog = $(".slideTog");

	landing.show(0);
	mainContent.hide(0);
	alertWin.hide(0);
	alertMain.hide(0);
	slideTog.slideToggle(2000);
});

landing = $("#landing");
mainContent = $("#mainContent");
alertWin = $("#alertWin");
alertMain = $("#alertMain");
slideText = $(".slideText");
slideTog = $(".slideTog");
var btnIngresar = $("#btnIngresar");
var nombre = $("#nombre");
var nombreVal;
var exampleModal = $("#exampleModal");
var title = $("#title");
var dibujillo = $("#dibujillo");
var myCanvas = $("#myCanvas");

var listPlayers = $("#listPlayers");
var score = 0;
var nombres = [];
var palabraSel = "";

slideText
	.on("mouseover", function(){
		slideTog.slideDown("slow");
		slideText.css({
			"background-color": "rgba(0,0,0,1)",
		    "padding": "3%",
		    "border-radius": "20px",
		});		
	})
	.on("mouseleave", function(){
		slideTog.slideUp("slow");
		slideText.css({
			"background-color": "rgba(0,0,0,0.5)",
		    "padding": "3%",
		    "border-radius": "15px"
	    });	    
	});

title
	.on("mouseover", function(){
		title.css({
			"width": "20%",
			"border-radius" : "20px",
			"margin-left" : "38%"
		});
		dibujillo.text("Dibujillo");		
	})
	.on("mouseleave", function(){
		title.css({
			"width": "50px",
		    "border-radius": "100%",
		    "margin-left": "45%"
	    });
	    dibujillo.text("D");	
	});

btnIngresar.on("click", function(){
	nombre.select();
	nombreVal = nombre.val();
	if(nombreVal != "" && typeof nombreVal != "undefined"){
		listPlayers.append(`<li class="list-group-item list-group-item-success">
								</strong style="text-align:left;">${nombreVal}  </strong> ==>  <strong style="text-align:right; margin-left:5px;">  ${score}</strong>
							</li>`);
		var jsonPlayer = {"nombre": nombreVal, "score": score};
		sendText(JSON.stringify(jsonPlayer));
		nombres.push(nombreVal);
		nombre.val("");
		exampleModal.modal("hide");
		landing.fadeOut("slow");
		mainContent.fadeIn("slow");
		myCanvas.css("pointer-events", "none");
		title.css({
			"width": "50%",
			"border-radius" : "20px",
			"margin-left" : "25%",
			"background-color" : "#FF7474",
			"pointer-events" : "none"
		});
		dibujillo.text("Esperando por jugadores");		
	} else {
		nombre.val("");
		alertMain.fadeIn( "slow" );
		alertMain.html("<strong>¡¡¡Oh por dios!!!<br> debes ingresar un nombre</strong>");
		setTimeout(function(){
			alertMain.fadeOut("slow");
		},3000);
	}
});

function drawPlayer(json){
	var json = JSON.parse(json);
	listPlayers.empty();
	for (var prop in json){
		var nombreReceived = json[prop];
		var score = 0;
		listPlayers.append(`<li class="list-group-item list-group-item-success">
								</strong>${nombreReceived}  </strong> ==>  <strong style="margin-left:5px;"> ${score} </strong>
							</li>`);
	}
}

function loadPlayers(){
    nombres = nombres.sort();
    jsonPlayers = {
    	"nombre1": nombres[0], 
    	"nombre2": nombres[1], 
    	"nombre3": nombres[2], 
    	"nombre4": nombres[3], 
    	"nombre5": nombres[4]
    };
    jsonPlayers = JSON.stringify(jsonPlayers);
    sendText(jsonPlayers);
    drawPlayer(jsonPlayers);
    title.css({
		"width": "50px",
	    "border-radius": "100%",
	    "margin-left": "45%",
	    "background-color" : "rgba(0,0,0,1)",
	    "pointer-events" : ""
    });
    dibujillo.text("D");
}

function initGame(){
	title.css({
		"width": "50px",
	    "border-radius": "100%",
	    "margin-left": "45%",
	    "background-color" : "rgba(0,0,0,1)",
	    "pointer-events" : ""
    });
    dibujillo.text("D");
    console.log("nombre = " + nombreVal + " ///// primerNombre = " +nombres[0]);
    if(nombreVal === nombres[0]){
	    setTimeout(function(){
	    	solicitarPartida();
	    },3000);
	}   
}

function solicitarPartida() {
	console.log("Solicitando partida");
	var palabras = ["avion", "palma", "dado", "arbol", "casa", "libro", "pantalon", "computador","ventana", "mesa", "silla", "llave", "bicicleta","lapiz", "botella"];
	var randomPalabra = Math.floor((Math.random() * palabras.length) + 1);
	var randomPlayer = Math.floor((Math.random() * nombres.length) + 1);
	var palabraSelect = palabras[randomPalabra];
	var jugadorSelect = nombres[randomPlayer];

	partida = {
		"jugador": jugadorSelect,
		"palabra": palabraSelect
	};
	sendText(JSON.stringify(partida));
	verificarPartida(JSON.stringify(partida));
}

function verificarPartida(json){
	console.log("Vrrificando partida");
	var json = JSON.parse(json);
	palabraSel = json.palabra;
	var messageAlert = "Has sido seleccionado\n Debes dibujar: " + json.palabra;
	if(json.jugador == nombreVal){
		myCanvas.css("pointer-events", "");
		alert(messageAlert);
	}
}
