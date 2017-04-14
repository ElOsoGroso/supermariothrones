
let Controls = (function(){
  let that = {};
  let canvas = $('#controls')[0];
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
  let x = 250;
  let y = 200;
  let changeLeft = false;
  let changeRight = false;
  let changeJump = false;
  let fireball = false;
  let drawnormal = true;
  let drawopt1 = false;
  let drawopt2 = false;
  let drawopt3 = false;
  let drawopt4 = false;
  that.enter_active = false;

  //determine the controls based on if the user has entered a preference
  if (localStorage.getItem('control_left')) {
    that.left = localStorage.getItem('control_left');
  } else {

    that.left = 65;
  }

  //right
  if (localStorage.getItem('control_right')) {
    that.right = localStorage.getItem('control_right');
  } else {

    that.right = 68;
  }

  //jump
  if (localStorage.getItem('control_jump')) {
    that.jump = localStorage.getItem('control_jump');
  } else {

    that.jump = 87;
  }

  //crouch
  if (localStorage.getItem('control_crouch')) {
    that.crouch = localStorage.getItem('control_crouch');
  } else {

    that.crouch = 83;
  }

  //menu options
  let menu_count = 0;
  let arrow = new Image();
  let arrow_ready = false;
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
  arrow.onload = () => {
      arrow_ready = true;
  };

  arrow.src = 'Images/arrow.png';

  backgroundcontrols.onload = () =>{
    bgc_ready = true;
  };

  backgroundcontrols.src = 'got.png';
  var a = {
      x:388,
      y:547,
      width:227,
      height:200
  };
  var w = {
      x:726,
      y:537,
      width:227,
      height:200
  };
  var d= {
      x:1064,
      y:537,
      width:227,
      height:200
  };
  var s = {
      x:1402,
      y:537,
      width:227,
      height:200
  };
  canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);

      if (isInside(mousePos,a)) {

        playSound('click');
        that.enter_active= true;
        changeLeft = true;
        changeRight = false;
        changeJump = false;
        fireball = false;

      }
      else if (isInside(mousePos,w)) {
        playSound('click');
        that.enter_active= true;
        changeLeft = false;
        changeRight = false;
        changeJump = true;
        fireball = false;
      }
      else if (isInside(mousePos,s)){
        that.enter_active= true;
        changeLeft = false;
        changeRight = false;
        changeJump = false;
        fireball = true;
      }
      else if (isInside(mousePos,d)){
        that.enter_active= true;
        changeLeft = false;
        changeRight = true;
        changeJump = false;
        fireball = false;
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
      }
      else{
        drawopt1 = false;
        drawnormal = true;
        drawopt2 = false;
        drawopt3 = false;
        drawopt4 = false;
      }


  }, false);
  //add the player's event listener
  $(document).keydown(function(e) {
    //dont allow multiple assignments of one key
    if (changeLeft && that.enter_active) {
      if (e.keyCode != that.right && e.keyCode != that.jump && e.keyCode != that.crouch ) {

        that.left = e.keyCode;
        localStorage.setItem('control_left', that.left);
        changeLeft = false;
        that.enter_active = false;
      }
    } else if (changeRight && that.enter_active) {
      //dont allow multiple assignments of one key
      if (e.keyCode != that.left && e.keyCode != that.jump && e.keyCode != that.crouch ) {

        that.right = e.keyCode;
        changeRight = false;
        localStorage.setItem('control_right', that.right);
        that.enter_active = false;
      }
    } else if (changeJump && that.enter_active) {
      //dont allow multiple assignments of one key
      if (e.keyCode != that.right && e.keyCode != that.left && e.keyCode != that.crouch ) {

        that.jump = e.keyCode;
        changeJump = false;
        localStorage.setItem('control_jump', that.jump);
        that.enter_active = false;
      }
    } else if (fireball && that.enter_active) {
      //dont allow multiple assignments of one key
      if (e.keyCode != that.right && e.keyCode != that.jump && e.keyCode != that.left ) {

        that.crouch = e.keyCode;
        localStorage.setItem('control_crouch', that.crouch);
        fireball = false;
        that.enter_active = false;
      }
    } else {

      if (e.keyCode == 37) { //left arrow
        that.left_hlt()
      } else if (e.keyCode == 39) { //right arrow
        that.right_hlt()
      } else if (e.keyCode == 13 && Game.controls_active) {
        that.enter_active += 1;
      }
    }


  })

function checkClicked(){

}
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

        context.textAlign = 'center';
        context.fillStyle = '#b3b3b3';

        context.shadowColor = 'black';
        context.shadowBlur = 7;
        context.lineWidth = 5;

        context.font = '200px Calibri';

        //left highlight
        if (changeLeft && that.enter_active) {
          context.font = '200px Calibri';

          context.strokeText(String.fromCharCode(that.left), 500, 700);
          context.fillText(String.fromCharCode(that.left), 500, 700);

          context.font = '90px Calibri';
          context.strokeText('Push any key you freaking want', 1040, 950);
          context.fillText("Push any key you freaking want", 1040,  950);
          context.font = '200px Calibri';

        } else {
          context.strokeText(String.fromCharCode(that.left), 500, 700);
          context.fillText(String.fromCharCode(that.left), 500, 700);
        }

        //jump highlight
        if (changeJump && that.enter_active) {
          context.font = '200px Calibri';

          context.strokeText(String.fromCharCode(that.jump), 833, 700);
          context.fillText(String.fromCharCode(that.jump), 833, 700);

          context.font = '90px Calibri';
          context.strokeText('Push any key you freaking want', 1040, 950);
          context.fillText("Push any key you freaking want", 1040,  950);

          context.font = '200px Calibri';
        } else {
          context.strokeText(String.fromCharCode(that.jump), 833, 700);
          context.fillText(String.fromCharCode(that.jump), 833, 700);
        }
        //right highlight
        if (changeRight && that.enter_active) {
          context.font = '200px Calibri';

          context.strokeText(String.fromCharCode(that.right), 1166, 700);
          context.fillText(String.fromCharCode(that.right), 1166, 700);

          context.font = '90px Calibri';
          context.strokeText('Push any key you freaking want', 1040, 950);
          context.fillText("Push any key you freaking want", 1040,  950);

          context.font = '200px Calibri';
        } else {
          context.strokeText(String.fromCharCode(that.right), 1166, 700);
          context.fillText(String.fromCharCode(that.right), 1166, 700);
        }
        //crouch highlight
        if (fireball && that.enter_active) {
          context.font = '200px Calibri';

          context.strokeText(String.fromCharCode(that.crouch), 1500, 700);
          context.fillText(String.fromCharCode(that.crouch), 1500, 700);

          context.font = '90px Calibri';
          context.strokeText('Push any key you freaking want', 1040, 950);
          context.fillText("Push any key you freaking want", 1040,  950);

          context.font = '200px Calibri';
        } else {

          context.strokeText(String.fromCharCode(that.crouch), 1500, 700);
          context.fillText(String.fromCharCode(that.crouch), 1500, 700);
        }




        context.font = '100px Calibri';

        context.strokeText('Left', 500, 500);
        context.fillText('Left', 500, 500);

        context.strokeText('Jump', 833, 500);
        context.fillText('Jump', 833, 500);

        context.strokeText('Right', 1166, 500);
        context.fillText('Right', 1166, 500);

        context.strokeText('Weapon', 1500, 500);
        context.fillText('Weapon', 1500, 500);

        context.font = '20px Calibri';

        context.strokeText('Click one of the controls to change it', 1000, 800);
        context.fillText("Click one of the controls to change it", 1000,  800);

      }

  };



  that.initialize = function() {
    let canvas1 = document.getElementById('controls');
    let context1 = canvas1.getContext('2d');
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

  return that;
}());
