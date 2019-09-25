import { createSelector } from 'reselect';

const fatalityReports = state => state.fatalityReports.list;

export const getFatalityReportsData = createSelector(
  [fatalityReports],
  (_fatalityReports = []) => {
    const grouppedFatalityReports = _fatalityReports.reduce((groups, fatalityReport) => {
      const value = fatalityReport.company.name;
      groups[value] = (groups[value] || []).concat(fatalityReport);
      return groups;
    }, {});
    const grouppedEntries = Object.entries(grouppedFatalityReports);
    const fatalityReportsFinal = [];

    for (const [name, information] of grouppedEntries) {
      const firstYearInformation = information.filter(information => information.year === '2017');
      const secondYearInformation = information.filter(information => information.year === '2018');

      const firstYearEmployees = firstYearInformation.find(firstYear => firstYear.category === 'Employees');
      const firstYearContracts = firstYearInformation.find(firstYear => firstYear.category === 'Contract workers');
      const firstYearOthers = firstYearInformation.find(firstYear => firstYear.category === 'Others');

      const secondYearEmployees = secondYearInformation.find(secondYear => secondYear.category === 'Employees');
      const secondYearContracts = secondYearInformation.find(secondYear => secondYear.category === 'Contract workers');
      const secondYearOthers = secondYearInformation.find(secondYear => secondYear.category === 'Others');

      fatalityReportsFinal.push({
        name: name,
        firstYear: {
          employees: firstYearEmployees,
          contracts: firstYearContracts,
          others: firstYearOthers
        },
        secondYear: {
          employees: secondYearEmployees,
          contracts: secondYearContracts,
          others: secondYearOthers
        }
      })
    }

    return fatalityReportsFinal;
  }
);
