
let Map = (function() {
  let toreturn = {};

  let tilesize = Images.tilesize;

  let viewWidth = 16000;
  let viewHeight = 1152;

  toreturn.levelrows = viewHeight / tilesize;
  toreturn.levelcolumns = viewWidth / tilesize;

  let map = new Array(toreturn.levelrows);

  for(let i=0; i < toreturn.levelrows; i++ ) {
    map[i] = new Array(toreturn.levelcolumns);
  }

  function populateMap() {
    let numPlatforms = 20;


    for (let i=0; i < numPlatforms; i++) {

      let howfarin = i*5;
      let howfarup = 4;
      let howbig = 2;
      map[toreturn.levelrows - howfarup][howfarin] = 'dirtleft';
        for (let j = 1; j<howbig;j++){

        map[toreturn.levelrows - howfarup][howfarin + j] = 'dirt';
      }
        map[toreturn.levelrows - howfarup][howfarin + 2] = 'dirtright';

        map[toreturn.levelrows - 6][howfarin+2] = 'dirtleft';
        for (let k = 1; k<howbig;k++){
        map[toreturn.levelrows - 6][howfarin + (k+2)] = 'dirt';
      }
        map[toreturn.levelrows - 6][howfarin +(howbig+2)] = 'dirtright';


    }
//draw the ground, we'll put holes in it later
    for (let i=0; i < toreturn.levelcolumns; i++) {
      //make a hole here, for science
      if (i == 7){
        continue;
      }
      map[toreturn.levelrows-1][i] = "stone";
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
