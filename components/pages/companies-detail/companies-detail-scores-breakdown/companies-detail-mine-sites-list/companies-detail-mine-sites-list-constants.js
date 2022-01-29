const defaultCellPaddingStyle = {
  paddingLeft: '10px',
  paddingRight: '10px'
};

export const ALLMINE_SITE_TABLE_COLUMNS = [
  {
    property: 'name',
    header: {
      label: 'Mine Site Name',
      props: { style: { ...defaultCellPaddingStyle, paddingLeft: 0, fontWeight: 'bold' } }
    },
    cell: { props: { style: { ...defaultCellPaddingStyle, paddingLeft: '0' } } }
  },
  {
    property: 'aliases',
    header: {
      label: 'Aliases/Other names',
      props: { style: { ...defaultCellPaddingStyle, width: '250px', fontWeight: 'bold' } }
    },
    cell: { props: { style: { ...defaultCellPaddingStyle } } }
  },
  {
    property: 'country',
    header: {
      label: 'Country',
      props: { style: { ...defaultCellPaddingStyle, fontWeight: 'bold' } }
    },
    cell: {
      formatters: [
        country => (country || {}).name
      ],
      props: { style: { ...defaultCellPaddingStyle } }
    }
  },
  {
    property: 'companiesShare',
    header: {
      label: 'Company\'s share (%)',
      props: { style: { ...defaultCellPaddingStyle, width: '165px', fontWeight: 'bold' } }
    },
    cell: {
      formatters: [
        companiesShare => companiesShare.map(companyShare => companyShare['company-share'])
      ],
      props: { style: { ...defaultCellPaddingStyle } }
    }
  },
  {
    property: 'commodities',
    header: {
      label: 'Products',
      props: {
        style: {
          ...defaultCellPaddingStyle,
          width: '100px',
          fontWeight: 'bold'
        }
      }
    },
    cell: {
      formatters: [
        commodities => commodities.map(commodity => commodity.name).join(', ')
      ],
      props: { style: { ...defaultCellPaddingStyle } }
    }
  },
  {
    property: 'mining-type',
    header: { label: 'Mining types', props: { style: { ...defaultCellPaddingStyle, paddingRight: 0, fontWeight: 'bold' } } },
    cell: { props: { style: { ...defaultCellPaddingStyle, paddingRight: 0 } } }
  }
];

export const CLOSED_MINE_SITES_TABLE_COLUMNS = [
  ALLMINE_SITE_TABLE_COLUMNS[0], // name
  ALLMINE_SITE_TABLE_COLUMNS[1], // aliases
  ALLMINE_SITE_TABLE_COLUMNS[2], // countries
  ALLMINE_SITE_TABLE_COLUMNS[3], // companiesShare
  ALLMINE_SITE_TABLE_COLUMNS[4], // commodities/Products
  ALLMINE_SITE_TABLE_COLUMNS[5], // mining-type
  {
    property: 'year-of-closure',
    header: {
      label: 'Year of closure',
      props: {
        style: {
          width: '120px',
          fontWeight: 'bold'
        }
      }
    }
  }
];

export const ASSETS_SOLD_AFTER_MAY_TABLE_COLUMNS = [
  ALLMINE_SITE_TABLE_COLUMNS[0], // name
  ALLMINE_SITE_TABLE_COLUMNS[1], // aliases
  ALLMINE_SITE_TABLE_COLUMNS[2], // countries
  ALLMINE_SITE_TABLE_COLUMNS[4], // commodities/Products
  ALLMINE_SITE_TABLE_COLUMNS[5] // mining-type
];

export default {
  ALLMINE_SITE_TABLE_COLUMNS,
  CLOSED_MINE_SITES_TABLE_COLUMNS,
  ASSETS_SOLD_AFTER_MAY_TABLE_COLUMNS
};
