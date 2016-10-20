import React from 'react';
import { Chart } from 'react-google-charts';

class ResultChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let chartStyle={
            float:"left",
            padding:"10px"
        };

        let options = {
            title: "ScatterChart",
            colors: ['#FFFFFF'],
            legend: {"textStyle": {color:"#FFFFFF", fontSize: 10}},
            titleTextStyle: {color: '#FFFFFF', fontSize: 20, bold: false},
            hAxis: { minValue: 0, maxValue: 15, "titleTextStyle": {color: '#6C6C6C'},"textStyle": {color:"#6C6C6C"}},
            vAxis: { minValue: 0, maxValue: 15, "titleTextStyle": {color: '#6C6C6C'},"textStyle": {color:"#6C6C6C"}},
            backgroundColor: {
                fill: "#000000",
                fillOpacity: "0.1"
            },
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
            <div style={chartStyle}>
                <Chart chartType='ScatterChart' rows={rows} columns={columns} options={options} width={this.props.width} height={this.props.height} graph_id="ScatterChart" legend_toggle={true} />
            </div>
        );
    }
}

export default ResultChart;


