
import { createSelector } from 'reselect';

const researchInsights = state => state.staticContent.content;
export const researchInsightId = state => state.routes.query.id;



export const getResearchInsight = createSelector(
  [researchInsights, researchInsightId],
  (_researchInsights, _researchInsightId) => _researchInsights.find(researchInsight => researchInsight.id === _researchInsightId) || {}
);




export default { getResearchInsight };
