import React from 'react';
import RTChart from 'react-rt-chart';

class RtChart extends React.Component {
    componentDidMount() {
        let timer = setInterval(() => this.forceUpdate(), 1000);
        this.setState({timer: timer});
    }

    render() {
        var data = {
            date: new Date(),
            Car: Math.random(),
            Bus: Math.random()
        };

        return(
            <RTChart
                fields={['Car','Bus']}
                data={data} />
        )
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
}

export default RtChart;