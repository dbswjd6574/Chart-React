import React from 'react';
import { Chart } from 'react-google-charts';

class ResultChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let options = {
            width: 700,
            height: 400,
            colors: ['#FFFFFF'],
            titleTextStyle: {color: '#FFFFFF', bold: false},
            hAxis: { minValue: 0, maxValue: 15, "titleTextStyle": {color: '#6C6C6C'},"textStyle": {color:"#6C6C6C"}},
            vAxis: { minValue: 0, maxValue: 15, "titleTextStyle": {color: '#6C6C6C'},"textStyle": {color:"#6C6C6C"}},
            legend: 'none',
            backgroundColor: '#0D0D0D',
            tooltip: {
                textStyle: {fontSize: 10},
                showColorCode: true
            }
        };

        let chartData = this.props.value;

        let rows = [];
        let columns = [];
        let header;

        Object.keys(chartData).forEach(function(key, keyIndex){
            if (keyIndex == 0) {
                header = key;
                columns.push({"label": key, "type": "string"});
            } else {
                columns.push({"label": key, "type": "number"});
            }
        });

        for (let i = 0; i < chartData[header].length; i++) {
            let tempRow = [];
            Object.keys(chartData).forEach(function(key, keyIndex) {
                tempRow.push(chartData[key][i]);
            });
            rows.push(tempRow);
        }

        return (
            <Chart chartType='ScatterChart' rows={rows} columns={columns} options={options} graph_id="ScatterChart" legend_toggle={true} />
        );
    }
}

export default ResultChart;


