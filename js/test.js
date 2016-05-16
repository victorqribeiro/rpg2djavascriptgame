var requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas;
var c;
var cW = 512;
var cH = 512;
var pX = 32;
var pY = 32;
var pT = 32;
var posX;
var posY;
var sD = 0;
var sA = 0;
var heroi = new Image();
heroi.src = "sprites/heroi.png";
var cenario = new Image();
cenario.src = "sprites/mapa.jpg";
var mapa = [];
var mapaCol = [];
var pos;
var textureArray = [];

mapa = [
[69 ,80 ,80 ,80 ,80 ,80 ,80 ,80 ,80 ,80 ,80 ,80 ,80 ,80 ,80 ,68 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,49 ,50 ,1 ,75 ],
[77 ,1 ,1 ,1 ,33 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,6 ,7 ,8 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,38 ,1 ,11 ,19 ,13 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,11 ,12 ,13 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,16 ,17 ,18 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,39 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,75 ],
[77 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,75 ],
[67 ,73 ,73 ,73 ,73 ,73 ,73 ,73 ,73 ,73 ,73 ,73 ,73 ,73 ,73 ,66 ]
];

var mapaCol = [
[1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
[1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ]
];


function andar(){
    sA += 32;
    if (sA == 96) {
        sA = 0;
    }
}

document.onkeydown = function (e) {
    e = e || window.event;
    var charCode = e.charCode || e.keyCode;
    

    
    if (charCode == 37 || charCode == 65) {
        andar();
        sD = 32;
        if (mapaCol[pY / pT][pX / pT - 1] != 1) {
            pX -= pT;
        }
    }
    if (charCode == 38 || charCode == 87) {
        andar();
        sD = 96;
        if (mapaCol[pY / pT - 1][pX / pT] != 1) {
            pY -= pT;
        }
    }
    if (charCode == 39 || charCode == 68) {
        andar();
        sD = 64;
        if (mapaCol[pY / pT][pX / pT + 1] != 1) {
            pX += pT;
        }
    }
    if (charCode == 40 || charCode == 83) {
        andar();
        sD = 0;
        if (mapaCol[pY / pT + 1][pX / pT] != 1) {
            pY += pT;
        }
    }

};

var Texture = function(x,y){
    this.x = x;
    this.y = y;
};

    for(var i=0; i < 512; i+=32){
        for(var j=0; j < 512; j+=32){
            
            textureArray.push(new Texture(j,i) );
        }
    }

function init() {
    canvas = document.getElementById("mapa");
    c = canvas.getContext("2d");
    anim();
}

function anim() {
    draw();
    requestAnimFrame(function () {
        anim();
    });
}

function draw() {
    c.clearRect(0, 0, cW, cH);
    for(var i=0; i<mapa.length; i++){
        for(var j=0; j<mapa.length; j++){
        
            pos = mapa[i][j];
            c.drawImage(cenario, textureArray[pos].x, textureArray[pos].y, pT, pT, j*pT, i*pT, pT, pT);
         }
         }
    
    
    c.drawImage(heroi, sA, sD, pT, pT, pX, pY, pT, pT);
    

}