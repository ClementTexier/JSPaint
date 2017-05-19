/**
 * Created by ctexier on 15/05/2017
 */
var canvas          = document.querySelector('#drawing-area');
var ctx             = canvas.getContext('2d');

var sketch          = document.querySelector('#sketch');
var sketch_style    = getComputedStyle(sketch);
canvas.width        = parseInt(sketch_style.getPropertyValue('width'));
canvas.height       = parseInt(sketch_style.getPropertyValue('height'));
ctx.lineWidth       = 5;
ctx.lineJoin        = 'round';
ctx.lineCap         = 'round';
ctx.strokeStyle     = 'blue';

var mouse           = {x: 0, y: 0};

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

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};