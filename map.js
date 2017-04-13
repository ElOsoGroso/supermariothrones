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
  let th = Images.tile_height;
  let tw = Images.tile_width;


  let map_width = 16000;
  let map_height = 1152;


  toreturn.map_rows = map_height / th;
  toreturn.map_cols = map_width / tw;
  let map = new Array(toreturn.map_rows);

//
  for(let i=0; i < toreturn.map_rows; i++ ) {
    map[i] = new Array(toreturn.map_cols);
  }


  let last_tile_x = 10000 - tw;
  let last_tile_y = 1152 - th * 2;

  function createMap() {
    //random number of platfroms
    let num_low_plat = Math.floor(Math.random() * 20) + 10;
    let num_high_plat = Math.floor(Math.random() * num_low_plat - 2) + 5;

    //loop through and draw platforms
    for (let i=0; i < num_low_plat; i++) {

      //randomize an x coordinate for each platform
      let plat_x = Math.floor(Math.random() * toreturn.map_cols) + 1;

      //randomize a y coordinate for each platform
      let plat_height = Math.floor(Math.random() * 2) + 3;

      //randomize x,y for higher platforms
      let high_plat_x = plat_x + Math.floor(Math.random() * 3) + 3;
      let high_plat_height = Math.floor(Math.random() * 2) + 5;

      if(!map[toreturn.map_rows - plat_height][plat_x - 1] && !map[toreturn.map_rows - plat_height][plat_x + 3] && !map[toreturn.map_rows - plat_height + 1][plat_x + 3] && !map[toreturn.map_rows - plat_height + 1][plat_x - 1] && !map[toreturn.map_rows - plat_height - 1][plat_x + 3] && !map[toreturn.map_rows - plat_height - 1][plat_x - 1]) {
        map[toreturn.map_rows - plat_height][plat_x] = 'dirtleft';
        map[toreturn.map_rows - plat_height][plat_x + 1] = 'dirt';
        map[toreturn.map_rows - plat_height][plat_x + 2] = 'dirtright';

        if (i <= num_high_plat) {

          map[toreturn.map_rows - high_plat_height][high_plat_x] = 'dirtleft';
          map[toreturn.map_rows - high_plat_height][high_plat_x + 1] = 'dirt';
          map[toreturn.map_rows - high_plat_height][high_plat_x + 2] = 'dirtright';
        }
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
