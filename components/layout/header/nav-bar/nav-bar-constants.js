
export const INDEX_NAVIGATION = [{
  id: 1,
  label: 'Results',
  query: {
    route: 'results',
    params: {}
  },
  noLink: true,
  children: [{
    id: '1-1',
    label: 'Overall results',
    slug: 'results-overall',
    query: {
      route: 'results',
      params: { section: 'overall' }
    }
  }, {
    id: '1-2',
    label: 'Overall Mine-site Results',
    slug: 'mine-site-summary',
    query: {
      route: 'results/mine-site-summary',
      params: { }
    }
  }, {
    id: '1-3',
    label: 'What RMI measures',
    slug: 'what-rmi-measures',
    query: {
      route: 'results/what-rmi-measures',
      params: { }
    }
  }, {
    id: '1-4',
    label: 'Thematic Areas',
    slug: 'thematic-areas',
    query: {
      route: 'results/thematic-areas',
      params: { }
    },
    noLink: true
  }]
}, {
  id: 9,
  label: 'Findings',
  slug: 'findings',
  query: {
    route: 'findings',
    params: {}
  },
  children: [
    {
      id: '9-1',
      label: 'Key Findings',
      slug: 'key-findings',
      query: {
        route: 'findings/key-findings',
        params: {}
      }
    }, {
      id: '9-2',
      label: 'Observations',
      slug: 'observations',
      query: {
        route: 'findings/observations',
        params: {}
      }
    }, {
      id: '9-3',
      label: 'Leading Practices',
      slug: 'leading-practices',
      query: {
        route: 'findings/leading-practices',
        params: {}
      }
    }, {
      id: '9-4',
      label: 'Adverse Impacts',
      slug: 'adverse-impacts',
      query: {
        route: 'findings/adverse-impacts',
        params: {}
      }
    }
  ],
}, {
  id: 3,
  label: 'Companies',
  slug: 'companies',
  query: {
    route: 'companies',
    params: {}
  }
}, {
  id: 4,
  label: 'Mine Sites',
  slug: 'mine-sites',
  query: {
    route: 'mine-sites',
    params: {}
  }
}, {
  id: 10,
  label: 'Resources',
  slug: 'resources',
  query: {
    route: 'resources',
    params: {}
  },
  children: [
    {
      id: '10-1',
      label: 'Document library',
      slug: 'document-library',
      query: {
        route: 'resources/document-library',
        params: {}
      }
    },
    {
      id: '10-2',
      label: 'Company subsidiaries',
      slug: 'company-subsidiaries',
      query: {
        route: 'resources/company-subsidiaries',
        params: {}
      }
    },
    {
      id: '10-3',
      label: 'Maps & Tables',
      slug: 'maps-and-tables',
      query: {
        route: 'resources/maps-and-tables',
        params: {}
      }
    },
    {
      id: '10-4',
      label: 'Summary reports',
      slug: 'summary-reports',
      query: {
        route: 'resources/summary-reports',
        params: {}
      }
    },
    {
      id: '10-5',
      label: 'Additional translations',
      slug: 'additional-translations',
      query: {
        route: 'resources/additional-translations',
        params: {}
      }
    },
    {
      id: '10-6',
      label: 'Raw data',
      slug: 'raw-data',
      query: {
        route: 'resources/raw-data',
        params: {}
      }
    },
    {
      id: '10-7',
      label: 'Scoring framework',
      slug: 'scoring-framework',
      query: {
        route: 'resources/scoring-framework',
        params: {}
      }
    },
    {
      id: '10-8',
      label: 'Methodology',
      slug: 'methodology',
      query: {
        route: 'resources/methodology',
        params: {}
      }
    },
    {
      id: '10-9',
      label: 'Corrigenda',
      slug: 'Corrigenda',
      query: {
        route: 'resources/corrigenda',
        params: {}
      }
    }
  ]
},
{
  id: 11,
  label: 'About',
  query: {
    route: 'about',
    params: {}
  }
}];


export default {
  INDEX_NAVIGATION
};