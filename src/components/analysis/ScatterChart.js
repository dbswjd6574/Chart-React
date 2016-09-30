import React from 'react';
import ZingChart from 'zingchart-react';

class ScatterChart extends React.Component{
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
                <ZingChart.scatter id={this.props.id} height={this.props.height} width={this.props.width} series={this.props.value} legend="true" theme="dark" title="Scatter Chart"/>
            </div>
        );
    }
}
export default ScatterChart;