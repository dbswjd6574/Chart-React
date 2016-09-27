import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TypeList from './condition/TypeList.js';

class Condition extends React.Component {
    render() {

        let buttonArray1 = [{name: 'macaddress', type: 'string'},{name: 'date', type: 'number'},{name: 'id', type:'string'},{name: 'id', type:'string'},
            {name: 'cell_id', type:'string'},{name: 'smartCartId', type:'string'},{name: 'host_id', type:'string'},{name: 'contract_id', type:'string'},{name: 'update_time', type:'date'},
            {name: 'is_active', type:'boolean'},{name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'},
            {name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'},
            {name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'},
            {name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'},
            {name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'}];

        let buttonArray2 = [{name: 'macaddress', type: 'string'},{name: 'date', type: 'number'},{name: 'id', type:'string'},{name: 'id', type:'string'},
            {name: 'cell_id', type:'string'},{name: 'smartCartId', type:'string'},{name: 'host_id', type:'string'},{name: 'contract_id', type:'string'},{name: 'update_time', type:'date'},
            {name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'},
            {name: 'customer_id', type:'string'},{name: 'component_cell_id', type:'string'},{name: 'serial_number', type:'string'},{name: 'adult_pincode', type:'number'}];

        return(
                <div className="typeList">
                    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                        <TypeList arr={buttonArray1}/>
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <TypeList arr={buttonArray2}/>
                    </MuiThemeProvider>
                </div>
        );
    }
}

export default Condition;