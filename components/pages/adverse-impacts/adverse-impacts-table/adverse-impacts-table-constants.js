import React from 'react';
import DownloadsLink from './adverse-impacts-download-component';

export const ADVERSE_IMPACTS_TABLE_COLUMNS = [
  {
    property: 'summarized-headline',
    header: { label: 'Summarized Headline' },
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
  },
  {
    property: 'thematic_areas',
    header: { label: 'Topics' },
    cell: {
      formatters: [
        (name, { rowData }) => {
          const topics = rowData['thematic-areas'].map(thematicArea => thematicArea.name);
          return (
            <span>
              {topics.map((topic, index) => (
                <span>
                  {topic} {topics.length - 1 > index &&
                  <br />
                }
                </span>
              ))}
            </span>
              
          );
        }
      ]
    }
  },
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
