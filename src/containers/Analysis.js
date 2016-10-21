import React from 'react';
import { AnalysisChartView } from 'components';
import AnalysisTableView from './AnalysisTableView';

class Analysis extends React.Component{
    render(){
        return(
            <div>
                <div className="leftZone">
                    <AnalysisChartView/>
                </div>
                <div className="rightZone">
                    <AnalysisTableView/>
                </div>
            </div>
        );
    }
}

export default Analysis;