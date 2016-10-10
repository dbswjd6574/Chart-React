import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let options = {
            colors: ['#FFFFFF'],
            legend: {"textStyle": {color:"#FFFFFF", fontSize: 10}},
            titleTextStyle: {color: '#FFFFFF', bold: false},
            hAxis: {
                "title": 'time',
                "titleTextStyle": {
                    color: '#6C6C6C'
                },
                "textStyle": {color:"#6C6C6C"}
            },
            vAxis: {
                "titleTextStyle": {
                    color: '#6C6C6C'
                },
                "textStyle": {color:"#6C6C6C"}
            },
            backgroundColor: '#000000',
            tooltip: {
                textStyle: {fontSize: 10},
                showColorCode: true
            }
        };

        return (
            <Chart chartType='LineChart' rows={this.props.rows} columns={this.props.columns} options={options} graph_id="LineChart" legend_toggle={true} />
        );
    }
}

export default GoogleLineChart;