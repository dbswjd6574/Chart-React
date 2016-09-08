import React from 'react';
import highcharts from 'highcharts';
import ReactDOM from 'react-dom';
class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {chartData: [{name: "Firefox",y: 6},{name: "MSIE",y: 4},{name: "Safari",y: 4},{name: "Opera",y: 1},{name: "Chrome",y: 7}]}

    }


    render() {
        return <DonutChart data = {this.state.chartData}/>
    }
}

class DonutChart extends React.Component {
    constructor(props) {
        super(props);
        this.chart = undefined;
    }

    componentDidMount() {
        this.chart = $(ReactDOM.findDOMNode(this.refs.chart)).highcharts({
            chart: {
                type: 'column'
            },
            title: 'Browser Market sahre',
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }
            },
            xAxis: {
                categories: ["Firefox", "MSIE", "Safari", "Opera", "Chrome"]
            },
            plotOptions: {
                pie: {
                    shadow: false
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                }
            },
            series: [{
                name: 'Browsers',
                data: this.props.data,
                size: '100%',
                innerSize: '85%',
                showInLegend:true,
                dataLabels: {
                    enabled: true
                }
            }]
        });
    }

    componentWillReceiveProps(props) {
        this.chart.highcharts().series[0].setData(props.data);
    }

    render() {
        return (
            <div ref='chart'>
            </div>
        )
    }
}

export default Chart;