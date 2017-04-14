
let Map = (function() {
  let toreturn = {};

  let tileswide = Images.tile_width;
  let tileshigh = Images.tile_height;
  let viewWidth = 16000;
  let viewHeight = 1152;

  toreturn.map_rows = viewHeight / tileshigh;
  toreturn.map_cols = viewWidth / tileswide;

  let map = new Array(toreturn.map_rows);

  for(let i=0; i < toreturn.map_rows; i++ ) {
    map[i] = new Array(toreturn.map_cols);
  }


  function checkIfOk(howfarup,howfarin){
    if(map[toreturn.map_rows - howfarup][howfarin - 1]){return false;}
    if(map[toreturn.map_rows - howfarup][howfarin + 3]){return false;}
    if(map[toreturn.map_rows - howfarup + 1][howfarin + 3]){return false;}
    if(map[toreturn.map_rows - howfarup - 1][howfarin + 3]){return false;}
    if(map[toreturn.map_rows - howfarup + 1][howfarin - 1]){return false;}
    if(map[toreturn.map_rows - howfarup - 1][howfarin - 1]){return false;}
    return true;
  }
  function populateMap() {
    //random number of platfroms
    let lowPlatforms = 20;
    let highPlatforms = 20;

    //loop through and draw platforms
    for (let i=0; i < lowPlatforms; i++) {

      let howfarin = i*5;
      let howfarup = 3;


      if(checkIfOk(howfarup,howfarin)) {
        map[toreturn.map_rows - howfarup][howfarin] = 'dirtleft';
        map[toreturn.map_rows - howfarup][howfarin + 1] = 'dirt';
        map[toreturn.map_rows - howfarup][howfarin + 2] = 'dirtright';

      }
    }

    for (let i=0; i < toreturn.map_cols; i++) {
      map[toreturn.map_rows-1][i] = "stone";
    }

  }

  toreturn.initialize = function() {

    populateMap();

  };

  toreturn.map = function() {
    return map;
  }

  return toreturn;
}());
