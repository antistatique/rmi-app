export const CHART_CONFIG = {
  height: 440,
  barSize: 85,
  setBarFill: () => '#bf3132',
  domain: [0, 4],
  // xAxis
  xAxisKey: 'label',
  xAxisHeight: 150,
  xAxisTick: { width: 200, fill: '#f2f2f2', angle: -45, textAnchor: 'end' },
  xAxisInterval: 0,
  // y Axis
  YAxisTicks: ['0', '1', '2', '3', '4'],
  YAxisTick: { fill: '#f2f2f2' }
};

export default { CHART_CONFIG };
