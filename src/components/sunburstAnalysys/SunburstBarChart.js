import React from 'react';
import ZingChart from 'zingchart-react';

class SunburstBarChart extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let chartStyle={
            float:"left",
            padding:"10px"
        };

        let seriesData = [];
        let chartData = this.props.value;
        let xAxisHeader;
        Object.keys(chartData).forEach(function(key, keyIndex) {
            if (keyIndex == 0) {
                xAxisHeader = key;
            } else {
                let tempData = [];
                for (let j = 0; j < chartData[key].length; j++) {
                    tempData.push([chartData[xAxisHeader][j], chartData[key][j]]);
                }
                seriesData.push({"text": key, "values": tempData});
            }

        });

        return(
            <div style={chartStyle}>
                <ZingChart.bar id={this.props.id} height={this.props.height} width={this.props.width} series={seriesData} legend="true" theme="dark" title="Bar Chart" />
            </div>
        );
    }
}

export default SunburstBarChart;