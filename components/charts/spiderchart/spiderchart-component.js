import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, PolarRadiusAxis, Legend } from 'recharts';

class Piechart extends PureComponent {
  static propTypes = { data: PropTypes.array.isRequired }

  render() {
    const { data, company } = this.props;

    return (
      <div className="c-spiderchart">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius={120}
          width={420}
          height={320}
          data={data}
        >
          <PolarGrid
            innerRadius={0}
            outerRadius={100}
          />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            width={180}
          />
          <Radar
            animationDuration={0}
            dataKey="value"
            stroke="#88789f"
            fill="#88789f"
            fillOpacity={0.6}
          />
          <Radar
            animationDuration={0}
            dataKey="average"
            stroke="#4d4c52"
            strokeWidth={1.2}
            strokeDasharray="4 4"
            fill="transparent"
            fillOpacity={0.6}
          />
          <Radar
            animationDuration={0}
            dataKey="best"
            stroke="#bf3132"
            strokeWidth={1.2}
            strokeDasharray="4 4"
            fill="transparent"
            fillOpacity={0.6}
          />
          {/* <Tooltip isAnimationActive={false} /> */}
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fontSize: 10 }}
            orientation="left"
            tickFormatter={tick => `${tick}%`}
            tickCount={6}
            axisLine={false}
            stroke="#000"
            dx={-8}
            dy={5}
          />
          <Legend
            iconSize={8}
            wrapperStyle={{ fontSize: 12 }}
            payload={[
              { value: `${company.name}`, type: 'square', id: 'value', color: '#88789f' },
              { value: 'RMI average', type: 'line', id: 'average', color: '#4d4c52' },
              { value: 'Collective Best Score', type: 'line', id: 'best', color: '#bf3132' }
            ]}
          />
        </RadarChart>
      </div>
    );
  }
}

export default Piechart;
