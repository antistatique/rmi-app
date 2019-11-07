import { MAP_COLORS } from './map-known-tax-jurisdictions-constants';

export const getCountryColor = (geographyProperties = {}) => {
  const { isHome, isProducing, isHighlighted } = geographyProperties;
  const { color1, color2, color3, highlight, defaultColor } = MAP_COLORS;

  if (isHome && isProducing) return isHighlighted ? highlight : color3;

  if (isProducing) return isHighlighted ? highlight : color2;

  if (isHome) return isHighlighted ? highlight : color1;

  return defaultColor;
};

export default { getCountryColor };
