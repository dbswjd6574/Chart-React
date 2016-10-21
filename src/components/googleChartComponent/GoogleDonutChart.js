import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleDonutChart extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        let chartStyle={
            float:"left",
            padding:"10px"
        };

        let options = {
            title: "DonutChart",
            titleTextStyle: {color: '#FFFFFF', fontSize: 20, bold: false},
            pieHole: 0.4,
            is3D: true,
            legend: {"textStyle": {color:"#FFFFFF", fontSize: 10}},
            backgroundColor: {
                fill: "#000000",
                fillOpacity: "0.1"
            },
            hAxis: {"textStyle": {color:"#6C6C6C"}},
            vAxis: {"textStyle": {color:"#6C6C6C"}},
            tooltip: {
                textStyle: {fontSize: 10},
                showColorCode: true
            }
        };

        let chartData = this.props.value;

        let data = [];
        let header;

        let headerInfo = [];
        Object.keys(chartData).forEach(function(key, keyIndex){
            headerInfo.push(key);
            if (keyIndex == 0) {
                header = key;
            }
        });
        data.push(headerInfo);

        for (let i = 0; i < chartData[header].length; i++) {
            let tempRow = [];
            Object.keys(chartData).forEach(function(key, keyIndex) {
                tempRow.push(chartData[key][i]);
            });
            data.push(tempRow);
        }

        return (
            <div style={chartStyle}>
                <Chart chartType='PieChart' data={data} options={options} width={this.props.width} height={this.props.height} graph_id="DonutChart" legend_toggle={true} />
            </div>
        );
    }

}

export default GoogleDonutChart;