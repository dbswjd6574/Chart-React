import React from 'react';
import SunburstChart from './SunburstChart';
import Select from 'react-select';
import update from 'react-addons-update';
import '../../../node_modules/react-select/dist/react-select.css';

import SelectCondition from './SelectCondition';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import Eject from 'material-ui/svg-icons/action/eject';

import ActivityIndicator from 'react-activity-indicator';
import 'react-activity-indicator/src/activityindicator.css';

let fieldListInfo = {
    "so_id": [
        {"key": "40", title: "가야"},
        {"key": "41", title: "경남"},
        {"key": "43", title: "양천"},
        {"key": "44", title: "중부산"},
        {"key": "45", title: "해운대 기장"},
        {"key": "46", title: "북인천"},
        {"key": "47", title: "아름"},
        {"key": "48", title: "푸른"},
        {"key": "49", title: "남인천"},
        {"key": "50", title: "영남"},
        {"key": "51", title: "충남"},
        {"key": "52", title: "중앙"},
        {"key": "53", title: "금정"},
        {"key": "54", title: "부천,김포"},
        {"key": "55", title: "은평"},
        {"key": "56", title: "영동"},
        {"key": "57", title: "동구,수성"},
        {"key": "58", title: "아(순춘)"},
        {"key": "59", title: "신라"},
        {"key": "60", title: "나라"},
        {"key": "61", title: "중부산"},
        {"key": "62", title: "영서"},
        {"key": "63", title: "전북"},
        {"key": "64", title: "호남"}
    ],
    "paymenttype": [
        {"key": "mobile", "title":"모바일"},
        {"key": "external","title": "외부결제"},
        {"key": "coupon", "title": "쿠폰"},
        {"key": "normal", "title": "일반"}
    ],
    "product_type": [
        {"key": "19", title:"FOD"},
        {"key": "20", title:"RVOD"},
        {"key": "21", title:"SVOD"},
        {"key": "37", title:"Package"},
        {"key": "10000", title:"SVODPackage"},
        {"key": "20000", title:"Bundle"}
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
        let query = this.state.query;
        let selectedFieldData = this.state.selectedFieldData;
        let selectedFieldQuery = this.state.selectedFieldQuery;

        if (selectedFieldQuery && selectedFieldQuery.length > 0) {
            for (let i = 0; i < selectedFieldQuery.length; i++) {
                if (selectedFieldQuery[i].key == value.id) {
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

        query.push({"key": value.id, "value": keyList});
        selectedFieldData.push({"key": value.id, "title": value.name, "fieldList": fieldInfo, "selectedValues":[]});

        this.setState({"query": query, "selectedFieldData": selectedFieldData, "selectedFieldQuery":selectedFieldQuery});

        this.props.requestQueryData(query);
    }

    selectOption(val) {
        let selectedField = this.state.selectedFieldQuery;
        let selectedFieldData = this.state.selectedFieldData;

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

        for (let i=0; i<selectedFieldData.length; i++) {
            if(selectedFieldData[i].key === val.key) {
                let values = [];
                for (let j=0; j<val.value.length; j++) {
                    values.push({"key": val.value[j].key, "title":val.value[j].title});
                }
                selectedFieldData[i].selectedValues = values;
                break;
            }
        }


        d3.select("#chart").select("svg").selectAll("path").style("opacity", 0.2);
        d3.select("#chart").select("svg").selectAll("path").filter(function (node) {

            function isContain(selectedField, index , type , name){

                let field = selectedField[index];

                let key = field.key;

                let result = false;
                if(type && key == type) {
                    let value = field.value;
                    for (let i = 0; i < value.length; i++) {

                        if(value[i] == name){
                            result = true;
                            break;
                        }
                    }
                }else {
                    result = false;
                }


                return result;
            }

            let target = node;
            let result = false;
            let array = new Array();

            //node depth
            let depth = 0;

            while(target){
                array.push(target);
                target = target.parent;
            }


            if(array.length-1 <= selectedField.length){
                let count = 0;
                let data = array.pop();
                while (data){
                    if(!data.parent){
                        result = false;
                    }else if(data.parent && isContain(selectedField , count - 1 , data.parent.type , data.name)){
                        result = true;

                    }else{

                        result = false;
                        break;
                    }
                    count ++;
                    data = array.pop();
                }

            }else{
                result = false;
            }

            if(node && node.parent)
                console.log("selectOption type", node.parent.type);
            if(name && node.name)
                console.log("selectOption name", node.name);
            return result;
        }).style("opacity", 1);
        this.setState({"selectedFieldQuery": update(this.state.selectedFieldQuery,{$set: selectedField}),
            "selectedFieldData": update(this.state.selectedFieldData,{$set: selectedFieldData})});
        
    }

    deleteCondition(fieldId) {
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
            loadingBar = <ActivityIndicator className="indicator" borderRadius="80%" number={3} duration={300} activeColor="#ffffff" borderWidth={3}/>;
        } else {
            loadingBar="";
        }


        return(
            <div>
                {sunburstChart}
                {loadingBar}
                <div className="fieldArea">
                    <div className="fieldList">
                        <div className="conditionSelectButton">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            <IconMenu
                                iconButtonElement={<IconButton><Eject /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                >
                                {fieldList.map((value, i)=>{
                                    return(<MenuItem key={i} primaryText={value.name} value={value.id} onClick={this.selectField.bind(this, value)}/>);
                                })}
                            </IconMenu>
                        </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="filterArea">
                        {this.state.selectedFieldData.map((value, i)=>{
                            return (<SelectCondition key={i} fieldData={value} title={value.title} fieldId={value.key} option={value.fieldList} selectOption={this.selectOption.bind(this)} deleteCondition={this.deleteCondition.bind(this)} />);
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default SunburstCondition;