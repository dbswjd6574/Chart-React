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

class SunburstCondition extends React.Component{
    constructor(props){
        super(props);
        this.selectChange=this.selectChange.bind(this);
        this.switchToMulti=this.switchToMulti.bind(this);
        this.state = {
            selectedValues : "",
            check : false,
            selectedField: [],
            sunburstChartData : null

        }
    }
    componentDidMount(){
        this.props.requestSunburstData().then(
            ()=>{
                //console.log("requestData ", this.props.sunburstData.data);
                let data = this.props.sunburstData.data;
                this.setState({sunburstChartData: update(this.state.sunburstChartData, {$set : data})});
            }
        );
    }
    switchToMulti(event){


    }
    selectChange(value){
        //let newArray =  update(this.state.selectedValues,{$push: [value]});
        //this.setState({selectedValues : newArray});
        this.setState({selectedValues : value});
    }
    selectField(value){
        console.log("selectedField: " + value);
        console.log(this.state.selectedField);
        let fieldList = this.state.selectedField;
        fieldList.push(value);

        //TODO request data for selectedField

        this.setState({selectedField: fieldList});
    }
    render(){
        let selectStyle = {
            width : "200px",
            padding : "20px",
            float: "left"
        };
        let divStyle = {
            width : "45%",
            backgroundColor : "#2E2E2E",
            height : "150px",
            marginTop :"30px",
            marginLeft: "10px",
            position : "absolute",
            top : "750px"
        };

        let menuItems = [];
        if (this.props.selectedData && this.props.selectedData != '') {
            this.props.selectedData.fields.map((value, i)=>{
                menuItems.push(<MenuItem key={i} primaryText={value.name} onClick={this.selectField.bind(this, value.name)}/>);
            })
        }

        let selectOption = ["강남", "경동", "경남"];
        let sunburstChart;
        if(this.state.sunburstChartData){
            sunburstChart = <SunburstChart selectedValue={this.state.selectedValues} sunburstChartData={this.state.sunburstChartData}/>
        } else {
            sunburstChart = ""
        }
        return(
            <div className="leftArea">
                {sunburstChart}
                <div style={divStyle}>
                    <div className="fieldList">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                >
                                {menuItems}
                            </IconMenu>
                        </MuiThemeProvider>
                    </div>
                    {this.state.selectedField.map((value, i)=>{
                        return (<SelectCondition key={i} option={selectOption}/>);
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    //console.log("mapStateToProps", props);
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