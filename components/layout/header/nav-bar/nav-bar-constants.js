export const INDEX_NAVIGATION = [
  {
    id: 9,
    label: 'Results & Reports',
    slug: 'results-and-reports',
    query: {
      route: 'results-and-reports',
      params: {}
    },
    noLink: true,
    children: [
      {
        id: '9-1',
        label: 'Findings',
        slug: 'findings',
        query: {
          route: 'static-pages',
          params: { slug: 'key-findings' }
        }
      },
      {
        id: '9-2',
        label: 'Results',
        slug: 'results',
        query: {
          route: 'results',
          params: {}
        },
        noLink: true,
        children: [
          {
            id: '9-2-1',
            label: 'Economic Development',
            slug: 'economic-development',
            query: {
              route: 'results-detail',
              params: { id: 315 }
            }
          },
          {
            id: '9-2-2',
            label: 'Business Conduct',
            slug: 'business-conduct',
            query: {
              route: 'results-detail',
              params: { id: 316 }
            }
          },
          {
            id: '9-2-3',
            label: 'Lifecycle Management',
            slug: 'lifecycle-management',
            query: {
              route: 'results-detail',
              params: { id: 317 }
            }
          },
          {
            id: '9-2-4',
            label: 'Community Wellbeing',
            slug: 'community-wellbeing',
            query: {
              route: 'results-detail',
              params: { id: 318 }
            }
          },
          {
            id: '9-2-5',
            label: 'Working Conditions',
            slug: 'working-conditions',
            query: {
              route: 'results-detail',
              params: { id: 319 }
            }
          },
          {
            id: '9-2-6',
            label: 'Environmental Responsibility',
            slug: 'environmental-responsibility',
            query: {
              route: 'results-detail',
              params: { id: 320 }
            }
          },
          {
            id: '9-2-7',
            label: 'Mine-site Results',
            slug: 'mine-sites-results',
            query: {
              route: 'static-pages',
              params: { slug: 'mine-sites-results' }
            }
          }
        ]
      },
      {
        id: '9-3',
        label: 'Company Reports',
        slug: 'company-reports',
        query: {
          route: 'companies',
          params: {}
        }
      },
      {
        id: '9-4',
        label: 'Mine-site Reports',
        slug: 'mine-site-reports',
        query: {
          route: 'mine-sites',
          params: {}
        }
      }
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
        label: 'Summary',
        slug: 'summary',
        query: {
          route: 'static-pages',
          params: { slug: 'summary' }
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
        label: 'Methodology',
        slug: 'methodology',
        query: {
          route: 'static-pages',
          params: { slug: 'methodology' }
        }
      },
      {
        id: '10-7',
        label: 'Corrigenda',
        slug: 'Corrigenda',
        query: {
          route: 'static-pages',
          params: { slug: 'corrigenda' }
        }
      },
      {
        id: '10-8',
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
    label: 'About',
    query: {
      route: 'about',
      params: {}
    },
    externalUrl: 'https://responsibleminingfoundation.org',
    icon: 'target-blank'
  }
];

export default { INDEX_NAVIGATION };
