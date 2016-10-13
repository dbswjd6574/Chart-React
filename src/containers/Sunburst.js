import React from 'react';
import { SunburstChart, SunburstRight } from 'components';

class Sunburst extends React.Component{
    render(){
        return(
            <div>
                <br/>
                <SunburstChart/>
                <SunburstRight/>
            </div>
        );
    }
}

export default Sunburst;