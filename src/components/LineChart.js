import React from 'react';


class LineChart extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        zingchart.render({
            id: this.props.id,
            width: (this.props.width || 600),
            height: (this.props.height || 400),
            data: this.props.data,
            theme: "dark"
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        return !(JSON.stringify(nextProps.data) === JSON.stringify(this.props.data)) ;
    }
    componentWillUpdate(nextProps){
        zingchart.exec(this.props.id, 'setdata', {
            data : nextProps.data
        })
    }

    render(){
        return(
            <div id={this.props.id}></div>
        );
    }
}

export default LineChart;