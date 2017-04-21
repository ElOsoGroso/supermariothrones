
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
    //draw the ground, we'll put holes in it later
        for (let i=0; i < toreturn.levelcolumns; i++) {
          //make a hole here, for science
          if (i == 7 || i == 97 || i == 98 || i == 141){
            continue;
          }
          if ( i > 69 && i < 74) {
            continue;
          }
          if ( i > 103 && i < 107) {
            continue;
          }
          map[toreturn.levelrows-1][i] = "stone";
        }

      }

    /* first platform */
    map[13][10] = 'stone';
    map[13][11] = 'stone';
    // second platform
    map[10][13] = 'stone';
    map[10][14] = 'stone';

    map[9][13] = "crown";
    map[9][14] = "crown";

    // box 1
    for ( let xPos = 14; xPos < 16; xPos++ ) {
      for ( let yPos = 14; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }

    // box 2
    for ( let xPos = 16; xPos < 19; xPos++ ) {
      for ( let yPos = 12; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }

    // pipe1
    for ( let xPos = 20; xPos < 22; xPos++ ) {
      for ( let yPos = 14; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'stone';
      }
    }

    // lots more boxes
    for ( let xPos = 23; xPos < 28; xPos++ ) {
      for ( let yPos = 14; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }
    for ( let xPos = 28; xPos < 33; xPos++ ) {
      for ( let yPos = 12; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }
    for ( let xPos = 33; xPos < 37; xPos++ ) {
      for ( let yPos = 10; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }
    for ( let xPos = 37; xPos < 39; xPos++ ) {
      for ( let yPos = 15; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }

    // raise the ground a level for 30 tiles
    for ( let xPos = 40; xPos < 70; xPos++ ) {
      map[16][xPos] = 'stone';
    }

    map[15][42] = 'stone';
    map[13][45] = 'stone';

    /* creates hole in ground
    for ( let xPos = 70; xPos < 75; xPos++ ) {
      map[17][xPos] = null;
    }
    */

    // more boxes!!
    for ( let xPos = 81; xPos < 83; xPos++ ) {
      for ( let yPos = 15; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }
    for ( let xPos = 83; xPos < 85; xPos++ ) {
      for ( let yPos = 13; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }
    for ( let xPos = 85; xPos < 93; xPos++ ) {
      for ( let yPos = 11; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }

    map[14][95] = 'stone';
    map[12][97] = 'stone';
    map[12][98] = 'stone';

    // staircasees
    num = 16;
    for ( let xPos = 101; xPos < 104; xPos++ ) {
      for ( let yPos = num; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'stone';
      }
      num--;
    }
    num = 14;
    for ( let xPos = 107; xPos < 110; xPos++ ) {
      for ( let yPos = num; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'stone';
      }
      num++;
    }

    // pipe
    for ( let xPos = 115; xPos < 117; xPos++ ) {
      for ( let yPos = 15; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'stone';
      }
    }
    // pipe
    for ( let xPos = 119; xPos < 121; xPos++ ) {
      for ( let yPos = 14; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'stone';
      }
    }

    map[16][125] = 'stone';
    map[15][126] = 'stone';
    map[16][126] = 'stone';
    for ( xPos = 127; xPos < 131; xPos++ ) {
      for ( yPos = 14; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'stone';
      }
    }
    map[16][131] = 'stone';
    map[16][134] = 'stone';
    map[15][134] = 'stone';

    for ( xPos = 136; xPos < 138; xPos++ ) {
      for (yPos = 14; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }

    for ( xPos = 138; xPos < 140; xPos++ ) {
      for (yPos = 7; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'dirt';
      }
    }


    // big pipes near the end
    for (xPos = 142; xPos < 144; xPos++ ) {
      for (yPos = 14; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'stone';
      }
    }
    for (xPos = 142; xPos < 144; xPos++ ) {
      for (yPos = 2; yPos < 11; yPos++ ) {
        map[yPos][xPos] = 'stone';
      }
    }
    for (xPos = 146; xPos < 148; xPos++ ) {
      for (yPos = 15; yPos < 17; yPos++ ) {
        map[yPos][xPos] = 'stone';
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
