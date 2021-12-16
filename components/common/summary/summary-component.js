import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SpiderChart from 'components/charts/spiderchart';

// styles
import styles from './summary-styles.scss';

class Summary extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    data: PropTypes.array,
    company: PropTypes.object,
    theme: PropTypes.oneOf([
      'light', 'dark'
    ])
  }

  static defaultProps = {
    title: null,
    theme: 'light',
    company: null,
    data: null
  }

  render() {
    const { title, content, theme, data, company } = this.props;
    const summaryClass = classnames({
      'c-summary': true,
      [theme]: !!theme
    });

    return (
      <div className={summaryClass}>
        <style jsx>{styles}</style>
        {title && <h2 className="title">{title}</h2>}
        {data !== null && data.length > 0 && <div className="spider-wrapper"><SpiderChart data={data} company={company} /></div>}
        <br />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default Summary;
