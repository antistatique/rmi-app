export const TAILINGS_TABLE_COLUMNS = [
  {
    property: 'name',
    header: { label: 'Name', props: { style: { fontWeight: 'bold' } } }
  },
  {
    property: 'country',
    header: { label: 'Country', props: { style: { fontWeight: 'bold' } } },
    cell: {
      formatters: [
        country => (country || {}).name
      ]
    }
  },
  {
    property: 'status',
    header: { label: 'Status', props: { style: { fontWeight: 'bold' } } }
  },
  {
    property: 'construction-method',
    header: { label: 'Construction Method', props: { style: { fontWeight: 'bold' } } }
  },
  {
    property: 'impact-based-hazard-category',
    header: { label: 'Impact-based hazard category\n (company-reported)', props: { style: { fontWeight: 'bold' } } }
  }
];

export default { TAILINGS_TABLE_COLUMNS };
