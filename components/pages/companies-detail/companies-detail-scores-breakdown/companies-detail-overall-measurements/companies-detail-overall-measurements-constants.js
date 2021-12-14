export const CHART_CONFIG = {
  width: '100%',
  xAxis: false,
  xAxisHeight: 5,
  YAxisHide: false,
  domain: [0, 100],
  setBarFill: item => (item.currentCompany ? '#272626' : '#9c9aa2')
};

export const OVERALL_CHARTS_TITLES = {
  'Overall commitment': { title: 'Commitment', subtitle: '(9 indicators)' },
  'Overall action': { title: 'Action', subtitle: '(42 indicators)' },
  'Overall effectiveness': { title: 'Effectiveness', subtitle: '(20 indicators)' }
};

export default {
  CHART_CONFIG,
  OVERALL_CHARTS_TITLES
};
