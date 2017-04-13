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
  toreturn.controls_active = false;
  toreturn.high_scores_active = false;
  toreturn.game_active = false;
  toreturn.plr = null;
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
    }

    function render(elapsedTime) {


        if (toreturn.controls_active) {

          Controls.drawControls();
          // inputDispatch[13] = Controls.selectOption();
          if (Controls.enter_active) {
            Controls.selectOption();
          }
        }

        if (toreturn.high_scores_active) {

          HighScores.drawHighScores();
        }

        if (toreturn.game_active && toreturn.camera) {
          context.clearRect(0,0,canvas.width, canvas.height);
          toreturn.map.drawMap(toreturn.camera.xView, toreturn.camera.yView);
          toreturn.plr.drawPlayer(toreturn.camera.xView, toreturn.camera.yView);

          //on down arrow
          inputDispatch[40] = 0;

          //on up arrow
          // inputDispatch[38] = 0;

          //on enter
          inputDispatch[13] = 0;

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
       toreturn.map = Graphics.map();
       toreturn.camera = Graphics.camera(0,0, canvas.width, canvas.height, 100048, canvas.height);
       // console.log(toreturn.plr.pos.x);
        context.clearRect(0,0,canvas.width, canvas.height);
        // Game.map = Map.map();
        if (!Game.controls_active && !Game.high_scores_active){

          Game.game_active = true;
          // $('#menuSprite').addClass('hidden');
          // $('#controlsSprite').addClass('hidden');
        }
        Game.map.drawMap();
        $('.ourView').scrollLeft = 0;
        // console.log(Game.map);





       // toreturn.map.drawMap();

       // Map.initialize();
       requestAnimationFrame(gameLoop);
     }


  return toreturn;
}());
