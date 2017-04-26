
let Graphics = (function(){

  let toreturn = {};
  let canvas = $('#canvas-main')[0];
  console.log("Hola");
  let context = canvas.getContext('2d');
  let tilesize = Images.tilesize;

//the camera code is all from an online explanation of the 2d camera

  let padding = 600/2;
  toreturn.map_width = 16000/2;
  toreturn.map_height = canvas.height;
  toreturn.viewXCoord = 0;
  let map = Map.map();
  let drawcrown = Map.drawcrown();

  toreturn.rectangle = function(left, top, width, height) {
    let toreturn = {};
    toreturn.left = left;
    toreturn.top = top;
    toreturn.width = width;
    toreturn.height = height;

    toreturn.right = toreturn.left + toreturn.width;
    toreturn.bottom = toreturn.top + toreturn.height;


    toreturn.insideRectangle = function(rect) {
      if (rect.top <= toreturn.top &&  rect.bottom >= toreturn.bottom &&rect.left <= toreturn.left && rect.right >= toreturn.right ){
        return true;
      } else {
        return false;
      }
    }

    return toreturn;
  };

  //this camera method was borrowed from another student
  toreturn.camera = function(viewXCoord, viewYCoord, canvas_width, canvas_height, widthofmap, heightofmap) {
    let toreturn = {};

    toreturn.viewXCoord = viewXCoord;
    toreturn.viewYCoord = viewYCoord;

    toreturn.viewPadding = padding;

    toreturn.widthOfView = canvas_width;
    toreturn.heightOfView = canvas_height;

    toreturn.track = Game.player;

    toreturn.viewport = Graphics.rectangle(toreturn.viewXCoord, toreturn.viewYCoord, toreturn.widthOfView, toreturn.heightOfView);
    toreturn.mapRect = Graphics.rectangle(0, 0, widthofmap, heightofmap);

    toreturn.update = function(){
      if(Game.player.location.x - toreturn.viewXCoord + toreturn.viewPadding > toreturn.widthOfView) {
        toreturn.viewXCoord = Game.player.location.x - (toreturn.widthOfView - toreturn.viewPadding);
      } else if (Game.player.location.x - toreturn.viewPadding < toreturn.viewXCoord) {
        toreturn.viewXCoord = Game.player.location.x - toreturn.viewPadding;
      }


      toreturn.viewport = Graphics.rectangle(toreturn.viewXCoord, toreturn.viewYCoord, canvas.width, canvas.height);

      if (!toreturn.viewport.insideRectangle(toreturn.mapRect)) {
        //set the borders of the viewport
        if(toreturn.viewport.left < toreturn.mapRect.left){
          toreturn.viewXCoord = toreturn.mapRect.left;
        }

				if(toreturn.viewport.top < toreturn.mapRect.top) {
          toreturn.viewYCoord = toreturn.mapRect.top;
        }

				if(toreturn.viewport.right > toreturn.mapRect.right) {
          toreturn.viewXCoord = toreturn.mapRect.right - canvas.width;
        }

				if(toreturn.viewport.bottom > toreturn.mapRect.bottom){
          toreturn.viewYCoord = toreturn.mapRect.bottom - toreturn.heightOfView;
        }

      }

    }

    return toreturn;
  }


  toreturn.player = function(pos) {

    let dimension = 40/2;
    let jumpanyway = false;
    let friction = 0.98;
    let toreturn = {};
    toreturn.speed = 3.5;
    let canMoveLeft = true;
    let canMoveRight = true;

    // toreturn.location = {x: tilesize, y: canvas.height-tilesize*2, previousX: tilesize, previousY: canvas.height-tilesize*2};
    // toreturn.location = {x:spritepositions[0].spritelocationx, y:spritepositions[0].spritelocationy, previousX: spritepositions[0].spritelocationx, previousY:spritepositions[0].spritelocationy}
    toreturn.location = pos;
    toreturn.location.previousY = pos.y;
    toreturn.jumpPressed = false;
    toreturn.playerHitCoin = false;
    toreturn.enemyKilledMe = false;

    let goLeft = false;
    let goRight = false;
    let animationCounter = 0;
    let jump_y = toreturn.location.y;
    let display_count = 0;

    toreturn.onGround = true;
    toreturn.gravity = 0.5;
    toreturn.yVelocity = 0.0;

    let animatePlayerArray = [];
    let animatePlayerLeft = [];

    animatePlayerArray.push(Images.johnsnow1);
    animatePlayerArray.push(Images.johnsnow2);
    animatePlayerArray.push(Images.johnsnow3);
    animatePlayerArray.push(Images.johnsnow4);
    animatePlayerLeft.push(Images.johnsnow5);
    animatePlayerLeft.push(Images.johnsnow6);
    animatePlayerLeft.push(Images.johnsnow7);
    animatePlayerLeft.push(Images.johnsnow8);

/* controls for the player*/
    $(document).keydown(function(e) {
      if (e.keyCode == Controls.left) {
        goLeft = true;
      } else if (e.keyCode == Controls.right) {
        goRight = true;
      } else if (e.keyCode == Controls.jump) {
        toreturn.jumpPressed = true;
      }
      else if(e.keyCode== Controls.crouch){
        toreturn.fireZeWeapons = true;
      }

    }).keyup(function(e) {
      if (e.keyCode == Controls.left) {
        goLeft = false;
        animationCounter = 0;
      } else if (e.keyCode == Controls.right) {
        goRight = false;
        animationCounter = 0;
      } else if (e.keyCode == Controls.jump) {
        toreturn.jumpPressed = false;
      }
    })
    toreturn.setJumpAnyway = function(){
      jumpanyway = true;
    }
    toreturn.checkExitToMenu = function(viewXCoord){
     if( Math.round((toreturn.location.x + Images.player_width)/ tilesize)>222){
       return true;
     }
     else return false;

    }
    toreturn.renderPlayer = function(viewXCoord, viewYCoord) {
      context.save();
      context.clearRect(viewXCoord,viewYCoord,canvas.width,canvas.height);

      if(goLeft) {
        toreturn.goLeft();

        //if we have displayed all the animations
        if (display_count + 1 > 3) {
          display_count = 0;
        }
        else {
          if(animationCounter>=10){animationCounter=0;display_count++;}
          animationCounter += 1;
        }
      }
      if(goRight) {
        toreturn.goRight();


        //if we have displayed all the animations
        if (display_count + 1 > 3) {
          display_count = 0;
        }
        else {
          if(animationCounter>=10){animationCounter = 0;display_count++;}
          animationCounter += 1;
        }
      }
      /*
      toreturn.onPlat = false;
      toreturn.isOnPlatform();
      */
      // toreturn.isOnGround();

      if(toreturn.jumpPressed) {
        toreturn.jumping();
      } else {
        if (toreturn.yVelocity < -5.0) {
          toreturn.yVelocity = -5.0;
        }
      }
      if(goLeft){
        //our left facing animations
      context.drawImage(animatePlayerLeft[display_count], toreturn.location.x - viewXCoord, toreturn.location.y - viewYCoord, tilesize, tilesize);}
        //our right facing animations
      else{
      context.drawImage(animatePlayerArray[display_count], toreturn.location.x - viewXCoord, toreturn.location.y - viewYCoord, tilesize, tilesize);}

      context.restore();
    };



    toreturn.goRight = function(elapsedTime) {
      if (toreturn.location.x + (friction * toreturn.speed) >= Graphics.map_width - tilesize) {
        toreturn.location.x = Graphics.map_width - tilesize;
      } else {
        toreturn.location.x += (friction * toreturn.speed);
      }

    };
    toreturn.goLeft = function(elapsedTime) {
      if (toreturn.location.x - (friction * toreturn.speed) >= 0) {
        toreturn.location.x -= (friction * toreturn.speed);
      } else {
        toreturn.location.x = 0;
      }
    };

    toreturn.jumping = function() {

      if (toreturn.onGround || jumpanyway && pressAllowed) {
        if(jumpanyway){pressAllowed = false;}
        playSound('jump');

          toreturn.yVelocity = -13;
          toreturn.onGround = false;

      }
    };

    toreturn.checkEnemyCollisions = function(enemyspec, viewXCoord){
      let leftX = Math.round((toreturn.location.x- viewXCoord) / tilesize);
      let rightX = Math.round((toreturn.location.x + Images.player_width-viewXCoord)/ tilesize);
      let upY = Math.round(toreturn.location.y / tilesize);
      let downY = Math.round((toreturn.location.y + Images.player_height)/ tilesize);
      let enemyleftX = Math.round(enemyspec.location.x / tilesize);
      let enemyrightX = Math.round((enemyspec.location.x + 51/2)/ tilesize);
      let enemyupY = Math.round(enemyspec.location.y / tilesize);
      let enemydownY = Math.round((enemyspec.location.y + 51/2)/ tilesize);
      // console.log(leftX,rightX,upY,downY);
      // console.log(enemyleftX,enemyrightX,enemyupY,enemydownY);



      if (downY == enemyupY && (leftX == enemyleftX || rightX == enemyrightX)){
        playSound('bop');
        enemyspec.drawdeath = true;
        return "kill";}
      if(leftX == enemyleftX && upY == enemyupY){playSound('wilhelm');toreturn.enemyKilledMe = true;}
      if(rightX == enemyrightX && upY == enemyupY){playSound('wilhelm');toreturn.enemyKilledMe =true;}

    }

    toreturn.checkIfWon = function(){
      let rightX = Math.round((toreturn.location.x + Images.player_width)/ tilesize);

      for (let i = 0; i<16;i++){
        if (map[i][rightX-2] == 'flag'){
          return true;
        }
      }
    }
    toreturn.checkForCollisions = function() {
      let leftX = Math.floor(toreturn.location.x / tilesize);
      let rightX = Math.floor((toreturn.location.x + Images.player_width)/ tilesize);
      let upY = Math.floor((toreturn.location.y)/ tilesize);
      let downY = Math.floor((toreturn.location.y + Images.player_height+5)/ tilesize);
      // console.log(downY);
      if(downY<=17){
      if(upY<=1){
        toreturn.location.y = toreturn.location.previousY;}
      if ( map[downY][leftX] != undefined || map[downY][rightX] != undefined) {
        // toreturn.location.y = toreturn.location.previousY;
        toreturn.onGround = true;
        toreturn.yVelocity = 0.0;
        toreturn.gravity = 0.0;
      }
      else {
        toreturn.gravity = 0.5;
        toreturn.onGround = false;
      }
      if (map[upY][leftX] == 'stone') {
      //console.log("cant go left");
        toreturn.location.x = toreturn.location.previousX;
      }
      else if (map[upY][rightX] == 'stone') {
        //console.log("cant go right");
        toreturn.location.x = toreturn.location.previousX;
      }
      if (map[upY][leftX] == 'stone' || map[upY][rightX] == 'stone' || map[upY][leftX] == 'crownstone' || map[upY][rightX] == 'crownstone') {
        if(map[upY][leftX] == 'crownstone' || map[upY][rightX] == 'crownstone'){
          playSound('coin');
          toreturn.playerHitCoin = true;
          changes = true;
        }
        //console.log("cant go up");



        toreturn.location.y = toreturn.location.previousY;
      }}
    }

    toreturn.killPlayer = function() {

        toreturn.location.x = 50/2;
        toreturn.location.y = canvas.height/2;

    }

    toreturn.fellThroughMap = function() {
      if (toreturn.location.y + Images.player_height>= canvas.height-10/2) {
        playSound('wilhelm');
        return true;
      }
      else {
        return false;
      }
    }

    toreturn.update = function(elapsedTime) {

      toreturn.yVelocity += toreturn.gravity;
      toreturn.location.y += toreturn.yVelocity;

      toreturn.checkForCollisions();

      toreturn.location.previousX = toreturn.location.x;
      toreturn.location.previousY = toreturn.location.y;


    }



    return toreturn;
  }

  toreturn.lives = function(spec) {
    let location = {x: spec.x, y: spec.y};
    let livesRemaining = spec.howMany;

    let toreturn = {};

    toreturn.subtractLives = function() {
      livesRemaining--;
      if (livesRemaining <= 0) {
      playertoadd = prompt("Enter your name for highscores","Enter name here");
      if (onetime){
        console.log(playertoadd);
        console.log(score);
      $.ajax({
          type: 'POST',
          dataType: "json",
          data: {
            player:playertoadd,
            score:score
          },
          url: 'http://localhost:5000/highscoreset',
          success: function(result){
            scores = result;
            postedhighscore = true;
          }
      });
      onetime = false;
    }
      }


    }

    toreturn.renderLives = function() {
      context.save();
      for ( let x = 0; x < livesRemaining; x++ ) {
        // console.log(Images.johnsnow1);
        context.textAlign = 'center';
        context.fillStyle = '#f8f8ff';
        context.shadowColor = 'black';
        context.lineWidth = 4;
        context.shadowBlur = 10;

        context.font = '40px Arial';
        context.strokeText('Lives:', 1400/2, 100/2);
        context.fillText('Lives:', 1400/2, 100/2);
        context.strokeText('Score:', 1500/2, 200/2);
        context.fillText('Score:', 1500/2, 200/2);
        context.strokeText(score.toString(), 1800/2, 200/2);
        context.fillText(score.toString(), 1800/2, 200/2);
        context.drawImage(Images.johnsnow1, 1530/2 +Images.player_width*(x*1.5), 43/2, tilesize, tilesize);
      }
      context.restore();
    }


    return toreturn;
  }

  toreturn.enemy = function(spec) {
    let source = spec.source;
    let isdead = false;
    let dimension = 32;
    let toreturn = {};
    toreturn.id = spec.id;

    toreturn.speed = 1;
    let friction = 0.98;
    toreturn.location = {x: spec.location.x, y: spec.location.y};
    let animationCounter = 0;
    let direction = 'left';
    let walkertime = spec.walkertime;

    let jump_y = toreturn.location.y;
    let display_count = 0;
    let display_walker_count  = 0;
    toreturn.drawdeath = false;
    toreturn.onGround = false;
    toreturn.deathlocation = null;
    toreturn.gravity = 0.5;
    toreturn.yVelocity = 0.0;
    toreturn.onPlat = false;
    toreturn.alpha = 1;

    toreturn.enemy_animation = [];
    if(source =="ww"){
    toreturn.enemy_animation.push(Images.icewalk);
    toreturn.enemy_animation.push(Images.icewalk2);
  }
  else if(source== "dd"){
    toreturn.enemy_animation.push(Images.dothraki1);
    toreturn.enemy_animation.push(Images.dothraki2);
  }
  else if (source == "jj"){
    toreturn.enemy_animation.push(Images.joffrey1);
    toreturn.enemy_animation.push(Images.joffrey2);
  }
    toreturn.setDead = function(){
      score+=100;
      isdead = true;
      toreturn.deathlocation = {x:toreturn.location.x,y:toreturn.location.y};
      toreturn.location = {x:-100,y:-100};
    }
    toreturn.getDead = function(){
      if(isdead){return true;}
      else{return false;}
    };
    toreturn.renderEnemy = function(viewXCoord, viewYCoord) {
      if(!isdead){
      // console.log(walkertime);
      if(walkertime>10){
        display_walker_count++;
        walkertime = 0;
      }
      if(display_walker_count>1){
        display_walker_count = 0;
      }
      if(source =="ww"){
      context.save();
      context.drawImage(toreturn.enemy_animation[display_walker_count], toreturn.location.x, toreturn.location.y, Images.icewalk.width/2, Images.icewalk.height/2);
      context.restore();
    }
    else if (source =="dd"){
      context.save();
      context.drawImage(toreturn.enemy_animation[display_walker_count], toreturn.location.x, toreturn.location.y, Images.dothraki1.width/2, Images.dothraki1.height/2);
      context.restore();
    }
    else if(source == "jj"){
      context.save();
      context.drawImage(toreturn.enemy_animation[display_walker_count], toreturn.location.x, toreturn.location.y, Images.joffrey1.width/2, Images.joffrey1.height/2);
      context.restore();
    }


    }
    };
    toreturn.goRight = function(elapsedTime) {
      if (toreturn.location.x + (friction * toreturn.speed) >= Graphics.map_width - tilesize) {
        toreturn.location.x = Graphics.map_width - tilesize;
      } else {
        toreturn.location.x += (friction * toreturn.speed);
      }

    };
    toreturn.goLeft = function(elapsedTime) {
      if (toreturn.location.x - (friction * toreturn.speed) >= 0) {

        toreturn.location.x -= (friction * toreturn.speed);
      } else {
        toreturn.location.x -= (friction * toreturn.speed);
      }
    };

    toreturn.renderDeathScores = function(){

      context.save();
      context.textAlign = 'center';
      context.fillStyle = '#f8f8ff';
      if (toreturn.alpha <=0){toreturn.alpha =0;}
      context.globalAlpha = toreturn.alpha;
      context.shadowColor = 'black';
      context.lineWidth = 4;
      context.shadowBlur = 10;

      context.font = '40px Arial';
      context.strokeText('100', toreturn.deathlocation.x, toreturn.deathlocation.y);
      context.fillText('100', toreturn.deathlocation.x, toreturn.deathlocation.y);
      context.restore();
    }


    toreturn.isOnPlatform = function(){

      for (let i=0; i < Map.levelrows; i++){
        for (let j=0; j < Map.levelcolumns; j++){

          if (toreturn.onPlat == false && (map[i][j] == 'dirtleft' || map[i][j] == 'dirt' || map[i][j] == 'dirtright' || map[i][j] == 'stone' || map[i][j] == 'crownstone')  ) {
            if(toreturn.location.x > j*dimension - 40/2 && toreturn.location.x < (j*dimension + (3*dimension))&& toreturn.location.y > i*dimension - dimension && toreturn.location.y < i*dimension - 40/2) {

              toreturn.onPlat = true;
              toreturn.yVelocity = 0.0;
              toreturn.gravity = 0.0;
              toreturn.location.y = i*dimension - dimension;

            } else {
              toreturn.onPlat = false;
              toreturn.gravity = 0.5;
            }
          }
        }
      }

    };

    toreturn.onPlat = false;
    toreturn.isOnPlatform();

    toreturn.changeDirection = function() {
      if ( direction == 'right') {
        direction ='left';
      }
      else if ( direction == 'left') {
        direction = 'right';
      }
    }

    toreturn.update = function(elapsedTime, deltaXView, deltaYView, viewXCoord, viewYCoord) {
      // console.log(walkertime);
      // console.log(toreturn.onGround);
      // toreturn.checkForCollisions();
      walkertime++;
            //console.log( Math.round((toreturn.location.y)/ tilesize),Math.round((toreturn.location.x)/ tilesize), map[Math.round(toreturn.location.y / tilesize)][Math.round((toreturn.location.x)/ tilesize)])
            if ( map[ Math.round((toreturn.location.y + Images.player_height)/ tilesize)][Math.floor((toreturn.location.x + viewXCoord)/ tilesize)] == 'stone' || map[ Math.round((toreturn.location.y + Images.player_height)/ tilesize)][Math.round((toreturn.location.x + viewXCoord)/ tilesize)]  == 'dirt') {
              toreturn.onPlat = true;
              toreturn.onGround = true;
              toreturn.yVelocity = 0.0;
              toreturn.gravity = 0.0;
            }
            else {
              toreturn.onPlat = false;
              toreturn.gravity = 0.5;
            }
            //console.log(map[ Math.round((toreturn.location.y)/ tilesize+1)][Math.round((toreturn.location.x + viewXCoord - Images.player_width)/ tilesize)]);
            if(map[ Math.round((toreturn.location.y)/ tilesize+1)][Math.floor((toreturn.location.x + viewXCoord)/ tilesize)]== undefined){
              if ( toreturn.onGround == true || toreturn.onPlat == true) {
                if ( Math.round((toreturn.location.x)/ tilesize) > 0 ) {
                  toreturn.changeDirection();
                }
              }
            }
            else if(map[ Math.round((toreturn.location.y)/ tilesize+1)][Math.floor((toreturn.location.x + viewXCoord + Images.player_width)/ tilesize)]== undefined){
              if ( toreturn.onGround == true || toreturn.onPlat == true) {
                if ( Math.round((toreturn.location.x)/ tilesize) > 0 ) {
                  toreturn.changeDirection();
                }
              }
            }
            else if ( map[ Math.round((toreturn.location.y)/ tilesize)][Math.floor((toreturn.location.x + viewXCoord + Images.player_width)/ tilesize)] == 'stone' || map[ Math.round((toreturn.location.y)/ tilesize)][Math.round((toreturn.location.x + viewXCoord +Images.player_width)/ tilesize)] == 'dirt'){
              toreturn.changeDirection();
            }
            else if ( map[ Math.round((toreturn.location.y)/ tilesize)][Math.floor((toreturn.location.x + viewXCoord)/ tilesize)] == 'stone' || map[ Math.round((toreturn.location.y)/ tilesize)][Math.round((toreturn.location.x + viewXCoord)/ tilesize)] == 'dirt') {
              toreturn.changeDirection();
            }

            toreturn.yVelocity += toreturn.gravity;
            toreturn.location.y += toreturn.yVelocity;
            toreturn.location.x -= deltaXView;
            toreturn.location.y -= deltaYView;

            if (toreturn.location.x + viewXCoord > 16000) {
              direction = 'left';
            }
            else if ( toreturn.location.x + viewXCoord <= 0) {
              toreturn.location.x = 0;
              direction = 'right';
            }

            if ( direction == 'right') {
              toreturn.goRight(elapsedTime);
            }
            else {
              toreturn.goLeft(elapsedTime);
            }

            if (toreturn.location.y >= canvas.height - dimension*2 && toreturn.onPlat == false) {
              toreturn.onGround = true;
              toreturn.yVelocity = 0.0;
              toreturn.location.y = canvas.height - dimension*2;
            }
            if(toreturn.id =="walker0");
            // console.log(direction);
          }

          return toreturn;
        }
  toreturn.fireball = function(){
    let toreturn = {};
    toreturn.idtokill = "nothing";
    toreturn.temptokill = "nothing";
    toreturn.location = {x:-100,y:-100};
    toreturn.drawThis = false;
    toreturn.create = function(spec){
    toreturn.location.x= spec.x;
    toreturn.location.y = spec.y;
    toreturn.drawThis = true;
  }

    toreturn.update = function(elapsedTime,deltaXView,deltaYView,viewXCoord, viewYCoord,locationX,locationY,id){
      toreturn.location.x+=1.5;
      toreturn.temptokill = id;
      // toreturn.location.y+=2;
      toreturn.location.x -=deltaXView;
      toreturn.location.y -=deltaYView;

      toreturn.checkEnemyCollideFire(locationX-viewXCoord,locationY-viewYCoord);
    }


    toreturn.renderFireball = function(viewXCoord,viewYCoord){
      if(toreturn.drawThis){
        context.save();
        context.drawImage(Images.fireball,toreturn.location.x,toreturn.location.y,tilesize,tilesize);
        context.restore();
      }
    }

    toreturn.checkEnemyCollideFire= function(locationX,locationY){
      if (locationX >= toreturn.location.x-20 && locationX <= toreturn.location.x + tilesize && locationY >= toreturn.location.y-15 && locationY <= toreturn.location.y + tilesize) {
        if ( toreturn.drawThis == true) {
          toreturn.drawThis = false;
          toreturn.idtokill = toreturn.temptokill;
          score+=200;
          playSound('bop');
        }
      }
    }
    return toreturn;
  }
  toreturn.crown = function(spec){
    let toreturn = {};
    toreturn.drawThis = true;

    toreturn.location = {x: spec.location.x, y: spec.location.y};
    toreturn.update = function(elapsedTime, deltaXView, deltaYView, viewXCoord, viewYCoord, locationX, locationY){
      toreturn.location.x -= deltaXView;
      toreturn.location.y -= deltaYView;

      toreturn.checkPlayerCollision(locationX-viewXCoord, locationY-viewYCoord);
    }

    toreturn.renderCrowns = function(viewXCoord, viewYCoord) {
      if(toreturn.drawThis){
        context.save();
        context.drawImage(Images.crown, toreturn.location.x, toreturn.location.y, tilesize, tilesize);
        context.restore();
      }
    }

    toreturn.checkPlayerCollision = function(locationX, locationY) {
      if (locationX >= toreturn.location.x-20 && locationX <= toreturn.location.x + tilesize && locationY >= toreturn.location.y && locationY <= toreturn.location.y + tilesize) {
        if ( toreturn.drawThis == true) {
          toreturn.drawThis = false;
          score+=200;
          playSound('coin');
        }
      }
    }

    return toreturn;
  };


  toreturn.particle = function(spec) {
    var toreturn = {};

    spec.radius = 2;
    spec.xMomentum = spec.xSpeed;
    spec.yMomentum = spec.ySpeed;
    spec.gravity = 0.13;
    spec.alive = 0;
    spec.drawThis = true;

    /*
    spec.radius = 5;
    spec.alive = 0;
    spec.Xspeed = spec.initialSpeed;
    spec.Yspeed = spec.initialSpeed;
    spec.secondAlive = 0;
    */

    toreturn.draw = function() {
      if (spec.drawThis === true ) {
        context.save();

        context.beginPath();
        context.arc(spec.position.x, spec.position.y, spec.radius, 0, 2*Math.PI, false);
        context.fillStyle = spec.color;
        context.fill();

        context.restore();
      }
    }
    toreturn.update = function(elapsedTime) {
      if( spec.drawThis == true) {
          spec.alive += elapsedTime;

          //if ( spec.position.x <= 5 || spec.position.x >= 995 ) {
          //  spec.xMomentum = -spec.xMomentum;
          //}

          if ( spec.position.y >= 1500 ) {
            //spec.yMomentum = -spec.yMomentum;
            //spec.alive += 1000;
            spec.drawThis = false;
          }
          spec.yMomentum += spec.gravity * spec.alive/3000;

          spec.position.x += (elapsedTime * spec.xMomentum);
          spec.position.y += (elapsedTime * spec.yMomentum);
      }
    }
    return toreturn;
  }

  toreturn.map = function() {
    let contextForMap = document.createElement('canvas').getContext('2d');
    let dimension =32;
    let toreturn = {};
    Map.initialize();

		contextForMap.canvas.width = 16000/2;
		contextForMap.canvas.height = 1152/2;

	  contextForMap.save();
    contextForMap.drawImage(Images.bg, 0,0, contextForMap.canvas.width, contextForMap.canvas.height);

    for(let i=0; i < Map.levelrows; i++ ){
      for (let j=0; j < Map.levelcolumns; j++){
        if (map[i][j] == 'dirtleft') {
          contextForMap.drawImage(Images.dirtleft, j*dimension, i*dimension, tilesize, tilesize);
        }
        if (map[i][j] == 'dirt') {
          contextForMap.drawImage(Images.dirt, j*dimension, i*dimension, tilesize, tilesize);
        }
        if (map[i][j] == 'dirtright') {
          contextForMap.drawImage(Images.dirtright, j*dimension, i*dimension, tilesize, tilesize);
        }
        if (map[i][j] == "stone"){
          contextForMap.drawImage(Images.stone_whole, j * dimension, i*dimension , tilesize, tilesize);
        }
        if (map[i][j] == "crown"){
          console.log(drawcrown[i][j]);
          if(drawcrown[i][j]== true){
            contextForMap.drawImage(Images.crown, j * dimension, i*dimension , tilesize, tilesize);}
        }
        if (map[i][j] == "crownstone"){
          contextForMap.drawImage(Images.crownstone, j * dimension, i*dimension , tilesize, tilesize);
        }
        if(map[i][j] =='flag'){
            contextForMap.drawImage(Images.flag, j * dimension, i*dimension , 203/2, 662/2);
        }
        if (map[i][j] =='dragon'){
            contextForMap.drawImage(Images.dragon2, j * dimension, i*dimension , Images.dragon2.width/2, Images.dragon2.height/2);
        }

      }
    }

		contextForMap.restore();

//to get a width of the contextmap
		toreturn.canvasAsPng = new Image();
		toreturn.canvasAsPng.src = contextForMap.canvas.toDataURL("image/png");
		// contextForMap = null;


    toreturn.renderMap = function(viewXCoord, viewYCoord) {
      canvas = $('#canvas-for-view').get(0);
      context = canvas.getContext('2d');

      let ourViewX = viewXCoord;
      let ourViewY = viewYCoord;
      let ourViewWidth = canvas.width;
      let ourViewHeight = canvas.height;

			if(toreturn.canvasAsPng.width - ourViewX < ourViewWidth){
				ourViewWidth = toreturn.canvasAsPng.width - ourViewX;
			}
      //for going up
			// if(toreturn.canvasAsPng.height - ourViewY < ourViewHeight){
			// 	ourViewHeight = toreturn.canvasAsPng.height - ourViewY;
			// }
			context.drawImage(toreturn.canvasAsPng, ourViewX, ourViewY, ourViewWidth, ourViewHeight, 0, 0, ourViewWidth, ourViewHeight);

      canvas = $('#canvas-main').get(0);
      context = canvas.getContext('2d');
    };

    return toreturn;
  };

  return toreturn;
}());
