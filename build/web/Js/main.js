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
var exampleModal = $("#exampleModal");
var title = $("#title");
var dibujillo = $("#dibujillo");
var nombres = [];

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

dibujillo.slideUp("slow");   
title
	.on("mouseover", function(){
		dibujillo.slideDown(1000);
		$("body").css({"overflow":"hidden"});
		title.css({
			"background-color": "rgba(0,0,0,8)",
			"color": "white"
		});
				
	})
	.on("mouseleave", function(){
		dibujillo.slideUp(1000);
		$("body").css({"overflow":"hidden"});	
		title.css({
			"background-color": "rgba(0,0,0,0.0)",
		    "padding": "1%",
		    "color": "black"
	    });
	    
	    setTimeout(function(){
			dibujillo.stop(true, true);
		}, 1000);
	});

btnIngresar.on("click", function(){
	console.log(landing);
	nombreVal = nombre.val();
	if(nombreVal != "" && typeof nombreVal != "undefined"){
		nombres.push(nombreVal);
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