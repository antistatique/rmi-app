import * as actions from './map-actions';

export default {
  [actions.setSelectedCountry]: (state, { payload }) => ({ ...state, selectedCountry: payload })
};
