export default {
  // general chart config
  height: 295,
  // cartesian grid config
  strokeDasharray: null,
  // y axis config
  yDomain: [0, 100],
  yAxisLine: false,
  yAxisTick: {},
  yAxisTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
  // x axis config
  xAxisTickLine: false,
  xAxisTick: {},
  xAxisKey: 'name',
  xAxisHeight: 35,
  xAxisTicks: [],
  xAxisTextAnchor: 'middle',
  xAxisInterval: 'preserveEnd',
  // bar config
  barSize: undefined,
  setBarFill: () => '#ddd',
  barOnMouseOver: undefined,
  barIsAnimationActive: false,
  // reference line config
  showReferenceLine: true,
  yReferenceLine: 0,
  strokeReferenceLine: '#bf3132',
  strokeDasharrayReferenceLine: '8',
  strokeWidth: 4,
  // tooltip config
  customTooltip: true
};
