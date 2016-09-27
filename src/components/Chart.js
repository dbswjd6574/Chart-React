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
                {this.props.test}
                <DonutChart data={this.state.chartData}/>
                <br/>
                <Button bsStyle="primary" onClick={this.handleLogin}>Draw</Button>
            </div>
        )

    }

    propTypes: {
        test: React.PropTypes.number
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
        highcharts.createElement('link', {
            href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

// Add the background image to the container
        highcharts.wrap(highcharts.Chart.prototype, 'getContainer', function (proceed) {
            proceed.call(this);
            this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
        });


        highcharts.theme = {
            colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                backgroundColor: null,
                style: {
                    fontFamily: "Signika, serif"
                }
            },
            title: {
                style: {
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                style: {
                    color: 'black'
                }
            },
            tooltip: {
                borderWidth: 0
            },
            legend: {
                itemStyle: {
                    fontWeight: 'bold',
                    fontSize: '13px'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#6e6e70'
                    }
                }
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#6e6e70'
                    }
                }
            },
            plotOptions: {
                series: {
                    shadow: true
                },
                candlestick: {
                    lineColor: '#404048'
                },
                map: {
                    shadow: false
                }
            },

            // Highstock specific
            navigator: {
                xAxis: {
                    gridLineColor: '#D0D0D8'
                }
            },
            rangeSelector: {
                buttonTheme: {
                    fill: 'white',
                    stroke: '#C0C0C8',
                    'stroke-width': 1,
                    states: {
                        select: {
                            fill: '#D0D0D8'
                        }
                    }
                }
            },
            scrollbar: {
                trackBorderColor: '#C0C0C8'
            },

            // General
            background2: '#E0E0E8'

        };

        highcharts.setOptions(highcharts.theme);

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
                },
                type: 'category'
            }],
            plotOptions: {
                series: {
                    borderWidth: 0
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">Sum of watch_time</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
            },
            series: [{
                data: this.props.data,
                size: '100%',
                innerSize: '90%',
                showInLegend: false,
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