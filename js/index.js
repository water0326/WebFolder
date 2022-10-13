window.onload = function(){
    let indexDiv = document.getElementById('index');
    let indexWebName = document.getElementById('index_web_name');
    let indexButton = document.getElementsByClassName('index_button');
    let indexWave = document.getElementById('index_wave');
    let gameSelectDiv = document.getElementById('select_div');
    let modSel = document.getElementsByClassName('select_mod');
    let backBtn = document.getElementById('select_mod_back');
    
    function indexButtonHover(num) {
        if(num == 0) {
            document.body.style.backgroundColor = "rgb(105, 168, 223)";
        }
        else if(num == 1) {
            document.body.style.backgroundColor = "rgb(105, 223, 166)";
        }
        else if(num == 2) {
            document.body.style.backgroundColor = "rgb(223, 105, 105)";
        }
        else if(num == 3) {
            document.body.style.backgroundColor = "rgb(170, 105, 223)";
        }
    }
    
    function fadeOut(item, time) {
        setTimeout((item) => {
            item.style.opacity = 0;
            item.style.pointerEvents = "none";
        }, time, item);
    }
    
    function fadeIn(item, time, opacity) {
        setTimeout((item, opacity) => {
            item.style.opacity = opacity;
            item.style.pointerEvents = "auto";
        }, time, item, opacity);
    }
    
    function waterUp() {
        indexWave.style.animation = "water_up 4s cubic-bezier(0.1, -0.15, 0.3, 0.2)";
        fadeOut(indexWave, 1900);
    }
    function waterDown() {
        fadeIn(indexWave, 0, 1.0);
        indexWave.style.animation = "water_down 2s linear forwards";
        setTimeout(() => {
            indexWave.style.animation = "wave_rotate 10s linear infinite";
        }, 2000);
    }
    
    function indexButtonClick(num) {
        fadeOut(indexDiv, 0);
        waterUp();
        if(num == 0) {
            fadeIn(gameSelectDiv, 1300, 1.0);
            for(var i = 0 ; i < modSel.length ; i++) {
                setTimeout((Idx) => {
                    modSel[Idx].style.animation = "select_mod_fadeIn 1s cubic-bezier(0.4, 1.4, 0.6, 1.1) forwards";
                }, 1300 + i * 200, i);
            }
            setTimeout(() => {
                backBtn.style.animation = "select_mod_back_fadeIn 1s cubic-bezier(0.4, 1.4, 0.6, 1.1) forwards";
            }, 1300 + i * 200);
            
        }
    }
    
    function modSelect(num) {
        var isContinue = true;
        if(num == -1) {
            isContinue = false;
            num = 0;
        }
        for(var i = 0 ; i < modSel.length ; i++) {
            setTimeout((Idx) => {
                modSel[Idx].style.animation = "select_mod_fadeOut 1s cubic-bezier(0.4, 1.1, 0.6, 1.4) forwards";
            }, i * 200, (num + i) % modSel.length);
        }
        backBtn.style.width = 0;
        backBtn.style.height = 0;
        setTimeout(() => {
            backBtn.style.animation = "select_mod_back_fadeOut 1s cubic-bezier(0.4, 1.1, 0.6, 1.4) forwards";
        }, 200);
        fadeOut(gameSelectDiv, 1000);
        if(isContinue) {
            
        }
        else {
            waterDown();
            fadeIn(indexDiv, 2000, 1.0);
        }
        
    }	
}

