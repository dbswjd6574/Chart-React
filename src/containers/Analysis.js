import React from 'react';
import { LineChart, ScatterChart, InfoBox, PieChart, BarChart } from 'components';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

function simulateLiveData(){
    var data = [];

    for(var j=0; j < 2; j++){
        var series = {"text" : "Text" + j,"values" : []};
        for(var i = 0; i < 20; i++){
            series['values'].push( Math.floor(Math.random() * 100));
        }
        data.push(series);
    }
    return data;
}

function simulateLiveScatterData(){
    var scatterSeries = [];
    for(var j=0;j<3;j++) {
        var series = {"text" : "data" + j, "values" :[]};
        for (var i = 0; i < 40; i++) {
            series['values'].push([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
        }
        scatterSeries.push(series);
    }
    return scatterSeries;
}

function simulateLinearData(){
    var values = [];
    for(var i = 0; i < 20; i++){
        values.push(Math.floor(Math.random() * 100));
    }
    return values;
}

function simulateLivePieData(){
    var pieValues = [];
    for(var i = 0; i < 4; i++){
        pieValues.push({"values" : [Math.floor(Math.random() * 100)] })
    }
    return pieValues;
}

class Analysis extends React.Component{
    constructor(props){
        super(props);

        this.state={
            chart1val:[],
            timer:()=>{}
        };
        this.changeData=this.changeData.bind(this);
    }

    componentDidMount(){
        let timer = setInterval(this.changeData, 3000);
        this.setState({timer:timer});
        //clearInterval(timer);
    }
    changeData(){
        this.setState({
            chart1val : simulateLiveData(),
            chart2val : simulateLiveScatterData(),
            chart3val : simulateLivePieData()
        });
    }
    componentWillUnmount(){
        clearInterval(this.state.timer);
    }

    render(){
        let divStyle={
            width:"100%",
            position:"absolute",
            marginTop:"10px",
            backgroundColor: "rgba(13,13,13,0.7)"
        };
        return(
            <div >
                <div>
                    <InfoBox />
                </div>
                <div style={divStyle}>
                    <LineChart id="chart1" width="800" height="300" value={this.state.chart1val}/>
                    <ScatterChart id="chart2" width="800" height="300" value={this.state.chart2val}/>
                    <PieChart id="chart3" width="800" height="300" value={this.state.chart3val}/>
                    <BarChart id="chart4" width="800" height="300" value={this.state.chart1val}/>
                </div>
            </div>
        );
    }
}

export default Analysis;