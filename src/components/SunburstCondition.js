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
import ModeComment from 'material-ui/svg-icons/editor/mode-comment';
import { connect } from 'react-redux';
import { requestSunburstData } from 'actions/sunburstData';

import RaisedButton from 'material-ui/RaisedButton';

import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
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
        this.state = {
            selectedFieldData: [],
            query: [],
            selectedFieldQuery:[]
        }
    }

    componentDidMount(){

    }

    selectField(value){
        //TODO '지역','상품타입'....선택 - query 요청
        console.log('value', value);

        let query = this.state.query;
        let selectedFieldData = this.state.selectedFieldData;
        let selectedFieldQuery = this.state.selectedFieldQuery;

        if (selectedFieldQuery && selectedFieldQuery.length > 0) {
            for (let i = 0; i < selectedFieldQuery.length; i++) {
                if (selectedFieldQuery[i].key == value.id) {
                    console.log('do not click twice');
                    return;
                }
            }
        }

        selectedFieldQuery.push({"key": value.id, "value": null});

        let fieldInfo = fieldListInfo[value.id];
        let keyList = [];
        for (let i=0; i<fieldInfo.length; i++) {
            keyList.push(fieldInfo[i].key);
        }
        console.log('keyList', keyList);

        query.push({"key": value.id, "value": keyList});//TODO key에 대한 value값 하드코딩
        selectedFieldData.push({"key": value.id, "title": value.name, "fieldList": fieldInfo});//TODO key에 대한 value값 하드코딩- FOR SelectCondition props 용도 data
        console.log('query:' , query);
        this.setState({"query": query, "selectedFieldData": selectedFieldData, "selectedFieldQuery":selectedFieldQuery});

        console.log('selectFields selectedFieldQuery', selectedFieldQuery);
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
        console.log('selectOptions selectedFieldQuery', selectedField);
        this.setState({"selectedFieldQuery": selectedField});
    }

    deleteCondition(fieldId) {
        //TODO CONDITIN DELETE; state 재정의 후 queryRequest 호출하여 데이터 받아온다.
        let query = this.state.query;
        let selectedFieldData = this.state.selectedFieldData;
        let selectedFieldQuery = this.state.selectedFieldQuery;


        const fieldQueryToDelete = selectedFieldQuery.map((fieldQuery) => fieldQuery.key).indexOf(fieldId);
        selectedFieldQuery.splice(fieldQueryToDelete, 1);

        const fieldToDelete = selectedFieldData.map((field) => field.key).indexOf(fieldId);
        selectedFieldData.splice(fieldToDelete, 1);

        const queryToDelete = query.map((query) => query.key).indexOf(fieldId);
        query.splice(queryToDelete, 1);

        this.setState({"query": query, "selectedFieldData": selectedFieldData, "selectedFieldQuery":selectedFieldQuery});

        console.log('deleteCondition selectedFieldQuery', selectedFieldQuery);
        console.log('deleteCondition query', query);
        console.log('deleteCondition selectedFieldData', selectedFieldData);
        if (query && query.length > 0) {
            this.props.requestQueryData(query);
        }

    }

    render(){

        let fieldList = [];
        if (this.props.conditionList && this.props.conditionList != '') {


            fieldList = this.props.conditionList.fields;
        }

        let sunburstChart;
        if(this.props.sunburstChartData){
            sunburstChart = <SunburstChart totalCount={this.props.totalCount} selectedValue={this.state.selectedFieldQuery} sunburstChartData={this.props.sunburstChartData}/>
        } else {
            sunburstChart = ""
        }

        let loadingBar;
        if (this.props.isRequesting){
            loadingBar = <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}><CircularProgress /></MuiThemeProvider>;
        } else {
            loadingBar="";
        }


        return(
            <div>
                {sunburstChart}
                {loadingBar}
                <div className="fieldArea">
                    <div className="fieldList">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            <IconMenu
                                iconButtonElement={<IconButton><ModeComment /></IconButton>}
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
                            return (<SelectCondition key={i} title={value.title} fieldId={value.key} option={value.fieldList} selectOption={this.selectOption.bind(this)} deleteCondition={this.deleteCondition.bind(this)} />);
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default SunburstCondition;