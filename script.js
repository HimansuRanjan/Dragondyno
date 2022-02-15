score = 0;
var cross = true;
var g_Over = false;

const music = new Audio('music.mp3');
const overAudio = new Audio('over.mp3');

setTimeout(()=>{
    music.play();
},2000);


document.onkeydown = function(e){
    //console.log(e.keyCode);
    if(g_Over==true){
        return;
    }
    if(e.keyCode==38){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino');
        },800);
    }
    if(e.keyCode==39){
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + "px";  
    }
    if(e.keyCode==37){
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinox - 112) + "px";  
    }
}

setInterval(()=>{
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);

    if(offsetX<90 && offsetY<50  && !g_Over){
        g_Over = true;
        gameOver.innerHTML = "Game Over!";
        gameOver.classList.add('gameani');
        
        //reload button
        reloadBtn = document.querySelector('.btn');
        reloadBtn.style.visibility = 'visible';
        reloadBtn. addEventListener("click", ()=>{
            reload = location. reload();
        }, false);

        obstacle.classList.remove('dragon');
        overAudio.play();
        setTimeout(()=>{
            overAudio.pause();
        },1870);
        music.pause();
    }else if(offsetX<120 && cross && !g_Over){
        score +=1;
        updateScore(score);
        cross = false;
        setTimeout(()=>{
            cross = true;
        },1000);
        setTimeout(()=>{
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if(aniDur>2.6){
                newDur = aniDur - 0.07;
                obstacle.style.animationDuration = (newDur) + "s";
            }   
           
        },700);
        
    }
},100);

function updateScore(score){
    document.querySelector('.scoreCont').innerHTML = "Your Score: " + score;
}
