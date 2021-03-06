/**
 * Created by 윤정 on 2016-10-17.
 */
import React from 'react';
import update from 'react-addons-update';
import Chip from 'material-ui/Chip';

import MuiThemeProvider from '../../../node_modules/material-ui/styles/MuiThemeProvider';
import darkBaseTheme from '../../../node_modules/material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from '../../../node_modules/material-ui/styles/getMuiTheme';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import IconButton from '../../../node_modules/material-ui/IconButton/IconButton';
import Clear from '../../../node_modules/material-ui/svg-icons/content/clear';

class SelectCondition extends React.Component{
    constructor(props){
        super(props);
    }
    selectField(value){
        let selectedFieldList = this.props.fieldData.selectedValues;

        if (selectedFieldList && selectedFieldList.length > 0) {
            for (let i = 0; i < selectedFieldList.length; i++) {
                if (selectedFieldList[i].key == value.key) {
                    console.log('do not click twice');
                    return;
                }
            }
        }

        selectedFieldList.push(value);
        this.props.selectOption({"value": selectedFieldList, "key": this.props.fieldId});
    }

    handleRequestDelete(key){
        let value = this.props.fieldData.selectedValues;
        const chipToDelete = value.map((chip) => chip.key).indexOf(key);
        value.splice(chipToDelete, 1);
        this.props.selectOption({"value": value, "key": this.props.fieldId});
    };

    removeCondition(fieldId) {
        this.props.deleteCondition(fieldId)
    }

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

        const styles = {
            smallIcon: {
                width: 12,
                height: 12
            },
            small: {
                width: 36,
                height: 36,
                padding: 4
            }
        };

        let fieldList = this.props.option;

        let selectedValues = [];
        if (this.props.fieldData.selectedValues)

        return(
            <div style={selectStyle}>
                <MuiThemeProvider key={this.props.fieldData.key} muiTheme={getMuiTheme(darkBaseTheme)}>
                    <IconButton onClick={this.removeCondition.bind(this, this.props.fieldData.key)} iconStyle={styles.smallIcon}
                                style={styles.small}><Clear /></IconButton>
                </MuiThemeProvider>
                {this.props.title}
                <MuiThemeProvider key={this.props.title} muiTheme={getMuiTheme(darkBaseTheme)}>
                    <DropDownMenu value="" onChange={this.handleChange}>
                        {fieldList.map((value, i)=>{
                            return (<MenuItem key={value.title} primaryText={value.title} onClick={this.selectField.bind(this, value)}/>);
                        })}
                    </DropDownMenu>
                </MuiThemeProvider>
                        {this.props.fieldData.selectedValues.map((value, i)=>{
                            return (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                                <Chip key={value.key} style={chipStyles.chip} labelStyle={chipStyles.label} onRequestDelete={this.handleRequestDelete.bind(this,value.key)}>{value.title}</Chip>
                            </MuiThemeProvider>);
                        })}
            </div>

        );
    }
}

export default SelectCondition;