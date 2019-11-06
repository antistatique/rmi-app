import React from 'react';

export const MINE_SITES_TABLE_COLUMNS = [
  {
    property: 'companies',
    header: { label: 'Companies' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const companies = rowData.companies.map(company => company.name);

          return (
            <span>{companies.join(', ')}</span>
          );
        }
      ]
    }
  },
  {
    property: 'name',
    header: { label: 'Name' }
  },
  {
    property: 'aliases',
    header: { label: 'Aliases' }
  },
  {
    property: 'country',
    header: { label: 'Country' },
    cell: {
      formatters: [
        (name, { rowData }) => (
          <span>{rowData.country.name}</span>
        )
      ]
    }
  },
  {
    property: 'companiesShare',
    header: { label: 'Company\'s share (%)' },
    cell: {
      formatters: [
        companiesShare => companiesShare.map(companyShare => companyShare['company-share'])
      ]
    }
  },
  {
    property: 'mining-type',
    header: { label: 'Type' }
  },
  {
    property: 'status',
    header: { label: 'Status' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const status = rowData['closed-mine'] ? `Closed (since ${rowData['year-of-closure']})` : 'Active';

          return (
            <span>{status}</span>
          );
        }
      ]
    }
  }
];

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
  MINE_SITES_TABLE_COLUMNS,
  TABLE_SIZE_VALUES
};
