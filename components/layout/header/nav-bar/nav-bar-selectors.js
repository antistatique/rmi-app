
import { createSelector } from 'reselect';

// constants
import { INDEX_NAVIGATION } from './nav-bar-constants';

const routeRoot = state => state.routes.root;
const navChildren = state => state.navigation;
const indicators = state => state.indicators.list;
const currentLanguage = state => state.language.current;

export const getNavigation = createSelector(
  [routeRoot, navChildren, indicators, currentLanguage],
  (_routeRoot, _navChildren, _indicators, _currentLanguage) => {
    const mainNav = [...INDEX_NAVIGATION];

    // sets language
    mainNav.forEach((item, index) => {
      mainNav[index] = {
        ...mainNav[index],
        query: {
          ...mainNav[index].query,
          params: {
            ...mainNav[index].query.params,
            language: _currentLanguage
          }
        }
      };

      (mainNav[index].children || []).forEach((child, childIndex) => {
        mainNav[index].children[childIndex] = {
          ...mainNav[index].children[childIndex],
          query: {
            ...mainNav[index].children[childIndex].query,
            params: {
              ...mainNav[index].children[childIndex].query.params,
              language: _currentLanguage
            }
          }
        };
      });
    });

    return mainNav;
  }
);

export default { getNavigation };
