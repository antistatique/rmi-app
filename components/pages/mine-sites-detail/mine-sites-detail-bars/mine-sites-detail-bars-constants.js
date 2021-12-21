export const CHART_CONFIG = {
  height: 440,
  barSize: 85,
  setBarFill: () => '#bf3132',
  domain: [0, 3],
  // xAxis
  xAxisKey: 'label',
  xAxisHeight: 150,
  xAxisTick: { width: 200, fill: '#f2f2f2', angle: -45, textAnchor: 'end' },
  xAxisInterval: 0,
  // y Axis
  YAxisTicks: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
  YAxisTick: { fill: '#f2f2f2' }
};

export default { CHART_CONFIG };
