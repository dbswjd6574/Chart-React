import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleBubbleChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let options = {
            width: 700,
            height: 400,
            titleTextStyle: {color: '#FFFFFF', bold: false},
            hAxis: {"titleTextStyle": {color: '#6C6C6C'},"textStyle": {color:"#6C6C6C"}},
            vAxis: {"titleTextStyle": {color: '#6C6C6C'},"textStyle": {color:"#6C6C6C"}},
            bubble:{"textStyle":{"fontSize":11, "color":"#ffffff", "auraColor": 'none'}},
            legend:{"textStyle":{color: '#FFFFFF', fontSize: 10}},

            backgroundColor: {
                fill: "#000000",
                fillOpacity: "0.1"
            },
            tooltip: {
                textStyle: {fontSize: 10},
                showColorCode: true
            }
        };

        return (
            <Chart chartType='BubbleChart' data={this.props.data} options={options} graph_id="BubbleChart" legend_toggle={true} />
        );
    }
}

export default GoogleBubbleChart;