import React from 'react';

export const MINE_SITE_FATALITY_REPORTS_COLUMNS = [
  {
    property: 'year',
    header: { label: 'Year' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          return (
            <span>
              {rowData.year}
            </span>
          );
        }
      ]
    }
  },
  {
    property: 'fatalities',
    header: { label: 'Fatalities' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const employees = rowData.employees ? rowData.employees : 'Not Reported';
          const workers = rowData.workers ? rowData.workers : 'Not Reported';
          const contractors = rowData.contractors ? rowData.contractors : 'Not Reported';

          return (
            <span>
              Employees : {employees}<br />
              Workers : {workers}<br />
              Contractors : {contractors}
            </span>
          );
        }
      ]
    }
  }
];

export default MINE_SITE_FATALITY_REPORTS_COLUMNS;
