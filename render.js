
let Graphics = (function(){
  let toreturn = {};
  let canvas = $('#canvas-main')[0];
  console.log("Hola");
  let context = canvas.getContext('2d');
  let cont = $('.ourView');
  toreturn.initial_cont_width = cont.width();
  toreturn.cont_width = $('.ourView').width();
  let tw = Images.tile_width;
  let th = Images.tile_height;
//this stuff is all from justins explanation of the camera
  let pad_x = 500;
  toreturn.map_width = 16000;
  toreturn.map_height = canvas.height;
  toreturn.xView = 0;
  let map = Map.map();

  toreturn.rectangle = function(left, top, width, height) {
    let toreturn = {};
    toreturn.left = left;
    toreturn.top = top;
    toreturn.width = width;
    toreturn.height = height;

    toreturn.right = toreturn.left + toreturn.width;
    toreturn.bottom = toreturn.top + toreturn.height;

    toreturn.set = function(left, top) {
      toreturn.left = left;
      toreturn.top = top;
      toreturn.right = toreturn.left + toreturn.width;
      toreturn.bottom = toreturn.top + toreturn.height;
      // return toreturn;
    }

    toreturn.within = function(rect) {
      if (rect.left <= toreturn.left && rect.right >= toreturn.right && rect.top <= toreturn.top && rect.bottom >= toreturn.bottom){
        return true;
      } else {
        return false;
      }
    }

    return toreturn;
  };


  toreturn.camera = function(xView, yView, canvas_width, canvas_height, widthofmap, heightofmap) {
    let toreturn = {};

    toreturn.xView = xView;
    toreturn.yView = yView;


    toreturn.xPad = pad_x;

    toreturn.wView = canvas_width;
    toreturn.hView = canvas_height;


    toreturn.track = Game.plr;

    toreturn.viewport = Graphics.rectangle(toreturn.xView, toreturn.yView, toreturn.wView, toreturn.hView);
    toreturn.mapRect = Graphics.rectangle(0, 0, widthofmap, heightofmap);

    toreturn.update = function(){
      if(Game.plr.pos.x - toreturn.xView + toreturn.xPad > toreturn.wView) {
        toreturn.xView = Game.plr.pos.x - (toreturn.wView - toreturn.xPad);
      } else if (Game.plr.pos.x - toreturn.xPad < toreturn.xView) {
        toreturn.xView = Game.plr.pos.x - toreturn.xPad;
      }


      toreturn.viewport = Graphics.rectangle(toreturn.xView, toreturn.yView, canvas.width, canvas.height);

      if (!toreturn.viewport.within(toreturn.mapRect)) {
        if(toreturn.viewport.left < toreturn.mapRect.left){

          toreturn.xView = toreturn.mapRect.left;
        }
				if(toreturn.viewport.top < toreturn.mapRect.top) {

          toreturn.yView = toreturn.mapRect.top;
        }
				if(toreturn.viewport.right > toreturn.mapRect.right) {

          toreturn.xView = toreturn.mapRect.right - canvas.width;
        }
				if(toreturn.viewport.bottom > toreturn.mapRect.bottom){

          toreturn.yView = toreturn.mapRect.bottom - toreturn.hView;
        }
      }

    }

    return toreturn;
  }


  toreturn.player = function() {
    let dimension = 64;
    let friction = 0.98;
    let toreturn = {};
    let speed = 5;

    toreturn.pos = {x: tw, y: canvas.height-th*2};
    let keyLeft = false;
    let keyRight = false;
    let keyUp = false;
    let walk_count = 0;
    let scroll_count = 1;

    //jump animation
    let max_jump = 20; //pixels
    let jump_dy = 2; //pixels per second;
    let jump_y = toreturn.pos.y;
    let jump_desc = false;
    let display_count = 0;
    toreturn.on_ground = true;
    toreturn.gravity = 0.5;
    toreturn.velocity_y = 0.0;

    //set up an array of player images to animate their movement
    let plr_animations = [];
    let left_animations = [];

    //push all of the animation for walking on the plr_animations array
    plr_animations.push(Images.plr_walk1);
    plr_animations.push(Images.plr_walk2);
    plr_animations.push(Images.plr_walk3);
    plr_animations.push(Images.plr_walk4);
    left_animations.push(Images.plr_walk5);
    left_animations.push(Images.plr_walk6);
    left_animations.push(Images.plr_walk7);
    left_animations.push(Images.plr_walk8);


    //add the player's event listener
    $(document).keydown(function(e) {
      if (e.keyCode == Controls.left) {
        keyLeft = true;
      } else if (e.keyCode == Controls.right) {
        keyRight = true;
      } else if (e.keyCode == Controls.jump) { // up arrow
        keyUp = true;
      }

    }).keyup(function(e) {
      if (e.keyCode == Controls.left) { //left arrow
        keyLeft = false;
        walk_count = 0;
      } else if (e.keyCode == Controls.right) { //right arrow
        keyRight = false;
        walk_count = 0;
      } else if (e.keyCode == Controls.jump) { // up arrow
        keyUp = false;
      }
    })

    toreturn.drawPlayer = function(xView, yView) {
      context.save();
      context.clearRect(xView,yView,canvas.width,canvas.height);

      if(keyLeft) {
        toreturn.moveLeft();
        if (display_count + 1 > 3) {
          display_count = 0;
        } else {
          if(walk_count>=10){walk_count=0;display_count++;}
          walk_count += 1;
        }
      }

      if(keyRight) {
        toreturn.moveRight();
        if (display_count + 1 > 3) {
          display_count = 0;
        } else {
          if(walk_count>=10){walk_count = 0;display_count++;}
          walk_count += 1;
        }
      }

      //see if the user is jumping on any platforms
      Game.on_platform = false;
      toreturn.detectPlatform();

      //see if the user pressed up to jump
      if(keyUp) {
        toreturn.jump();
      } else {
        if (toreturn.velocity_y < -6.0) {
          toreturn.velocity_y = -6.0;
        }
      }
      if(keyLeft){  context.drawImage(left_animations[display_count], toreturn.pos.x - xView, toreturn.pos.y - yView, tw, th);}
      else{
      context.drawImage(plr_animations[display_count], toreturn.pos.x - xView, toreturn.pos.y - yView, tw, th);}
      context.restore();
    };

    toreturn.moveLeft = function(elapsedTime) {
      if (toreturn.pos.x - (speed * friction) >= 0) {

        toreturn.pos.x -= (speed * friction);
      } else {
        toreturn.pos.x = 0;
      }
    };

    toreturn.moveRight = function(elapsedTime) {
      if (toreturn.pos.x + (speed * friction) >= Graphics.map_width - tw) {
        toreturn.pos.x = Graphics.map_width - tw;
      } else {
        toreturn.pos.x += (speed * friction);
      }

    };

    toreturn.jump = function() {
      if (toreturn.on_ground || Game.on_platform) {

        toreturn.velocity_y = -15;
        Game.on_platform = false;
        toreturn.on_ground = false;
      }
    };

    toreturn.detectPlatform = function(){
      for (let i=0; i < Map.map_rows; i++){
        for (let j=0; j < Map.map_cols; j++){
          if (map[i][j] == 'dirtleft' && Game.on_platform == false) {
            if(toreturn.pos.x > j*dimension - 30 && toreturn.pos.x < (j*dimension + (3*dimension) - 20)&& toreturn.pos.y > i*dimension - dimension && toreturn.pos.y < i*dimension - 50) {
              Game.on_platform = true;
              toreturn.on_ground = true;
              toreturn.velocity_y = 0.0;
              toreturn.gravity = 0.0;

              //place the player on the platform
              toreturn.pos.y = i*dimension - dimension;
            } else {
              Game.on_platform = false;
              toreturn.gravity = 0.5;
            }
          }
        }
      }

    };

    return toreturn;
  }


  toreturn.enemy = function(spec) {
    let dimension = 64;
    let toreturn = {};
    let speed = 3;
    let friction = 0.98;
    toreturn.pos = {x: spec.pos.x, y: spec.pos.y};
    let walk_count = 0;
    let scroll_count = 1;
    let areaToMoveInside = {minX: spec.range.minX, maxX: spec.range.maxX, minY: spec.range.minY, maxY: spec.range.maxY};
    let direction = 'right';
    let walkertime = spec.walkertime;

    //jump animation
    let max_jump = 20; //pixels
    let jump_dy = 2; //pixels per second;
    let jump_y = toreturn.pos.y;
    let jump_desc = false;
    let display_count = 0;
    let display_walker_count  = 0;
    toreturn.on_ground = true;
    toreturn.gravity = 0.5;
    toreturn.velocity_y = 0.0;

    let enemy_animation = [];

    enemy_animation.push(Images.icewalk);
    enemy_animation.push(Images.icewalk2);

    toreturn.drawEnemy = function(xView, yView) {
      // console.log(walkertime);
      if(walkertime>10){
        display_walker_count++;
        walkertime = 0;
      }
      if(display_walker_count>1){
        display_walker_count = 0;
      }
      context.save();
      //context.clearRect(xView,yView,canvas.width,canvas.height);
      // console.log(enemy_animation[display_walker_count].src)
      context.drawImage(enemy_animation[display_walker_count], toreturn.pos.x, toreturn.pos.y, tw, th);
      context.restore();

    };

    toreturn.moveLeft = function(elapsedTime) {
      if (toreturn.pos.x - (speed * friction) >= 0) {

        toreturn.pos.x -= (speed * friction);
      } else {
        toreturn.pos.x = 0;
      }
    };

    toreturn.moveRight = function(elapsedTime) {
      if (toreturn.pos.x + (speed * friction) >= Graphics.map_width - tw) {
        toreturn.pos.x = Graphics.map_width - tw;
      } else {
        toreturn.pos.x += (speed * friction);
      }

    };

    toreturn.detectPlatform = function(){
      for (let i=0; i < Map.map_rows; i++){
        for (let j=0; j < Map.map_cols; j++){
          if (map[i][j] == 'dirtleft') {
            if(toreturn.pos.x > j*dimension - 30 && toreturn.pos.x < (j*dimension + (3*dimension) - 20)&& toreturn.pos.y > i*dimension - dimension && toreturn.pos.y < i*dimension - 50) {
              toreturn.on_ground = true;
              toreturn.velocity_y = 0.0;
              toreturn.gravity = 0.0;

              //place the player on the platform
              toreturn.pos.y = i*dimension - dimension;
            } else {
              toreturn.gravity = 0.5;
            }
          }
        }
      }
    };

    toreturn.update = function(elapsedTime) {
      // console.log(walkertime);
      walkertime++;
      toreturn.velocity_y += toreturn.gravity;
      toreturn.pos.y += toreturn.velocity_y;
      toreturn.detectPlatform();

      if (toreturn.pos.x > areaToMoveInside.maxX) {
        direction = 'left';
      }
      if ( toreturn.pos.x < areaToMoveInside.minX) {
        direction = 'right';
      }

      if ( direction == 'right') {
        toreturn.moveRight(elapsedTime);
      }
      else {
        toreturn.moveLeft(elapsedTime);
      }

      if (toreturn.pos.y >= canvas.height - 128) {
        toreturn.on_ground = true;
        toreturn.velocity_y = 0.0;
        toreturn.pos.y = canvas.height - 128;
      }

    }



    return toreturn;
  }


  toreturn.map = function() {
    let dimension =64;
    let toreturn = {};
    Map.initialize();


    //this will create the overall map and draw it to a new canvas of the map's size
    let temp_context = document.createElement('canvas').getContext('2d');
		temp_context.canvas.width = 16000; //pixels
		temp_context.canvas.height = 1152; //pixels

	  temp_context.save();

    //draw the background
    temp_context.drawImage(Images.bg, 0,0, temp_context.canvas.width, temp_context.canvas.height);

    //draw the grass floor
    for(let i=0; i < Map.map_rows; i++ ){
      for (let j=0; j < Map.map_cols; j++){
        if (map[i][j] == "stone"){
          temp_context.drawImage(Images.stone_whole, j * dimension, i*dimension , tw, th);
        }
        if (map[i][j] == 'dirtleft') {
          temp_context.drawImage(Images.dirtleft, j*dimension, i*dimension, tw, th);
        }
        if (map[i][j] == 'dirt') {
          temp_context.drawImage(Images.dirt, j*dimension, i*dimension, tw, th);
        }
        if (map[i][j] == 'dirtright') {
          temp_context.drawImage(Images.dirtright, j*dimension, i*dimension, tw, th);
        }
      }
    }


		temp_context.restore();

		// store the map as an image
		toreturn.map_view = new Image();
		toreturn.map_view.src = temp_context.canvas.toDataURL("image/png");

		// clear context
		temp_context = null;

    toreturn.drawMap = function(xView, yView) {
      canvas = $('#map-canvas')[0];
      context = canvas.getContext('2d');

      //this is the x,y within the overall image toreturn I'm showing in the canvas
      let viewport_x = xView;
      let viewport_y = yView;

      let viewport_width = canvas.width;
      let viewport_height = canvas.height;

      // if viewportped image is smaller than canvas we need to change the source dimensions
			if(toreturn.map_view.width - viewport_x < viewport_width){
				viewport_width = toreturn.map_view.width - viewport_x;
			}
			if(toreturn.map_view.height - viewport_y < viewport_height){
				viewport_height = toreturn.map_view.height - viewport_y;
			}

			// location on canvas to draw the viewport image
			dx = 0;
			dy = 0;

			// match destination with source to not scale the image
			dWidth = viewport_width;
			dHeight = viewport_height;

			context.drawImage(toreturn.map_view, viewport_x, viewport_y, viewport_width, viewport_height, dx, dy, dWidth, dHeight);

      canvas = $('#canvas-main')[0];
      context = canvas.getContext('2d');
    };

    return toreturn;
  };

  return toreturn;
}());
