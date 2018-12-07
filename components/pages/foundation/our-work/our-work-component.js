import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './our-work-styles.scss';

class OurWorkPage extends PureComponent {
  static propTypes = { content: PropTypes.object.isRequired }

  render() {
    const { content } = this.props;
    const {
      title,
      text
    } = content[0];


    return (
      <div className="c-contact">
        <style jsx>{styles}</style>
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="title">Our Work</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <section className="section">
            <div className="l-layout">
              <div className="row">
                <div className="col-xs-12">
                    <h3 className="title">{title}</h3>
                </div>
                    <div className="col-xs-12" dangerouslySetInnerHTML={{ __html: text }}></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default OurWorkPage;
