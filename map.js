/**
* @Author: Justin Hershberger
* @Date:   24-03-2017
* @Filename: map.js
* @Last modified by:   Justin Hershberger
* @Last modified time: 03-04-2017
*/



let Map = (function() {
  let toreturn = {};

  //tile widths and heights
  let tileswide = Images.tile_width;
  let tileshigh = Images.tile_height;



  let viewWidth = 16000;
  let viewHeight = 1152;


  toreturn.map_rows = viewHeight / tileshigh;
  toreturn.map_cols = viewWidth / tileswide;
  let map = new Array(toreturn.map_rows);

//
  for(let i=0; i < toreturn.map_rows; i++ ) {
    map[i] = new Array(toreturn.map_cols);
  }


  let last_tile_x = 10000 - tileswide;
  let last_tile_y = 1152 - tileshigh * 2;
  function checkIfOk(plat_height,plat_x){
    if(map[toreturn.map_rows - plat_height][plat_x - 1]){return false;}
    if(map[toreturn.map_rows - plat_height][plat_x + 3]){return false;}
    if(map[toreturn.map_rows - plat_height + 1][plat_x + 3]){return false;}
    if(map[toreturn.map_rows - plat_height - 1][plat_x + 3]){return false;}
    if(map[toreturn.map_rows - plat_height + 1][plat_x - 1]){return false;}
    if(map[toreturn.map_rows - plat_height - 1][plat_x - 1]){return false;}
    return true;
  }
  function createMap() {
    //random number of platfroms
    let lowPlatforms = 20;
    let highPlatforms = 20;

    //loop through and draw platforms
    for (let i=0; i < lowPlatforms; i++) {

      //randomize an x coordinate for each platform
      let plat_x = i*5;

      //randomize a y coordinate for each platform
      let plat_height = 3;


      if(checkIfOk(plat_height,plat_x)) {
        map[toreturn.map_rows - plat_height][plat_x] = 'dirtleft';
        map[toreturn.map_rows - plat_height][plat_x + 1] = 'dirt';
        map[toreturn.map_rows - plat_height][plat_x + 2] = 'dirtright';

      }
    }


    //this will make the floor all grass
    for (let i=0; i < toreturn.map_cols; i++) {
      map[toreturn.map_rows-1][i] = "stone";
    }

  }

  toreturn.initialize = function() {

    // for (let r=0; r < toreturn.map_rows; r++) {
    //   for(let c=0; c < toreturn.map_cols; c++) {
    //     map[r][c] = "none";
    //   }
    // }
    createMap();

  };

  toreturn.map = function() {
    return map;
  }

  return toreturn;
}());
