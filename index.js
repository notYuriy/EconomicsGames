var images_names = [
    "res/gold.png",
    "res/ipad.png",
    "res/godfood.png",
    "res/car.png",
    "res/donut.png"
];

var success_sound = new Audio();
success_sound.src = "res/success_sound.mp3";
success_sound.volume = 0.3;
var images = [];
var length = 100/images_names.length;
var picdimension = length * 18 / 20;
var offset = length - picdimension;

var game = document.getElementById("game");
var msg = document.createElement("p");
msg.style.left = "50vw";
msg.style.textAlign = "center";
document.body.append(msg);
msg.innerHTML = "Расставьте элементы в порядке возрастания ценности (с Вашей точки зрения)"
msg.style.fontSize = "20px";
msg.style.fontFamily = "\'Cousine\', monospace";

for (var i = 0; i < images_names.length; ++i) {
    var elem = document.createElement("img");
    elem.style.width = picdimension.toString() + "vw";
    elem.style.height = picdimension.toString() + "vw";
    elem.style.top = "calc(" + (offset).toString() + "vw + 40px)";
    elem.style.position = "absolute";
    elem.style.left = (offset + length * i).toString() + "vw";
    elem.src = images_names[i];
    elem.id = "image_" + i;
    game.append(elem);
    images.push(elem);
}

var button = document.createElement("button");
button.style.position = "absolute";
button.style.width = (0.7 * picdimension).toString() + "vw";
button.style.height = (picdimension / 5).toString() + "vw";
button.style.top = "25vw";
button.style.left =(offset + length * ((images_names.length - 1) / 2) + 0.15 * picdimension).toString()  + "vw";
button.innerText = "Продолжить";
button.style.fontSize = "20px";
button.style.fontFamily = "\'Cousine\', monospace";

function finish_sort() {
    msg.innerHTML = "Найдите предмет, являющийся для вас альтернативной стоимостью";
    this.parentNode.removeChild(this);
    lock_drag_and_drop();
    for (let i = 0; i < images_names.length; ++i) {
        if (i == images_names.length - 2) {
            images[i].onclick = right;
        } else {
            images[i].onclick = wrong;
        }
    }
}

function right() {
    success_sound.play();
    this.parentNode.removeChild(this);
    this.onclick = null;
    this.src = "res/right.png";
    msg.innerHTML = "Отлично";
    msg.style.top = "10vh";
    msg.style.fontSize = "30vh";
    for (let i = 0; i < images_names.length; ++i){
        if (i != images_names.length - 2) {
            images[i].parentNode.removeChild(images[i]);
        }
    }
    confetti.start();
    setTimeout(function(){ location.reload(); }, 2000);
}

function wrong() {
    this.onclick = null;
    msg.innerHTML = "Попробуйте еще раз";
    this.src = "res/wrong.png";
}

button.onclick = finish_sort;
button.draggable = false;
game.append(button);