import React from 'react';
import { Chart } from 'react-google-charts';

class ResultChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let options = {
                colors: ['#FFFFFF'],
                titleTextStyle: {color: '#FFFFFF', bold: false},
                hAxis: { minValue: 0, maxValue: 15, "titleTextStyle": {color: '#6C6C6C'},"textStyle": {color:"#6C6C6C"}},
                vAxis: { minValue: 0, maxValue: 15, "titleTextStyle": {color: '#6C6C6C'},"textStyle": {color:"#6C6C6C"}},
                legend: 'none',
                backgroundColor: '#000000',
                tooltip: {
                    textStyle: {fontSize: 10},
                    showColorCode: true
                }
            };
        return (
            <Chart chartType='ScatterChart' rows={this.props.rows} columns={this.props.columns} options={options} graph_id="ScatterChart" legend_toggle={true} />
        );
    }
}

export default ResultChart;


