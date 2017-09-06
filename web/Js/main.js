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

var listPlayers = $("#listPlayers");
var score = 0;

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
	console.log(landing);
	nombreVal = nombre.val();
	if(nombreVal != "" && typeof nombreVal != "undefined"){
		listPlayers.append(`<li class="list-group-item list-group-item-success">
								</strong style="text-align:left;">${nombreVal}  </strong> ==>  <strong style="text-align:right; margin-left:5px;">  ${score}</strong>
							</li>`);
		var jsonPlayer = {"nombre": nombreVal, "score": score};
		sendText(JSON.stringify(jsonPlayer));
		nombre.val("");
		exampleModal.modal("hide");
		landing.fadeOut("slow");
		mainContent.fadeIn("slow");
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
	var players = [];
	var json = JSON.parse(json);
	var nombreReceived = json.nombre;
	var scoreReceived = json.score;
	if(!nombreReceived(existe)){
		players.push(json);
		sendText(JSON.stringify(players))
	}
	listPlayers.append(`<li class="list-group-item list-group-item-success">
							</strong style="text-align:left;">${nombreReceived}  </strong> ==>  <strong style="text-align:right; margin-left:5px;">  ${scoreReceived}</strong>
						</li>`);
}