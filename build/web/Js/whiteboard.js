var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var colors = document.getElementById("colors");
var size = document.getElementById("size");
var figure = document.getElementById("figure");
var tipoClick = false;
var punto = 0;
var color = colors.value;
var tamano = 5;
var s = 1;
var dragging = false;
var dragStartLocation;
var snapshot;
var actualPos;

context.lineCap = "round";
canvas.addEventListener('mousedown', dragStart, false);
canvas.addEventListener('mousemove', drag, false);
canvas.addEventListener('mouseup', dragStop, false);

function dragStart(event) {
    if ((figure.value === "lapiz") || (figure.value === "borrador")) {
        tipoClick = true;
        actualPos = getCanvasCoordinates(event);
    } else {
        dragging = true;
        dragStartLocation = getCanvasCoordinates(event);
        takeSnapshot();
    }
}

function drag(event) {
    if (figure.value === "lapiz") {
        if (tipoClick) {
            punto = getCanvasCoordinates(event);
            sendFigures("lapiz", punto);
            actualPos = {
                x: punto.x,
                y: punto.y
            };
        }
    } else if (figure.value === "borrador") {
        if (tipoClick) {
            punto = getCanvasCoordinates(event);
            sendFigures("borrador", punto);
            actualPos = {
                x: punto.x,
                y: punto.y
            };
        }
    } else {
        var position;
        if (dragging === true) {
            restoreSnapshot();
            position = getCanvasCoordinates(event);
            d = {"tipo": figure.value,
                "x1": position.x,
                "y1": position.y,
                "x2": dragStartLocation.x,
                "y2": dragStartLocation.y,
                "color": colors.value,
                "tamano": size.value};
            draw(JSON.stringify(d));
        }
    }
}

function dragStop(event) {
    if (figure.value === "lapiz") {
        tipoClick = false;
    } else if (figure.value === "borrador") {
        tipoClick = false;
    } else {
        dragging = false;
        var position = getCanvasCoordinates(event);
        sendFigures(figure.value, position);
    }
}

function draw(figure)
{
    figure = JSON.parse(figure);
    context.lineWidth = figure.tamano;
    context.strokeStyle = figure.color;
    context.fillStyle = figure.color;
    if (figure.tipo === "lapiz") {
        drawPunto(figure);
    } else if (figure.tipo === "borrador") {
        drawPunto(figure);
    } else if (figure.tipo === "linea") {
        drawLine(figure);
    } else {
        context.stroke();
    }
}

function drawLine(figure) {
    context.beginPath();
    context.moveTo(figure.x2, figure.y2);
    context.lineTo(figure.x1, figure.y1);
    context.stroke();
    context.closePath();
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}

function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
            y = event.clientY - canvas.getBoundingClientRect().top;
    return {x: x, y: y};
}

function sendFigures(figure, position) {
    var d;
    if (figure === "lapiz") {
        d = {"tipo": "lapiz",
            "x": position.x,
            "y": position.y,
            "actualPosX": actualPos.x,
            "actualPosY": actualPos.y,
            "color": colors.value,
            "tamano": size.value};
    } else if (figure === "borrador") {
        d = {"tipo": "borrador",
            "x": position.x,
            "y": position.y,
            "actualPosX": actualPos.x,
            "actualPosY": actualPos.y,
            "color": '#FFFFFF',
            "tamano": size.value};
    } else if (figure === "linea") {
        d = {"tipo": "linea",
            "x1": position.x,
            "y1": position.y,
            "x2": dragStartLocation.x,
            "y2": dragStartLocation.y,
            "color": colors.value,
            "tamano": size.value};
    } 
    draw(JSON.stringify(d));
    //sendText(JSON.stringify(d));
}

function drawPunto(figure) {
    context.beginPath();
    context.strokeStyle = figure.color;
    context.moveTo(figure.actualPosX, figure.actualPosY);
    context.lineTo(figure.x, figure.y);
    context.lineWidth = figure.tamano;
    context.stroke();
    context.closePath();
}



