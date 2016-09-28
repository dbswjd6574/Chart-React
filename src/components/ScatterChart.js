import React from 'react';

class ScatterChart extends React.Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        zingchart.render({
            id: this.props.id,
            width: (this.props.width || 600),
            height: (this.props.height || 400),
            data:this.props.data
        });
    }
    render(){
        return(
            <div id={this.props.id} ></div>
        );
    }
}

export default ScatterChart;