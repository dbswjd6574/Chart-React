import React from 'react';
import ZingChart from 'zingchart-react';

class LineChart extends React.Component{
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
                <ZingChart.line id={this.props.id} height={this.props.height} width={this.props.width} series={this.props.value} legend="true" theme="dark" title="Line Chart"/>
            </div>
        );
    }
}

export default LineChart;