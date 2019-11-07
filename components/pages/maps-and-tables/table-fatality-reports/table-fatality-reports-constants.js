import React from 'react';

export const FATALITY_REPORTS_TABLE_COLUMNS = [
  {
    property: 'name',
    header: { label: 'Company name' }
  },
  {
    header: { label: '2017' },
    children: [
      {
        property: 'firstYear.employees',
        header: { label: 'Employees' },
        cell: {
          formatters: [
            (name, { rowData }) => {
              const employeesValue = rowData.firstYear.employees ? rowData.firstYear.employees.value : 'Not Reported';

              return (
                <span>
                  {employeesValue}
                </span>
              );
            }
          ]
        }
      },
      {
        property: 'firstYear.contracts',
        header: { label: 'Contracts' },
        cell: {
          formatters: [
            (name, { rowData }) => {
              const contractsValue = rowData.firstYear.contracts ? rowData.firstYear.contracts.value : 'Not Reported';

              return (
                <span>
                  {contractsValue}
                </span>
              );
            }
          ]
        }
      },
      {
        property: 'firstYear.others',
        header: { label: 'Others' },
        cell: {
          formatters: [
            (name, { rowData }) => {
              const othersValue = rowData.firstYear.others ? rowData.firstYear.others.value : 'Not Reported';

              return (
                <span>
                  {othersValue}
                </span>
              );
            }
          ]
        }
      }
    ]
  },
  {
    header: { label: '2018' },
    children: [
      {
        property: 'secondYear.employees',
        header: { label: 'Employees' },
        cell: {
          formatters: [
            (name, { rowData }) => {
              const employeesValue = rowData.secondYear.employees ? rowData.secondYear.employees.value : 'Not Reported';

              return (
                <span>
                  {employeesValue}
                </span>
              );
            }
          ]
        }
      },
      {
        property: 'secondYear.contracts',
        header: { label: 'Contracts' },
        cell: {
          formatters: [
            (name, { rowData }) => {
              const contractsValue = rowData.secondYear.contracts ? rowData.secondYear.contracts.value : 'Not Reported';

              return (
                <span>
                  {contractsValue}
                </span>
              );
            }
          ]
        }
      },
      {
        property: 'secondYear.others',
        header: { label: 'Others' },
        cell: {
          formatters: [
            (name, { rowData }) => {
              const othersValue = rowData.secondYear.others ? rowData.secondYear.others.value : 'Not Reported';

              return (
                <span>
                  {othersValue}
                </span>
              );
            }
          ]
        }
      }
    ]
  }
];

export const TABLE_SIZE_VALUES = [
  {
    label: '50',
    value: 50
  },
  {
    label: '100',
    value: 100
  },
  {
    label: '200',
    value: 200
  }
];

export default {
  FATALITY_REPORTS_TABLE_COLUMNS,
  TABLE_SIZE_VALUES
};
