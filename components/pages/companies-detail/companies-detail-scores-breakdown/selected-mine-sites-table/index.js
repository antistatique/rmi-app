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
            <td className="score-title">Local Employmen<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.localEmployment !== null ? mineSite.scores.localEmployment.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Local Procurement<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.localProcurement !== null ? mineSite.scores.localProcurement.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Air Quality<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.airQuality !== null ? mineSite.scores.airQuality.toFixed(1) : '-'}</td>
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
            <td className="score-title">Rehabilitation and Post-Closure<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.rehabilitationandPostClosure !== null ? mineSite.scores.rehabilitationandPostClosure.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Tailings Management<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.tailings !== null ? mineSite.scores.tailings.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title"> Safety of Communities<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.safetyofCommunities !== null ? mineSite.scores.safetyofCommunities.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Community Grievances<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.communityComplaintsandGrievances !== null ? mineSite.scores.communityComplaintsandGrievances.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Safety and Health of Workers<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.safetyandHealthofWorkers !== null ? mineSite.scores.safetyandHealthofWorkers.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Women Workers<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.womenWorkers !== null ? mineSite.scores.womenWorkers.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Workplace Deaths and Injuries<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.workplaceDeathsandInjuries !== null ? mineSite.scores.workplaceDeathsandInjuries.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Training of Workers<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.trainingofWorkers !== null ? mineSite.scores.trainingofWorkers.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Decent Living Wage<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.decentLivingWage !== null ? mineSite.scores.decentLivingWage.toFixed(1) : '-'}</td>
            ))}
          </tr>
          <tr>
            <td className="score-title">Worker Grievances<br /><span>(score /3)</span></td>
            {mineSites.map((mineSite, index) => (
              <td key={mineSite.id} className={(mineSites.length - 1) === index ? '' : 'bordered'}>{mineSite.scores.workerComplaintsandGrievances !== null ? mineSite.scores.workerComplaintsandGrievances.toFixed(1) : '-'}</td>
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
