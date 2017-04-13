
let HighScores = (function(){
  let that = {};
  let canvas = $('#high-score').get(0);
  console.log(canvas);
  let context = canvas.getContext('2d');
  let bg = new Image();
  let bg_ready = false;
  let x = 640;

  bg.onload = () => {
    bg_ready = true;
  };

  bg.src = 'Images/background/bg.png';

  function drawHighScores() {
      if(bg_ready) {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(bg,0,0, canvas.width, canvas.height);

        context.textAlign = 'center';
        context.fillStyle = '#b3b3b3';

        context.shadowColor = 'black';
        context.shadowBlur = 7;
        context.lineWidth = 5;

        context.font = "80px Calibri"

        context.strokeText('High Scores:', x, 100);
        context.fillText("High Scores:", x,  100);


        context.font = '20px Calibri';

        context.strokeText('Press ESC To Exit High Scores', x, 550);
        context.fillText("Press ESC To Exit High Scores", x,  550);


      }

  }

  that.initialize = function() {
    // $('#menuSprite').addClass('hidden');


    Game.menu_active = false;
    drawHighScores();

    // //on space
    // inputDispatch[27] = Menu.drawMenu;

  };

  return that;
}());
