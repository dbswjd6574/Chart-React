import React from 'react';
import {ChartTables} from 'components';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class ChartGallery extends React.Component {

    render() {
        return(
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <ChartTables />
            </MuiThemeProvider>
        );
    }
}

export default ChartGallery;