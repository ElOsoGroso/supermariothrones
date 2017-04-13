
let Controls = (function(){
  let that = {};
  let canvas = $('#canvas-main')[0];
  let context = canvas.getContext('2d');
  let bg = new Image();
  let bg_ready = false;
  let x = 250;
  let y = 200;
  let left_active = false;
  let right_active = false;
  let jump_active = false;
  let crouch_active = false;
  that.enter_active = 0;

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

  arrow.onload = () => {
      arrow_ready = true;
  };

  arrow.src = 'Images/arrow.png';

  bg.onload = () => {
    bg_ready = true;
  };

  bg.src = 'Images/background/bg.png';

  //add the player's event listener
  $(document).keydown(function(e) {
    //dont allow multiple assignments of one key
    if (left_active && that.enter_active > 1) {
      if (e.keyCode != that.right && e.keyCode != that.jump && e.keyCode != that.crouch ) {

        that.left = e.keyCode;
        localStorage.setItem('control_left', that.left);
        left_active = false;
        that.enter_active = 1;
      }
    } else if (right_active && that.enter_active > 1) {
      //dont allow multiple assignments of one key
      if (e.keyCode != that.left && e.keyCode != that.jump && e.keyCode != that.crouch ) {

        that.right = e.keyCode;
        right_active = false;
        localStorage.setItem('control_right', that.right);
        that.enter_active = 1;
      }
    } else if (jump_active && that.enter_active > 1) {
      //dont allow multiple assignments of one key
      if (e.keyCode != that.right && e.keyCode != that.left && e.keyCode != that.crouch ) {

        that.jump = e.keyCode;
        jump_active = false;
        localStorage.setItem('control_jump', that.jump);
        that.enter_active = 1;
      }
    } else if (crouch_active && that.enter_active > 1) {
      //dont allow multiple assignments of one key
      if (e.keyCode != that.right && e.keyCode != that.jump && e.keyCode != that.left ) {

        that.crouch = e.keyCode;
        localStorage.setItem('control_crouch', that.crouch);
        crouch_active = false;
        that.enter_active = 1;
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


  that.drawControls = function() {
      if(bg_ready) {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(bg,0,0, canvas.width, canvas.height);

        context.textAlign = 'center';
        context.fillStyle = '#b3b3b3';

        context.shadowColor = 'black';
        context.shadowBlur = 7;
        context.lineWidth = 5;

        context.font = "80px Calibri"

        context.strokeText('In Game Controls:', 640, 100);
        context.fillText("In Game Controls:", 640,  100);

        context.font = '50px Calibri';

        //left highlight
        if (left_active && that.enter_active > 1) {
          context.font = '70px Calibri';

          context.strokeText(String.fromCharCode(that.left), 250, 200);
          context.fillText(String.fromCharCode(that.left), 250, 200);

          context.font = '40px Calibri';
          context.strokeText('Press the key you wish to assign', 640, 450);
          context.fillText("Press the key you wish to assign", 640,  450);
          context.font = '50px Calibri';

        } else {
          context.strokeText(String.fromCharCode(that.left), 250, 200);
          context.fillText(String.fromCharCode(that.left), 250, 200);
        }

        //jump highlight
        if (jump_active && that.enter_active > 1) {
          context.font = '70px Calibri';

          context.strokeText(String.fromCharCode(that.jump), 500, 200);
          context.fillText(String.fromCharCode(that.jump), 500, 200);

          context.font = '40px Calibri';
          context.strokeText('Press the key you wish to assign', 640, 450);
          context.fillText("Press the key you wish to assign", 640,  450);

          context.font = '50px Calibri';
        } else {
          context.strokeText(String.fromCharCode(that.jump), 500, 200);
          context.fillText(String.fromCharCode(that.jump), 500, 200);
        }

        //crouch highlight
        if (crouch_active && that.enter_active > 1) {
          context.font = '70px Calibri';

          context.strokeText(String.fromCharCode(that.crouch), 750, 200);
          context.fillText(String.fromCharCode(that.crouch), 750, 200);

          context.font = '40px Calibri';
          context.strokeText('Press the key you wish to assign', 640, 450);
          context.fillText("Press the key you wish to assign", 640,  450);

          context.font = '50px Calibri';
        } else {

          context.strokeText(String.fromCharCode(that.crouch), 750, 200);
          context.fillText(String.fromCharCode(that.crouch), 750, 200);
        }

        //right highlight
        if (right_active && that.enter_active > 1) {
          context.font = '80px Calibri';

          context.strokeText(String.fromCharCode(that.right), 1000, 200);
          context.fillText(String.fromCharCode(that.right), 1000, 200);

          context.font = '40px Calibri';
          context.strokeText('Press the key you wish to assign', 640, 450);
          context.fillText("Press the key you wish to assign", 640,  450);

          context.font = '50px Calibri';
        } else {
          context.strokeText(String.fromCharCode(that.right), 1000, 200);
          context.fillText(String.fromCharCode(that.right), 1000, 200);
        }


        context.font = '30px Calibri';

        context.strokeText('Left', 250, 300);
        context.fillText('Left', 250, 300);

        context.strokeText('Jump', 500, 300);
        context.fillText('Jump', 500, 300);

        context.strokeText('Crouch', 750, 300);
        context.fillText('Crouch', 750, 300);

        context.strokeText('Right', 1000, 300);
        context.fillText('Right', 1000, 300);

        context.font = '20px Calibri';

        context.strokeText('Press ENTER To Select Control To Edit', 440, 550);
        context.fillText("Press ENTER To Select Control To Edit", 440,  550);

        context.strokeText('Press ESC To Exit Controls', 840, 550);
        context.fillText("Press ESC To Exit Controls", 840,  550);

        highlightOption(x,y);
      }

  };


  //this function displays which option the user is currently on
  function highlightOption(x,y) {
    canvas = $('#controlsSprite')[0];
    context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width,canvas.height);

    switch (x) {
      case 250:
        context.save();
        context.drawImage(arrow, 170, 240, 50, 100);
        context.restore();
        break;
      case 500:
        context.save();
        context.drawImage(arrow, 400, 240, 50, 100);
        context.restore();
        break;
      case 750:
        context.save();
        context.drawImage(arrow, 650, 240, 50, 100);
        context.restore();
        break;
      case 1000:
        context.save();
        context.drawImage(arrow, 900, 240, 50, 100);
        context.restore();
        break;

    }

    canvas = $('#menuCanvas')[0];
    context = canvas.getContext('2d');
  }

  that.selectOption = function() {
    switch (menu_count) {
      case 0: //left
        // menu_count = 0;
        left_active = true;
        right_active = false;
        jump_active = false;
        crouch_active = false;
        break;
      case 1: //jump
        // menu_count = 0;
        jump_active = true;
        left_active = false;
        right_active = false;
        crouch_active = false;
        break;
      case 2: //crouch
        // menu_count = 0;
        crouch_active = true;
        left_active = false;
        jump_active = false;
        right_active = false;
        break;
      case 3: //right
        // menu_count = 0;
        left_active = false;
        jump_active = false;
        crouch_active = false;
        right_active = true;
        break;
    }
  };

  //this is the down arrow highlight function, it will increment the options as
  //the user goes down the list
  that.right_hlt = function() {
    //toggle the options arrow
    if (menu_count >= 3) {
      menu_count = 0;
    } else {
      menu_count += 1;
    }

    switch (menu_count) {
      case 0:
        highlightOption(250,200);
        x = 250;
        break;
      case 1:
        highlightOption(500,200);
        x = 500;
        break;
      case 2:
        highlightOption(750,200);
        x = 750;
        break;
      case 3:
        highlightOption(1000,200);
        x = 1000;
        break;
    }


  };


  //This is the up highlight function, it will decrement as the user goes up
  that.left_hlt = function() {
    //toggle the options arrow
    if (menu_count < 0) {
      menu_count = 3;
    } else {
      menu_count -= 1;
    }

    switch (menu_count) {
      case 0:
        highlightOption(250,200);
        x = 250;
        break;
      case 1:
        highlightOption(500,200);
        x = 500;
        break;
      case 2:
        highlightOption(750,200);
        x = 750;
        break;
      case 3:
        highlightOption(1000,200);
        x = 1000;
        break;
    }
  };

  that.initialize = function() {

    Game.menu_active = false;
    drawControls();
  };

  return that;
}());
