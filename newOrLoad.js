
let NewLoad = (function () {
  let background = new Image();
  background.src = "gameofthronesloadsave.png"
  let newgameimage = new Image();
  newgameimage.src = "gameofthronesloadsaveload.png"
  let loadgame = new Image();
  loadgame.src = "gameofthronesloadsavenew.png"

  let context1 = null;
  let canvas1 = null;
  let drawnormal = true;
  let drawopt1 = false;
  let drawopt2 = false;

  function init() {
    console.log("Begin load save page init: " + startgame);
    canvas1 = document.getElementById('newload');
    context1 = canvas1.getContext('2d');
    canvas1.style.display = 'initial';
    let canvas2 = document.getElementById('controls');
    let context2 = canvas1.getContext('2d');
    let canvas3 = document.getElementById('highscores');
    let context3 = canvas1.getContext('2d');
    let canvas4 = document.getElementById('credits-page');
    let context4 = canvas1.getContext('2d');
    let canvas5 = document.getElementById('credits-page');
    let context5 = canvas1.getContext('2d');
    canvas5.style.display = "none";
    canvas5.style.zIndex = 0;
    canvas4.style.display = "none";
    canvas4.style.zIndex = 0;
    canvas3.style.display = "none";
    canvas3.style.zIndex = 0;
    canvas2.style.display="none";
    canvas2.style.zIndex = 0;
    canvas1.style.zIndex = 2;
    var frames = 30;
    var timerId = 0;
    timerId = setInterval(update,1000/frames);
    function update(){
      draw();

    }
    function draw(){
      context1.save();
      context1.setTransform(1,0,0,1,0,0);
      context1.clearRect(0,0, canvas1.width, canvas1.height);
      if(drawnormal){
      context1.drawImage(background,0,0,background.width,background.height,0,0,canvas1.width,canvas1.height);

    }
      else if (drawopt1){
      context1.drawImage(newgameimage,0,0,newgameimage.width,newgameimage.height,0,0,canvas1.width,canvas1.height);

    }
      else if (drawopt2){
      context1.drawImage(loadgame,0,0,loadgame.width,loadgame.height,0,0,canvas1.width,canvas1.height);

    }


      context1.restore();
    }
    CanvasRenderingContext2D.prototype.clear = function() {
      this.save();
      this.setTransform(1,0,0,1,0,0);
      this.clearRect(0,0, canvas1.width, canvas1.height);
      // console.log(scrollwidth);
      this.drawImage(background,0,0,background.width,background.height,0,0,canvas1.width,canvas1.height);
      // this.drawImage(scroll,scrollwidth,0,scroll.width,scroll.height);
      this.restore();
    };

    function getMousePos(canvas1, event) {
      var rect = canvas1.getBoundingClientRect();
      return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
      };
  }

  function isInside(pos, rect){
      return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
  }

  var newgamebox = {
      x:652/2,
      y:352/2,
      width:720/2,
      height:152/2
  };
  var loadgamebox = {
      x:649/2,
      y:537/2,
      width:720/2,
      height:152/2
  };


  canvas1.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas1, evt);

      if (isInside(mousePos,newgamebox)) {

        playSound('click');
        // console.log(mousePos);
        console.log(newgame);
        startgame = true;
        newgame = true;
        // console.log(startgame);
        countdowntime = 3100;
        clearInterval(timerId);
        Game.init();

      }
      else if (isInside(mousePos,loadgamebox)) {
        playSound('click');
        // console.log(mousePos);

        newgame = false;
        startgame = true;
        // console.log(startgame);
        countdowntime = 3100;
        clearInterval(timerId);
        Game.init();
      }
      else{
        console.log("ohno");
      }
  }, false);
  canvas1.addEventListener('mousemove', function(evt) {
    // console.log("hello")
    var mousePos = getMousePos(canvas1, evt);
    console.log(mousePos);
      // console.log(mousePos);
      if (isInside(mousePos,newgamebox)) {
        if(!newonce){
        playSound('hover');
        newonce =true;
        new2once = false;
      }

        drawnormal = false;
        drawopt1 = true;
        drawopt2 = false;

      }

      else if (isInside(mousePos,loadgamebox)) {
        if(!new2once){
          console.log("hover");
        playSound('hover');
        new2once =true;
        newonce = false;

      }

        drawnormal = false;
        drawopt1 =false;
        drawopt2 = true;

      }
  }, false);

  }
  function renderStart() {
    context1.clear();
  }



  return {init:init,
  renderStart:renderStart};
}());
