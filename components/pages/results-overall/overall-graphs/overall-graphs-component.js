import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// components
import OverallGraphsItem from './overall-graphs-item-container';

// constants
import { GRAPHS_PER_ROW } from './overall-graphs-constants';

// styles
import styles from './overall-graphs-styles.scss';

class OverallGraphs extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  static renderGraphRow(graphs, key, currentLanguage) {
    return (
      <Fragment key={key} >
        <style jsx>{styles}</style>
        <div className="row">
          {graphs.map(graph => (
            <div key={graph.id} className="col-xs-12 col-md-4">
              <OverallGraphsItem
                data={graph}
                currentLanguage={currentLanguage}
              />
            </div>
          ))}
        </div>
      </Fragment>
    );
  }

  renderGraphs() {
    const { data, currentLanguage } = this.props;
    const totalRows = (data.length / GRAPHS_PER_ROW) > parseInt(data.length / GRAPHS_PER_ROW, 10) ?
      parseInt(data.length / GRAPHS_PER_ROW, 10) + 1 : parseInt(data.length / GRAPHS_PER_ROW, 10);
    const graphs = [];

    for (let i = 0; i < totalRows; i++) {
      const limit = ((i * GRAPHS_PER_ROW) + GRAPHS_PER_ROW);
      const slicedGraphs = data.slice(i * GRAPHS_PER_ROW, limit);
      graphs.push(OverallGraphs.renderGraphRow(slicedGraphs, i, currentLanguage));
    }

    return graphs;
  }

  render() {
    return (
      <div className="c-overall-graphs">
        <style jsx>{styles}</style>
        <div className="graph-container">
          {this.renderGraphs()}
        </div>
      </div>
    );
  }
}

export default OverallGraphs;
