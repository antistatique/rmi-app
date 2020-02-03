export const MAP_COLORS = {
  color1: '#6eaac1',
  color2: '#88789f',
  color3: 'url(#lines)',
  mineSites: '#bf3132',
  defaultColor: '#e0e0e2'
};

export const MAP_LEGEND = [
  {
    label: 'Home countries, where the company is headquartered',
    color: MAP_COLORS.color1
  },
  {
    label: 'Producing countries, where the company has mining operations',
    color: MAP_COLORS.color2
  },
  {
    label: 'Mine sites selected for mine-site-level assessment',
    color: MAP_COLORS.mineSites,
    type: 'circle'
  }
];


export default {
  MAP_COLORS,
  MAP_LEGEND
};
