import React, { PureComponent } from 'react';

// styles
import styles from './related-leading-practices-styles.scss';

class RelatedLeadingPractices extends PureComponent {
  render() {
    // Fake data for demo
    const data = [
      'Partnership approach to regional socio-economic development',
      'Prioritising indigenous people in skills development',
      'Planned process to switch to local suppliers',
    ];

    return (
      <div className="related-leading-practices block-section">
        <style jsx>{styles}</style>
        <h5 className="block-section-name">Related leading practices</h5>
        <ul>
          {data.map((item, index) =>
            <li key={index}><a href="#">{item}</a></li>
          )}
        </ul>
      </div>
    );
  }
}

export default RelatedLeadingPractices;
