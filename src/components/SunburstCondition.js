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

import RaisedButton from 'material-ui/RaisedButton';

import CircularProgress from 'material-ui/CircularProgress';

class SunburstCondition extends React.Component{
    constructor(props){
        super(props);
        this.selectChange=this.selectChange.bind(this);
        this.switchToMulti=this.switchToMulti.bind(this);
        this.state = {
            selectedValues : "",
            check : false,
            selectedField: []
        }
    }
    switchToMulti(event){


    }
    selectChange(value){
        //let newArray =  update(this.state.selectedValues,{$push: [value]});
        //this.setState({selectedValues : newArray});
        this.setState({selectedValues : value});
    }
    selectField(value){
        //TODO request data for selectedField
        let selectedField = this.state.selectedField;
        selectedField.push({"name": value.name});
        this.setState({"selectedField": selectedField});
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

        let fieldList = [];
        if (this.props.selectedData && this.props.selectedData != '') {
            fieldList = this.props.selectedData.fields;
        }

        let selectedFieldList = [];
        if (this.props.selectedFieldList && this.props.selectedFieldList != '') {
            selectedFieldList = this.props.selectedFieldList;
        }

        let selectOption = ["강남", "경동", "경남"];
        return(
            <div>
                <SunburstChart selectedValue={this.state.selectedValues}/>
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
                    {this.state.selectedField.map((value, i)=>{
                        return (<SelectCondition key={i} title={value.name} option={selectOption}/>);
                    })}
                </div>
            </div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <RaisedButton label='RUN!'/>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <CircularProgress size={1} thickness={7} />
                </MuiThemeProvider>

            </div>
        );
    }
}

export default SunburstCondition;