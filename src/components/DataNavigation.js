import React from 'react';
import SunburstCondition from './SunburstCondition';
import Select from 'react-select';
import update from 'react-addons-update';
import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import { datasetListRequest, logDataRequest, fieldListRequest } from 'actions/ResultChart';

class DataNavigation extends React.Component{

    constructor(props){
        super(props);
        this.selectChange=this.selectChange.bind(this);
        this.state = {
            datasetList: [],
            logList: [],
            selectedValues : "",
            conditions: null,
            logData: null,
            selectedFieldList: null
        }
    }

    componentDidMount() {
        //TODO /DataSet
        this.props.datasetListRequest().then(
            () => {
                let logList = [];
                $.each(this.props.datasetList, (key, value)=>{
                    logList.push({value:value._id, label: value.title});
                });
                this.setState({datasetList: this.props.datasetList, logList: logList});
            }
        );
    }

    selectChange(value){
        if (this.state.selectedValues !== value) {
            let selectedFieldList;

            for (let i = 0; i < this.state.datasetList.length; i++) {
                if(this.state.datasetList[i]._id === value) {
                    selectedFieldList = this.state.datasetList[i];
                    break;
                }
            }

            //TODO /DataSet/id:GET


            this.setState({selectedValues : value, conditions: selectedFieldList});


        }
    }

    requestFieldList(field) {
        return this.props.fieldListRequest(this.state.conditions._id, this.state.conditions.tables, field.id).then(
            () => {
                console.log('dataResult', this.props.fieldList);
                console.log("selectedField: " + value);
                console.log(this.state.selectedField);
                let selectedFieldList = this.state.selectedFieldList;
                if (selectedFieldList == null) {
                    selectedFieldList = {id: field.id, name: field.name, fields: this.props.fieldList}
                } else {
                    selectedFieldList.push({id: field.id, name: field.name, fields: this.props.fieldList});
                }
                this.setState({selectedFieldList: selectedFieldList})
            }
        );
    }

    render(){

        return(
            <div className="leftArea">
                <div className="logListSelector">
                    <Select name="LogList"
                            options={this.state.logList}
                            onChange={this.selectChange}
                            value={this.state.selectedValues}/>
                </div>
                <SunburstCondition selectedData={this.state.conditions} selectedFieldList={this.state.selectedFieldList} getFieldList={this.requestFieldList.bind(this)}/>
            </div>
        );
    }
}


const mapStateToProps = (props) => {
    console.log('mapStateToProps', props);
    return {
        datasetList: props.dataset.datasetList,
        logData: props.dataset.logData,
        fieldList: props.dataset.fieldList
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
        fieldListRequest: (id, table, fieldId) => {
            return dispatch(fieldListRequest(id, table, fieldId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataNavigation);