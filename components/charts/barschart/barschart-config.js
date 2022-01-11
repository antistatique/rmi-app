export default {
  isAnimationActive: false,
  barChartOnMouseLeave: undefined,
  // dimensions
  height: 195,
  // xAxis
  xAxisTickLine: false,
  xAxisTick: {},
  xAxisKey: 'name',
  xAxisHeight: 35,
  xAxisTicks: [],
  xAxisTextAnchor: 'middle',
  xAxisInterval: 'preserveEnd',
  // yAxis
  YaxisLine: false,
  YAxisTick: {},
  domain: [0, 100],
  YAxisTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
  YAxisHide: false,
  // styling
  strokeDasharray: '3',
  fill: 'none',
  // bar
  barDataKey: 'value',
  setBarFill: () => '#ddd',
  barSize: undefined,
  barOnMouseOver: undefined
};
