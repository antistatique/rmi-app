// https://github.com/fridays/next-route
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= APP ROUTES =====================
// // Index routes
routes.add('companies', '/:language/companies/:company?', 'companies');
routes.add('mine-sites', '/:language/mine-sites/:mineSite?', 'mine-sites');
routes.add('results-overall', '/:language/results/overall', 'results-overall');
routes.add('results-thematic', '/:language/results/thematic/:id', 'results-detail');
routes.add('leading-practices', '/:language/leading-practices', 'leading-practices');
routes.add('library', '/:language/library', 'library');
routes.add('subsidiaries', '/:language/subsidiaries', 'subsidiaries');
routes.add('static-page', '/:language/:slug', 'static-pages');
routes.add('index', '/:language', 'index');

// 404
routes.add('notFound', '*', '404');

module.exports = routes;
