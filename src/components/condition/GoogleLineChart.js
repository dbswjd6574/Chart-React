import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let chartStyle={
            float:"left",
            padding:"10px"
        };

        let options = {
            width: 700,
            height: 400,
            colors: ['#FFFFFF'],
            legend: {"textStyle": {color:"#FFFFFF", fontSize: 10}},
            titleTextStyle: {color: '#FFFFFF', bold: false},
            hAxis: {
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
            <div style={chartStyle}>
                <Chart chartType='LineChart' rows={rows} columns={columns} options={options} graph_id="LineChart" legend_toggle={true} />
            </div>
        );
    }
}

export default GoogleLineChart;