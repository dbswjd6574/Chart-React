import React from 'react';
import { SunburstChart, SunburstRight, DataNavigation } from 'components';
import {  } from 'components';
import ResultChartView from './ResultChartView';

class Sunburst extends React.Component{
    render(){
        return(
            <div>
                <div className="leftZone">
                    <DataNavigation/>
                </div>
                <div className="rightZone">
                    <ResultChartView/>
                </div>
            </div>
        );
    }
}

export default Sunburst;