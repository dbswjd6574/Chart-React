import React from 'react';
import { SunburstChart, SunburstRight, DataNavigation } from 'components';
import {  } from 'components';
import ResultChartView from './ResultChartView';

class Sunburst extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <br/>
                    <DataNavigation/>
                </div>
                <div>
                    <ResultChartView/>
                </div>
            </div>
        );
    }
}

export default Sunburst;