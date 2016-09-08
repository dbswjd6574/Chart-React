import React from 'react';
import highcharts from 'highcharts';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { dataRequest } from 'actions/authentication';
class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        return this.props.dataRequest().then(
            () => {
                console.info('handleLogin', this.props.chartData);
                var data = convertJSON(this.props.chartData.chartData);
                this.setState({chartData: data});
            }
        );
    }

    render() {
        return (
            <div>
                <DonutChart data={this.state.chartData}/>
                <br/>
                <Button bsStyle="primary" onClick={this.handleLogin}>Draw</Button>
            </div>
        )

    }
}

function convertJSON(jsonArray) {
    var chartData = [];

    for (var i = 0; i < jsonArray.length; i ++ ) {
        var keyString = jsonArray[i].key;
        var valueString = jsonArray[i].using_value.value;
        chartData[i] = {"name": keyString, "y": valueString};
    }
    return chartData;
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
            yAxis: [{
                title: {
                    text: "sum of watch"
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            }],
            xAxis: [{
                title: {
                    text: "channel_id"
                }
            }],
            plotOptions: {
                pie: {
                    shadow: false
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y;
                }
            },
            series: [{
                name: 'Browsers',
                data: this.props.data,
                size: '100%',
                innerSize: '90%',
                showInLegend: true,
                dataLabels: {
                    enabled: false
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

const mapStateToProps = (props) => {
    return {
        chartData: props.authentication
    };

};

const mapDispatchToProps = (dispatch) => {
    return {
        dataRequest: () => {
            return dispatch(dataRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);