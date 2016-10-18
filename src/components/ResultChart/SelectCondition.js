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

class SelectCondition extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedValues : [],
            lastSelectedValue: ""
        }
    }
    selectField(value){
        console.log("selectedField: " + value);

        console.log(this.state.selectedValues);
        let fieldList = this.state.selectedValues;
        fieldList.push(value);
        this.setState({selectedValues: fieldList, lastSelectedValue: value});
    }

    handleRequestDelete(key){
        this.selectedValues = this.state.selectedValues;
        const chipToDelete = this.selectedValues.map((chip) => chip.key).indexOf(key);
        this.selectedValues.splice(chipToDelete, 1);
        this.setState({selectedValues: this.selectedValues});
    };

    render(){

        let selectStyle = {
            width : "200px",
            padding : "20px",
            float: "left"
        };

        const chipStyles = {
            chip: {
                width: 80,
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
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <DropDownMenu value={this.state.lastSelectedValue} onChange={this.handleChange}>
                        {fieldList.map((value, i)=>{
                            return (<MenuItem key={i} primaryText={value} onClick={this.selectField.bind(this, value)}/>);
                        })}
                    </DropDownMenu>
                </MuiThemeProvider>
                        {this.state.selectedValues.map((value, i)=>{
                            return (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                                <Chip key={i} style={chipStyles.chip} labelStyle={chipStyles.label} onRequestDelete={this.handleRequestDelete.bind(this,value)}>{value}</Chip>
                            </MuiThemeProvider>);
                        })}

            </div>

        );
    }
}

export default SelectCondition;