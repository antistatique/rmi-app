
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
    let firstStaticPages = [];

    if (_indicators.length) {	
      const children = _indicators.filter(ind => ind.kind === 'issue_areas').map(indicatorChild => ({	
        id: indicatorChild.id,	
        label: indicatorChild.label,	
        query: {	
          route: 'results-thematic',	
          params: {	
            language: _currentLanguage,	
            id: indicatorChild.id	
          }	
        }	
      }));	

        const currentTreeIndex = mainNav.findIndex(tree => tree.query.route === 'results');	
      if (currentTreeIndex === -1) return mainNav;	

        const subTreeIndex = mainNav[currentTreeIndex].children.findIndex(child => child.slug === 'thematic-areas');	
      if (subTreeIndex === -1) return mainNav;	

        const subTree = mainNav[currentTreeIndex].children[subTreeIndex];	
      const subtreeWithChildren = Object.assign({}, subTree, { children });	

        mainNav[currentTreeIndex].children[subTreeIndex] = subtreeWithChildren;	

        firstStaticPages.reverse().forEach((sp) => {	
        mainNav[currentTreeIndex].children.unshift(sp);	
      });	
    }

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
