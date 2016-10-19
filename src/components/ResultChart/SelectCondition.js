/**
 * Created by 윤정 on 2016-10-17.
 */
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import update from 'react-addons-update';
import Chip from 'material-ui/Chip';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

class SelectCondition extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value : []
        }
    }
    selectField(value){
        console.log("selectedField: " + value.title);

        console.log(this.state.value);
        let selectedFieldList = this.state.value;
        selectedFieldList.push(value);
        this.props.selectOption({"value": selectedFieldList, "key": this.props.fieldId});
        this.setState({value: selectedFieldList});
    }

    handleRequestDelete(key){
        let value = this.state.value;
        const chipToDelete = value.map((chip) => chip.key).indexOf(key);
        value.splice(chipToDelete, 1);
        this.props.selectOption({"value": value, "key": this.props.fieldId});
        this.setState({"value": value});
    };

    render(){

        let selectStyle = {
            width : "200px",
            float: "left",
            color: "white"
        };

        const chipStyles = {
            chip: {
                margin: 4,
                cursor: 'pointer'
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            label: {
                fontSize: '9px'
            }
        };

        let fieldList = this.props.option;

        return(
            <div style={selectStyle}>
                {this.props.title}
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <DropDownMenu value="" onChange={this.handleChange}>
                        {fieldList.map((value, i)=>{
                            return (<MenuItem key={i} primaryText={value.title} onClick={this.selectField.bind(this, value)}/>);
                        })}
                    </DropDownMenu>
                </MuiThemeProvider>
                        {this.state.value.map((value, i)=>{
                            return (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                                <Chip key={i} style={chipStyles.chip} labelStyle={chipStyles.label} onRequestDelete={this.handleRequestDelete.bind(this,value)}>{value.title}</Chip>
                            </MuiThemeProvider>);
                        })}

            </div>

        );
    }
}

export default SelectCondition;