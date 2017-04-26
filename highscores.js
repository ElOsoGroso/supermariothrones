
let HighScores = (function(){
  let newonce = false;
  let new2once = false;
  let scores = [];
  let toreturn = {};
  let drawoption1 = false;
  let drawoption2 = false;
  let canvas = $('#highscores').get(0);
  let context = canvas.getContext('2d');
  let backgroundhighscores = new Image();
  let bgh_ready = false;
  let x = 640;
  let doitonce = true;
  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
  }

  //Function to check whether a point is inside a rectangle
  function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
  }
  var b = {
    x:777/2,
    y:1023/2,
    width:468/2,
    height:50/2
  }
  canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);

      if (isInside(mousePos,b)) {
        playSound('click');
        TitlePage.init();
        TitlePage.renderStart();

      }
      else{
          console.log("nope");
      }
  }, false);

  canvas.addEventListener('mousemove', function(evt) {
    // console.log("hello")
    var mousePos = getMousePos(canvas, evt);
    console.log(mousePos);
      // console.log(mousePos);
      if (isInside(mousePos,b)) {
        if(!newonce){
        playSound('hover');
        newonce =true;
        new2once = false;
      }
      console.log(backgroundhighscoresback.src);
      drawoption2 = true;
      drawoption1 = false;
      }
      else{
      drawoption1 = true;
      drawoption2 = false;
      }


  }, false);

  backgroundhighscores.onload = () => {
    bgh_ready = true;
  };



  // needs to be changed to highscores picture
  backgroundhighscores.src = 'Images/background/highscores.png';

  let backgroundhighscoresback = new Image();
  let bghb_ready = false;
  backgroundhighscoresback.onload = () => {
    bghb_ready = true;
  };
  backgroundhighscoresback.src = "Images/background/highscoresback.png";

  function drawHighScores() {

      if(bgh_ready) {
        context.clearRect(0,0,canvas.width,canvas.height);
        if(drawoption2){
        context.drawImage(backgroundhighscoresback,0,0, canvas.width, canvas.height);
      }
      else {
        context.drawImage(backgroundhighscores,0,0,canvas.width,canvas.height);
      }

        context.textAlign = 'center';
        context.fillStyle = '#f8f8ff';
        context.shadowColor = 'black';
        context.lineWidth = 4;
        context.shadowBlur = 10;

        context.font = '40px Arial';
        // console.log(scores);
        for ( let x = 0; x < 5; x++ ) {
          // console.log(scores);
          context.strokeText(scores[x].playername+ ": " + scores[x].playerscore, canvas.width/2, canvas.height/7*x + 150);
          context.fillText(scores[x].playername+  ": " + scores[x].playerscore, canvas.width/2, canvas.height/7*x + 150);
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
          let canvas1 = document.getElementById('highscores');
          let context1 = canvas1.getContext('2d');
          canvas1.style.display = 'initial';
          let canvas2 = document.getElementById('title-page');
          let context2 = canvas1.getContext('2d');
          canvas2.style.display="none";
          canvas2.style.zIndex = 0;
          canvas1.style.zIndex = 2;

          Game.menu_active = false;
          var frames = 30;
          var timerId = 0;
          timerId = setInterval(updateHighScore,1000/frames);
        }
    });



    function updateHighScore(){
      // console.log(changeLeft);
      // checkClicked();
      drawHighScores();

    }


    // //on space
    // inputDispatch[27] = Menu.drawMenu;

  };

  return toreturn;
}());
