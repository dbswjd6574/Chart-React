import React from 'react';
import ZingChart from 'zingchart-react';

class PieChart extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        let chartStyle={
            float:"left",
            padding:"10px"
        };

        let chartData = this.props.value;

        let series = [];
        let header;

        Object.keys(chartData).forEach(function(key, keyIndex) {
            if (keyIndex == 0) {
                header = key;
            }
        });

        for (let i = 0; i < chartData[header].length; i++) {
            let tempRow = {};
            Object.keys(chartData).forEach(function(key, keyIndex) {
                if (keyIndex == 0) {
                    tempRow["text"] = chartData[key][i];
                } else {
                    tempRow["values"] = [chartData[key][i]];
                }
            });
            series.push(tempRow);
        }

        return(
            <div style={chartStyle}>
                <ZingChart.pie id={this.props.id} height={this.props.height} width={this.props.width} series={series} legend="true" theme="dark" title="Pie Chart" />
            </div>
        );
    }
}
export default PieChart;