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
  let previousTime = performance.now();
  let elapsedTime = 0;
  let canvas = $('#canvas-main').get(0);
  let context = canvas.getContext('2d');

  toreturn.high_scores_active = false;
  toreturn.game_active = false;
  toreturn.plr = null;
  toreturn.enemy = null;
  toreturn.map = null;
  toreturn.camera = null;
  toreturn.on_platform =false;

  function update(elapsedTime) {
      if (toreturn.camera){

        toreturn.camera.update();
      }

      toreturn.plr.velocity_y += toreturn.plr.gravity;
      toreturn.plr.pos.y += toreturn.plr.velocity_y;

      if (toreturn.plr.pos.y >= canvas.height - 128 && toreturn.on_platform == false) {
        toreturn.plr.on_ground = true;
        toreturn.plr.velocity_y = 0.0;
        toreturn.plr.pos.y = canvas.height - 128;
      }

      toreturn.enemy.update(elapsedTime);
    }

    function render(elapsedTime) {


        if (controls_active) {
          Controls.drawControls();
          // inputDispatch[13] = Controls.selectOption();

        }

        if (toreturn.high_scores_active) {

          HighScores.drawHighScores();
        }

        if (toreturn.game_active && toreturn.camera) {
          context.clearRect(0,0,canvas.width, canvas.height);
          toreturn.map.drawMap(toreturn.camera.xView, toreturn.camera.yView);
          toreturn.plr.drawPlayer(toreturn.camera.xView, toreturn.camera.yView);
          toreturn.enemy.drawEnemy(toreturn.camera.xView, toreturn.camera.yView);


        }

      }
      function gameLoop(time) {
        elapsedTime = time - previousTime;

        previousTime = time;

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

       toreturn.plr = Graphics.player();
       toreturn.enemy = Graphics.enemy({walkertime: walkertime, pos: {x: 100, y: 100}, range: {minX: 10, maxX: 1000, minY: 0, maxY: 900}});
       toreturn.map = Graphics.map();
       toreturn.camera = Graphics.camera(0,0, canvas.width, canvas.height, 100048, canvas.height);
        context.clearRect(0,0,canvas.width, canvas.height);
        if (!controls_active && !Game.high_scores_active){
          Game.game_active = true;
        }
        Game.map.drawMap();
        $('.ourView').scrollLeft = 0;
       requestAnimationFrame(gameLoop);
     }


  return toreturn;
}());
