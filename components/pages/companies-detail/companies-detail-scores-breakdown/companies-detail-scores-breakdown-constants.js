import React from 'react';
import { Link } from 'routes';

export const MINE_SITE_INDICATORS_ID = {
  localEmployment: 263,
  localProcurment: 264,
  postClosurePlans: 265,
  communityGrievance: 266,
  workersGrievance: 267,
  airQuality: 268,
  waterQuality: 269,
  waterQuantity: 270,
  tailingsManagement: 271,
  emergencyPreparedness: 272,

  mineSiteIndicators: 321
};

export const MINE_SITE_TABLE_COLUMNS = [
  {
    property: 'name',
    header: { label: 'Mine Site Name' },
    cell: {
      formatters: [
        (name, { rowData }) => (
          <Link
            route="mine-sites"
            params={{
              language: rowData.language,
              mineSite: rowData.id
            }}
          >
            <a>{name}</a>
          </Link>
        )
      ],
      props: { style: { color: '#000' } }
    },
    props: { style: { color: '#bf3132' } }
  },
  {
    property: 'localProcurment',
    header: { formatters: [() => (<span>Local Procurement <span style={{ display: 'block', whiteSpace: 'pre' }}>(score /6.00)</span></span>)] },
    props: { style: { color: '#bf3132' } },
    cell: { props: { style: { color: '#000' } } }
  },
  {
    property: 'localEmployment',
    header: { formatters: [() => (<span>Local Employment <span style={{ display: 'block', whiteSpace: 'pre' }}>(score /6.00)</span></span>)] },
    props: { style: { color: '#bf3132' } },
    cell: { props: { style: { color: '#000' } } }
  },
  {
    property: 'communityGrievance',
    header: {
      formatters: [() =>
        (<span>Community grievance mechanism <span style={{ display: 'block', whiteSpace: 'pre' }}>(score /6.00)</span></span>)]
    },
    props: { style: { color: '#bf3132' } },
    cell: { props: { style: { color: '#000' } } }
  },
  {
    property: 'workersGrievance',
    header: { formatters: [() => (<span>Workers grievance mechanism <span style={{ display: 'block', whiteSpace: 'pre' }}>(score /6.00)</span></span>)] },
    props: { style: { color: '#bf3132' } },
    cell: { props: { style: { color: '#000' } } }
  },
  {
    property: 'waterQuality',
    header: { formatters: [() => (<span>Water quality and quantity <span style={{ display: 'block', whiteSpace: 'pre' }}>(score /6.00)</span></span>)] },
    props: { style: { color: '#bf3132' } },
    cell: { props: { style: { color: '#000' } } }
  },
  {
    property: 'biodiversity',
    header: { formatters: [() => (<span>Biodiversity management <span style={{ display: 'block', whiteSpace: 'pre' }}>(score /6.00)</span></span>)] },
    props: { style: { color: '#bf3132' } },
    cell: { props: { style: { color: '#000' } } }
  },
  {
    property: 'overall',
    header: { formatters: [() => (<span>Mine site <span style={{ display: 'block', whiteSpace: 'pre' }}>(score /6.00)</span></span>)] },
    props: {
      style: {
        paddingRight: 15,
        backgroundColor: '#3b3a40',
        textAlign: 'right',
        color: '#fff'
      }
    }
  }
];

export const INVESTMENT_DISPUTES_COLUMNS = [
  {
    property: 'date',
    header: { label: 'Case Date' }
  },
  {
    property: 'number',
    header: { label: 'Case number' }
  },
  {
    property: 'description',
    header: { label: 'Case description' }
  },
  {
    property: 'status',
    header: { label: 'Status' }
  }
];

export const TAX_JURISDICTIONS_COLUMNS = [
  {
    property: 'country_col1',
  },
  {
    property: 'country_col2',
  },
];

export default {
  MINE_SITE_TABLE_COLUMNS,
  INVESTMENT_DISPUTES_COLUMNS,
  TAX_JURISDICTIONS_COLUMNS
};
