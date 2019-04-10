'use strict';

let Sounds = {}
function loadAudio() {

Sounds['theme'] = loadSound('Audio/opentheme.mp3');
Sounds['click'] = loadSound('Audio/click.ogg');
Sounds['hover'] = loadSound('Audio/hover.mp3');
Sounds['jump'] = loadSound('Audio/jump.mp3');
Sounds['wilhelm'] = loadSound('Audio/wilhelm.mp3');
Sounds['bop'] = loadSound('Audio/bop.mp3');
Sounds['coin'] = loadSound('Audio/coin.mp3');

}
function loadSound(source) {
  let sound = new Audio();
  sound.src = source;
  return sound;
}
function playSound(which){
  Sounds[which].play();
}
let Game = (function() {
  let toreturn = {};
  let inputDispatch = {};
  let lastTime = performance.now();
  let elapsedTime = 0;
  let canvas = $('#canvas-main').get(0);
  let context = canvas.getContext('2d');
  let deltaXView = 0;
  let previousXView = 0;
  let deltaYView = 0;
  let previousYView = 0;
  let dimension = 32;
  let enemies = [];
  let crowns = [];
  let particles = [];
  let count = 0;
  let once = true;
  let stopscore = false;
  let timeSinceLastCoinCollected = 0;
  let coinsCollected = 0;
  let firststart = true;
  toreturn.fireball = null;
  toreturn.player = null;
  toreturn.lives = null;
  toreturn.enemy = null;
  // toreturn.enemy2 = null;
  toreturn.crown = null;
  toreturn.map = null;
  toreturn.camera = null;
  toreturn.onPlat =false;
  toreturn.onGround = true;

  toreturn.first = false;
  toreturn.second = false;
  toreturn.showSaving = function(){
    $("a").show();
  }
  toreturn.appendDiv= function(){
    $("a").hide();
    $("p").show();
  }
  toreturn.updatePositions = function (){
    // console.log("hello");
    $.ajax({
        type: 'POST',
        dataType: "json",
        data: {
          time:totalTime,
        },
        url: 'https://supermariothrones.netlify.com/updateTime',
        success: function(result){
          console.log("we postedt the time");
        }
    });
    $.ajax({
        type: 'POST',
        dataType: "json",
        data: {
          score:score,
        },
        url: 'https://supermariothrones.netlify.com/updateScore',
        success: function(result){
          console.log("we postedt the score");
        }
    });
    console.log("before ajax post" + toreturn.lives.livesRemaining);
    $.ajax({
        type: 'POST',
        dataType: "json",
        data: {
          lives:toreturn.lives.livesRemaining,
        },
        url: 'https://supermariothrones.netlify.com/updateLives',
        success: function(result){
          console.log("we postedt the lives");
        }
    });
    $.ajax({
        type: 'POST',
        dataType: "json",
        data: {
          playerid:"player",
          playerposx:toreturn.player.location.x,
          playerposy:toreturn.player.location.y,
        },
        url: 'https://supermariothrones.netlify.com/updatePosPlayer',
        success: function(result){
          // console.log("we win");
        }
    });
    toreturn.first = true;
  }
  toreturn.updateEnemyPositions = function(){
      console.log(enemies);
      console.log(countajax);
      console.log("length:" +enemies.length);
      if(enemies.length>0){
      if(countajax==enemies.length-1){toreturn.second = true;}
      else if(countajax ==0 && enemies.length==1){toreturn.second =true;}
      $.ajax({
          type: 'POST',
          dataType: "json",
          async: true,
          data: {
            enemyid:enemies[countajax].id,
            enemyposx:enemies[countajax].locationforupdate.x,
            enemyposy:enemies[countajax].location.y-100
          },
          url: 'https://supermariothrones.netlify.com/updatePos',
          success: function(result){
            console.log("we won");
            countajax++;
            if (countajax<enemies.length){toreturn.updateEnemyPositions();}
          }
      });}
      else{toreturn.second = true;}

    }
  function update(elapsedTime) {
    if(firststart){elapsedTime = 0;firststart =false;}
    totalTime += elapsedTime/1000;
    // console.log(totalTime);
    if(toreturn.first && toreturn.second){
      toreturn.appendDiv();
    }
    else if (toreturn.first && !toreturn.second){
      toreturn.showSaving();
    }
    if(toreturn.player.checkExitToMenu() || postedhighscore){
      location.reload();
    }
    if(toreturn.player.checkIfWon()){
      if (once){
        if(totalTime<10){let scoretoadd = 1000000;score += scoretoadd;
          playertoadd = prompt("You finished! Your time bonus was "+ scoretoadd +". Enter your name for highscores","Enter name here");
          $.ajax({
              type: 'POST',
              dataType: "json",
              data: {
                player:playertoadd,
                score:score
              },
              url: 'https://supermariothrones.netlify.com/highscoreset',
              success: function(result){
                // scores = result;
              }
          });
          once = false;}
        else if (totalTime>=10 && totalTime<20){let scoretoadd = 30000;
          score += scoretoadd;
          playertoadd = prompt("You finished! Your time bonus was "+ scoretoadd +". Enter your name for highscores","Enter name here");

          $.ajax({
              type: 'POST',
              dataType: "json",
              data: {
                player:playertoadd,
                score:score
              },
              url: 'https://supermariothrones.netlify.com/highscoreset',
              success: function(result){
                // scores = result;
              }
          });
          once = false;
        }
        else if (totalTime>=20 && totalTime<30){
          let scoretoadd = 5000;
          score += scoretoadd;
          playertoadd = prompt("You finished! Your time bonus was "+ scoretoadd +". Enter your name for highscores","Enter name here");
          $.ajax({
              type: 'POST',
              dataType: "json",
              data: {
                player:playertoadd,
                score:score
              },
              url: 'https://supermariothrones.netlify.com/highscoreset',
              success: function(result){
                // scores = result;
              }
          });
          once = false;}
        else if (totalTime>=30 && totalTime<40){let scoretoadd = 5000;
          score += scoretoadd;
          playertoadd = prompt("You finished! Your time bonus was "+ scoretoadd +". Enter your name for highscores","Enter name here");
          $.ajax({
              type: 'POST',
              dataType: "json",
              data: {
                player:playertoadd,
                score:score
              },
              url: 'https://supermariothrones.netlify.com/highscoreset',
              success: function(result){
                // scores = result;
              }
          });
          once = false;}
        else if (totalTime>=40 && totalTime<50){let scoretoadd = 2500;
          score += scoretoadd;
          playertoadd = prompt("You finished! Your time bonus was "+ scoretoadd +". Enter your name for highscores","Enter name here");
          $.ajax({
              type: 'POST',
              dataType: "json",
              data: {
                player:playertoadd,
                score:score
              },
              url: 'https://supermariothrones.netlify.com/highscoreset',
              success: function(result){
                // scores = result;
              }
          });
          once = false;}
        else if(totalTime >60) {let scoretoadd = 1000;score += scoretoadd;
          playertoadd = prompt("You finished! Your time bonus was "+ scoretoadd +". Enter your name for highscores","Enter name here");
          $.ajax({
              type: 'POST',
              dataType: "json",
              data: {
                player:playertoadd,
                score:score
              },
              url: 'https://supermariothrones.netlify.com/highscoreset',
              success: function(result){
                // scores = result;
              }
          });
          once = false;}
          else if(totalTime >80) {let scoretoadd = -1000;score += scoretoadd;
            playertoadd = prompt("You finished! Your time bonus was "+ scoretoadd +". Enter your name for highscores","Enter name here");
            $.ajax({
                type: 'POST',
                dataType: "json",
                data: {
                  player:playertoadd,
                  score:score
                },
                url: 'https://supermariothrones.netlify.com/highscoreset',
                success: function(result){
                  // scores = result;
                }
            });
            once = false;}


  }}
      for(let i = 0 ;i <enemies.length;i++){
        if (enemies[i].drawdeath){
          enemies[i].deathlocation.y-=5;
          enemies[i].alpha-=.05;
        }
      }

      if (toreturn.camera){
        toreturn.camera.update();
      }


      deltaXView = toreturn.camera.viewXCoord - previousXView;
      deltaYView = toreturn.camera.viewYCoord - previousYView;

      previousXView = toreturn.camera.viewXCoord;
      previousYView = toreturn.camera.viewYCoord;



      toreturn.player.update();
      for (let i = 0; i<enemies.length;i++){

        if (!enemies[i].getDead()){
      enemies[i].update(elapsedTime, deltaXView, deltaYView, toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);}
    }
    timeSinceLastCoinCollected += elapsedTime;
    if(toreturn.player.playerHitCoin) {
      if (timeSinceLastCoinCollected >= 2000 && coinsCollected < 4) {
        crowns[0].location.x = 1440 - toreturn.camera.viewXCoord;
        crowns[0].location.y = 375;
        crowns[0].drawThis = true;
        toreturn.player.playerHitCoin = false;
        timeSinceLastCoinCollected = 0;
        coinsCollected++;
      }
    }
      for (let i = 0; i<crowns.length;i++){
        crowns[i].update(elapsedTime, deltaXView, deltaYView, toreturn.camera.viewXCoord, toreturn.camera.viewYCoord, toreturn.player.location.x, toreturn.player.location.y);
      }

      // console.log(toreturn.player.fireZeWeapons);
      if (toreturn.player.fireZeWeapons){
        toreturn.fireball.create(toreturn.player.location, toreturn.player.direction);
        // console.log("fireball at " + toreturn.fireball.location.x);
        // console.log("Player at " + toreturn.player.location.x);
        toreturn.player.fireZeWeapons = false;
    }
    toreturn.fireball.update(elapsedTime, deltaXView, deltaYView, toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);

    if(toreturn.fireball.drawThis){
      for (let i =0; i<enemies.length; i++){
        toreturn.fireball.checkEnemyCollideFire(enemies[i].location.x + toreturn.camera.viewXCoord, enemies[i].location.y + toreturn.camera.viewYCoord, enemies[i].id)
       if (toreturn.fireball.idtokill !="nothing"){
         if(toreturn.fireball.idtokill == enemies[i].id){
           if(!enemies[i].stopscore){
             spawnParticles({x: enemies[i].location.x, y: enemies[i].location.y + 64/2}, 'red' );
         enemies[i].setDead();
         enemies[i].drawdeath = true;
         enemies[i].stopscore =true;

            }
          }
       }
     }

     }

      // toreturn.enemy2.update(elapsedTime, deltaXView, deltaYView, toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
      for (let i = 0; i<enemies.length;i++){
      if(toreturn.player.checkEnemyCollisions(enemies[i], toreturn.camera.viewXCoord) == "kill"){enemies[i].setDead();toreturn.player.setJumpAnyway(); toreturn.player.jumping();  spawnParticles({x: toreturn.player.location.x - toreturn.camera.viewXCoord, y: toreturn.player.location.y + 64/2}, 'red' );}}
      if ( toreturn.player.fellThroughMap()) {
        toreturn.player.killPlayer();
        toreturn.lives.subtractLives();
      }
      else if (toreturn.player.enemyKilledMe){
        toreturn.player.killPlayer();
        toreturn.lives.subtractLives();
        toreturn.player.enemyKilledMe= false;
      }
      for (let x = 0; x < particles.length; x++ ) {
          particles[x].update(elapsedTime);
      }
    }

    function render(elapsedTime) {

        if (toreturn.game_active && toreturn.camera) {
          context.clearRect(0,0,canvas.width, canvas.height);
          // if(changes){
          //  toreturn.map.updatemap();
          //   changes = false;
          // }
          toreturn.map.renderMap(toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);

          toreturn.player.renderPlayer(toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
          for(let i = 0; i<enemies.length;i++){
          enemies[i].renderEnemy(toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
        }
          // toreturn.enemy2.renderEnemy(toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
          toreturn.lives.renderLives();

          for(let i = 0; i<enemies.length;i++){
            if(enemies[i].drawdeath){
          enemies[i].renderDeathScores();}
        }
        for(let i = 0; i<crowns.length;i++){
        crowns[i].renderCrowns();
        }
        for ( let x = 0; x < particles.length; x++ ) {
          particles[x].draw();
        }
        if(toreturn.fireball.drawThis){
        toreturn.fireball.renderFireball(toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
      }
        }

      }
      function gameLoop(time) {
        elapsedTime = time - lastTime;

        lastTime = time;

        update(elapsedTime);
        render(elapsedTime);
        requestAnimationFrame(gameLoop);
      }

      function keyDown(e) {
        if (inputDispatch.hasOwnProperty(e.keyCode)) {
            inputDispatch[e.keyCode](elapsedTime);
        }
      }


  toreturn.inittitle = function(){
    loadAudio();
    playSound('theme');
    Sounds['theme'].addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
    TitlePage.init();
    TitlePage.renderStart();

  }
  toreturn.init = function() {

    if (newgame){score = 0;}
    if (newgame){livesLeft=3};
    console.log("starting game");
//Make the title page disappear and the real page appear//
    let canvas1 = document.getElementById('canvas-main');
    let context1 = canvas1.getContext('2d');
    let canvas2 = document.getElementById('newload');
    let  context2 = canvas1.getContext('2d');
    let canvas3 = document.getElementById('title-page');
    let context3 = canvas3.getContext('2d');
    canvas3.style.display = "none";
    canvas3.style.zIndex = 0;
    canvas2.style.display="none";
    canvas2.style.zIndex = 0;
    canvas1.style.zIndex = 2;
    toreturn.fireball = Graphics.fireball();
    for(let i =0; i<spritepositions.length;i++){
      if (spritepositions[i].spritetype == "player"){
        playerlocation = {x: spritepositions[i].spritelocationx, y:spritepositions[i].spritelocationy};
      }
    }
    if (newgame){
      toreturn.player = Graphics.player({x:64/2,y:1024/2});
    }
    else{
    toreturn.player = Graphics.player(playerlocation);
  }
     if (newgame){

        enemies.push(Graphics.enemy({id: "walker0", source: "ww", walkertime: walkertime, location: {x: 550, y: 320}}));
        enemies.push(Graphics.enemy({id: "walker1", source: "ww", walkertime: walkertime, location: {x: 2200/2, y: 550/2}}));
        enemies.push(Graphics.enemy({id: "dothraki0", source: "dd", walkertime: walkertime, location: {x: 4900/2, y: 1000/2}}));
        enemies.push(Graphics.enemy({id: "dothraki1", source: "dd", walkertime: walkertime, location: {x: 5700/2, y: 600/2}}));
        enemies.push(Graphics.enemy({id: "dothraki2", source: "dd", walkertime: walkertime, location: {x:6091/2, y: 840/2}}));
        enemies.push(Graphics.enemy({id: "dothraki3", source: "dd", walkertime: walkertime, location: {x: 7900/2, y: 1000/2}}));
        enemies.push(Graphics.enemy({id: "joffrey0", source: "jj", walkertime: walkertime, location: {x: 4000/2, y: 100/2}}));
        enemies.push(Graphics.enemy({id: "joffrey1", source: "jj", walkertime: walkertime, location: {x: 7200/2, y: 1000/2}}));
        enemies.push(Graphics.enemy({id: "joffrey3", source: "jj", walkertime: walkertime, location: {x: 3300/2, y: 900/2}}));
        // enemies.push(Graphics.enemy({id: "joffrey4", source: "jj", walkertime: walkertime, location: {x: 3600/2, y: 900/2}}));
     }
     else{
     for (let i = 0; i<spritepositions.length;i++){

     if (spritepositions[i].spritetype == "walker0" || spritepositions[i].spritetype == "walker1"){
       if(spritepositions[i].spritelocationx >=0 && spritepositions[i].spritelocationy >=0){
     enemies.push(Graphics.enemy({id: spritepositions[i].spritetype, source: "ww", walkertime: walkertime, location: {x: spritepositions[i].spritelocationx, y: spritepositions[i].spritelocationy}}));
      }
   }
    else if (spritepositions[i].spritetype == "dothraki0" || spritepositions[i].spritetype == "dothraki2" || spritepositions[i].spritetype == "dothraki3" ){
      if(spritepositions[i].spritelocationx >=0 && spritepositions[i].spritelocationy >=0){
     enemies.push(Graphics.enemy({id: spritepositions[i].spritetype, source: "dd", walkertime: walkertime, location: {x: spritepositions[i].spritelocationx, y: spritepositions[i].spritelocationy}}));
   }
   }
   else if (spritepositions[i].spritetype == "joffrey0" || spritepositions[i].spritetype == "joffrey1" || spritepositions[i].spritetype == "joffrey3")
   if(spritepositions[i].spritelocationx >=0 && spritepositions[i].spritelocationy >=0){
     enemies.push(Graphics.enemy({id: spritepositions[i].spritetype, source: "jj", walkertime: walkertime, location: {x: spritepositions[i].spritelocationx, y: spritepositions[i].spritelocationy}}));
    }
   }
   }
     crowns.push(Graphics.crown({location: {x:(10 * 64)/2, y: (12 * 64)/2}}));
     crowns.push(Graphics.crown({location: {x:(11 * 64)/2, y: (12 * 64)/2}}));
     crowns.push(Graphics.crown({location: {x:(13 * 64)/2, y:(9 * 64)/2}}));
     crowns.push(Graphics.crown({location: {x:(14 * 64)/2, y:(9 * 64)/2}}));
     crowns.push(Graphics.crown({location: {x:(36 * 64)/2, y:(7 * 64)/2}}));
     for ( let i = 50; i < 70; i+=2 ) {
       crowns.push(Graphics.crown({location: {x:(i * 64)/2, y:(12 * 64)/2}}));
     }
     crowns.push(Graphics.crown({location: {x:(97 * 64)/2, y:(9 * 64)}}));
     crowns.push(Graphics.crown({location: {x:(98 * 64)/2, y:(9 * 64)}}));
     crowns.push(Graphics.crown({location: {x:(104 * 64)/2, y:(16 * 64)}}));
     crowns.push(Graphics.crown({location: {x:(105 * 64)/2, y:(16 * 64)}}));
     crowns.push(Graphics.crown({location: {x:(106 * 64)/2, y:(16 * 64)}}));
     let helper = 14;
     for ( let i = 148; i < 153; i++ ) {
       crowns.push(Graphics.crown({location: {x:(i * 64)/2, y:(i-147 + helper * 64)/2}}));
       helper--;
     }
     toreturn.lives = Graphics.lives({x: 10, y: 10, livesLeft: livesLeft});
     toreturn.map = Graphics.map();
     toreturn.camera = Graphics.camera(0,0, canvas.width, canvas.height, 17000/2, canvas.height);
     context.clearRect(0,0,canvas.width, canvas.height);
     Game.game_active= true;
     Game.map.renderMap();
     if (newgame){totalTime= 0;}
     else{
     $.ajax({
         type: 'GET',
         url: 'https://supermariothrones.netlify.com/getTime',
         success: function(result){
           totalTime = result[0].time;
           console.log("we got the time");

         }
     });}
      $('.ourView').scrollLeft = 0;
     requestAnimationFrame(gameLoop);
     }

     function scaleNumber(num, min, max, scaleMin, scaleMax) {
       return ((num - min) / (max - min) * (scaleMax - scaleMin) + scaleMin);
     }

     function spawnParticles(at, color) {
       let thisMany = 15;
       let minSpeed = -0.35;
       let maxSpeed = 0.35;
       for ( let num = 0; num < thisMany; num++ ) {
         particles.push(Graphics.particle({
             position: {
               x: at.x,
               y: at.y
             },
             xSpeed: scaleNumber(Math.floor(Math.random() * 100) + 1, 1, 100, minSpeed, maxSpeed),
             ySpeed: scaleNumber(Math.floor(Math.random() * 100) + 1, 1, 100, minSpeed, maxSpeed),
             drawThis: true,
             color: color,
           })
         );
       }
     }


  return toreturn;
}());
