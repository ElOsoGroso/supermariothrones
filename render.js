
let Graphics = (function(){
  let toreturn = {};
  let canvas = $('#canvas-main')[0];
  console.log("Hola");
  let context = canvas.getContext('2d');
  let container = $('.ourView');
  toreturn.initial_container_width = container.width();
  toreturn.container_width = $('.ourView').width();
  let tileswide = Images.tile_width;
  let tileshigh = Images.tile_height;
//this stuff is all from justins explanation of the camera

  let padding = 600;
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


    toreturn.withinRectangle = function(rect) {
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

    toreturn.xPad = padding;

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

      if (!toreturn.viewport.withinRectangle(toreturn.mapRect)) {

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
    let dimensiony = Graphics.player_height;
    let dimensionx = Graphics.player_width;
    let friction = 0.98;
    let toreturn = {};
    let speed = 5;

    toreturn.pos = {x: tileswide, y: canvas.height-tileshigh*2};
    let goLeft = false;
    let goRight = false;
    let keyUp = false;
    let walk_count = 0;
    let jump_dy = 2;
    let jump_y = toreturn.pos.y;
    let display_count = 0;
    toreturn.on_ground = true;
    toreturn.gravity = 0.5;
    toreturn.velocity_y = 0.0;

    let plr_animations = [];
    let left_animations = [];

    plr_animations.push(Images.johnsnow1);
    plr_animations.push(Images.johnsnow2);
    plr_animations.push(Images.johnsnow3);
    plr_animations.push(Images.johnsnow4);
    left_animations.push(Images.johnsnow5);
    left_animations.push(Images.johnsnow6);
    left_animations.push(Images.johnsnow7);
    left_animations.push(Images.johnsnow8);

    $(document).keydown(function(e) {
      if (e.keyCode == Controls.left) {
        goLeft = true;
      } else if (e.keyCode == Controls.right) {
        goRight = true;
      } else if (e.keyCode == Controls.jump) {
        keyUp = true;
      }

    }).keyup(function(e) {
      if (e.keyCode == Controls.left) {
        goLeft = false;
        walk_count = 0;
      } else if (e.keyCode == Controls.right) {
        goRight = false;
        walk_count = 0;
      } else if (e.keyCode == Controls.jump) {
        keyUp = false;
      }
    })

    toreturn.drawPlayer = function(xView, yView) {
      context.save();
      context.clearRect(xView,yView,canvas.width,canvas.height);

      if(goLeft) {
        toreturn.moveLeft();
        if (display_count + 1 > 3) {
          display_count = 0;
        } else {
          if(walk_count>=10){walk_count=0;display_count++;}
          walk_count += 1;
        }
      }
      if(goRight) {
        toreturn.moveRight();
        if (display_count + 1 > 3) {
          display_count = 0;
        } else {
          if(walk_count>=10){walk_count = 0;display_count++;}
          walk_count += 1;
        }
      }

      Game.on_platform = false;
      toreturn.isOnPlatform();

      if(keyUp) {
        toreturn.jump();
      } else {
        if (toreturn.velocity_y < -6.0) {
          toreturn.velocity_y = -6.0;
        }
      }
      if(goLeft){
        context.drawImage(left_animations[display_count], toreturn.pos.x - xView, toreturn.pos.y - yView, tileswide, tileshigh);}
      else{
      context.drawImage(plr_animations[display_count], toreturn.pos.x - xView, toreturn.pos.y - yView, tileswide, tileshigh);}

      context.restore();
    };

    toreturn.moveLeft = function(elapsedTime) {
      if (toreturn.pos.x - (friction * speed) >= 0) {

        toreturn.pos.x -= (friction * speed);
      } else {
        toreturn.pos.x = 0;
      }
    };

    toreturn.moveRight = function(elapsedTime) {
      if (toreturn.pos.x + (friction * speed) >= Graphics.map_width - tileswide) {
        toreturn.pos.x = Graphics.map_width - tileswide;
      } else {
        toreturn.pos.x += (friction * speed);
      }

    };

    toreturn.jump = function() {
      if (toreturn.on_ground || Game.on_platform) {
        playSound('jump');
        toreturn.velocity_y = -15;
        Game.on_platform = false;
        toreturn.on_ground = false;
      }
    };

    toreturn.isOnPlatform = function(){
      for (let i=0; i < Map.map_rows; i++){
        for (let j=0; j < Map.map_cols; j++){
          if (Game.on_platform == false && map[i][j] == 'dirtleft' ) {
            if(toreturn.pos.x > j*dimension - 30 && toreturn.pos.x < (j*dimension + (3*dimension) - 20)&& toreturn.pos.y > i*dimension - dimension && toreturn.pos.y < i*dimension - 50) {
              Game.on_platform = true;
              toreturn.on_ground = true;
              toreturn.velocity_y = 0.0;
              toreturn.gravity = 0.0;

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
    let areaToMoveInside = {minX: spec.range.minX, maxX: spec.range.maxX, minY: spec.range.minY, maxY: spec.range.maxY};
    let direction = 'left';
    let walkertime = spec.walkertime;

    let jump_dy = 2;
    let jump_y = toreturn.pos.y;
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
      context.drawImage(enemy_animation[display_walker_count], toreturn.pos.x, toreturn.pos.y, tileswide, tileshigh);
      context.restore();

    };

    toreturn.moveLeft = function(elapsedTime) {
      if (toreturn.pos.x - (friction * speed) >= 0) {

        toreturn.pos.x -= (friction * speed);
      } else {
        toreturn.pos.x = 0;
      }
    };

    toreturn.moveRight = function(elapsedTime) {
      if (toreturn.pos.x + (friction * speed) >= Graphics.map_width - tileswide) {
        toreturn.pos.x = Graphics.map_width - tileswide;
      } else {
        toreturn.pos.x += (friction * speed);
      }

    };

    toreturn.isOnPlatform = function(){
      for (let i=0; i < Map.map_rows; i++){
        for (let j=0; j < Map.map_cols; j++){
          if (map[i][j] == 'dirtleft') {
            if(toreturn.pos.x > j*dimension - 30 && toreturn.pos.x < (j*dimension + (3*dimension) - 20)&& toreturn.pos.y > i*dimension - dimension && toreturn.pos.y < i*dimension - 50) {
              toreturn.on_ground = true;
              toreturn.velocity_y = 0.0;
              toreturn.gravity = 0.0;
              toreturn.pos.y = i*dimension - dimension;
            } else {
              toreturn.gravity = 0.5;
            }
          }
        }
      }
    };

    toreturn.update = function(elapsedTime, deltaXView, deltaYView, xView, yView) {
      // console.log(walkertime);
      walkertime++;
      toreturn.velocity_y += toreturn.gravity;
      toreturn.pos.y += toreturn.velocity_y;
      toreturn.pos.x -= deltaXView;
      toreturn.pos.y -= deltaYView;
      toreturn.isOnPlatform();

      if (toreturn.pos.x + xView > 16000) {
        direction = 'left';
      }
      if ( toreturn.pos.x + xView <= 0) {
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
    let contextForMap = document.createElement('canvas').getContext('2d');
		contextForMap.canvas.width = 16000;
		contextForMap.canvas.height = 1152;

	  contextForMap.save();
    contextForMap.drawImage(Images.bg, 0,0, contextForMap.canvas.width, contextForMap.canvas.height);

    for(let i=0; i < Map.map_rows; i++ ){
      for (let j=0; j < Map.map_cols; j++){
        if (map[i][j] == "stone"){
          contextForMap.drawImage(Images.stone_whole, j * dimension, i*dimension , tileswide, tileshigh);
        }
        if (map[i][j] == 'dirtleft') {
          contextForMap.drawImage(Images.dirtleft, j*dimension, i*dimension, tileswide, tileshigh);
        }
        if (map[i][j] == 'dirt') {
          contextForMap.drawImage(Images.dirt, j*dimension, i*dimension, tileswide, tileshigh);
        }
        if (map[i][j] == 'dirtright') {
          contextForMap.drawImage(Images.dirtright, j*dimension, i*dimension, tileswide, tileshigh);
        }
      }
    }
		contextForMap.restore();

		toreturn.map_view = new Image();
		toreturn.map_view.src = contextForMap.canvas.toDataURL("image/png");
		contextForMap = null;

    toreturn.drawMap = function(xView, yView) {
      canvas = $('#map-canvas').get(0);
      context = canvas.getContext('2d');

      let ourViewX = xView;
      let ourViewY = yView;
      let ourViewWidth = canvas.width;
      let ourViewHeight = canvas.height;

			if(toreturn.map_view.width - ourViewX < ourViewWidth){
				ourViewWidth = toreturn.map_view.width - ourViewX;
			}
			if(toreturn.map_view.height - ourViewY < ourViewHeight){
				ourViewHeight = toreturn.map_view.height - ourViewY;
			}

			context.drawImage(toreturn.map_view, ourViewX, ourViewY, ourViewWidth, ourViewHeight, 0, 0, ourViewWidth, ourViewHeight);

      canvas = $('#canvas-main').get(0);
      context = canvas.getContext('2d');
    };

    return toreturn;
  };

  return toreturn;
}());
