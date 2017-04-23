
let Credits = (function(){

  let scores = [];
  let toreturn = {};
  let canvas = $('#credits-page').get(0);
  let context = canvas.getContext('2d');
  let backgroundhighscores = new Image();
  let bgh_ready = false;
  let x = 640;


  backgroundhighscores.onload = () => {
    bgh_ready = true;
  };



  // needs to be changed to highscores picture
  backgroundhighscores.src = 'gotcredits.png';

  function drawCredits() {

      if(bgh_ready) {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(backgroundhighscores,0,0, canvas.width, canvas.height);

        context.textAlign = 'center';
        context.fillStyle = '#f8f8ff';
        context.shadowColor = 'black';
        context.lineWidth = 4;
        context.shadowBlur = 10;

        context.font = '80px Arial';
        // console.log(scores);
        context.strokeText('Matthew Morris', canvas.width/2, canvas.height/2);
        context.fillText('Matthew Morris', canvas.width/2, canvas.height/2);

          context.strokeText('Terik Brunson', canvas.width/2, canvas.height/2 + 300);
          context.fillText('Terik Brunson', canvas.width/2, canvas.height/2 + 300);

      }

  }

  toreturn.initialize = function() {


    let canvas1 = document.getElementById('credits-page');
    let context1 = canvas1.getContext('2d');
    let canvas2 = document.getElementById('title-page');
    let context2 = canvas1.getContext('2d');
    var frames = 30;
    var timerId = 0;
    timerId = setInterval(updateCredits,1000/frames);
    function updateCredits(){
      // console.log(changeLeft);
      // checkClicked();
      drawCredits();

    }
    canvas2.style.display="none";
    canvas2.style.zIndex = 0;
    canvas1.style.zIndex = 2;

    Game.menu_active = false;

    // //on space
    // inputDispatch[27] = Menu.drawMenu;

  };

  return toreturn;
}());
