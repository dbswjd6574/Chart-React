import React from 'react';
import SunburstCondition from './SunburstCondition';
import Select from 'react-select';
import update from 'react-addons-update';
import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import { datasetListRequest, fieldListRequest, statusRequest, queryRequest, totalCountRequest } from 'actions/ResultChart';

class DataNavigation extends React.Component{

    constructor(props){
        super(props);
        this.selectChange=this.selectChange.bind(this);
        this.requestStatus = this.requestStatus.bind(this);
        this.setQueryData = this.setQueryData.bind(this);
        this.requestTotalCount = this.requestTotalCount.bind(this);
        this.state = {
            datasetList: [],
            logList: [],
            selectedValues : "",
            conditions: null,
            sunburstData: {},
            totalCount: "",
            isRequesting: false
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

            this.query = {
                "key": conditionList.key,
                "tables": conditionList.tables,
                "sessionid": (new Date).getTime(),
                "query":[]
            };
            this.props.queryRequest(this.query).then(
                () => {
                    this.setState({"isRequesting": true});
                    this.timer = setInterval(this.requestTotalCount, 500);
                }
            );
        }
    }

    requestTotalCount() {
        this.props.totalCountRequest(this.query).then(
            () => {
                let data = this.props.totalCount;
                if (data && data.jobstate) {
                    console.info('...polling..');
                } else {
                    clearInterval(this.timer);
                    this.setState({"isRequesting": false, "totalCount": data.value});
                }
            }
        );
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
                this.setState({"isRequesting": true});
                this.timer = setInterval(this.requestStatus, 500);
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
            console.info('...polling..');
        } else {
            console.log('data success???', data);
            clearInterval(this.timer);
            this.setState({"isRequesting": false, "sunburstData": data});
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
                <SunburstCondition isRequesting={this.state.isRequesting}
                                   totalCount={this.state.totalCount}
                                   sunburstChartData={this.state.sunburstData}
                                   conditionList={this.state.conditions}
                                   requestQueryData={this.requestData.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        datasetList: props.dataset.datasetList,
        fieldList: props.dataset.fieldList,
        sessionid: props.dataset.sessionid,
        queryData: props.dataset.queryData,
        totalCount: props.dataset.totalCount
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        datasetListRequest: () => {
            return dispatch(datasetListRequest());
        },
        fieldListRequest: (query) => {
            return dispatch(fieldListRequest(query));
        },
        statusRequest: (query) => {
            return dispatch(statusRequest(query));
        },
        queryRequest: (query) => {
            return dispatch(queryRequest(query));
        },
        totalCountRequest: (query) => {
            return dispatch(totalCountRequest(query));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataNavigation);