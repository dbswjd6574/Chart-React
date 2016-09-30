import React from 'react';
import { Chart } from 'react-google-charts';

class ResultChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Chart chartType={this.props.chartType} rows={this.props.rows} columns={this.props.columns} options={this.props.options} graph_id="ScatterChart" width={"600px"} height={"400px"} legend_toggle={true} />
        );
    }
}

export default ResultChart;


