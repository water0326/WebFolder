var logo = document.getElementById('logo');
var scr = document.getElementById('screen');
var button = document.getElementsByTagName('li');
var buttonCount = button.length;
var selected = new Array(buttonCount);
var buttonOpacity = new Array(buttonCount);
var button_state = true;
var loop_state = [true, true];
var close_state = true;
var closeTab = document.getElementById('closeTab');
var scriptManage = document.getElementById('scriptManage');
var state = 0;
let preColor = document.documentElement;
var modifyName = document.getElementsByClassName('modifyName');
var modifier = document.getElementById('modifier');
var isTabWork = false;
var brushName = document.getElementById('brushName');
var lineName = document.getElementById('lineName');

modifier.style.pointerEvents = "none";
modifier.style.opacity = 0;

closeTab.className = "tab initCloseTab";
for(var i = 0 ; i < buttonCount ; i++) {
    selected[i] = false;
    button[i].style.pointerEvents = "none";
    button[i].className = "initNav";
    if(selected[i]) {
        button[i].style.backgroundColor = "#454545";
    }
    else {
        button[i].style.backgroundColor = "white";
    }
}


selected[0] = true; // About
button[0].className = "selectedButton";
buttonOpacity[0] = 0.5;

var loop = setInterval(function() {
    if(!button_state) {
        if(loop_state[0]) {
            loop_state[0] = false;
            
            setTimeout(function() {
                loop_state[0] = true;
                preColor.style.setProperty("--background", setColor);
                button_state = true;
                for(var i = 0 ; i < buttonCount ; i++) {
                    buttonOpacity[i] = 1;
                    button[i].style.opacity = buttonOpacity[i];
                }
            }, 2200);

            
            for(var i = 0 ; i < buttonCount ; i++) {
                buttonOpacity[i] = 0.5;
                button[i].style.opacity = buttonOpacity[i];
            }
        }
    }
}, 1);

function changePage(backgroundColor, className, font, modifyNameColor) {
    scr.style.backgroundColor = backgroundColor;
    scr.className = className;
    setColor = backgroundColor;
    inputBar.style.fontFamily = font;
    lineSize.style.fontFamily = font;
    brushSize.style.fontFamily = font;
    resetMap.style.fontFamily = font;
    for(var i = 0 ; i < modifyName.length ; i++) {
        modifyName[i].style.fontFamily = font;
        modifyName[i].style.color = modifyNameColor;
    }
    modifier.style.pointerEvents = "auto";
    if(window.innerWidth < window.innerHeight) {
        scr.style.backgroundColor = backgroundColor;
        scr.className = "";
    }
    modifier.className = "";
    modifier.style.opacity = 1;
    
}

function clicked(num) {
    if(num != state) {
        if(button_state) {
            state = num;
            if(num == 0) { // home
                scr.className = "aboutAnimation";
                setColor = "#e4e4e4";
                modifier.className = "disableModifier";
            }
            else if(num == 1) { // bubble
                changePage("#ec6c54", "bubbleAnimation", 'YanoljaYacheR', "white");
                
                lineName.innerHTML = "Bubble Speed(1~20)";
                brushName.innerHTML = "Bubble Size(1~20)";
                lineSize.value = 15;
                brushSize.value = 10;
                reset();
            }
            else if(num == 2) { // code
                changePage("#343434", "codeAnimation", "'codeFont'", "white");
                lineName.innerHTML = "Line Size(1~30)";
                brushName.innerHTML = "Brush Size(1~20)";
                lineSize.value = 10;
                brushSize.value = 3;
                
                reset();
            }
            else if(num == 3) { // fish
                changePage("#BFC8D7", "waterAnimation", 'Cafe24Oneprettynight', "black");
                
                lineName.innerHTML = "Fish Size(1~30)";
                brushName.innerHTML = "Float Size(1~20)";
                lineSize.value = 20;
                brushSize.value = 10;
                reset();
            }
        
            for(var i = 0 ; i < buttonCount ; i++) {
                if(i == num) {
                    button[i].className = "selectedButton";
                    selected[i] = true;
                }
                else {
                    if(selected[i]) {
                        button[i].className = "unselectedButton";
                    }
                    selected[i] = false;
                }
            }
    
            button_state = false;
        }
    }
    
    
}

function changeTab() {
    if(close_state) {
        close_state = false;
        if(isTabWork) {
            isTabWork = false;
            for(var i = 0 ; i < buttonCount ; i++) {
                button[i].style.pointerEvents = "none";
                
                (function(m) {
                    setTimeout(function() {
                        button[m].className = "navFadeOut";
                    }, 75 * (4 - m));
                })(i);
                if(selected[i]) {
                    button[i].style.backgroundColor = "#454545";
                }
                else {
                    button[i].style.backgroundColor = "white";
                }
            }
            closeTab.className = "tab closeTab";
            setTimeout(function() {
                close_state = true;
            }, 1000);
        }
        else {
            isTabWork = true;
            for(var i = 0 ; i < buttonCount ; i++) {
                (function(m) {
                    setTimeout(function() {
                        button[m].className = "navFadeIn";
                    }, 130 * m);
                })(i);
                if(selected[i]) {
                    button[i].style.backgroundColor = "#454545";
                }
                else {
                    button[i].style.backgroundColor = "white";
                }
            }
            setTimeout(function() {
                for(var i = 0 ; i < buttonCount ; i++) {
                    button[i].className = "";
                    button[i].style.pointerEvents = "auto";
                }
                close_state = true;
            }, 1000);
            closeTab.className = "tab openTab";
        }
    }
}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var inputBar = document.getElementById('textInput');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouseX, mouseY;


///////////////////////////// code start /////////////////////////////
var cooldown = 10;
var timer = 0;
var text = new Array();
var textLength;
var currentLength = 0;
var INPUT_STATE = false;
var line = 0;
var output = new Array();
var colorOutput = new Array();
var lineLimit = 10;
var initWidth = 100;
var initHeight = 200;
var range = 90;
var checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;;

var brushSize = document.getElementById('brushSize');
var lineSize = document.getElementById('mapSize');
var resetMap = document.getElementById('resetMap');

brushSize.value = range / 30;
lineSize.value = lineLimit;

for(var i = 0 ; i < lineLimit ; i++) {
    colorOutput[i] = new Array();
}

function isMouseRange(range, j, i) {
    if((mouseX - (initWidth + (i * 30) + 15)) >= -range && (mouseX - (initWidth + (i * 30) + 15)) <= range &&
        (mouseY - (initHeight + (j * 50) - 25)) >= -range && (mouseY - (initHeight + (j * 50) - 25)) <= range) {
        colorOutput[j][i] -= colorOutput[j][i] > 100 + 3 ? 4 : 0;
        return true;
    }
    else {
        colorOutput[j][i] += colorOutput[j][i] < 255 - 3 ? 4 : 0;
        return false;
    }
}

function codeDraw() {
    //ctx.globalAlpha = 0.5;
    for(var j = 0 ; j < output.length ; j++) {
        for(var i = 0 ; i < output[j].length - 1 ; i++) {

            if(window.innerWidth - (initWidth + (i * 30)) < initWidth) {
                break;
            }

            if(colorOutput[j][i] == null) {
                colorOutput[j][i] = 255;
            }

            if(output[j][i] == " ") {
                ctx.fillText(output[j][i], initWidth + (i * 30), initHeight + (j * 50));
            }
            else {
                ctx.fillStyle = "rgb("+String(colorOutput[j][i])+", 255, 255)";
                ctx.globalAlpha = colorOutput[j][i] * 0.5 / -155 + (205 / 155);
                
                if(isMouseRange(range, j, i)) {
                    if(checkKor.test(output[j][i])) {
                        ctx.font = "normal 35px 'codeFont'";
                    }
                    else {
                        ctx.font = "normal 45px 'codeFont'";
                    }
                    ctx.fillText(output[j][i], initWidth + (i * 30), initHeight + (j * 50));
                }
                else {
                    ctx.font = "normal 50px 'codeFont'";
                    var ran = Math.random().toString(36).substr(2, 1);
                    ctx.fillText(ran, initWidth + (i * 30), initHeight + (j * 50));
                }
            }
        }
    }
}

function codeUpdate() {
    if(INPUT_STATE) {
        inputBar.style.backgroundColor = "gray";
        inputBar.style.color = "white";
    }
    else {
        inputBar.style.backgroundColor = "white";
        inputBar.style.color = "black";
    }
    if(lineSize.value != lineLimit) {
        if(lineSize.value > 20) {
            lineSize.value = 20;
            lineLimit = 20;
        }
        else if(lineSize.value < 1 && lineSize.value != "") {
            lineSize.value = 1;
            lineLimit = 1;
        }
        else {
            lineLimit = lineSize.value;
        }
        reset();
    }

    if(brushSize.value > 10) {
        range = 10 * 30;
        brushSize.value = 10;
    }
    else if(brushSize.value < 1 && brushSize.value != "") {
        range = 1 * 30;
        brushSize.value = 1;
    }
    else {
        range = brushSize.value * 30;    
    }
}

function codeAnimation() {
    if(INPUT_STATE) {
        if(currentLength <= textLength) {
            timer++;
            if(timer >= cooldown) {
                if(window.innerWidth - (initWidth + (currentLength * 30)) < initWidth) {
                    while(currentLength <= textLength) {
                        output[line].push(text[line].charAt(currentLength));
                        currentLength++;
                    }
                    currentLength = 0;
                    timer = 0;
                    INPUT_STATE = false;
                    line++;
                    return;
                }
                while(text[line].charAt(currentLength) == ' ') {
                    output[line].push(text[line].charAt(currentLength));
                    currentLength++;    
                }
                output[line].push(text[line].charAt(currentLength));
                currentLength++;
                timer = 0;
            }
        }
        else {
            currentLength = 0;
            timer = 0;
            INPUT_STATE = false;
            line++;
        }    
    }
    
}
/////////////////////////////// code end ////////////////////////////////

window.onkeydown = function() {
    if(state == 1) {
        if(event.keyCode == 13) {
            if(!INPUT_STATE) {
                if(inputBar.value != "") {
                    bubble_text = inputBar.value;
                    INPUT_STATE = true;
                    inputBar.value = "";
                }
            }
        }
    }
    else if(state == 2) {
        if(event.keyCode == 13) {
            if(!INPUT_STATE) {
                if(inputBar.value != "") {
                    if(line < lineLimit) {
                        text[line] = inputBar.value;
                        output[line] = new Array();
                        textLength = text[line].length;
                        INPUT_STATE = true;
                        inputBar.value = "";
                    }
                    else {
                        line = lineLimit;
                        for(var i = 0 ; i < line-1 ; i++) {
                            text[i] = text[i+1];
                            output[i] = output[i+1];
                        }
                        text[line-1] = inputBar.value;
                        textLength = text[line-1].length;
                        output[line-1] = new Array();
                        INPUT_STATE = true;
                        inputBar.value = "";
                        line = lineLimit - 1;
                    }
                }
            }
        }
    }
    else if(state == 3) {
        if(event.keyCode == 13) {
            if(!INPUT_STATE) {
                if(inputBar.value != "") {
                    if(inputBar.value.length <= fish_letterLimit) {
                        fish_text = inputBar.value;
                        INPUT_STATE = true;
                        inputBar.value = "";
                    }
                }
            }
        }
    }
    
}

function reset() {
    if(state ==  0) {
        
    }
    else if(state == 1) {
        bubble_bubble = new Array();
        bubble_timer = 0;
        bubble_text = "";
        bubble_current = 0;
        INPUT_STATE = false;
        bubble_ranCooldown = Math.round(Math.random() * 15) + 40;
    }
    else if(state == 2) {
        timer = 0;
        text = new Array();
        currentLength = 0;
        INPUT_STATE = false;
        line = 0;
        output = new Array();
        colorOutput = new Array();
        initWidth = 100;
        initHeight = 200;
        for(var i = 0 ; i < lineLimit ; i++) {
            colorOutput[i] = new Array();
        }
    }
    else if(state == 3) {
        fish_fishLimit = lineSize.value;
        fish_letterLimit = brushSize.value;
        fish_letter = new Array();
        fish_fish = new Array();
        fish_fishTimer = 0;
        fish_letterTimer = 0;
        fish_text = "";
        fish_letterCurrent = 0;
        INPUT_STATE = false;
    }
    inputBar.value = "";
}

canvas.onmousemove = function(e) {
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
}

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 초기화
    if(state == 0) { // home
        homeUpdate();
        homeDraw();
    }
    else if(state == 1) { // bubble
        bubbleAnimation();
        bubbleUpdate();
        bubbleDraw();
    }
    else if(state == 2) { // code
        codeAnimation();
        codeUpdate();
        codeDraw();
    }
    else if(state == 3) { // fish
        fishAnimation();
        fishUpdate();
        fishDraw();
    }
}, 10);

window.onresize = function(e) {
    setCanvasSize();
}

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

var home_bubbleY = 0;
var home_bubbleSin = 0;
var home_sel = 0;
var home_angle = 0;
var home_fishCos = 0;
var home_fishY = 0;
var isActive = false;

function homeUpdate() {
    home_bubbleSin += Math.PI / 90;
    home_fishCos += Math.PI / 90;
    home_bubbleY = Math.sin(home_bubbleSin) * 30;
    home_fishY = Math.cos(home_fishCos) * 20;
    home_angle = -Math.sin(home_fishCos) * 5 * Math.PI / 180;
    if(mouseX >= 0 && mouseX <= window.innerWidth / 3) {
        home_sel = 1;
        home_bubbleSin = 0;
    home_bubbleY = 0;
    }
    else if(mouseX >= window.innerWidth / 3 && mouseX <= window.innerWidth * 2 / 3) {
        home_sel = 2;
    }
    else if(mouseX >= window.innerWidth * 2 / 3 && mouseX <= window.innerWidth) {
        home_sel = 3;
        home_fishCos = 0;
        home_fishY = 0;
    }
    else {
        home_sel = 0;
    }
}

function homeDraw() {

    ctx.fillStyle = "#bbbbbb";
    if(home_sel == 1) {
        ctx.fillRect(0, 0, window.innerWidth / 3, window.innerHeight);
    }
    if(home_sel == 2) {
        ctx.fillRect(window.innerWidth / 3, 0, window.innerWidth / 3, window.innerHeight);
    }
    if(home_sel == 3) {
        ctx.fillRect(window.innerWidth * 2 / 3, 0, window.innerWidth / 3, window.innerHeight);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#ec6c54";
    ctx.fillStyle = "#ec6c54";
    ctx.beginPath();
    ctx.arc(window.innerWidth / 6, window.innerHeight / 2 + home_bubbleY, window.innerWidth / 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(window.innerWidth / 6, window.innerHeight / 2 + home_bubbleY, window.innerWidth / 8, -1 * Math.PI / 4, 3 * Math.PI / 4);
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 1;

    ctx.fillStyle = "black";
    ctx.font = "normal " + String(window.innerWidth / 8 * 1.5) + "px 'fishFont_en'";
    ctx.fillText("B", window.innerWidth / 6, window.innerHeight / 2 + home_bubbleY + 10);
    if(home_sel == 1) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "black";
        ctx.font = "normal " + String(window.innerWidth / 16) + "px 'fishFont_en'";
        ctx.fillText("Bubble", window.innerWidth / 6, window.innerHeight / 2 + home_bubbleY + window.innerWidth / 16 * 1.5);

        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
        ctx.font = "normal " + String(window.innerWidth / 60) + "px 'MaplestoryOTFLight'";
        ctx.fillText("입력한 단어를 마우스로 터뜨리세요!", window.innerWidth / 6, window.innerHeight - 20);
    }
    

    /////

    if(home_sel != 2) {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "black";
        ctx.font = "normal " + String(window.innerWidth / 4) + "px 'codeFont'";
        ctx.fillText(Math.random().toString(36).substr(2, 1), window.innerWidth / 2, window.innerHeight / 2); 

    }
    else {
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "rgb(128, 100, 100)";
        ctx.font = "normal " + String(window.innerWidth / 4) + "px 'codeFont'";
        ctx.fillText("C", window.innerWidth / 2, window.innerHeight / 2);
        ctx.fillStyle = "black";
        ctx.font = "normal " + String(window.innerWidth / 12) + "px 'codeFont'";
        ctx.textAlign = "left";
        ctx.fillText("ode", window.innerWidth / 2, window.innerHeight / 2);

        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
        ctx.font = "normal " + String(window.innerWidth / 60) + "px 'MaplestoryOTFLight'";
        ctx.fillText("입력한 단어를 마우스로 찾으세요!", window.innerWidth / 2, window.innerHeight - 20);
    }
        //////////////////////////////////////////////////////////////

    ctx.globalAlpha = 1;
    ctx.translate(window.innerWidth * 6 / 7, window.innerHeight / 2 + home_fishY);
    ctx.rotate(home_angle);
    ctx.lineWidth = 1;
    var sclae = window.innerWidth / 9;

    // 몸통몸통몸통몸통
    ctx.beginPath();
    ctx.fillStyle = "#8F8AFF";
    ctx.strokeStyle = "#8F8AFF";
    ctx.arc(0, - sclae / 2, sclae - 1, Math.PI / 6, Math.PI * 5 / 6);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, sclae / 2, sclae - 1, Math.PI * 7 / 6, Math.PI * 11 / 6);
    ctx.fill();
    ctx.stroke();


    ctx.rotate(0);
    ctx.beginPath();
    ctx.moveTo(sclae / 4 - sclae / 2 * 1.73, 0);
    ctx.lineTo(- sclae / 2 - sclae / 2 * 1.73, + sclae / 3);
    ctx.lineTo(- sclae / 3 - sclae / 2 * 1.73, 0);
    ctx.lineTo(- sclae / 2 - sclae / 2 * 1.73, - sclae / 3);
    ctx.lineTo(+ sclae / 4 - sclae / 2 * 1.73, 0);
    ctx.fill();
    ctx.stroke();
    ctx.rotate(0);

    //눈눈눈눈눈눈눈눈
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(sclae / 4 , 0, sclae / 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    ctx.rotate(-home_angle);
    ctx.translate(-window.innerWidth * 6 / 7, -window.innerHeight / 2 - home_fishY);
    
    if(home_sel == 3) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "black";
        ctx.font = "normal " + String(window.innerWidth / 16) + "px 'Cafe24Oneprettynight'";
        ctx.fillText("Fish", window.innerWidth * 5 / 6, window.innerHeight / 2 + home_fishY + window.innerWidth / 16 * 1.5);

        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
        ctx.font = "normal " + String(window.innerWidth / 60) + "px 'MaplestoryOTFLight'";
        ctx.fillText("단어를 입력하여 물고기를 부르세요!", window.innerWidth * 5 / 6, window.innerHeight - 20);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    ctx.globalAlpha = 1;
    ctx.font = "normal " + String(window.innerWidth / 32) + "px 'MaplestoryOTFLight'";
    ctx.fillText("체험형 웹", window.innerWidth / 2, 50);
    ctx.font = "normal " + String(window.innerWidth / 96) + "px 'MaplestoryOTFLight'";
    ctx.fillText("Made By LeeJeong", window.innerWidth / 2, 50 + window.innerWidth / 32);
}

canvas.addEventListener('click', function(e) { 
    if(state == 0) {
        if(close_state) {
            if(home_sel != 0) {
                if(!isActive) {
                    isActive = true;
                    if(!isTabWork) {
                        changeTab();
                    }
                    var b = home_sel;
                    setTimeout(function() {
                        var a = setInterval(function() {
                            if(close_state) {
                                clicked(b);
                                isActive = false;
                                clearInterval(a);
                            }
                        }, 1);
                    }, 100);
                    
                }
            }
        }
    }
    else if(state == 1) {
        for(var i = 0 ; i < bubble_bubble.length ; i++) {
            if(Math.sqrt((mouseX - bubble_bubble[i].x) * (mouseX - bubble_bubble[i].x) + (mouseY - bubble_bubble[i].y) * (mouseY - bubble_bubble[i].y)) <= bubble_bubble[i].r) {
                bubble_bubble[i].isPop = true;
            }
        }
    }
    
});

const fish_letterConst = class {
    constructor(name, x, y, dir, maxY, state, predator) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.maxY = maxY;
        this.state = state;
        this.predator = predator;
    }    
}

const fish_fishConst = class {
    constructor(prey, x, y, angle, state, velocity, color, taleDir, taleAngle, taleTimer, preyAngle, dir) {
        this.prey = prey;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.state = state;
        this.velocity = velocity;
        this.color = color;
        this.taleDir = taleDir;
        this.taleAngle = taleAngle;
        this.taleTimer = taleTimer;
        this.preyAngle = preyAngle;
        this.dir = dir;
    }
}

var fish_fishLimit = 20;
var fish_letterLimit = 10;
var fish_letter = new Array();
var fish_fish = new Array();
var fish_fishTimer = 0;
var fish_letterTimer = 0;
var fish_text = "";
var fish_letterCurrent = 0;
var fish_color = [
    "#FCCEE2", "#FDB7BA", "#FC7399", "#BEEBFD", "#A9A0FC", "#AFCB3D", "#D3C0D3", "#F7E7B1", "#EFE3D5", "#8AD481"];

function fishAnimation() {
    if(fish_letterTimer > 20) {
        if(fish_letterCurrent < fish_text.length) {
            if(fish_letter.length < fish_letterLimit) {
                if(fish_text.charAt(fish_letterCurrent) != " ") {
                    fish_letter.push(new fish_letterConst(
                        fish_text.charAt(fish_letterCurrent),
                        Math.round(Math.random() * (window.innerWidth - 80) / fish_text.length ) + 40 + fish_letterCurrent * ((window.innerWidth - 80) / fish_text.length),
                        0,
                        1,
                        Math.round(Math.random() * 200) + 200,
                        1,
                        null));
                }

                fish_letterCurrent++;
            }    
        }
        else {
            fish_text = "";
            fish_letterCurrent = 0;
            if(INPUT_STATE) {
                if(fish_letter.length == 0) {
                    INPUT_STATE = false;
                }
            }
        }
        fish_letterTimer = 0;
    }
    fish_letterTimer++;
    if(fish_fishTimer > 50) {
        if(fish_fish.length < fish_fishLimit) {
            fish_fish.push(new fish_fishConst(null, -50,
            Math.round(Math.random() * window.innerHeight * 0.2) + window.innerHeight * 0.75, 0, 1, 0,
            fish_color[Math.floor(Math.random() * fish_color.length)], Math.PI / 180, 0, 0, 0, "right"));
            fish_fishTimer = 0;
        }
    }
    fish_fishTimer++;
    
}

function drawRod(i) {
    ctx.globalAlpha = 1;

    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.strokeStyle = "#BA7980"
    ctx.moveTo(fish_letter[i].x, 0);
    ctx.lineTo(fish_letter[i].x, fish_letter[i].y / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#CB8A90";
    ctx.moveTo(fish_letter[i].x, fish_letter[i].y / 2);
    ctx.lineTo(fish_letter[i].x, fish_letter[i].y);
    ctx.stroke();
    
    ctx.fillStyle = "#EFEFF1";
    ctx.strokeStyle = "#EFEFF1";
    ctx.beginPath();
    ctx.arc(fish_letter[i].x, fish_letter[i].y, 40, -(Math.PI / 6), Math.PI * 7 / 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#DEDEE0";
    ctx.strokeStyle = "#DEDEE0";
    ctx.beginPath();
    ctx.arc(fish_letter[i].x, fish_letter[i].y, 40, Math.PI * 7 / 6, Math.PI * 13 / 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if(checkKor.test(fish_letter[i].name)) {
        ctx.font = "normal 40px 'fishFont_ko'";
        ctx.fillText(fish_letter[i].name, fish_letter[i].x, fish_letter[i].y + 6);
    }
    else {
        ctx.font = "normal 50px 'fishFont_en'";
        ctx.fillText(fish_letter[i].name, fish_letter[i].x, fish_letter[i].y + 3);
    }
    
    
}

function drawFish(i, fishScale) {
    ctx.globalAlpha = 1;
    var transX = fish_fish[i].x;
    var transY = fish_fish[i].y;
    var transAngle = fish_fish[i].angle;
    ctx.translate(transX, transY);
    ctx.rotate(transAngle);
    ctx.lineWidth = 1;

    // 몸통몸통몸통몸통
    ctx.beginPath();
    ctx.fillStyle = fish_fish[i].color;
    ctx.strokeStyle = fish_fish[i].color;
    ctx.arc(0, - fishScale / 2, fishScale - 1, Math.PI / 6, Math.PI * 5 / 6);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, fishScale / 2, fishScale - 1, Math.PI * 7 / 6, Math.PI * 11 / 6);
    ctx.fill();
    ctx.stroke();

    // 꼬리꼬리꼬리꼬리
    if(fish_fish[i].taleTimer > 3) {
        fish_fish[i].taleAngle += fish_fish[i].taleDir;
        fish_fish[i].taleTimer = 0;
    }
    fish_fish[i].taleTimer++;
    if(fish_fish[i].taleAngle >= Math.PI / 180 * 10) {
        fish_fish[i].taleDir = -Math.PI / 180;
    }
    else if(fish_fish[i].taleAngle <= -Math.PI / 180 * 10) {
        fish_fish[i].taleDir = Math.PI / 180;
    }
    ctx.rotate(fish_fish[i].taleAngle);
    ctx.beginPath();
    ctx.moveTo(fishScale / 4 - fishScale / 2 * 1.73, 0);
    ctx.lineTo(- fishScale / 2 - fishScale / 2 * 1.73, + fishScale / 3);
    ctx.lineTo(- fishScale / 3 - fishScale / 2 * 1.73, 0);
    ctx.lineTo(- fishScale / 2 - fishScale / 2 * 1.73, - fishScale / 3);
    ctx.lineTo(+ fishScale / 4 - fishScale / 2 * 1.73, 0);
    ctx.fill();
    ctx.stroke();
    ctx.rotate(-fish_fish[i].taleAngle);

    //눈눈눈눈눈눈눈눈
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(fishScale / 4 , 0, fishScale / 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.rotate(-transAngle);
    ctx.translate(-transX, -transY);
}

function fishDraw() {
    for(var i = 0 ; i < fish_letter.length ; i++) {
        drawRod(i);
    }
    for(var i = 0 ; i < fish_fish.length ; i++) {
        drawFish(i, 40);
    }
    
}

function fishUpdate() {
    if(inputBar.value.length > fish_letterLimit) {
        inputBar.value = inputBar.value.substr(0, fish_letterLimit);
    }
    
    if(lineSize.value != fish_fishLimit) {
        if(lineSize.value > 30) {
            fish_fishLimit = 30;
            lineSize.value = 30;
        }
        else if(lineSize.value < 1 && lineSize.value != "") {
            fish_fishLimit = 1;
            lineSize.value = 1;
        }
        else {
            fish_fishLimit = lineSize.value;
        }
        reset();
    }
    

    if(fish_letterLimit != brushSize.value) {
        if(brushSize.value > 20) {
            fish_letterLimit = 20;
            brushSize.value = 20;
        }
        else if(brushSize.value < 1 && brushSize.value != "") {
            fish_letterLimit = 1;
            brushSize.value = 1;
        }
        else {
            fish_letterLimit = brushSize.value;
        }
        reset();
    }
    


    if(INPUT_STATE) {
        inputBar.style.backgroundColor = "gray";
        inputBar.style.color = "white";
    }
    else {
        inputBar.style.backgroundColor = "white";
        inputBar.style.color = "black";
    }

    for(var i = 0 ; i < fish_letter.length ; i++) {
        if(fish_letter[i].state == 1) {
            fish_letter[i].y += (fish_letter[i].maxY - fish_letter[i].y) / 30;
            if(fish_letter[i].y - fish_letter[i].maxY > -1) {
                fish_letter[i].state = 2;
            }
        }
        else if(fish_letter[i].state == 2) {
            if(fish_letter[i].y - fish_letter[i].maxY < -10) {
                fish_letter[i].dir = 1;
            }
            else if(fish_letter[i].y - fish_letter[i].maxY > 10) {
                fish_letter[i].dir = -1;
            }
            fish_letter[i].y += fish_letter[i].dir / 15;

            
            if(fish_letter[i].predator != null) {
                if(fish_letter[i].y - fish_fish[fish_letter[i].predator].y < 50
                    && fish_letter[i].y - fish_fish[fish_letter[i].predator].y > -50
                    && fish_letter[i].x - fish_fish[fish_letter[i].predator].x < 50
                    && fish_letter[i].x - fish_fish[fish_letter[i].predator].x > -50) {
                        fish_letter[i].state = 3;
                    }
            }
            
            
        }
        else if(fish_letter[i].state == 3) {
            fish_letter[i].y -= (fish_letter[i].y + 100) / 40;
            fish_fish[fish_letter[i].predator].y -= (fish_letter[i].y + 100) / 200;
        }
    }
    for(var i = 0 ; i < fish_fish.length ; i++) {
        if(fish_fish[i].state == 1) {
            fish_fish[i].velocity = 2;
            if(fish_fish[i].x < 0) {
                fish_fish[i].dir = "right";
            }
            else if(fish_fish[i].x > window.innerWidth) {
                fish_fish[i].dir = "left";
            }

            if(fish_fish[i].dir == "left") {
                fish_fish[i].angle = Math.PI - fish_fish[i].taleAngle;
            }
            else {
                fish_fish[i].angle = - fish_fish[i].taleAngle;
            }

            for(var j = 0 ; j < fish_letter.length ; j++) {
                if(fish_letter[j].predator == null && fish_letter[j].state == 2) {
                    fish_fish[i].prey = j;
                    fish_letter[j].predator = i;
                    fish_fish[i].state = 2;
                    fish_fish[i].velocity = 4;
                    break;
                }
            }
        }
        else if(fish_fish[i].state == 2) {
            fish_fish[i].angle += ((getAngle(i) - fish_fish[i].angle + Math.PI) % (2 * Math.PI) - Math.PI) / 20;
        }
        fish_fish[i].x += Math.cos(fish_fish[i].angle) * fish_fish[i].velocity;
        fish_fish[i].y += Math.sin(fish_fish[i].angle) * fish_fish[i].velocity;
        
    }
    if(fish_fish.length != 0) {
        for(var i = 0 ; i < fish_fish.length ; i++) {
            if(fish_fish[i].y < -70) {
                var preyNum = fish_fish[i].prey;
                fish_letter.splice(preyNum, 1);
                for(var j = 0 ; j < fish_fish.length ; j++) {
                    if(fish_fish[j].prey > preyNum) {
                        fish_fish[j].prey--;
                    }
                }
                var predatorNum = i;
                fish_fish.splice(predatorNum, 1);
                for(var j = 0 ; j < fish_letter.length ; j++) {
                    if(fish_letter[j].predator > predatorNum) {
                        fish_letter[j].predator--;
                    }
                }
                i--;
            }
        }
        
    }
    

    
}

function getAngle(i) {
	var rad = Math.atan2(fish_letter[fish_fish[i].prey].y - fish_fish[i].y, fish_letter[fish_fish[i].prey].x - fish_fish[i].x);
	return rad;
}

const bubble_bubbleConst = class {
    constructor(name, x, y, r, maxR, sin, state, vel, color, popR, isPop) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.r = r;
        this.maxR = maxR;
        this.sin = sin;
        this.state = state;
        this.vel = vel;
        this.color = color;
        this.popR = popR;
        this.isPop = isPop
    }    
}

var bubble_bubble = new Array();
var bubble_timer = 0;
var bubble_text = "";
var bubble_current = 0;
var color = ["#fec250", "#fca84f", "#673653", "#41b193", "#35DBAC", "#EB8389"];
var bubble_ranCooldown = Math.round(Math.random() * 15) + 40;
var bubbleSize = 10; // 1 20
var bubbleSpeed = 10; // 1 20

function bubbleAnimation() {
    for(var i = 0 ; i < bubble_bubble.length ; i++) {
        bubble_bubble[i].sin += Math.PI / 180;
        bubble_bubble[i].y += Math.sin(bubble_bubble[i].sin) / 2;
        bubble_bubble[i].x += bubble_bubble[i].vel;
        if(bubble_bubble[i].r < bubble_bubble[i].maxR) {
            bubble_bubble[i].r += 0.5;
        }
        if(bubble_bubble[i].vel > 1.5 + 0.1 * bubbleSpeed) {
            bubble_bubble[i].vel -= 0.05 + (-0.03 / 19 * bubbleSpeed + 0.045);
        }

        if(bubble_bubble[i].x > (window.innerWidth - 400) || bubble_bubble[i].isPop) {
            if(bubble_bubble[i].popR < bubble_bubble[i].r) {
                bubble_bubble[i].popR += 7;
            }
            else {
                bubble_bubble.splice(i, 1);
            }
        }
    }
}

function bubbleUpdate() {

    if(lineSize.value != bubbleSpeed) {
        if(lineSize.value > 20) {
            bubbleSpeed = 20;
            lineSize.value = 20;
        }
        else if(lineSize.value < 1 && lineSize.value != "") {
            bubbleSpeed = 1;
            lineSize.value = 1;
        }
        else {
            bubbleSpeed = lineSize.value;
        }
        reset();
    }
    

    if(bubbleSize != brushSize.value) {
        if(brushSize.value > 20) {
            bubbleSize = 20;
            brushSize.value = 20;
        }
        else if(brushSize.value < 1 && brushSize.value != "") {
            bubbleSize = 1;
            brushSize.value = 1;
        }
        else {
            bubbleSize = brushSize.value;
        }
        reset();
    }

    if(INPUT_STATE) {
        inputBar.style.backgroundColor = "gray";
        inputBar.style.color = "white";
    }
    else {
        inputBar.style.backgroundColor = "white";
        inputBar.style.color = "black";
    }

    if(bubble_timer > bubble_ranCooldown) {
        if(bubble_current < bubble_text.length) {
            if(bubble_text.charAt(bubble_text.length - 1 - bubble_current) != " ") {
                bubble_bubble.push(new bubble_bubbleConst(bubble_text.charAt(bubble_text.length - 1 - bubble_current),
                -200,
                Math.round(Math.random() * (window.innerHeight - 600) + 300),
                0,
                Math.round(Math.random() * 30) + 30 + 3 * bubbleSize,
                0,
                1,
                10,
                color[Math.floor(Math.random() * color.length)],
                0,
                false));
            }
            bubble_current++;
            bubble_timer = 0;
            bubble_ranCooldown = Math.round(Math.random() * 30) + 30;
        }
        else {
            bubble_current = 0;
            bubble_text = "";
            INPUT_STATE = false;
        }
    }
    bubble_timer++;
}

function bubbleDraw() {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for(var i = bubble_bubble.length - 1 ; i >= 0 ; i--) {

        ctx.globalAlpha = 1;
        ctx.strokeStyle = bubble_bubble[i].color;
        ctx.fillStyle = bubble_bubble[i].color;
        ctx.beginPath();
        ctx.arc(bubble_bubble[i].x, bubble_bubble[i].y, bubble_bubble[i].r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(bubble_bubble[i].x, bubble_bubble[i].y, bubble_bubble[i].r, -1 * Math.PI / 4, 3 * Math.PI / 4);
        ctx.fill();
        ctx.stroke();

        ctx.globalAlpha = 1;

        ctx.fillStyle = "black";
        if(checkKor.test(bubble_bubble[i].name)) {
            ctx.font = "normal " + String(bubble_bubble[i].r * 1.2) + "px 'fishFont_ko'";
            ctx.fillText(bubble_bubble[i].name, bubble_bubble[i].x, bubble_bubble[i].y + (bubble_bubble[i].r / 5));
        }
        else {
            ctx.font = "normal " + String(bubble_bubble[i].r * 1.5) + "px 'fishFont_en'";
            ctx.fillText(bubble_bubble[i].name, bubble_bubble[i].x, bubble_bubble[i].y + (bubble_bubble[i].r / 10));
        }
        

        ctx.fillStyle = "#ec6c54";
        ctx.strokeStyle = "#ec6c54";
        ctx.beginPath();
        ctx.arc(bubble_bubble[i].x, bubble_bubble[i].y, bubble_bubble[i].popR, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}