import React from 'react';
import SunburstCondition from './SunburstCondition';
import Select from 'react-select';
import update from 'react-addons-update';
import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import { dataRequest } from 'actions/ResultChart';

class DataNavigation extends React.Component{

    constructor(props){
        super(props);
        this.selectChange=this.selectChange.bind(this);
        this.state = {
            datasetList: [],
            chartOptions: [],
            selectedValues : "",
            selectedData: null
        }
    }

    componentDidMount() {
        //TODO /DataSet
        return this.props.dataRequest().then(
            () => {
                console.info('handleLogin', this.props.datasetList);
                let chartOption = [];
                $.each(this.props.datasetList, (key, value)=>{
                    chartOption.push({value:value._id, label: value.title});
                });
                console.log(chartOption);
                this.setState({datasetList: this.props.datasetList, chartOptions: chartOption});
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

            this.setState({selectedValues : value, selectedData: selectedFieldList});


        }
    }

    render(){

        return(
            <div>
                <div className="logListSelector">
                    <Select name="LogList"
                            options={this.state.chartOptions}
                            onChange={this.selectChange}
                            value={this.state.selectedValues}/>
                </div>
                <SunburstCondition selectedData={this.state.selectedData}/>
            </div>
        );
    }
}


const mapStateToProps = (props) => {
    console.log('mapStateToProps', props);
    return {
        datasetList: props.dataset.datasetList
    };

};

const mapDispatchToProps = (dispatch) => {
    return {
        dataRequest: () => {
            return dispatch(dataRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataNavigation);