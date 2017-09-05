$( document ).ready(function() {
	var landing = $("#landing");
	var mainContent = $("#mainContent");
	var alertWin = $("#alertWin");
	var alertMain = $("#alertMain");

	landing.show(0);
	mainContent.hide(0);
	alertWin.hide(0);
	alertMain.hide(0);
});

landing = $("#landing");
mainContent = $("#mainContent");
alertWin = $("#alertWin");
alertMain = $("#alertMain");
var btnIngresar = $("#btnIngresar");
var nombre = $("#nombre");
var exampleModal = $("#exampleModal");

var nombres = [];

btnIngresar.on("click", function(){
	console.log(landing);
	nombreVal = nombre.val();
	if(nombreVal != "" && typeof nombreVal != "undefined"){
		nombres.push(nombreVal);
		console.log(nombres);
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