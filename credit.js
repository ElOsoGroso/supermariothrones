
let Credits = (function(){

  let scores = [];
  let toreturn = {};
  let option1 = true;
  let option2 = false;
  let canvas = $('#credits-page').get(0);
  let context = canvas.getContext('2d');
  let backgroundcredits = new Image();
  let bgc_ready = false;
  let x = 640;

  backgroundcredits.onload = () => {
    bgc_ready = true;
  };
  backgroundcredits.src = 'gotcredits.png';

  let backgroundcreditsback = new Image();
  backgroundcreditsback.onload = () => {
    bghb_ready = true;
  };
  backgroundcreditsback.src = 'gotcreditsback.png';

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
    y:858/2,
    width:468/2,
    height:50/2
  }
  canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);

      if (isInside(mousePos,b)) {
        playSound('click');
        // TitlePage.init();
        // TitlePage.renderStart();
        location.reload();

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

        playSound('hover');
      option1 = false;
      option2 = true;
      }
      else{
      option2 = false;
      option1 = true;
      }


  }, false);




  function drawCredits() {

      if(bgc_ready) {
        context.clearRect(0,0,canvas.width,canvas.height);
        if(option2){
        context.drawImage(backgroundcreditsback,0,0, canvas.width, canvas.height);
      }
      else{
        context.drawImage(backgroundcredits,0,0,canvas.width,canvas.height);
      }

        context.textAlign = 'center';
        context.fillStyle = '#f8f8ff';
        context.shadowColor = 'black';
        context.lineWidth = 4;
        context.shadowBlur = 10;

        context.font = '40px Arial';
        // console.log(scores);
        context.strokeText('Matthew Morris', canvas.width/2, canvas.height/2-200/2);
        context.fillText('Matthew Morris', canvas.width/2, canvas.height/2-200/2);

          context.strokeText('Terik Brunson', canvas.width/2, canvas.height/2);
          context.fillText('Terik Brunson', canvas.width/2, canvas.height/2);

      }

  }

  toreturn.initialize = function() {



    let canvas1 = document.getElementById('credits-page');
    let context1 = canvas1.getContext('2d');
    canvas1.style.display = 'initial';
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
