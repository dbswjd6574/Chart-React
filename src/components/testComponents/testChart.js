import React from 'react';

const columns = [
    ['data1', 1, 2, 3, 4,5,6],
    ['data2', 6, 5, 4, 3,2,1]
];


var chart;
const { Component } = React;

class TestChart extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        chart = c3.generate({
            bindto: '#chart',
            data: {
                columns : columns,
                type:"line"
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
    componentDidUpdate() {

        //this._updateChart();
    }

    componentWillReceiveProps(){
        console.log("componentWillReceiveProps", this.props.loadedData);
        let parentData = this.props.loadedData;
        console.log("componentWillReceiveProps_dd",parentData.data);
        let temp = [];
        if(parentData.data){
            temp.push(parentData.data);
            let columns = temp;
            console.log("columns", columns);
            chart.load({
                columns:temp,
                type: 'line',
                unload: ['data1', 'data2']
            });
        }

    }

    render(){
        return <div id="chart"></div>;
    }
}


export default TestChart;