import { handleModule } from 'redux-tools';

// third-party
import { loadingBarReducer } from 'react-redux-loading-bar';

// common modules
import appModule from 'modules/app';
import routesModule from 'modules/routes';
import responsiveModule from 'modules/responsive';
import languageModule from 'modules/language';
import companiesModule from 'modules/companies';
import countriesModule from 'modules/countries';
import commoditiesModule from 'modules/commodities';
import indicatorsModule from 'modules/indicators';
import mineSitesModule from 'modules/mine-sites';
import documentsModule from 'modules/documents';
import scoresModule from 'modules/scores';
import documentMineSitesModule from 'modules/document-mine-sites';
import subsidiariesModule from 'modules/subsidiaries';
import staticPagesModule from 'modules/static-pages';
import mapModule from 'modules/map';
import chartModule from 'modules/chart';
import adverseImpactsModule from 'modules/adverse-impacts';
import shareholdersModule from 'modules/shareholders';
import beneficialOwnersModule from 'modules/beneficial-owners';
import stockExchangesModule from 'modules/stock-exchanges';
import tailingStorageFacilitiesModule from 'modules/tailing-storage-facilities';
import fatalityReportsModule from 'modules/fatality-reports';
import categoriesModule from 'modules/categories';
import topicsModule from 'modules/topics';


// components modules
import * as CompaniesFiltersModule from 'components/pages/companies/companies-filters';

// pages modules
import * as LeadingPracticesModule from 'components/pages/leading-practices';
import * as CompaniesModule from 'components/pages/companies';
import * as CompaniesDetailModule from 'components/pages/companies-detail';
import * as MineSitesPageModule from 'components/pages/mine-sites';
import * as ResultsOverallPageModule from 'components/pages/results-overall';
import * as ResultsDetailPageModule from 'components/pages/results-detail';
import * as AdverseImpactsPageModule from 'components/pages/adverse-impacts';
import * as MapsAndTablesModule from 'components/pages/maps-and-tables';

export default {
  app: handleModule(appModule),
  loadingBar: loadingBarReducer,
  responsive: handleModule(responsiveModule),
  routes: handleModule(routesModule),
  language: handleModule(languageModule),
  companies: handleModule(companiesModule),
  countries: handleModule(countriesModule),
  commodities: handleModule(commoditiesModule),
  indicators: handleModule(indicatorsModule),
  subsidiaries: handleModule(subsidiariesModule),
  mineSites: handleModule(mineSitesModule),
  documents: handleModule(documentsModule),
  documentMineSites: handleModule(documentMineSitesModule),
  scores: handleModule(scoresModule),
  leadingPracticesPage: handleModule(LeadingPracticesModule),
  companiesPage: handleModule(CompaniesModule),
  companiesFilters: handleModule(CompaniesFiltersModule),
  companiesDetailPage: handleModule(CompaniesDetailModule),
  mineSitesPage: handleModule(MineSitesPageModule),
  resultsOverallPage: handleModule(ResultsOverallPageModule),
  resultsDetailPage: handleModule(ResultsDetailPageModule),
  staticPages: handleModule(staticPagesModule),
  map: handleModule(mapModule),
  chart: handleModule(chartModule),
  adverseImpacts: handleModule(adverseImpactsModule),
  adverseImpactsPage: handleModule(AdverseImpactsPageModule),
  shareholders: handleModule(shareholdersModule),
  beneficialOwners: handleModule(beneficialOwnersModule),
  mapsAndTables: handleModule(MapsAndTablesModule),
  stockExchanges: handleModule(stockExchangesModule),
  tailingStorageFacilities: handleModule(tailingStorageFacilitiesModule),
  fatalityReports: handleModule(fatalityReportsModule),
  categories: handleModule(categoriesModule),
  topics: handleModule(topicsModule)
};
