import React from 'react';
import Select from './Select';
import LineChart from './analysis/LineChart';
import ScatterChart from './analysis/ScatterChart';
import PieChart from './analysis/PieChart';
import BarChart from './analysis/BarChart';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import GoogleBubbleChart from './condition/GoogleBubbleChart.js';
import ResultChart from './condition/ResultChart.js';
import GoogleLineChart from './condition/GoogleLineChart.js';
import GoogleDonutChart from './condition/GoogleDonutChart.js';
import GoogleBarChart from './condition/GoogleBarChart.js';
import GoogleTableChart from './condition/GoogleTableChart.js';

var series = [{"text" : "Text","values" : [10]},
    {"text" : "Text2","values" : [50]},
    {"text" : "Text3","values" : [5]}];

let chartDatas;

let pieChartData = [
    {
        "values" : [119968796],
        "text":"Operating System",
        "backgroundColor": "#4527A0",
        "legendItem":{
            "backgroundColor": "#4527A0"
        },
    },
    {
        "values" : [97503958],
        "text":"Network and Tools",
        "backgroundColor": "#1565C0",
    },
    {
        "values" : [85948575],
        "text":"Business Division",
        "backgroundColor": "#AD1457",
    },
    {
        "values" : [62096876],
        "text":"Online Services",
        "backgroundColor": "#00695C",
    },
    {
        "values" : [40467564],
        "text":"Entertainment",
        "backgroundColor": "#EF6C00",
    }
];

class CenterArea extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillUpdate(nextProps){
        console.log("centerArea nextProps :: ", nextProps);
        let header;
        let tempChartData = {};
        for (let i = 0; i < nextProps.keys.length; i++) {
            header = nextProps.keys[i];
            let tempArray = [];
            for (let j = 0; j < nextProps.data.length; j++) {
                tempArray.push(nextProps.data[j][header]);
            }
            tempChartData[header] = tempArray;
        }
        chartDatas = tempChartData;
        console.log('chartDatas: ', chartDatas);
    }

    render(){
        let style ={
            float : "left",
            width : "1400",
            marginLeft :"280px"
        };

        let chart;
        if (this.props.chartType == 'GoogleBarChart') {
            chart = <GoogleBarChart width="700" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'GoogleLineChart') {
            chart = <GoogleLineChart width="700" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'LineChart') {
            chart = <LineChart id="chart1" width="700" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'GoogleDonutChart') {
            chart = <GoogleDonutChart width="700" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'ResultChart') {
            chart = <ResultChart width="700" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'PieChart') {
                chart = <PieChart id="chart1" width="700" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'ScatterChart') {
            chart = <ScatterChart id="chart1" width="700" height="400" value={chartDatas}/>;
        } else if (this.props.chartType == 'BarChart') {
            chart = <BarChart id="chart1" width="700" height="400" value={chartDatas}/>;
        }

        let tableStyle = {
            float : "left",
            marginLeft :"280px",
            width : "723"
        };
        let selectStyle ={
            float : "left",
            width : "800",
            marginLeft :"280px"
        };
        return(
            <div>
                <div style={selectStyle}>
                    <Select />
                    <Select />
                </div>
                <div style={style}>
                    {chart}
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
            table = <BootstrapTable data={this.props.data} striped={true} selectRow={selectRow} height="330">
                {cols.map((col, i) => {
                    if(i == 0) {
                        return (<TableHeaderColumn isKey={true} dataField={col.dataField}>{col.dataField}</TableHeaderColumn>);
                    } else {
                        return (<TableHeaderColumn dataSort={true} dataField={col.dataField}>{col.dataField}</TableHeaderColumn>);
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

export default CenterArea;