export const INDEX_NAVIGATION = [
  {
    id: 9,
    label: 'Results',
    slug: 'results-and-reports',
    query: {
      route: 'results-and-reports',
      params: {}
    },
    noLink: true,
    children: [
      {
        id: '9-1',
        label: 'Key Findings',
        slug: 'findings',
        query: {
          route: 'static-pages',
          params: { slug: 'key-findings' }
        }
      },
      {
        id: '9-2',
        label: 'Observations',
        slug: 'observations',
        query: {
          route: 'static-pages',
          params: { slug: 'observations' }
        }
      },
      {
        id: '9-3',
        label: 'Recommendations',
        slug: 'recommendations',
        query: {
          route: 'static-pages',
          params: { slug: 'Recommendations' }
        }
      },
      {
        id: '9-mine-sites-results',
        label: 'Mine Site Results',
        slug: 'mine-sites-results',
        query: {
          route: 'static-pages',
          params: { slug: 'mine-sites-results' }
        }
      },
      {
        id: '9-4',
        label: 'Thematic Results',
        slug: 'results',
        query: {
          route: 'results',
          params: {}
        },
        noLink: true,
        children: [
          {
            id: '9-4-1',
            label: 'Economic Development',
            slug: 'economic-development',
            query: {
              route: 'results-detail',
              params: { id: 1450 }
            }
          },
          {
            id: '9-4-2',
            label: 'Business Conduct',
            slug: 'business-conduct',
            query: {
              route: 'results-detail',
              params: { id: 1451 }
            }
          },
          {
            id: '9-4-3',
            label: 'Lifecycle Management',
            slug: 'lifecycle-management',
            query: {
              route: 'results-detail',
              params: { id: 1452 }
            }
          },
          {
            id: '9-4-4',
            label: 'Community Wellbeing',
            slug: 'community-wellbeing',
            query: {
              route: 'results-detail',
              params: { id: 1453 }
            }
          },
          {
            id: '9-4-5',
            label: 'Working Conditions',
            slug: 'working-conditions',
            query: {
              route: 'results-detail',
              params: { id: 1454 }
            }
          },
          {
            id: '9-4-6',
            label: 'Environmental Responsibility',
            slug: 'environmental-responsibility',
            query: {
              route: 'results-detail',
              params: { id: 1455 }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    slug: 'reports',
    query: {
      route: 'reports',
      params: {}
    },
    noLink: true,
    children: [
      {
        id: 'reports-company',
        label: 'Company Reports',
        slug: 'company-reports',
        query: {
          route: 'companies',
          params: {}
        }
      },
      {
        id: 'reports-minesites',
        label: 'Mine Site Reports',
        slug: 'mine-site-reports',
        query: {
          route: 'mine-sites',
          params: {}
        }
      },
      {
        id: '10-3',
        label: 'Summary',
        slug: 'summary',
        query: {
          route: 'static-pages',
          params: { slug: 'summary' }
        }
      },
    ]
  },
  {
    id: 1,
    label: 'Leading Practices',
    query: {
      route: 'leading-practices',
      params: {}
    }
  },
  {
    id: 10,
    label: 'Resources',
    slug: 'resources',
    query: {
      route: 'resources',
      params: {}
    },
    noLink: true,
    children: [
      {
        id: '10-1',
        label: 'Document Library',
        slug: 'document-library',
        query: {
          route: 'library',
          params: {}
        }
      },
      {
        id: '10-2',
        label: 'Maps & Tables',
        slug: 'maps-and-tables',
        query: {
          route: 'maps-and-tables',
          params: {}
        }
      },
      {
        id: '10-3',
        label: 'Additional translations',
        slug: 'additional-translations',
        query: {
          route: 'static-pages',
          params: { slug: 'additional-translations' }
        }
      },
      {
        id: '10-4',
        label: 'Raw Data',
        slug: 'raw-data',
        query: {
          route: 'static-pages',
          params: { slug: 'raw-data' }
        }
      },
      {
        id: '10-5',
        label: 'Scoring Framework',
        slug: 'scoring-framework',
        query: {
          route: 'static-pages',
          params: { slug: 'scoring-framework' }
        }
      },
      {
        id: '10-6',
        label: 'RMI Framework',
        slug: 'framework',
        query: {
          route: 'static-pages',
          params: { slug: 'framework' }
        }
      },
      {
        id: '10-7',
        label: 'RMI Methodology',
        slug: 'methodology',
        query: {
          route: 'static-pages',
          params: { slug: 'methodology' }
        }
      },
      {
        id: '10-8',
        label: 'Corrigenda',
        slug: 'Corrigenda',
        query: {
          route: 'static-pages',
          params: { slug: 'corrigenda' }
        }
      },
      {
        id: '10-9',
        label: 'Previous RMI Reports',
        slug: 'previous-reports',
        query: {
          route: 'static-pages',
          params: { slug: 'previous-reports' }
        }
      }
    ]
  },
  {
    id: 11,
    label: 'RMF website',
    query: {
      route: 'about',
      params: {}
    },
    externalUrl: 'https://responsibleminingfoundation.org',
    icon: 'target-blank'
  }
];

export default { INDEX_NAVIGATION };
