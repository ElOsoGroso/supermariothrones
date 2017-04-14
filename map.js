
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

  function populateMap() {
    let lowPlatforms = 20;
    let highPlatforms = 20;

    for (let i=0; i < lowPlatforms; i++) {

      let howfarin = i*5;
      let howfarup = 4;

        map[toreturn.map_rows - howfarup][howfarin] = 'dirtleft';
        map[toreturn.map_rows - howfarup][howfarin + 1] = 'dirt';
        map[toreturn.map_rows - howfarup][howfarin + 2] = 'dirtright';
        map[toreturn.map_rows - 6][howfarin+2] = 'dirtleft';
        map[toreturn.map_rows - 6][howfarin + 3] = 'dirt';
        map[toreturn.map_rows - 6][howfarin + 4] = 'dirtright';

    }
//draw the ground, we'll put holes in it later
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
