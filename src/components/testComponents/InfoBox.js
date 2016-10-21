import React from 'react';
import darkBaseTheme from '../../../node_modules/material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from '../../../node_modules/material-ui/styles/MuiThemeProvider';
import getMuiTheme from '../../../node_modules/material-ui/styles/getMuiTheme';
import { Paper, Chip, FontIcon } from 'material-ui';


class InfoBox extends React.Component{
    render(){
        let buttonArray1 = [{name: 'macaddress', type: 'string'}];
        let buttonArray2 = [{name: 'macaddress', type: 'string'},{name: 'date', type: 'number'},{name: 'id', type:'string'},{name: 'id', type:'string'},
            {name: 'cell_id', type:'string'},{name: 'smartCartId', type:'string'},{name: 'host_id', type:'string'},{name: 'contract_id', type:'string'},{name: 'update_time', type:'date'},
            {name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'},
            {name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'}];
        return(
            <div className="typeList">
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Paper>
                        <Info name="TEXT1" titles={buttonArray2}>show_chart</Info>
                        <Info name="TEXT2" titles={buttonArray1}>pie_chart</Info>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}

class Info extends React.Component{
    render(){
        const chipStyles = {
            chip: {
                width: 100,
                margin: 4
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            label: {
                fontSize: '9px'
            }
        };
        return(
            <div style={chipStyles.wrapper}>
                <FontIcon className="material-icons">{this.props.children}</FontIcon><span>{this.props.name} | </span> {this.props.titles.map((title, i)=>{return(<Chip style={chipStyles.chip} labelStyle={chipStyles.label}>{title.name}</Chip>);})}
            </div>
        );
    }
}

export default InfoBox;