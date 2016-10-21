import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleBarChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let chartStyle={
            float:"left",
            padding:"10px"
        };

        let options = {
            title: "BarChart",
            titleTextStyle: {color: '#FFFFFF', fontName: 'Roboto', fontSize: 20, bold: false},
            legend: {"position":"none","textStyle": {color:"#FFFFFF", fontName: 'Roboto', bold:false}},
            bar:{"groupWidth":"75%"},
            backgroundColor: {
                fill: "#000000",
                fillOpacity: "0.1"
            },
            hAxis:{"textStyle": {color:"#6C6C6C", fontName: 'Roboto', bold: false}},
            vAxis:{"textStyle": {color:"#6C6C6C", fontName: 'Roboto', bold: false}},
            is3D:true,
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
                <Chart chartType='BarChart' data={data} options={options} width={this.props.width} height={this.props.height} graph_id="BarChart" legend_toggle={true} />
            </div>
        );
    }
}

export default GoogleBarChart;