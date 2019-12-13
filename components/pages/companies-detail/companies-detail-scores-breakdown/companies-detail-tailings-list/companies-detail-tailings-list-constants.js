export const TAILINGS_TABLE_COLUMNS = [
  {
    property: 'name',
    header: { label: 'Name' }
  },
  {
    property: 'country',
    header: { label: 'Country' },
    cell: {
      formatters: [
        country => (country || {}).name
      ]
    }
  },
  {
    property: 'status',
    header: { label: 'Status' }
  },
  {
    property: 'construction-method',
    header: { label: 'Construction Method' }
  },
  {
    property: 'impact-based-hazard-category',
    header: { label: 'Impact-based hazard category\n (company-reported)' }
  }
];

export default { TAILINGS_TABLE_COLUMNS };
