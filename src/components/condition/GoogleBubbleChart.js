import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleBubbleChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Chart chartType={this.props.chartType} data={this.props.data} options={this.props.options} graph_id="BubbleChart" legend_toggle={true} />
        );
    }
}

export default GoogleBubbleChart;