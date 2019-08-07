// https://github.com/fridays/next-route
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= APP ROUTES =====================
// // Index routes
routes.add('companies', '/:language/companies/:company?', 'companies');
routes.add('mine-sites', '/:language/mine-sites/:mineSite?', 'mine-sites');
routes.add('results', '/:language/results/:section?/:id?', 'results');
routes.add('leading-practices', '/:language/leading-practices', 'leading-practices');
routes.add('library', '/:language/library', 'library');
routes.add('subsidiaries', '/:language/subsidiaries', 'subsidiaries');
routes.add('methodology', '/:language/methodology/:year?', 'methodology');
routes.add('downloads', '/:language/downloads', 'downloads');
routes.add('scoring-framework', '/:language/scoring-framework', 'scoring-framework');
routes.add('corrigenda', '/:language/corrigenda', 'corrigenda');
routes.add('sources', '/:language/sources', 'sources');
routes.add('index', '/:language', 'index');

// 404
routes.add('notFound', '*', '404');

module.exports = routes;
