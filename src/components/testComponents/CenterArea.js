import React from 'react';
import Select from './Select';
import LineChart from '../zingChartComponent/LineChart';
import ScatterChart from '../zingChartComponent/ScatterChart';
import PieChart from '../zingChartComponent/PieChart';
import BarChart from '../zingChartComponent/BarChart';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import GoogleBubbleChart from '../googleChartComponent/GoogleBubbleChart.js';
import GoogleScatterChart from '../googleChartComponent/GoogleScatterChart.js';
import GoogleLineChart from '../googleChartComponent/GoogleLineChart.js';
import GoogleDonutChart from '../googleChartComponent/GoogleDonutChart.js';
import GoogleBarChart from '../googleChartComponent/GoogleBarChart.js';
import GoogleTableChart from '../googleChartComponent/GoogleTableChart.js';

let chartDatas;

class CenterArea extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillUpdate(nextProps){
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
        } else if (this.props.chartType == 'GoogleScatterChart') {
            chart = <GoogleScatterChart width="700" height="400" value={chartDatas}/>;
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
                    {this.props.keys.length > 1 ? chart : ' '}
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