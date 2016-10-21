import React from 'react';
import { DataGrid, DropZone } from 'components'

class Data extends React.Component{
    render(){
        let style={
            width:"100px",
            height:"400px",
            float:"top",
            backgroundColor:"#DCDAD9"
        };
        return(
            <div>
                <div>
                    <DropZone style={style}/>
                    <DropZone style={style}/>
                </div>
                <div>
                    <DataGrid/>
                </div>
            </div>
        );
    }
}

export default Data;