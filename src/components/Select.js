import React from 'react';
import SelectF from 'react-select';
import 'react-select/dist/react-select.css';
import update from 'react-addons-update';

class Select extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            val:[]
        }
    }

    handleChange(val){
        console.log(val);
        this.setState({val});
    }


    render(){
        let options =[
            {value : "one", label:"One", disabled:true},
            {value : "two", label:"Two"},
            {value : "three", label:"Three"}
        ];
        return(
            <SelectF multi simpleValue name="test select" placeholder="choice one or multiple" value={this.state.val} options={options} onChange={this.handleChange}/>
        );
    }
}

export default Select;