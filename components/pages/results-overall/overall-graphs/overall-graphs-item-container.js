import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// actions
import { setSelectedCompany, resetSelectedCompany } from 'components/pages/results-overall/results-overall-actions';

// constants
import { HOVER_COLOUR } from 'constants/graph-colors';
import { BAR_CONFIG, STACKED_BAR_COLOURS } from './overall-graphs-constants';

// components
import OverallGraphsItem from './overall-graphs-item';

class OverallGraphsContainer extends PureComponent {
    static propTypes = {
      data: PropTypes.object.isRequired,
      currentLanguage: PropTypes.string.isRequired,
      setSelectedCompany: PropTypes.func.isRequired,
      resetSelectedCompany: PropTypes.func.isRequired
    }

    componentWillMount() {
      const { data } = this.props;
      const { slug } = data;

      this.chartConfig = {
        ...BAR_CONFIG,
        setBarFill: ({ selected, dataKey }) => (selected ?
          HOVER_COLOUR : STACKED_BAR_COLOURS[slug][dataKey]),
        barOnMouseOver: this.onMouseOver,
        barChartOnMouseLeave: this.onMouseOut
      };
    }

    componentWillReceiveProps(nextProps) {
      const { data } = this.props;
      const { data: nextData } = nextProps;

      const dataChanged = !isEqual(data, nextData);

      if (dataChanged) {
        const { slug } = nextData;

        this.chartConfig = {
          ...this.chartConfig,
          setBarFill: ({ selected, dataKey }) => {
            const colour = selected ? HOVER_COLOUR : STACKED_BAR_COLOURS[slug][dataKey];
            return colour;
          }
        };
      }
    }

    onMouseOver = ({ payload }) => {
      const { name } = payload;
      this.props.setSelectedCompany(name);
    }

    onMouseOut = () => this.props.resetSelectedCompany();

    render() {
      const { data, currentLanguage } = this.props;
      return (
        <OverallGraphsItem
          data={data}
          currentLanguage={currentLanguage}
          chartConfig={this.chartConfig}
        />
      );
    }
}

export default connect(
  state => ({ selectedCompany: state.selectedCompany }),
  {
    setSelectedCompany,
    resetSelectedCompany
  }
)(OverallGraphsContainer);
