
export const blue = ['#70a4d8', '#006eb9', '#003f88'];
export const brown = ['#cca58d', '#835640', '#543621'];
export const yellow = ['#fbb26a', '#f5821f', '#c24919'];
export const pink = ['#c78ebf', '#a3238e', '#670059'];
export const red = ['#f68d70', '#ee3129', '#940609'];
export const green = ['#add580', '#72bf44', '#00712d'];

export const overallColors = [red[1], blue[1], yellow[1], green[1], pink[1], brown[1]];
export const measurementColors = [blue, brown, pink, yellow, red, green];

export const HOVER_COLOUR = '#000';

export const AREA_ISSUE_COLOURS = {
  1450: overallColors[1],
  1451: overallColors[5],
  1452: overallColors[4],
  1453: overallColors[2],
  1454: overallColors[0],
  1455: overallColors[3]
};

export const STACKED_BAR_COLOURS = {
  'a-economic-development': {
    commitment: blue[0],
    action: blue[1],
    effectiveness: blue[2]
  },
  'b-business-conduct': {
    commitment: brown[0],
    action: brown[1],
    effectiveness: brown[2]
  },
  'c-lifecycle-management': {
    commitment: pink[0],
    action: pink[1],
    effectiveness: pink[2]
  },
  'd-community-wellbeing': {
    commitment: yellow[0],
    action: yellow[1],
    effectiveness: yellow[2]
  },
  'e-working-conditions': {
    commitment: red[0],
    action: red[1],
    effectiveness: red[2]
  },
  'f-environmental-responsibility': {
    commitment: green[0],
    action: green[1],
    effectiveness: green[2]
  }
};

export default {
  blue,
  brown,
  yellow,
  pink,
  red,
  green,
  overallColors,
  measurementColors,
  HOVER_COLOUR,
  AREA_ISSUE_COLOURS,
  STACKED_BAR_COLOURS
};
