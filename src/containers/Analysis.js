import React from 'react';
import { LineChart, ScatterChart } from 'components';

function simulateLiveData(){
    var data = [];

    for(var j=0; j < 2; j++){
        var series = {"values" : []};
        for(var i = 0; i < 20; i++){
            series['values'].push( Math.floor(Math.random() * 100));
        }
        data.push(series);
    }
    return {
        "graphset" : [{
            "type" : "line",
            "series" : data,
        }]
    };
}

class Analysis extends React.Component{
    constructor(props){
        super(props);
        this.data = {
            "graphset": [
                {
                    "type": "scatter",
                    "series": [{
                        "values": [
                            [0.9, 3],
                            [2.1, 13],
                            [3.5, 25],
                            [4.9, 35],
                            [5.3, 41],
                            [6.5, 57],
                            [7.1, 61],
                            [8.7, 70],
                            [9.2, 82],
                            [9.9, 95]
                        ]
                    }],
                    "theme" : "dark"
                }
            ]
        };

        this.state={
            chart1val:[],
            chart2val:this.data
        };
        this.changeData=this.changeData.bind(this);
    }

    componentDidMount(){
        setInterval(this.changeData, 1000);
        console.log("first", this.state.chart1val);
        console.log("second", this.state.chart2val);
    }
    changeData(){
        this.setState({
            chart1val : simulateLiveData()
        });
    }

    render(){
        return(
            <div>
                <LineChart id="chart1" width="700" height="300" data={this.state.chart1val}/>
                <ScatterChart id="chart2" width="700" height="300" data={this.state.chart2val}/>
            </div>
        );
    }
}

export default Analysis;