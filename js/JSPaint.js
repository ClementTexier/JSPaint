/**
 * Created by ctexier on 15/05/2017
 */
var canvas          = document.querySelector('#drawing-area');
var ctx             = canvas.getContext('2d');
var sketch          = document.querySelector('#sketch');
var sketch_style    = getComputedStyle(sketch);
canvas.width        = parseInt(sketch_style.getPropertyValue('width'));
canvas.height       = parseInt(sketch_style.getPropertyValue('height'));

var mouse           = {x: 0, y: 0};

function setDefaultBrush() {
    ctx.lineWidth   = 1;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.strokeStyle = 'black';
}

function getColor(element) {
    return (element.style.backgroundColor);
}

function setColor(color) {
    ctx.strokeStyle = getColor(color);
}

function resetDrawing(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseleave', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
});

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};