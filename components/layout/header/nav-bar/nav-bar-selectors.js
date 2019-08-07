
import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';

// constants
import { INDEX_NAVIGATION } from './nav-bar-constants';

const routeRoot = state => state.routes.root;
const navChildren = state => state.navigation;
const indicators = state => state.indicators.list;
const currentLanguage = state => state.language.current;

export const getNavigation = createSelector(
  [routeRoot, navChildren, indicators, currentLanguage],
  (_routeRoot, _navChildren, _indicators, _currentLanguage) => {
    const { resultsChildren, aboutChildren, indexChildren } = _navChildren;
    const mainNav = [...INDEX_NAVIGATION];
    let firstStaticPages = [];

    // results tree - other pages
    if (resultsChildren) {
      const children = resultsChildren.map(resultChildren => ({
        id: resultChildren.id,
        label: resultChildren.title,
        query: {
          route: 'results',
          params: { section: resultChildren.slug }
        }
      }));

      const childrenWithoutFirst = children.slice(2);
      firstStaticPages = [children[0], children[1]];

      const currentTreeIndex = mainNav.findIndex(tree => tree.query.route === 'results');
      if (currentTreeIndex === -1) return mainNav;
      const currentTree = mainNav[currentTreeIndex];
      const treeWithChildren = Object.assign(
        {},
        currentTree,
        {
          children: [
            ...currentTree.children,
            ...childrenWithoutFirst
          ]
        }
      );

      mainNav[currentTreeIndex] = treeWithChildren;
    }

    // results tree - indicators
    if (_indicators.length) {
      const children = _indicators.filter(ind => ind.kind === 'issue_areas').map(indicatorChild => ({
        id: indicatorChild.id,
        label: indicatorChild.label,
        query: {
          route: 'results',
          params: {
            language: _currentLanguage,
            section: 'thematic',
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
