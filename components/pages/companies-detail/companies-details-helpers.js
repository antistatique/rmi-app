import { MAP_COLORS } from './companies-details-constants';

export const getCompanyCountryColor = (geographyProperties = {}) => {
  const { isHome, isProducing } = geographyProperties;
  const { color1, color2, color3, defaultColor } = MAP_COLORS;

  if (isHome && isProducing) return color3;

  if (isProducing) return color2;

  if (isHome) return color1;

  return defaultColor;
};

export default { getCompanyCountryColor };
