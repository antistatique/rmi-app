
import { createSelector } from 'reselect';

const issueAreas = state => state.indicators.list;
const currentLanguage = state => state.language.current;

export const parseIssueAreas = createSelector(
  [issueAreas, currentLanguage],
  (_issueAreas = [], _currentLanguage) => {
    const overallOption = [{
      id: 0,
      label: 'Overall',
      value: 'overall',
      query: {
        route: 'results',
        params: {
          section: 'overall',
          language: _currentLanguage
        }
      }
    }];

    const issueAreasOptions = _issueAreas.filter(issueArea => issueArea.kind === 'issue_areas').map(filteredIssueArea => ({
      id: filteredIssueArea.id,
      label: filteredIssueArea.label,
      value: filteredIssueArea.slug,
      query: {
        route: 'results-thematic',
        params: {
          id: filteredIssueArea.id,
          language: _currentLanguage
        }
      }
    }));

    return [...overallOption, ...issueAreasOptions];
  }
);

export default { parseIssueAreas };
