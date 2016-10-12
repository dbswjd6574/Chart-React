import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleBarChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let options = {
            width: 700,
            height: 400,
            titleTextStyle: {color: '#FFFFFF', fontName: 'Roboto', bold: false},
            legend: {"position":"none","textStyle": {color:"#FFFFFF", fontName: 'Roboto', bold:false}},
            bar:{"groupWidth":"75%"},
            backgroundColor: '#0D0D0D',
            hAxis:{"textStyle": {color:"#6C6C6C", fontName: 'Roboto', bold: false}},
            vAxis:{"textStyle": {color:"#6C6C6C", fontName: 'Roboto', bold: false}},
            is3D:true,
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
            <Chart chartType='BarChart' data={this.props.data} options={options} graph_id="BarChart" legend_toggle={true} />
        );
    }
}

export default GoogleBarChart;