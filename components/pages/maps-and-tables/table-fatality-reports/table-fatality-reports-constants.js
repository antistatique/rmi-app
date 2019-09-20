import React from 'react';

export const FATALITY_REPORTS_TABLE_COLUMNS = [
  {
    property: 'name',
    header: { label: 'Company name' }
  },
  {
    property: 'firstYear',
    header: { label: '2018' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const employeesValue = rowData.firstYear.employees ? rowData.firstYear.employees.value : 'Not Reported';
          const contractsValue = rowData.firstYear.contracts ? rowData.firstYear.contracts.value : 'Not Reported';
          const othersValue = rowData.firstYear.others ? rowData.firstYear.others.value : 'Not Reported';

          return (
            <span>
              Employees : {employeesValue}<br />
              Contract Workers : {contractsValue}<br />
              Others : {othersValue}
            </span>
          );
        }
      ]
    }
  },
  {
    property: 'secondYear',
    header: { label: '2020' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const employeesValue = rowData.secondYear.employees ? rowData.secondYear.employees.value : 'Not Reported';
          const contractsValue = rowData.secondYear.contracts ? rowData.secondYear.contracts.value : 'Not Reported';
          const othersValue = rowData.secondYear.others ? rowData.secondYear.others.value : 'Not Reported';

          return (
            <span>
              Employees : {employeesValue}<br />
              Contract Workers : {contractsValue}<br />
              Others : {othersValue}
            </span>
          );
        }
      ]
    }
  }
]

export const TABLE_SIZE_VALUES = [
  {
    label: '5',
    value: 5
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '15',
    value: 15
  },
  {
    label: '20',
    value: 20
  }
];

export default {
  FATALITY_REPORTS_TABLE_COLUMNS,
  TABLE_SIZE_VALUES
};
