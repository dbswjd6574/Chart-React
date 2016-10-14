import React from 'react';
import { SunburstChart, SunburstRight, DataNavigation } from 'components';
import {  } from 'components';

class Sunburst extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <br/>
                    <DataNavigation/>
                </div>
                <div>
                    <SunburstRight/>
                </div>
            </div>
        );
    }
}

export default Sunburst;