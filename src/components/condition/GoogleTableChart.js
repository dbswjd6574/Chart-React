import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleTableChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Chart chartType={this.props.chartType} rows={this.props.rows} options={this.props.options} graph_id="TableChart" width={"100%"} height={"100%"} columns={this.props.columns} chartPackage={this.props.chartPackages} legend_toggle={true} />
        );
    }
}

export default GoogleTableChart;