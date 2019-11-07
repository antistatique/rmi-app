import React, { PureComponent } from 'react';
import Disclaimer from 'components/common/disclaimer';

// styles
import styles from './footer-styles.scss';

class Footer extends PureComponent {
  render() {
    return (
      <footer className="c-footer">
        <style jsx>{styles}</style>
        <div className="l-layout">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="left-side">
                <div className="footer-section">
                  <div className="copyright">
                    <p className="text-size-big text-style-normal text-weight-bold">Copyright notice</p>
                    <p>
                      All data and written content are licensed
                      under the Creative Commons Attribution-NonCommercial
                      4.0 International License (CC BY-NC 4.0).
                    </p>
                    <a
                      href="https://creativecommons.org/licenses/by-nc/4.0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="license"
                    >
                      <img
                        className="license-img"
                        src="/static/images/cc-by-nc_icon.png"
                        alt="Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)"
                      />
                    </a>
                    <p>
                      Users are free to share and adapt the material but must give
                      appropriate credit, provide a link to the license
                      and indicate if changes were made. The licensed
                      material may not be used for commercial purposes,
                      or in a discriminating, degrading or distorting way.
                      When cited, attribute to: "Responsible Mining Index
                      2020 (RMI), Responsible Mining Foundation (RMF)."
                      Images, photographs, and video content depicted on
                      RMI and RMF websites are excluded from this license,
                      except where noted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="right-side">
                <div className="footer-section">
                  <h4 className="subscribe-title">Subscribe to updates</h4>
                  <form
                    className="subscribe-form"
                    action="https://responsibleminingindex.us13.list-manage.com/subscribe/post?u=acc420b06d58d1313623a848e&amp;id=dfa95db630"
                    method="POST"
                  >
                    <input
                      type="text"
                      name="FNAME"
                      placeholder="First name"
                      required
                    />
                    <input
                      type="text"
                      name="LNAME"
                      placeholder="Last name"
                      required
                    />
                    <input
                      type="text"
                      name="ORG"
                      placeholder="Organisation"
                      required
                    />
                    <input
                      type="text"
                      name="POSITION"
                      placeholder="Position"
                      required
                    />
                    <input
                      type="email"
                      name="EMAIL"
                      placeholder="Email address"
                      required
                    />
                    <button type="submit">Sign up</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="copyright">
              <Disclaimer />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
