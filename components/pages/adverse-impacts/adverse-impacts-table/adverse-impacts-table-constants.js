import React from 'react';
import Icon from 'components/common/icon';
import DownloadsLink from './adverse-impacts-download-component';

export const ADVERSE_IMPACTS_TABLE_COLUMNS = [
  {
    property: 'companies',
    header: { label: 'Companies' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const companies = rowData.companies.map(company => company.name);
          return (
            <span>
              {companies.join(', ')}
            </span>
          );
        }
      ]
    }
  },
  {
    property: 'summarized-headline',
    header: { label: 'Summarized Headline' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          return (
            <span>
              {rowData['summarized-headline']}
            </span>
          );
        }
      ]
    }
  },
  {
    property: 'mine-sites',
    header: { label: 'Mine Sites' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const mineSites = rowData['mine-sites'].map(mineSite => mineSite.name);
          return (
            <span>
              {mineSites.join(', ')}
            </span>
          );
        }
      ]
    }
  },
  {
    property: 'countries',
    header: { label: 'Countries' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const countries = rowData.countries.map(country => country.name);
          return (
            <span>
              {countries.join(', ')}
            </span>
          );
        }
      ]
    }
  },
  {
    property: 'thematic_areas',
    header: { label: 'Thematic areas' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const topics = rowData['thematic-areas'].map(thematicArea => thematicArea.id);
          return (
            <span>
              {topics.map(topic => (
                <Icon name={topic} />
              ))}
            </span>
          );
        }
      ]
    }
  },
  {
    property: 'categories',
    header: { label: 'Categories' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const categories = rowData.categories.map(category => category.name);
          return (
            <span>
              {categories.join(', ')}
            </span>
          );
        }
      ]
    }
  },
  {
    property: 'files',
    header: { label: 'Files' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          return (
            <DownloadsLink
              headline={rowData['summarized-headline']}
              files={rowData['adverse-impact-files']}
            />
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
  TABLE_SIZE_VALUES,
  ADVERSE_IMPACTS_TABLE_COLUMNS
};
