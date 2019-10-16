import { blue, brown, pink, yellow, red, green } from 'constants/graph-colors';

export const CHART_CONFIG = {
  height: 225,
  // xAxis
  xAxisTick: false,
  xAxisHeight: 5,
  // yAxis
  YAxisTick: { fill: '#f2f2f2' },
  // bar
  barSize: 5,
  // reference line config
  showReferenceLine: true,
  yReferenceLine: 0,
  yReferenceLines: [],
  strokeReferenceLine: 'red',
  strokeDasharrayReferenceLine: '3 5',
  labelReferenceLine: 'Current Best Practice'
};

export const MEASUREMENT_AREAS_COLOURS = {
  'a-economic-development': blue,
  'b-business-conduct': brown,
  'c-lifecycle-management': pink,
  'd-community-wellbeing': yellow,
  'e-working-conditions': red,
  'f-environmental-responsibility': green
};

export default {
  CHART_CONFIG,
  MEASUREMENT_AREAS_COLOURS
};
