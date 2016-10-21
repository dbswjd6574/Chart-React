import React from 'react';
import Date from 'react-datepicker';
import moment from 'moment'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

class DatePicker extends React.Component{

    constructor(props){
        super(props);
        this.state={
            startDate:moment(),
        };
        this.onDateChangeStart=this.onDateChangeStart.bind(this);
    }

    onDateChangeStart(date){
        this.setState({
            startDate:date
        });
    }


    render(){
        return (
            <div>
                <Date selected={this.state.startDate} onChange={this.onDateChangeStart} dateFormat="YYYY/MM/DD" todayButton={'Today'} isClearable={true} placeholderText="click to select"/>
            </div>
        );
    }
}


export default DatePicker;
