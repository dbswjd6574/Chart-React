import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleBarChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Chart chartType={this.props.chartType} data={this.props.data} options={this.props.options} graph_id="BarChart" width={"600px"} height={"400px"} legend_toggle={true} />
        );
    }
}

export default GoogleBarChart;