/**
 * Created by 윤정 on 2016-10-14.
 */
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import update from 'react-addons-update';

class SelectKey extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            val:[]
        }
    }

    handleChange(val){
        console.log(val);
        let list = val.split(",");
        this.props.changeState(list);
        this.setState({val: list});
    }

    render(){
        let options = [];
        let menuItems = this.props.menuItem;

        for (let i = 0; i < menuItems.length; i++) {
            options.push({"value": menuItems[i], "label": menuItems[i]});
        }

        return(
            <Select multi simpleValue name={this.props.name} placeholder={this.props.placeholder} value={this.state.val} options={options} onChange={this.handleChange}/>
        );
    }
}

export default SelectKey;