'use strict';
let Sounds = {}
function loadAudio() {

Sounds['theme'] = loadSound('Audio/opentheme.mp3');
Sounds['click'] = loadSound('Audio/click.ogg');
Sounds['hover'] = loadSound('Audio/hover.mp3');
Sounds['jump'] = loadSound('Audio/jump.mp3');

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

  toreturn.player = null;
  toreturn.enemy = null;
  toreturn.map = null;
  toreturn.camera = null;
  toreturn.onPlat =false;
  toreturn.onGround = true;

  function update(elapsedTime) {
      if (toreturn.camera){
        toreturn.camera.update();
      }

      deltaXView = toreturn.camera.viewXCoord - previousXView;
      deltaYView = toreturn.camera.viewYCoord - previousYView;

      previousXView = toreturn.camera.viewXCoord;
      previousYView = toreturn.camera.viewYCoord;

      toreturn.player.yVelocity += toreturn.player.gravity;
      toreturn.player.location.y += toreturn.player.yVelocity;
      // toreturn.player.isOnGround();
      // console.log(toreturn.player.onGround);
      // console.log(toreturn.player.jumpPressed);
      // if (toreturn.player.onGround && !toreturn.player.jumpPressed) {
      //   toreturn.player.yVelocity = 0.0;
      //   toreturn.player.location.y = canvas.height - 128;
      // }
      if (toreturn.player.location.y >= canvas.height - dimension*2 && toreturn.onPlat == false) {
        toreturn.player.onGround = true;
        toreturn.player.yVelocity = 0.0;
        toreturn.player.location.y = canvas.height - dimension*2;
      }
      if (toreturn.enemy.location.y >= canvas.height - dimension*2 && toreturn.onPlat == false) {
        toreturn.enemy.onGround = true;
        toreturn.enemy.yVelocity = 0.0;
        toreturn.enemy.location.y = canvas.height - dimension*2;
      }

      toreturn.enemy.update(elapsedTime, deltaXView, deltaYView, toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
    }

    function render(elapsedTime) {

        if (toreturn.game_active && toreturn.camera) {
          context.clearRect(0,0,canvas.width, canvas.height);
          toreturn.map.renderMap(toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
          toreturn.player.renderPlayer(toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
          toreturn.enemy.renderEnemy(toreturn.camera.viewXCoord, toreturn.camera.viewYCoord);
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
     toreturn.enemy = Graphics.enemy({walkertime: walkertime, location: {x: 100, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}});
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
