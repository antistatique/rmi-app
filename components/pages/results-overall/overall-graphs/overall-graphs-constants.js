import {
  blue,
  brown,
  pink,
  yellow,
  red,
  green
} from 'constants/graph-colors';

export const GRAPHS_PER_ROW = 3;

export const AREA_ISSUES_COLORS = {
  'a-economic-development': blue[1],
  'b-business-conduct': brown[1],
  'c-lifecycle-management': pink[1],
  'd-community-wellbeing': yellow[1],
  'e-working-conditions': red[1],
  'f-environmental-responsibility': green[1]
};

export const BARS = [
  { dataKey: 'commitment' },
  { dataKey: 'action' },
  { dataKey: 'effectiveness' }
];

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

export const BAR_CONFIG = {
  // x axis config
  xAxisTick: false,
  xAxisHeight: 10,
  // reference line config
  showReferenceLine: false
};

export default {
  GRAPHS_PER_ROW,
  AREA_ISSUES_COLORS,
  STACKED_BAR_COLOURS,
  BAR_CONFIG,
  BARS
};
