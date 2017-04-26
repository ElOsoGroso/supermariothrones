
let Controls = (function(){
  let toreturn = {};
  let canvas = $('#controls').get(0);
  let context = canvas.getContext('2d');
  let backgroundcontrols = new Image();
  let bgc_ready = false;
  let opt2 = new Image();
  let opt2_ready = false;
  opt2.onload = () => {
      opt2_ready = true;
  };
  opt2.src = "got1.png";
  let opt3 = new Image();
  let opt3_ready = false;
  opt3.onload = () => {
      opt3_ready = true;
  };
  opt3.src = "got2.png";
  let opt4 = new Image();
  let opt4_ready = false;
  opt4.onload = () => {
      opt4_ready = true;
  };
  opt4.src = "got3.png";
  let opt5 = new Image();
  let opt5_ready = false;
  opt5.onload = () => {
      opt5_ready = true;
  };
  opt5.src = "got4.png";

  let optback = new Image();
  let optback_ready = false;
  optback.onload = () => {
      optback_ready = true;
  };
  optback.src = "gotback.png";

  let changeLeft = false;
  let changeRight = false;
  let changeJump = false;
  let fireball = false;
  let drawnormal = true;
  let drawopt1 = false;
  let drawopt2 = false;
  let drawopt3 = false;
  let drawopt4 = false;
  let drawopt5 = false;
  let already = false;
  toreturn.turnOnListener = false;

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

  if (localStorage.getItem('goRight')) {
    toreturn.right = localStorage.getItem('goRight');
  } else {

    toreturn.right = 68;
  }
  if (localStorage.getItem('goLeft')) {
    toreturn.left = localStorage.getItem('goLeft');
  } else {

    toreturn.left = 65;
  }
  if (localStorage.getItem('jumpCharacter')) {
    toreturn.jump = localStorage.getItem('jumpCharacter');
  } else {

    toreturn.jump = 87;
  }

  if (localStorage.getItem('shootFire')) {
    toreturn.crouch = localStorage.getItem('shootFire');
  } else {

    toreturn.crouch = 83;
  }


  backgroundcontrols.onload = () =>{
    bgc_ready = true;
  };

  backgroundcontrols.src = 'got.png';
  var a = {
      x:388/2,
      y:547/2,
      width:227/2,
      height:200/2
  };
  var w = {
      x:726/2,
      y:537/2,
      width:227/2,
      height:200/2
  };
  var d= {
      x:1064/2,
      y:537/2,
      width:227/2,
      height:200/2
  };
  var s = {
      x:1402/2,
      y:537/2,
      width:227/2,
      height:200/2
  };
  var b = {
    x:768/2,
    y:855/2,
    width:468/2,
    height:50/2
  }
  canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);

      if (isInside(mousePos,a)) {
        already=false;
        playSound('click');
        toreturn.turnOnListener= true;
        changeLeft = true;
        changeRight = false;
        changeJump = false;
        fireball = false;

      }
      else if (isInside(mousePos,w)) {
        playSound('click');
        already=false;
        toreturn.turnOnListener= true;
        changeLeft = false;
        changeRight = false;
        changeJump = true;
        fireball = false;
      }
      else if (isInside(mousePos,s)){
        already =false;
        toreturn.turnOnListener= true;
        changeLeft = false;
        changeRight = false;
        changeJump = false;
        fireball = true;
      }
      else if (isInside(mousePos,d)){
        toreturn.turnOnListener= true;
        already = false;
        changeLeft = false;
        changeRight = true;
        changeJump = false;
        fireball = false;
      }
      else if (isInside(mousePos,b)){
        playSound('theme');
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
      if (isInside(mousePos,w)) {
        if(!newonce){
        playSound('hover');
        newonce =true;
        new2once = false;
      }
        drawnormal = false;
        drawopt1 = false;
        drawopt2 = true;
        drawopt3 = false;
        drawopt4 = false;
        drawopt5 = false;
      }
      else if (isInside(mousePos,d)) {
        if(!new2once){
        playSound('hover');
        new2once =true;
        newonce = false;
      }
        drawnormal = false;
        drawopt3 =true;
        drawopt1 = false;
        drawopt2 = false;
        drawopt4 = false;
        drawopt5 = false;
      }
      else if (isInside(mousePos,s)) {
        if(!new2once){
        playSound('hover');
        new2once =true;
        newonce = false;
      }
        drawnormal = false;
        drawopt4 =true;
        drawopt1 = false;
        drawopt2 = false;
        drawopt3 = false;
        drawopt5 = false;
      }

      else if (isInside(mousePos,a)) {
        if(!new2once){
        playSound('hover');
        new2once =true;
        newonce = false;
      }
        drawnormal = false;
        drawopt1 =true;
        drawopt2 = false;
        drawopt3 = false;
        drawopt4 = false;
        drawopt5 = false;
      }
      else if (isInside(mousePos,b)) {
        if(!new2once){
        playSound('hover');
        new2once =true;
        newonce = false;
      }
        drawnormal = false;
        drawopt1 =false;
        drawopt2 = false;
        drawopt3 = false;
        drawopt4 = false;
        drawopt5 = true;
      }
      else{
        drawopt1 = false;
        drawnormal = true;
        drawopt2 = false;
        drawopt3 = false;
        drawopt4 = false;
        drawopt5 = false;
      }


  }, false);
  $(document).keydown(function(e) {

    if (toreturn.turnOnListener &&changeLeft) {
      if (e.keyCode != toreturn.right && e.keyCode != toreturn.jump && e.keyCode != toreturn.crouch ) {
        changeLeft = false;
        toreturn.left = e.keyCode;
        localStorage.setItem('goLeft', toreturn.left);
        toreturn.turnOnListener = false;
      }
      else{
        already = true;
      }
    } else if (toreturn.turnOnListener &&changeRight) {

      if (e.keyCode != toreturn.left && e.keyCode != toreturn.jump && e.keyCode != toreturn.crouch ) {
        changeRight = false;
        toreturn.right = e.keyCode;
        localStorage.setItem('goRight', toreturn.right);
        toreturn.turnOnListener = false;
      }
      else{
        already = true;
      }
    } else if (toreturn.turnOnListener && changeJump) {
      if (e.keyCode != toreturn.right && e.keyCode != toreturn.left && e.keyCode != toreturn.crouch ) {
        changeJump = false;
        toreturn.jump = e.keyCode;
        localStorage.setItem('jumpCharacter', toreturn.jump);
        toreturn.turnOnListener = false;
      }
      else{
        already = true;
      }
    } else if (toreturn.turnOnListener &&fireball ) {
      if (e.keyCode != toreturn.right && e.keyCode != toreturn.jump && e.keyCode != toreturn.left ) {
        fireball = false;
        toreturn.crouch = e.keyCode;
        localStorage.setItem('shootFire', toreturn.crouch);
        toreturn.turnOnListener = false;
      }
      else{
        already = true;
      }
    }


  })

  function drawcontrols(){
      if(bgc_ready && opt2_ready) {
        context.clearRect(0,0,canvas.width,canvas.height);
        // console.log(drawopt1);
        if(drawnormal){
        context.drawImage(backgroundcontrols,0,0, canvas.width, canvas.height);}
        else if(drawopt1){
          // console.log("butts");
          context.drawImage(opt2,0,0, canvas.width, canvas.height);
        }
        else if (drawopt2){
          context.drawImage(opt3,0,0, canvas.width, canvas.height);
        }
        else if(drawopt3){

        context.drawImage(opt4,0,0, canvas.width, canvas.height);}
        else if (drawopt4){
            context.drawImage(opt5,0,0, canvas.width, canvas.height);
        }
        else if (drawopt5){
          context.drawImage(optback,0,0,canvas.width,canvas.height);
        }

        context.textAlign = 'center';
        context.fillStyle = '#f8f8ff';
        context.shadowColor = 'black';
        context.lineWidth = 4;
        context.shadowBlur = 10;

        context.font = '40px Arial';

        context.strokeText('Left', 500/2, 500/2);
        context.fillText('Left', 500/2, 500/2);

        context.strokeText('Jump', 833/2, 500/2);
        context.fillText('Jump', 833/2, 500/2);

        context.strokeText('Right', 1166/2, 500/2);
        context.fillText('Right', 1166/2, 500/2);

        context.strokeText('Weapon', 1500/2, 500/2);
        context.fillText('Weapon', 1500/2, 500/2);

        context.font = '10px Arial';

        context.strokeText('Click one of the controls to change it', 1000/2, 800/2);
        context.fillText("Click one of the controls to change it", 1000/2,  800/2);
        context.font = '100px Arial';

        if (toreturn.turnOnListener &&changeLeft) {
          context.font = '100px Arial';

          context.strokeText(String.fromCharCode(toreturn.left), 500/2, 710/2);
          context.fillText(String.fromCharCode(toreturn.left), 500/2, 710/2);

          context.font = '45px Arial';
          if(already){
            context.strokeText('You already have a key set to that', 1015/2, 950/2);
            context.fillText("You already have a key set to that", 1015/2,  950/2);
          }
          else{
          context.strokeText('Push any key you freaking want', 1015/2, 950/2);
          context.fillText("Push any key you freaking want", 1015/2,  950/2);}
          context.font = '100px Arial';

        } else {
          context.strokeText(String.fromCharCode(toreturn.left), 500/2, 710/2);
          context.fillText(String.fromCharCode(toreturn.left), 500/2, 710/2);
        }

        if (toreturn.turnOnListener && changeJump) {
          context.font = '100px Arial';

          context.strokeText(String.fromCharCode(toreturn.jump), 833/2, 710/2);
          context.fillText(String.fromCharCode(toreturn.jump), 833/2, 710/2);

          context.font = '45px Arial';
          if(already){
            context.strokeText('You already have akey set to that', 1015/2, 950/2);
            context.fillText("You already have a key set to that", 1015/2,  950/2);
          }
          else{
          context.strokeText('Push any key you freaking want', 1015/2, 950/2);
          context.fillText("Push any key you freaking want", 1015/2,  950/2);
}
          context.font = '100px Arial';
        } else {
          context.strokeText(String.fromCharCode(toreturn.jump), 833/2, 710/2);
          context.fillText(String.fromCharCode(toreturn.jump), 833/2, 710/2);
        }
        if (toreturn.turnOnListener &&changeRight) {
          context.font = '100px Arial';

          context.strokeText(String.fromCharCode(toreturn.right), 1170/2, 710/2);
          context.fillText(String.fromCharCode(toreturn.right), 1170/2, 710/2);

          context.font = '45px Arial';
          if(already){
            context.strokeText('You already have akey set to that', 1015/2, 950/2);
            context.fillText("You already have a key set to that", 1015/2,  950/2);
          }
          else{
          context.strokeText('Push any key you freaking want', 1015/2, 950/2);
          context.fillText("Push any key you freaking want", 1015/2,  950/2);
        }

          context.font = '100px Arial';
        } else {
          context.strokeText(String.fromCharCode(toreturn.right), 1170/2, 710/2);
          context.fillText(String.fromCharCode(toreturn.right), 1170/2, 710/2);
        }
        if (toreturn.turnOnListener &&fireball) {
          context.font = '100px Arial';

          context.strokeText(String.fromCharCode(toreturn.crouch), 1510/2, 710/2);
          context.fillText(String.fromCharCode(toreturn.crouch), 1510/2, 710/2);

          context.font = '45px Arial';
          if(already){
            context.strokeText('You already have akey set to that', 1015/2, 950/2);
            context.fillText("You already have a key set to that", 1015/2,  950/2);
          }
          else{
          context.strokeText('Push any key you freaking want', 1015/2, 950/2);
          context.fillText("Push any key you freaking want", 1015/2,  950/2);}

          context.font = '100px Arial';
        } else {

          context.strokeText(String.fromCharCode(toreturn.crouch), 1510/2, 710/2);
          context.fillText(String.fromCharCode(toreturn.crouch), 1510/2, 710/2);
        }






      }

  };



  toreturn.initialize = function() {

    let canvas1 = document.getElementById('controls');
    let context1 = canvas1.getContext('2d');
    canvas1.style.display= 'initial';
    let canvas2 = document.getElementById('title-page');
    let  context2 = canvas1.getContext('2d');
    var frames = 30;
    var timerId = 0;
    timerId = setInterval(updatecontrols,1000/frames);
    function updatecontrols(){
      // console.log(changeLeft);
      // checkClicked();
      drawcontrols();

    }
    canvas2.style.display="none";
    canvas2.style.zIndex = 0;
    canvas1.style.zIndex = 2;
    Game.menu_active = false;

  };

  return toreturn;
}());
