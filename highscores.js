
let HighScores = (function(){

  let scores = [];
  let toreturn = {};
  let canvas = $('#highscores').get(0);
  let context = canvas.getContext('2d');
  let backgroundhighscores = new Image();
  let bgh_ready = false;
  let x = 640;
  let doitonce = true;

  backgroundhighscores.onload = () => {
    bgh_ready = true;
  };



  // needs to be changed to highscores picture
  backgroundhighscores.src = 'Images/background/highscores.png';

  function drawHighScores() {

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
        for ( let x = 0; x < scores.length; x++ ) {
          console.log(scores);
          context.strokeText(scores[x].playername+ ": " + scores[x].playerscore, canvas.width/2, canvas.height/7*x + 300);
          context.fillText(scores[x].playername+  ": " + scores[x].playerscore, canvas.width/2, canvas.height/7*x + 300);
        }
      }

  }

  toreturn.initialize = function() {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/highscores',
        success: function(result){
          scores = result;
          function sortByKey(array, key) {
              return array.sort(function(a, b) {
                  var x = a[key]; var y = b[key];
                  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
              });
          }

          sortByKey(scores,'playerscore');
        }
    });


    let canvas1 = document.getElementById('highscores');
    let context1 = canvas1.getContext('2d');
    let canvas2 = document.getElementById('title-page');
    let context2 = canvas1.getContext('2d');
    var frames = 30;
    var timerId = 0;
    timerId = setInterval(updateHighScore,1000/frames);
    function updateHighScore(){
      // console.log(changeLeft);
      // checkClicked();
      drawHighScores();

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
