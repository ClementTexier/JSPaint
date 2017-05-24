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

function changeBrushWidth() {
    var newWidth    = document.getElementById('brush-size').value;
    ctx.lineWidth   = newWidth;
    document.getElementById('brushWidthLabel').innerHTML = newWidth;
}

function setColor(color) {
    ctx.strokeStyle = color;
    console.log(rgb2hex(color));
    customColor = document.getElementById('custom-color');
    customColor.value = rgb2hex(color).substring(1,7).toUpperCase();
    customColor.style.backgroundColor = color;
    document.getElementById('box-current').style.backgroundColor = color;

}

function resetDrawing(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function rgb2hex(rgb){
    rgb = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
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