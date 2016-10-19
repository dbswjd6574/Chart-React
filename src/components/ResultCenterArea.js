/**
 * Created by 윤정 on 2016-10-14.
 */
import React from 'react';
import SelectKey from './ResultChart/SelectKey';
import LineChart from './analysis/LineChart';
import ScatterChart from './analysis/ScatterChart';
import PieChart from './analysis/PieChart';
import BarChart from './analysis/BarChart';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import GoogleBubbleChart from './condition/GoogleBubbleChart.js';
import ResultChart from './condition/ResultChart.js';
import GoogleLineChart from './condition/GoogleLineChart.js';
import GoogleDonutChart from './condition/GoogleDonutChart.js';
import GoogleBarChart from './condition/GoogleBarChart.js';
import GoogleTableChart from './condition/GoogleTableChart.js';

let chartDatas;

class ResultCenterArea extends React.Component{
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
            float : "left"
        };

        let chart;
        if (this.props.chartType == 'GoogleBarChart') {
            chart = <GoogleBarChart width="680" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'GoogleLineChart') {
            chart = <GoogleLineChart width="680" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'LineChart') {
            chart = <LineChart id="chart1" width="680" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'GoogleDonutChart') {
            chart = <GoogleDonutChart width="680" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'ResultChart') {
            chart = <ResultChart width="680" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'PieChart') {
            chart = <PieChart id="chart1" width="680" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'ScatterChart') {
            chart = <ScatterChart id="chart1" width="680" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'BarChart') {
            chart = <BarChart id="chart1" width="680" height="400" value={chartDatas}/>;
        }

        let tableStyle = {
            width : "98%",
            'margin-left' : "10px",
            position:"absolute",
            top:"600px"
        };
        let selectStyle ={
            width : "90%",
            'margin-left' : "30px",
            display : "inline-block"

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

export default ResultCenterArea;