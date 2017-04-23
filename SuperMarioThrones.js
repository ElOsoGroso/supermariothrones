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
  let dimension = 64;
  let enemies = [];
  let crowns = [];
  let particles = [];
  let count = 0;
  let once = true;
  toreturn.player = null;
  toreturn.lives = null;
  toreturn.enemy = null;
  // toreturn.enemy2 = null;
  toreturn.crown = null;
  toreturn.map = null;
  toreturn.camera = null;
  toreturn.onPlat =false;
  toreturn.onGround = true;

  function update(elapsedTime) {
    if(toreturn.player.checkIfWon()){
      if (once){
    playertoadd = prompt("Enter your name for highscores","Enter name here");

      console.log(playertoadd);
      console.log(score);
    $.ajax({
        type: 'POST',
        dataType: "json",
        data: {
          player:playertoadd,
          score:score
        },
        url: 'http://localhost:5000/highscoreset',
        success: function(result){
          scores = result;
        }
    });
    once = false;
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

      // toreturn.player.isOnGround();
      // console.log(toreturn.player.onGround);
      // console.log(toreturn.player.jumpPressed);
      // if (toreturn.player.onGround && !toreturn.player.jumpPressed) {
      //   toreturn.player.yVelocity = 0.0;
      //   toreturn.player.location.y = canvas.height - 128;
      // }

      toreturn.player.update();
      for (let i = 0; i<enemies.length;i++){

        if (!enemies[i].getDead()){
      enemies[i].update(elapsedTime, deltaXView, deltaYView, toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);}
    }
    if(toreturn.player.playerHitCoin) {
      console.log("spawning crown");
      crowns[0].location.x = toreturn.player.location.x -toreturn.camera.viewXCoord;
      crowns[0].location.y = toreturn.player.location.y - 128;
      crowns[0].drawThis = true;
      toreturn.player.playerHitCoin = false;
    }
      for (let i = 0; i<crowns.length;i++){
        crowns[i].update(elapsedTime, deltaXView, deltaYView, toreturn.camera.viewXCoord, toreturn.camera.viewYCoord, toreturn.player.location.x, toreturn.player.location.y);
      }


      // toreturn.enemy2.update(elapsedTime, deltaXView, deltaYView, toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
      for (let i = 0; i<enemies.length;i++){
      if(toreturn.player.checkEnemyCollisions(enemies[i], toreturn.camera.viewXCoord) == "kill"){enemies[i].setDead();toreturn.player.setJumpAnyway(); toreturn.player.jumping();  spawnParticles({x: toreturn.player.location.x - toreturn.camera.viewXCoord, y: toreturn.player.location.y + 64}, 'red' );}}
      if ( toreturn.player.fellThroughMap()) {
        toreturn.player.killPlayer();
        toreturn.lives.subtractLives();
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
    TitlePage.init();
    TitlePage.renderStart();

  }
  toreturn.init = function() {
    console.log("starting game");
//Make the title page disappear and the real page appear//
    let canvas1 = document.getElementById('canvas-main');
    let context1 = canvas1.getContext('2d');
    let canvas2 = document.getElementById('title-page');
    let  context2 = canvas1.getContext('2d');
    canvas2.style.display="none";
    canvas2.style.zIndex = 0;
    canvas1.style.zIndex = 2;
     toreturn.player = Graphics.player();
     enemies.push(Graphics.enemy({source: "ww", walkertime: walkertime, location: {x: 100, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     enemies.push(Graphics.enemy({source: "ww", walkertime: walkertime, location: {x: 2400, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     enemies.push(Graphics.enemy({source: "dd", walkertime: walkertime, location: {x: 1600, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     enemies.push(Graphics.enemy({source: "dd", walkertime: walkertime, location: {x: 1200, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     enemies.push(Graphics.enemy({source: "jj", walkertime: walkertime, location: {x: 5800, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     enemies.push(Graphics.enemy({source: "jj", walkertime: walkertime, location: {x: 4000, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     enemies.push(Graphics.enemy({source: "dd", walkertime: walkertime, location: {x: 6000, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     enemies.push(Graphics.enemy({source: "dd", walkertime: walkertime, location: {x: 8000, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     crowns.push(Graphics.crown({location: {x:10 * 64, y: 12 * 64}}));
     crowns.push(Graphics.crown({location: {x:11 * 64, y: 12 * 64}}));
     crowns.push(Graphics.crown({location: {x:13 * 64, y:9 * 64}}));
     crowns.push(Graphics.crown({location: {x:14 * 64, y:9 * 64}}));
     crowns.push(Graphics.crown({location: {x:36 * 64, y:7 * 64}}));
     for ( let i = 50; i < 70; i+=2 ) {
       crowns.push(Graphics.crown({location: {x:i * 64, y:12 * 64}}));
     }
     crowns.push(Graphics.crown({location: {x:97 * 64, y:9 * 64}}));
     crowns.push(Graphics.crown({location: {x:98 * 64, y:9 * 64}}));
     crowns.push(Graphics.crown({location: {x:104 * 64, y:16 * 64}}));
     crowns.push(Graphics.crown({location: {x:105 * 64, y:16 * 64}}));
     crowns.push(Graphics.crown({location: {x:106 * 64, y:16 * 64}}));
     let helper = 14;
     for ( let i = 148; i < 153; i++ ) {
       crowns.push(Graphics.crown({location: {x:i * 64, y:i-147 + helper * 64}}));
       helper--;
     }
     toreturn.lives = Graphics.lives({x: 10, y: 10, howMany: 3});
     toreturn.map = Graphics.map();
     toreturn.camera = Graphics.camera(0,0, canvas.width, canvas.height, 17000, canvas.height);
    context.clearRect(0,0,canvas.width, canvas.height);
    Game.game_active= true;
      Game.map.renderMap();
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
