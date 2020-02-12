import { createSelector } from 'reselect';

const tailings = state => state.companies.currentCompany['tailing-storage-facilities'];

export const sortTailings = createSelector(
  [tailings],
  (_tailings = []) => {
    return _tailings
      .sort((current, next) => {
        const nameCurrent = current.name.toLowerCase();
        const nameNext = next.name.toLowerCase();
        if (nameCurrent < nameNext) return -1;
        if (nameCurrent > nameNext) return 1;
        return 0;
      });
  }
);
