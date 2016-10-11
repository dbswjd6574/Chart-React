import React from 'react';
import {Chart} from 'react-google-charts';

class GoogleTableChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let cssClassName = {
            'headerRow': 'header-background',
            'tableRow': 'table-background',
            'oddTableRow': 'table-background',
            'selectedTableRow': 'orange-background large-font',
            'hoverTableRow': '',
            'headerCell': 'white-border',
            'tableCell': 'white-border',
            'rowNumberCell': ''
        };
        let options = {
            width: 700,
            height: 400,
            allowHtml: true,
            cssClassNames: cssClassName,
            backgroundColor: '#0D0D0D'
        };
        let chartPackages = ["table"];
        return(
            <Chart chartType='Table' rows={this.props.rows} options={options} graph_id="TableChart" columns={this.props.columns} chartPackage={chartPackages} legend_toggle={true} />
        );
    }
}

export default GoogleTableChart;