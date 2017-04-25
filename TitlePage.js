
let TitlePage = (function () {
  let background = new Image();
  background.src = "gameofthroneswallpaper.png"
  let withbevel = new Image();
  withbevel.src = "gameofthroneswallpaperopt1.png"
  let with1 = new Image();
  with1.src = "gameofthroneswallpaperopt2.png"
  // let withbevel2 = new Image();
  // withbevel2.src = "withbevel2.png"
  let opt3 = new Image();
  opt3.src = "gameofthroneswallpaperopt3.png"
  let opt4 = new Image();
  opt4.src = "gameofthroneswallpaperopt4.png"
  let scroll = new Image();
  scroll.src = "scroll.png";
  let context1 = null;
  let canvas1 = null;
  let drawnormal = true;
  let drawopt1 = false;
  let drawopt2 = false;
  let drawopt3 = false;
  let new4once = false;




  function init() {
    console.log("Begin title page init: " + startgame);
    canvas1 = document.getElementById('title-page');
    context1 = canvas1.getContext('2d');
    canvas1.style.display = 'initial';
    let canvas2 = document.getElementById('controls');
    let context2 = canvas1.getContext('2d');
    let canvas3 = document.getElementById('highscores');
    let context3 = canvas1.getContext('2d');
    let canvas4 = document.getElementById('credits-page');
    let context4 = canvas1.getContext('2d');
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
      move();
      draw();

    }
    function draw(){
      context1.save();
      context1.setTransform(1,0,0,1,0,0);
      context1.clearRect(0,0, canvas1.width, canvas1.height);
      if(drawnormal){
      context1.drawImage(background,0,0,with1.width,with1.height,0,0,canvas1.width,canvas1.height);
      context1.drawImage(scroll,scrollwidth,1010,scroll.width,scroll.height);
    }
      else if (drawopt1){
      context1.drawImage(withbevel,0,0,with1.width,with1.height,0,0,canvas1.width,canvas1.height);
      context1.drawImage(scroll,scrollwidth,1010,scroll.width,scroll.height);
    }
      else if (drawopt2){
      context1.drawImage(with1,0,0,with1.width,with1.height,0,0,canvas1.width,canvas1.height);
      context1.drawImage(scroll,scrollwidth,1010,scroll.width,scroll.height);
    }
    else if (drawopt3){
      context1.drawImage(opt3,0,0,opt3.width,opt3.height,0,0,canvas1.width,canvas1.height);
      context1.drawImage(scroll,scrollwidth,1010,scroll.width,scroll.height);
    }
    else if (drawopt4){
      context1.drawImage(opt4,0,0,opt3.width,opt3.height,0,0,canvas1.width,canvas1.height);
      context1.drawImage(scroll,scrollwidth,1010,scroll.width,scroll.height);
    }


      // console.log(scrollwidth);

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

  var rectplay = {
      x:652,
      y:352,
      width:720,
      height:152
  };
  var recthoverhigh = {
      x:649,
      y:537,
      width:720,
      height:152
  };

  var rectHoverHighScores = {
    x: 650,
    y: 725,
    width:720,
    height: 152
  }
  var recthovercredit = {
    x: 650,
    y: 904,
    width: 720,
    height: 152
  }

  canvas1.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas1, evt);

      if (isInside(mousePos,rectplay)) {

        playSound('click');
        // console.log(mousePos);
        startgame = true;
        // console.log(startgame);
        countdowntime = 3100;
        clearInterval(timerId);
        Game.init();

      }
      else if (isInside(mousePos,recthoverhigh)) {
        playSound('click');
        //console.log("trying to open controls");
        controls_active = true;
        Controls.initialize();

      }
      else if (isInside(mousePos,rectHoverHighScores)) {
        playSound('click');
        //console.log("trying to open high scores");
        high_scores_active = true;
        HighScores.initialize();

      }
      else if (isInside(mousePos,recthovercredit)) {
        playSound('click');

       Credits.initialize();

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
      if (isInside(mousePos,recthoverhigh)) {
        console.log("controls");
        if(!newonce){
        playSound('hover');
        newonce =true;
        new2once = false;
        new3once = false;
        new4once = false;
      }

        drawnormal = false;
        drawopt2 = true;
        drawopt1 = false;
        drawopt3 = false;
        drawopt4 = false;


      }

      else if (isInside(mousePos,rectplay)) {
        if(!new2once){
          console.log("hover");
        playSound('hover');
        new2once =true;
        new3once = false;
        newonce = false;
        new4once = false;
      }

        drawnormal = false;
        drawopt1 =true;
        drawopt2 = false;
        drawopt3 = false;
        drawopt4 = false;


      }
      else if (isInside(mousePos,rectHoverHighScores)) {
        if(!new3once){
          console.log("hover");
        playSound('hover');
        new3once =true;
        newonce = false;
        new2once = false;
        new4once = false;
      }

        drawnormal = false;
        drawopt1 =false;
        drawopt2 = false;
        drawopt3 = true;
        drawopt4 = false;


      }
      else if (isInside(mousePos,recthovercredit)) {
        if(!new4once){
          console.log("hover");
        playSound('hover');
        new3once =false;
        newonce = false;
        new2once = false;
        new4once = true;
      }

        drawnormal = false;
        drawopt1 =false;
        drawopt2 = false;
        drawopt3 = false;
        drawopt4 = true;


      }

  }, false);

  }
  function renderStart() {
    context1.clear();
  }
  function move(){
    scrollwidth+=2;
  }


  return {init:init,
  renderStart:renderStart,move:move};
}());
