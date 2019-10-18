import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const beneficialOwners = state => state.beneficialOwners.list;

export const getSortedBeneficialOwners = createSelector(
  [beneficialOwners],
  (_beneficialOwners = []) => {
    const percentageBeneficial = _beneficialOwners.filter(owner => !parseFloat(owner['percent-ownership']) && owner['percent-ownership'].charAt(0) === '<');
    const floatPercentageBeneficial = percentageBeneficial.map((beneficial) => {
      return {
        ...beneficial,
        'percent-ownership': beneficial['percent-ownership'].slice(1).slice(0, -1)
      };
    });
    const sortedFloatPercentage = floatPercentageBeneficial.sort((a, b) => (a['percent-ownership'] > b['percent-ownership']) ? -1 : 1);
    const floatBeneficial = _beneficialOwners.filter(owner => parseFloat(owner['percent-ownership']));
    const sortedFloat = floatBeneficial.sort((a, b) => (a['percent-ownership'] > b['percent-ownership']) ? -1 : 1);
    const unknownBeneficial = _beneficialOwners.filter(owner => !parseFloat(owner['percent-ownership']) && owner['percent-ownership'].charAt(0) !== '<');
    const sortedUnknown = sortBy(unknownBeneficial, 'name');
    return sortedFloat.concat(sortedFloatPercentage).concat(sortedUnknown);
  }
);

export default { getSortedBeneficialOwners };
