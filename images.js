/**
* @Author: Justin Hershberger
* @Date:   25-03-2017
* @Filename: images.js
* @Last modified by:   Justin Hershberger
* @Last modified time: 26-03-2017
*/



let Images = (function () {
  let that = {};
  that.tile_width = 64;
  that.tile_height = 64;
  that.plr_height = 73;
  that.plr_width = 67;
  that.en_width = 32;
  that.en_height = 32;

/* #############################################################
        main background image
############################################################# */
  that.bg = new Image();
  that.bg_ready = false;

  that.bg.onload = () => {
      bg_ready = true;
      // console.log('hello');
  };

  that.bg.src = "Images/background/bg.png";

  /* #############################################################
          grass tiles
  ############################################################# */
  that.dirtleft = new Image();
  that.dl_ready = false;

  that.dirtleft.onload = () => {
    dl_ready = true;
  };

  that.dirtleft.src = "Images/tiles/dirtleft.png";

  that.dirt = new Image();
  that.d_ready = false;

  that.dirt.onload = () => {
    d_ready = true;
  };

  that.dirt.src = "Images/tiles/dirt.png";

  that.dirtright = new Image();
  that.dr_ready = false;

  that.dirtright.onload = () => {
    dr_ready = true;
  };

  that.dirtright.src = "Images/tiles/dirtright.png";

  that.stone_whole = new Image();
  that.sw_ready = false;

  that.stone_whole.onload = () => {
    sw_ready = true;
  };

  that.stone_whole.src = "Images/tiles/stone.png";




  /* #############################################################
          half grass tiles
  ############################################################# */
  that.grass_half_left = new Image();
  that.ghl_ready = false;

  that.grass_half_left.onload = () => {
    ghl_ready = true;
  };

  that.grass_half_left.src = "Images/tiles/grassHalfLeft.png";

  that.grass_half_mid = new Image();
  that.ghm_ready = false;

  that.grass_half_mid.onload = () => {
    ghm_ready = true;
  };

  that.grass_half_mid.src = "Images/tiles/grassHalfMid.png";

  that.grass_half_right = new Image();
  that.ghr_ready = false;

  that.grass_half_right.onload = () => {
    ghr_ready = true;
  };

  that.grass_half_right.src = "Images/tiles/grassHalfRight.png";


  /* #############################################################
          player tiles
  ############################################################# */
  that.plr_front = new Image();
  that.plrf_ready = false;

  that.plr_front.onload = () => {
    plrf_ready = true;
  };

  that.plr_front.src = "Images/player/p1_front.png";

  //player walking animation
  that.plr_walk1 = new Image();
  that.plrw1_ready = false;

  that.plr_walk1.onload = () => {
    plrw1_ready = true;
  };

  that.plr_walk1.src = "Images/player/jonsnowwalk1.png";

  that.plr_walk2 = new Image();
  that.plrw2_ready = false;

  that.plr_walk2.onload = () => {
    plrw2_ready = true;
  };

  that.plr_walk2.src = "Images/player/jonsnowwalk2.png";

  that.plr_walk3 = new Image();
  that.plrw3_ready = false;

  that.plr_walk3.onload = () => {
    plrw3_ready = true;
  };

  that.plr_walk3.src = "Images/player/jonsnowwalk3.png";

  that.plr_walk4 = new Image();
  that.plrw4_ready = false;

  that.plr_walk4.onload = () => {
    plrw4_ready = true;
  };

  that.plr_walk4.src = "Images/player/jonsnowwalk4.png";

  that.plr_walk5 = new Image();
  that.plrw5_ready = false;

  that.plr_walk5.onload = () => {
    plrw5_ready = true;
  };

  that.plr_walk5.src = "Images/player/jonsnowwalk5.png";

  that.plr_walk6 = new Image();
  that.plrw6_ready = false;

  that.plr_walk6.onload = () => {
    plrw4_ready = true;
  };

  that.plr_walk6.src = "Images/player/jonsnowwalk6.png";

  that.plr_walk7 = new Image();
  that.plrw7_ready = false;

  that.plr_walk7.onload = () => {
    plrw7_ready = true;
  };

  that.plr_walk7.src = "Images/player/jonsnowwalk7.png";

  that.plr_walk8 = new Image();
  that.plrw8_ready = false;

  that.plr_walk8.onload = () => {
    plrw8_ready = true;
  };

  that.plr_walk8.src = "Images/player/jonsnowwalk8.png";

  that.slimeWalk1 = new Image();
  that.slimeWalk1_ready = false;

  that.slimeWalk1.onload = () => {
    slimeWalk1_ready = true;
  };

  that.slimeWalk1.src = "Images/enemies/slimeWalk1.png";

  return that;
}())
