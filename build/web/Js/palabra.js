var wordsArea = $("#wordsArea");
var word = $("#word");
var btnSendWord = $("#btnSendWord");

btnSendWord.on("click", drawWordClient);

function drawWordClient(){
	var wordVal = word.val();
	if(wordVal != "" && typeof wordVal != "undefined"){
		if(wordVal == palabraSel){
			wordsArea.append(`<div class="wordInAreaMatch">
								<small class="textWordInArea">
									<strong>${nombreVal} : </strong>
									${wordVal}
								</small>
							<div>`);
		} else {
			wordsArea.append(`<div class="wordInArea">
								<small class="textWordInArea">
									<strong>${nombreVal} : </strong>
									${wordVal}
								</small>
							<div>`);
		}
		word.val("");
		var jsonWord = {"nombre": nombreVal, "word": wordVal};
		sendText(JSON.stringify(jsonWord));
	} else {
		alert("Debes ingresar una palabra");
		word.val("");
	}
}

function drawWord(json){
	var json = JSON.parse(json);
	var nombreReceived = json.nombre;
	var wordReceived = json.word;
	if(wordReceived == palabraSel){
		wordsArea.append(`<div class="wordInAreaMatch">
								<small class="textWordInArea">
									<strong>${nombreReceived} : </strong>
									${wordReceived}
								</small>
							<div>`);
	} else {
		wordsArea.append(`<div class="wordInArea">
								<small class="textWordInArea">
									<strong>${nombreReceived} : </strong>
									${wordReceived}
								</small>
							<div>`);
	}
}