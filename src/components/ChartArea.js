/**
 * Created by 윤정 on 2016-10-06.
 */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChartTables from './ChartTables';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class ChartArea extends React.Component{

    constructor(props) {
        super(props);
        this.state = {open: false};
    }


    handleToggle() {
        this.setState({open: !this.state.open})
    }

    handleClickChart(chartName) {
        this.props.selectChart(chartName);
    }

    render() {

        return (
            <div>

                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <RaisedButton className="chartButton" label='SELECT CHART' onClick={this.handleToggle.bind(this)}/>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Drawer width={310} openSecondary={true} disableSwipeToOpen={true} open={this.state.open} >
                        <RaisedButton className="chartButton" label='X' onClick={this.handleToggle.bind(this)}/>
                        <table id="chartList">
                            <tr>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "GoogleBarChart")} src="./image/googleBarChartImage.png" width="150px" height="150px"/></div></td>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "GoogleLineChart")} src="./image/googleLineChartImage.png" width="150px" height="150px"/></div></td>
                            </tr>
                            <tr>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "GoogleBubbleChart")} src="./image/googleBubbleChartImage.png" width="150px" height="150px"/></div></td>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "GooglePieChart")} src="./image/googlePieChartImage.png" width="150px" height="150px"/></div></td>
                            </tr>
                            <tr>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "GoogleScatterChart")} src="./image/googleScatterChartImage.png" width="150px" height="150px"/></div></td>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "GoogleTableChart")} src="./image/googleTableChartImage.png" width="150px" height="150px"/></div></td>
                            </tr>
                            <tr>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "BarChart")} src="./image/zingBarChart.png" width="150px" height="150px"/></div></td>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "LineChart")} src="./image/zingLineChart.png" width="150px" height="150px"/></div></td>
                            </tr>
                            <tr>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "PieChart")} src="./image/zingPieChart.png" width="150px" height="150px"/></div></td>
                                <td><div id="chartArea"><img onClick={this.handleClickChart.bind(this, "ScatterChart")} src="./image/zingScatterChart.png" width="150px" height="150px"/></div></td>
                            </tr>
                        </table>
                    </Drawer>
                </MuiThemeProvider>

            </div>

        );
    }
}

export default ChartArea;