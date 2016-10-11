import React from 'react';
import Select from './Select';
import LineChart from './analysis/LineChart';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var series = [{"text" : "Text","values" : [10, 50, 34, 86, 15, 75, 36]}];

class CenterArea extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        let style ={
            float : "left",
            width : "1400",
            marginLeft :"280px"
        }
        return(
            <div>
                <div style={style}>
                    <Select />
                    <Select />
                </div>
                <div style={style}>
                    <LineChart id="chart1" width="700" height="400" value={series}/>
                </div>
                <div style={style}>
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
            table = <BootstrapTable data={this.props.data} striped={true} selectRow={selectRow} >
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
        let style ={
            float : "left",
            width : "1000",
            marginLeft :"280px"
        };
        return(
            <div style={style}>
                {table}
            </div>
        );
    }
}

export default CenterArea;