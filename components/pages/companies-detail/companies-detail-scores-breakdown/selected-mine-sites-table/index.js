import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'routes';

import { parseMineSitesScores } from '../companies-detail-scores-breakdown-selectors';

import styles from './selected-mine-sites-table-styles.scss';

class SelectedMineSitesTable extends PureComponent {
  static propTypes = { mineSites: PropTypes.array.isRequired }

  render() {
    const { mineSites } = this.props;

    return (
      <table className="c-selected-mine-sites-table">
        <style jsx>{styles}</style>
        <thead>
          <tr>
            <th className="title-head" />
            {mineSites.map((mineSite, index) => (
              <th key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>
                <Link route="mine-sites" params={{ language: mineSite.language, mineSite: mineSite.id }}>
                  <a>{mineSite.name}</a>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="score-title">Local Employment<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.localEmployment ? mineSite.scores.localEmployment : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Local Procurement<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.localProcurment ? mineSite.scores.localProcurment : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Post-Closure Plans<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.postClosurePlans ? mineSite.scores.postClosurePlans : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Community Grievances<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.communityGrievance ? mineSite.scores.communityGrievance : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Worker Grievances<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.workersGrievance ? mineSite.scores.workersGrievance : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Air Quality<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.airQuality ? mineSite.scores.airQuality : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Water Quality<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.waterQuality ? mineSite.scores.waterQuality : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Water Quality<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.waterQuantity ? mineSite.scores.waterQuantity : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Tailings Management<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.tailingsManagement ? mineSite.scores.tailingsManagement : 'NULL'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Emergency Preparedness<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.emergencyPreparedness ? mineSite.scores.emergencyPreparedness : 'NULL'}</td>
            ))}
          </tr>
          <tr className="bg-darkblue">
            <td className="score-title">Mine-site Score<br /><span>(score /30)</span></td>
            {mineSites.map(mineSite => (
              <td key={mineSite.id}>{mineSite.overall}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(
  state => ({ mineSites: parseMineSitesScores(state) }),
  {}
)(SelectedMineSitesTable);
