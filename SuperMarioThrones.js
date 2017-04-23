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
  let count = 0;
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
      if(toreturn.player.checkEnemyCollisions(enemies[i]) == "kill"){enemies[i].setDead();toreturn.player.setJumpAnyway(); toreturn.player.jumping()}}
      if ( toreturn.player.fellThroughMap()) {
        toreturn.player.killPlayer();
        toreturn.lives.subtractLives();
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
          if (crowns[i].drawThis) {
            console.log("crown position" + crowns[i].location.x, crowns[i].location.y);
          }
          console.log("player posiiton " + toreturn.player.location.x, toreturn.player.location.y);
        crowns[i].renderCrowns();
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
     enemies.push(Graphics.enemy({walkertime: walkertime, location: {x: 100, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     enemies.push(Graphics.enemy({walkertime: walkertime, location: {x: 250, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}}));
     crowns.push(Graphics.crown({location: {x:100, y:800}}));
     crowns.push(Graphics.crown({location: {x:200, y:800}}));
     crowns.push(Graphics.crown({location: {x:300, y:800}}));
     crowns.push(Graphics.crown({location: {x:400, y:800}}));
     toreturn.lives = Graphics.lives({x: 10, y: 10, howMany: 3});
     toreturn.map = Graphics.map();
     toreturn.camera = Graphics.camera(0,0, canvas.width, canvas.height, 17000, canvas.height);
    context.clearRect(0,0,canvas.width, canvas.height);
    Game.game_active= true;
      Game.map.renderMap();
      $('.ourView').scrollLeft = 0;
     requestAnimationFrame(gameLoop);
     }


  return toreturn;
}());
