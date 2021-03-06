/**
 * Created by 윤정 on 2016-10-14.
 */
import React from 'react';
import SelectKey from './ResultChart/SelectKey';
import LineChart from './zingChartComponent/LineChart';
import ScatterChart from './zingChartComponent/ScatterChart';
import PieChart from './zingChartComponent/PieChart';
import BarChart from './zingChartComponent/BarChart';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import GoogleBubbleChart from './googleChartComponent/GoogleBubbleChart.js';
import GoogleScatterChart from './googleChartComponent/GoogleScatterChart.js';
import GoogleLineChart from './googleChartComponent/GoogleLineChart.js';
import GoogleDonutChart from './googleChartComponent/GoogleDonutChart.js';
import GoogleBarChart from './googleChartComponent/GoogleBarChart.js';
import GoogleTableChart from './googleChartComponent/GoogleTableChart.js';

let chartDatas;

class AnalysisTableArea extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillUpdate(nextProps){
        let header;
        let tempChartData = {};
        if (nextProps.xKey != '') {
            header = nextProps.xKey;
        }
        let tempArray = [];
        for (let i = 0; i < nextProps.data.length; i++) {
            tempArray.push(nextProps.data[i][header]);
        }
        tempChartData[header] = tempArray;

        for (let i = 0; i < nextProps.keys.length; i++) {
            header = nextProps.keys[i];
            tempArray = [];
            for (let j = 0; j < nextProps.data.length; j++) {
                tempArray.push(nextProps.data[j][header]);
            }
            tempChartData[header] = tempArray;
        }
        chartDatas = tempChartData;
        console.log('chartDatas', chartDatas);
    }
    changeXKey(key) {
        this.props.selectXKey(key);
    }

    changeYKey(key) {
        this.props.selectYKey(key);
    }

    render(){
        let style ={
            float : "left",
            marginLeft:"10px"
        };

        let chart;
        if (this.props.chartType == 'GoogleBarChart') {
            chart = <GoogleBarChart width="800" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'GoogleLineChart') {
            chart = <GoogleLineChart width="800" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'LineChart') {
            chart = <LineChart id="chart1" width="800" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'GoogleDonutChart') {
            chart = <GoogleDonutChart width="800" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'GoogleScatterChart') {
            chart = <GoogleScatterChart width="800" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'PieChart') {
            chart = <PieChart id="chart1" width="800" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'ScatterChart') {
            chart = <ScatterChart id="chart1" width="800" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'BarChart') {
            chart = <BarChart id="chart1" width="800" height="400" value={chartDatas}/>;
        }

        let tableStyle = {
            width : "98%",
            'marginLeft' : "10px",
            position:"absolute",
            top:"620px"
        };
        let selectStyle ={
            width : "90%",
            'marginLeft' : "30px",
            display : "inline-block",
            color : "white"
        };
        return(
            <div>
                <div style={selectStyle}>
                    <span>X Axis<SelectKey menuItem={this.props.menuItem} changeState={this.changeXKey.bind(this)} name="select" placeholder="Choose One"/></span>
                    <span>Y Axis<SelectKey menuItem={this.props.menuItem} changeState={this.changeYKey.bind(this)} name="select" placeholder="Choose One or More"/></span>
                </div>
                <div style={style}>
                    {(this.props.xKey.length > 0 && this.props.keys.length > 0) ? chart : ' '}
                </div>
                <div style={tableStyle}>
                    <DataTable keys={this.props.keys} data={this.props.data}/>
                </div>
            </div>

        );
    }
}

var cols =[];

class DataTable extends React.Component{
    constructor(props){
        super(props);
        this.onRowSelect=this.onRowSelect.bind(this);
    }
    componentWillMount(){
        $.each(this.props.keys, (key, value)=>{
            cols.push({dataField:value});
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        return !(nextProps.keys === this.props.keys);
    }
    componentWillUpdate(nextProps){
        cols = [];
        $.each(nextProps.keys, (key, value)=>{
            cols.push({dataField:value});
        });
        console.log("centerArea componentWillUpdate :: ", cols);
    }

    onRowSelect(row, isSelected){
        console.log(row);
        console.log("selected: " + isSelected);
    }
    render(){
        let selectRow={
            mode : "radio",
            clickToSelect : true,
            bgColor : "rgb(150, 230, 213)",
            onSelect : this.onRowSelect
        };

        let table = "";
        if(cols.length > 1){
            table = <BootstrapTable data={this.props.data} trClassName="tr-table" selectRow={selectRow} height="300px">
                {cols.map((col, i) => {
                    if(i == 0) {
                        return (<TableHeaderColumn isKey={true} className="td-header" dataField={col.dataField}>{col.dataField}</TableHeaderColumn>);
                    } else {
                        return (<TableHeaderColumn dataSort={true} className="td-header" dataField={col.dataField}>{col.dataField}</TableHeaderColumn>);
                    }
                })}
            </BootstrapTable>
        } else {
            table = "";
        }
        return(
            <div>
                {table}
            </div>
        );
    }
}

export default AnalysisTableArea;