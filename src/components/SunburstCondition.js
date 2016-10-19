import React from 'react';
import SunburstChart from './SunburstChart';
import Select from 'react-select';
import update from 'react-addons-update';
import 'react-select/dist/react-select.css';

import SelectCondition from './ResultChart/SelectCondition';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';
import { requestSunburstData } from 'actions/sunburstData';

import RaisedButton from 'material-ui/RaisedButton';

import CircularProgress from 'material-ui/CircularProgress';

var transformed_json = {
    name: "DMC",
    children: [{ name: "test1", children: [{name:"textChildren1", value : 30}, {name:"textChildren2", value : 10}]}, { name : "test2", value: 900} ]
};

let fieldListInfo = {
    "so_id": [
        {"key": "52", title: "양천"},
        {"key": "43", title: "강남"},
        {"key": "54", title: "인천"},
        {"key": "64", title: "강서"},
        {"key": "46", title: "강복"},
        {"key": "61", title: "강동"},
        {"key": "41", title: "전북"},
        {"key": "55", title: "전남"},
        {"key": "40", title: "충북"},
        {"key": "59", title: "충남"},
        {"key": "42", title: "부산"},
        {"key": "51", title: "경남"},
        {"key": "53", title: "경북"},
        {"key": "58", title: "강원"},
        {"key": "62", title: "제주"},
        {"key": "56", title: "대전"},
        {"key": "50", title: "광주"},
        {"key": "63", title: "수원"},
        {"key": "57", title: "일산"},
        {"key": "45", title: "부천"}
    ],
    "paymenttype": [
        {"key": "mobile", "title":"모바일"},
        {"key": "external","title": "포인트"},
        {"key": "coupon", "title": "쿠폰"},
        {"key": "normal", "title": "일반"}
    ],
    "product_type": [
        {"key": "37", title:"SVOD"},
        {"key": "21", title:"FOD"},
        {"key": "20", title:"RVOD"}
    ]
};

class SunburstCondition extends React.Component{
    constructor(props){
        super(props);
        //this.buttonClick=this.buttonClick.bind(this);
        this.state = {
            check : false,
            selectedFieldData: [],
            query: [],
            selectedFieldQuery:[],
            sunburstChartData : transformed_json
        }
    }
    //buttonClick(){
    //    //TODO DELETE
    //    console.log("buttonClick");
    //    this.setState({sunburstChartData:update(this.state.sunburstChartData, {$set : this.data})});
    //}

    componentDidMount(){

    }

    selectField(value){
        //TODO '지역','상품타입'....선택 - query 요청

        let query = this.state.query;
        let selectedFieldData = this.state.selectedFieldData;
        let selectedFieldQuery = this.state.selectedFieldQuery;
        selectedFieldQuery.push({"key": value.id, "value": null});

        let fieldInfo = fieldListInfo[value.id];
        let keyList = [];
        for (let i=0; i<fieldInfo.length; i++) {
            keyList.push(fieldInfo[i].key);
        }

        query.push({"key": value.id, "value": keyList});//TODO key에 대한 value값 하드코딩
        selectedFieldData.push({"key": value.id, "title": value.name, "fieldList": fieldInfo});//TODO key에 대한 value값 하드코딩- FOR SelectCondition props 용도 data
        this.setState({"query": query, "selectedFieldData": selectedFieldData});

        this.props.requestQueryData(query);
    }

    selectOption(val) {
        //TODO chart에 선택한 값 알려주는 작업 필요
        let selectedField = this.state.selectedFieldQuery;
        for (let i=0; i<selectedField.length; i++) {
            if(selectedField[i].key === val.key) {
                let values = [];
                for (let j=0; j<val.value.length; j++) {
                    values.push(val.value[j].key);
                }

                selectedField[i].value = values;
                break;
            }
        }
        this.setState({selectedFieldQuery: selectedField});
    }

    render(){

        let fieldList = [];
        if (this.props.conditionList && this.props.conditionList != '') {
            fieldList = this.props.conditionList.fields;
        }

        let sunburstChart;
        if(this.props.sunburstChartData){
            sunburstChart = <SunburstChart selectedValue={this.state.selectedFieldQuery} sunburstChartData={this.props.sunburstChartData}/>
        } else {
            sunburstChart = ""
        }

        return(
            <div>
                {sunburstChart}
                <div className="fieldArea">
                    <div className="fieldList">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                >
                                {fieldList.map((value, i)=>{
                                    return(<MenuItem key={i} primaryText={value.name} value={value.id} onClick={this.selectField.bind(this, value)}/>);
                                })}
                            </IconMenu>
                        </MuiThemeProvider>
                    </div>
                    <div className="filterArea">
                        {this.state.selectedFieldData.map((value, i)=>{
                            return (<SelectCondition key={i} title={value.title} fieldId={value.key} option={value.fieldList} selectOption={this.selectOption.bind(this)} />);
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        sunburstData: props.sunburstData.sunburstData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestSunburstData: () => {
            return dispatch(requestSunburstData());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SunburstCondition);