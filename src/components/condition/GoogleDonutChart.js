import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleDonutChart extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        let options = {
            width: 700,
            height: 400,
            titleTextStyle: {color: '#FFFFFF', bold: false},
            pieHole: 0.4,
            is3D: true,
            legend: 'none',
            backgroundColor: '#0D0D0D',
            hAxis: {"textStyle": {color:"#6C6C6C"}},
            vAxis: {"textStyle": {color:"#6C6C6C"}},
            tooltip: {
                textStyle: {fontSize: 10},
                showColorCode: true
            }
        };

        return (
            <Chart chartType='PieChart' data={this.props.data} options={options} graph_id="DonutChart" legend_toggle={true} />
        );
    }

}

export default GoogleDonutChart;