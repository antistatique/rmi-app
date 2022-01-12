import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';

// actions
import { setLanguages, setLanguagesLoading, setCurrentLanguage } from 'modules/language/languages-actions';

// Styles
class Head extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    originalUrl: PropTypes.string,
    root: PropTypes.string.isRequired,
    setLanguages: PropTypes.func.isRequired,
    setLanguagesLoading: PropTypes.func.isRequired
  }

  static defaultProps = { originalUrl: null }

  render() {
    const { title, description, root } = this.props;
    const originalUrl = this.props.originalUrl || window.location.pathname;

    return (
      <HeadNext>
        <title>{title} | RMI Report 2022</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Antistatique" />

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="57x57" href="/static/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/static/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/static/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/static/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/static/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-icon-180x180.png" />
        <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#ffffff" />
        <link rel="icon" type="image/png" sizes="192x192" href="/static/favicon/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicon/manifest.json" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/static/favicon/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* Social media sharing  */}
        <Fragment>
          <meta property="og:title" content={`${title} | RMI Report 2022`} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="https://2022.responsibleminingindex.org/resources/images/webbanner_2020.jpg" />
        </Fragment>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RMF_foundation" />
        <meta name="twitter:title" content={`${title} | RMI Report 2022`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.responsibleminingfoundation.org/app/uploads/webbanner_2020.jpg" />
        <meta property="og:url" content={originalUrl} />

        {/* Styles and scripts */}
        <link href="https://fonts.googleapis.com/css?family=Yantramanav:300,400,500" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" />
        <link href="/static/css/global.css" rel="stylesheet" />

        {/* Analytics */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = _paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="https://responsibleminingindex.innocraft.cloud/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '3']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src='//cdn.innocraft.cloud/responsibleminingindex.innocraft.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
              })();`
          }}
        />

        <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        <script src="/static/js/script.js" />


      </HeadNext>
    );
  }
}

export default connect(
  state => ({
    originalUrl: state.routes.originalUrl,
    root: state.routes.root
  }),
  {
    setLanguages,
    setLanguagesLoading,
    setCurrentLanguage
  }
)(Head);
