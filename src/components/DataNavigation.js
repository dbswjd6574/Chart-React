import React from 'react';
import SunburstCondition from './SunburstCondition';
import Select from 'react-select';
import update from 'react-addons-update';
import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import { datasetListRequest, logDataRequest, fieldListRequest, statusRequest, queryRequest } from 'actions/ResultChart';

class DataNavigation extends React.Component{

    constructor(props){
        super(props);
        this.selectChange=this.selectChange.bind(this);
        this.requestStatus = this.requestStatus.bind(this);
        this.setQueryData = this.setQueryData.bind(this);
        this.state = {
            datasetList: [],
            logList: [],
            selectedValues : "",
            conditions: null,
            logData: null,
            sunburstData: {}
        }
    }

    componentDidMount() {
        //TODO /DataSet
        this.props.datasetListRequest().then(
            () => {
                let logList = [];
                $.each(this.props.datasetList, (key, value)=>{
                    logList.push({value:value.key, label: value.title});
                });
                this.setState({datasetList: this.props.datasetList, logList: logList});
            }
        );
    }

    selectChange(value){
        console.log('selectChange', value);
        console.log('datasetList', this.state.datasetList);
        if (this.state.selectedValues !== value) {
            let conditionList;

            for (let i = 0; i < this.state.datasetList.length; i++) {
                if(this.state.datasetList[i].key === value) {
                    conditionList = this.state.datasetList[i];
                    break;
                }
            }
            //TODO /DataSet/id:GET totalcount

            this.setState({selectedValues : value, conditions: conditionList});

        }
    }

    requestData(query) {
        this.query = {
            "key": this.state.conditions.key,
            "tables": this.state.conditions.tables,
            "sessionid": (new Date).getTime(),
            "query":query
        };

        this.props.queryRequest(this.query).then(
            () => {
                this.timer = setInterval(this.requestStatus, 2000);
            }
        );
    }

    requestStatus() {
        this.props.statusRequest(this.query).then(
            () => {
                this.setQueryData(this.props.queryData);
            }
        );
    }

    setQueryData(data) {
        if (data && data.jobstate) {
            console.log('jobstate');
        } else {
            console.log('data success???', data);
            clearInterval(this.timer);
            this.setState({"sunburstData": data});
            //TODO queryRequest의 response data 파싱
        }
    }

    render(){

        return(
            <div className="leftArea">
                <div className="left_title">DATA NAVIGATION</div>
                <div className="logListSelector">
                    <Select name="LogList"
                            options={this.state.logList}
                            onChange={this.selectChange}
                            value={this.state.selectedValues}/>
                </div>
                <SunburstCondition sunburstChartData={this.state.sunburstData} conditionList={this.state.conditions} requestQueryData={this.requestData.bind(this)}/>
            </div>
        );
    }
}


const mapStateToProps = (props) => {
    console.log('mapStateToProps', props);
    return {
        datasetList: props.dataset.datasetList,
        logData: props.dataset.logData,
        fieldList: props.dataset.fieldList,
        sessionid: props.dataset.sessionid,
        queryData: props.dataset.queryData
    };

};

const mapDispatchToProps = (dispatch) => {
    return {
        datasetListRequest: () => {
            return dispatch(datasetListRequest());
        },
        logDataRequest: (id, table) => {
            return dispatch(logDataRequest(id, table));
        },
        fieldListRequest: (query) => {
            return dispatch(fieldListRequest(query));
        },
        statusRequest: (query) => {
            return dispatch(statusRequest(query));
        },
        queryRequest: (query) => {
            return dispatch(queryRequest(query));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataNavigation);