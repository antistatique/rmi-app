export const MAP_COLORS = {
  color1: '#6eaac1',
  color2: '#c78ebf',
  color3: 'url(#lines)',
  highlight: '#bf3132',
  defaultColor: '#e0e0e2'
};

export const MAP_LEGEND = [
  {
    label: 'Countries where companies have Tailings Storage Facilities',
    color: MAP_COLORS.color1
  },
  {
    label: 'Tailings Storage Facilities',
    color: '#8e8e8e',
    type: 'square'
  }
];

export default {
  MAP_COLORS,
  MAP_LEGEND
};
