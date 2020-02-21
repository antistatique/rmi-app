export const MAP_COLORS = {
  color1: '#6eaac1',
  color2: '#88789f',
  color3: 'url(#lines)',
  highlight: '#bf3132',
  defaultColor: '#e0e0e2'
};

export const MAP_LEGEND = [
  {
    label: 'Home countries, where companies are headquartered',
    color: MAP_COLORS.color1
  },
  {
    label: 'Producing countries, where companies have mining operations',
    color: MAP_COLORS.color2
  }
];

export default {
  MAP_COLORS,
  MAP_LEGEND
};
