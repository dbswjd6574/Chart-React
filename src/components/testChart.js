import React from 'react';

const columns = [
    ['MyNumbers', 30, 200, 100, 400, 150, 250],
    ['YourNumbers', 50, 20, 10, 40, 15, 25]
];

const { Component } = React;

class TestChart extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._updateChart();
    }
    componentDidUpdate() {
        this._updateChart();
    }

    _updateChart() {
        const chart = c3.generate({
            bindto: '#chart',
            data: {
                columns:  [
                    ['MyNumbers', 30, 200, 100, 400, 150, 250],
                    ['YourNumbers', 50, 20, 10, 40, 15, 25]
                ],
                type: 'bar'
            },
            axis: {
                x: {
                    label: 'X Label'
                },
                y: {
                    label: 'Y Label'
                }
            }
        });
    }

    render(){
        return <div id="chart">hi</div>;
    }
}


export default TestChart;