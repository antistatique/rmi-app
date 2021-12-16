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
              <th key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'} style={{ width: `${(80 / mineSites.length)}%` }}>
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
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.localEmployment !== null ? mineSite.scores.localEmployment.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Local Procurement<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.localProcurment !== null ? mineSite.scores.localProcurment.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Post-Closure Plans<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.postClosurePlans !== null ? mineSite.scores.postClosurePlans.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Community Grievances<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.communityGrievance !== null ? mineSite.scores.communityGrievance.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Worker Grievances<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.workersGrievance !== null ? mineSite.scores.workersGrievance.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Air Quality<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.workersGrievance !== null ? mineSite.scores.airQuality.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Water Quality<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.waterQuality !== null ? mineSite.scores.waterQuality.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Water Quantity<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.waterQuantity !== null ? mineSite.scores.waterQuantity.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Tailings Management<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.tailingsManagement !== null ? mineSite.scores.tailingsManagement.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Emergency Preparedness<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.emergencyPreparedness !== null ? mineSite.scores.emergencyPreparedness.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr className="bg-darkblue">
            <td className="score-title">Mine-site Score<br /><span>(%)</span></td>
            {mineSites.map(mineSite => (
              <td key={mineSite.id}>{mineSite.overall !== null ? mineSite.overall.toFixed(1) : '-'}</td>
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
