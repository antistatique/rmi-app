import { createSelector } from 'reselect';

const indicators = state => state.resultsDetailPage.issueAreas;

export const parseIssueAreas = createSelector(
  [indicators],
  (_indicators) => {
    return _indicators.filter(indicator =>
      indicator.kind === 'issue_areas')
      .map(indicator => ({
        id: indicator.id,
        slug: indicator.slug,
        code: indicator.code
      }));
  }
);

export default { parseIssueAreas };
