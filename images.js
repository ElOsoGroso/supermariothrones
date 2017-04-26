
let Images = (function () {
  let that = {};
  that.tilesize = 32;
  that.player_height = 25;
  that.player_width = 22;

  that.bg = new Image();
  that.bg_ready = false;
  that.bg.onload = () => {
      bg_ready = true;
  };

  that.bg.src = "Images/background/bg.png";
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

  that.crownstone = new Image();
  that.cs_ready = false;

  that.crownstone.onload = () => {
    cs_ready = true;
  };

  that.crownstone.src = "Images/tiles/crownstone.png";

  that.flag = new Image();
  that.fl_ready = false;
  that.flag.onload = () => {
    fl_ready = true;
  };
  that.flag.src = "Images/flags/finalflag.png";

  that.johnsnow1 = new Image();
  that.johnsnow1_ready = false;
  that.johnsnow1.onload = () => {
    johnsnow1_ready = true;
  };

  that.johnsnow1.src = "Images/player/jonsnowwalk1.png";

  that.johnsnow2 = new Image();
  that.johnsnow2_ready = false;
  that.johnsnow2.onload = () => {
    johnsnow2_ready = true;
  };

  that.johnsnow2.src = "Images/player/jonsnowwalk2.png";

  that.johnsnow3 = new Image();
  that.johnsnow3_ready = false;
  that.johnsnow3.onload = () => {
    johnsnow3_ready = true;
  };
  that.johnsnow3.src = "Images/player/jonsnowwalk3.png";

  that.johnsnow4 = new Image();
  that.johnsnow4_ready = false;
  that.johnsnow4.onload = () => {
    johnsnow4_ready = true;
  };
  that.johnsnow4.src = "Images/player/jonsnowwalk4.png";

  that.johnsnow5 = new Image();
  that.johnsnow5_ready = false;
  that.johnsnow5.onload = () => {
    johnsnow5_ready = true;
  };

  that.johnsnow5.src = "Images/player/jonsnowwalk5.png";

  that.johnsnow6 = new Image();
  that.johnsnow6_ready = false;
  that.johnsnow6.onload = () => {
    johnsnow4_ready = true;
  };
  that.johnsnow6.src = "Images/player/jonsnowwalk6.png";

  that.johnsnow7 = new Image();
  that.johnsnow7_ready = false;
  that.johnsnow7.onload = () => {
    johnsnow7_ready = true;
  };
  that.johnsnow7.src = "Images/player/jonsnowwalk7.png";

  that.johnsnow8 = new Image();
  that.johnsnow8_ready = false;
  that.johnsnow8.onload = () => {
    johnsnow8_ready = true;
  };
  that.johnsnow8.src = "Images/player/jonsnowwalk8.png";

  that.icewalk = new Image();
  that.icewalk_ready = false;

  that.icewalk.onload = () => {
    icewalk_ready = true;
  };

  that.icewalk.src = "Images/enemies/icewalk.png";
  that.icewalk2 = new Image();
  that.icewalk2_ready = false;

  that.icewalk2.onload = () => {
    icewalk2_ready = true;
  };

  that.icewalk2.src = "Images/enemies/icewalk2.png";

  that.dothraki1 = new Image();
  that.dothraki1_ready = false;

  that.dothraki1.onload = () => {
    dothraki2_ready = true;
  };

  that.dothraki1.src = "Images/enemies/dothraki1.png";

  that.dothraki2 = new Image();
  that.dothraki2_ready = false;

  that.dothraki2.onload = () => {
    dothraki2_ready = true;
  };

  that.dothraki2.src = "Images/enemies/dothraki2.png";

  that.joffrey1 = new Image();
  that.joffrey1_ready = false;

  that.joffrey1.onload = () => {
  joffrey1_ready = true;
  };

  that.joffrey1.src = "Images/enemies/joffrey1.png";

  that.joffrey2 = new Image();
  that.joffrey2_ready = false;

  that.joffrey2.onload = () => {
  joffrey2_ready = true;
  };

  that.joffrey2.src = "Images/enemies/joffrey2.png";

  that.crown = new Image();
  that.crown_ready = false;
  that.crown.onload = () => {
    crown_ready = true;
  };

  that.crown.src = "Images/tiles/crown.png";

  that.dragon2 = new Image();
  that.dragon2_ready = false;
  that.dragon2.onload = () => {
  dragon2_ready = true;
  };

  that.dragon2.src = "Images/background/dragon2.png";
  return that;
}())
