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
            allowHtml: true,
                cssClassNames: cssClassName,
                backgroundColor: '#000000'
        };
        let chartPackages = ["table"];
        return(
            <Chart chartType='Table' rows={this.props.rows} options={options} graph_id="TableChart" columns={this.props.columns} chartPackage={chartPackages} legend_toggle={true} />
        );
    }
}

export default GoogleTableChart;