import * as actions from './tailing-storage-facilities-actions';

export default {
  [actions.setTailingStorageFacilities]: (state, { payload }) => ({ ...state, list: payload })
};
