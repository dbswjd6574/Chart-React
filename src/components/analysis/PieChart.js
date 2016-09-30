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
        return(
            <div style={chartStyle}>
                <ZingChart.pie id={this.props.id} height={this.props.height} width={this.props.width} series={this.props.value} legend="true" theme="dark" title="Pie Chart" />
            </div>
        );
    }
}
export default PieChart;