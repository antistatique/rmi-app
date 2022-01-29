import React, { PureComponent } from 'react';

// styles
import styles from './disclaimer-styles.scss';

class Disclaimer extends PureComponent {
  render() {
    return (
      <div>
        <p className="text-size-big text-style-normal text-weight-bold mt-2">Disclaimer</p>
        <div className="c-disclaimer">
          <style jsx>{styles}</style>
          <p className="disclaimer-text">
          The findings, conclusions and interpretations within this RMI Report 2022 do not necessarily represent the views of funders, trustees, and employees of the Responsible Mining Foundation (RMF), and others who participated in consultations and as advisors to the report.
          </p>

          <p className="disclaimer-text">
          This report is intended to be for information purposes only and is not intended as promotional material in any respect. The report is not intended to provide accounting, legal, tax or investment advice or recommendations, neither is it intended as an offer or solicitation for the purchase or sale of any financial instrument. In order to fully understand the methodology of the RMI Report 2022, the respective sections on the website should be consulted.
          </p>

          <p className="disclaimer-text">
          The RMI Report 2022 seeks evidence of companies’ policies and practices on economic, environmental, social and governance (EESG) issues, but does not seek to measure the actual outcomes achieved on EESG issues. Results are based only on evidence sourced from the public domain or provided by companies as open data. Whilst this information is believed to be reliable, no guarantee can be given that it is accurate or complete, nor does it preclude the possibility that policies and practices may exist, but which the RMI Report 2022 has not been able to consider for purposes of assessment. In this respect, the results of the low-scoring companies do not necessarily reflect a lack of relevant policies and practices; as they may be due to a lack of public reporting by the companies, limitations in accessing information, and/or any difficulties in accessing the RMI company portal.
          </p>

          <p className="disclaimer-text">
          It should be noted that, prior to publication, all companies in the RMI were invited to check the factual accuracy of the contextual data and evidence upon which the RMI is based and to review company information in the RMI document library.
          </p>

          <p className="disclaimer-text">
          Country borders or names on maps do not reflect an official position of the RMF or anyone involved in its governance, employees or in service providers. Maps used are for illustrative purposes and do not imply the expression of any opinion on the part of the RMF, concerning the legal status of any country or territory or concerning the delimitation of frontiers or boundaries. Where needed, approaches used by the UN to present borders were followed.
          </p>

          <p className="disclaimer-text">
            Although every effort has been made to verify the accuracy of translations, the English
            language version should be taken as the definitive version. The RMI reserves the right to
            publish corrigenda on its web page, and readers of the 2022 RMI report should consult the
            web page for corrections or clarifications <a href="https://www.responsibleminingindex.org" rel="noopener noreferrer">https://www.responsibleminingindex.org</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default Disclaimer;
