export const MINE_SITE_INDICATORS_ID = {
  localEmployment: 488,
  localProcurement: 489,
  airQuality: 493,
  waterQuality: 494,
  waterQuantity: 495,
  rehabilitationandPostClosure: 490,
  tailings: 496,
  safetyofCommunities: 497,
  communityComplaintsandGrievances: 491,
  safetyandHealthofWorkers: 543,
  womenWorkers: 544,
  workplaceDeathsandInjuries: 545,
  trainingofWorkers: 547,
  decentLivingWage: 546,
  workerComplaintsandGrievances: 492
};

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
  { property: 'country_col1' },
  { property: 'country_col2' }
];

export default {
  INVESTMENT_DISPUTES_COLUMNS,
  TAX_JURISDICTIONS_COLUMNS
};
