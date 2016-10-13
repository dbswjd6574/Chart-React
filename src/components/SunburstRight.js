import React from 'react';
import Select from './Select';

import SunburstBarChart from './sunburstAnalysys/SunburstBarChart';
import SunburstDataTable from './sunburstAnalysys/SunburstDataTable';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var series = [{"text" : "Text","values" : [10, 50, 34, 86, 15, 75, 36]},
    {"text" : "Text2","values" : [50, 10, 75, 34, 86, 36, 15]},
    {"text" : "Text3","values" : [5, 10, 38,2, 1, 123, 6]}];

let barChartDatas = {
    data: [
        ["Element","Density"],["Copper",8.94],["Silver",10.49],["Gold",19.3],["Platinum",21.45]
    ]
};


class SunburstRight extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let style ={
            float : "left",
            width : "815px",
            height : "700px",
            marginLeft :"480px",
            'background-color' : "gray"
        };
        let style2 ={
            'background-color' : "black",
            'color' : "white",
            'height' : "55px"

        };

        let style3 ={
            'font-size' :"36px"
        }

        let chart;

        let table;



        //table = <SunburstDataTable id="table" width="700" height="400" keys={series.text} data={series.values}/>;
        chart = <SunburstBarChart id="chart1" width="700" height="400" value={series}/>;

        return(
            <div>
                <div style={style}>

                    <div style={style2}>
                        <p style={style3}>Data Analysys</p>
                    </div>
                    /*{table}*/
                    {chart}
                </div>
            </div>
        );
    }
}

export default SunburstRight;