import React from 'react';
import SunburstChart from './SunburstChart';
import Select from 'react-select';
import update from 'react-addons-update';
import 'react-select/dist/react-select.css';

class SunburstCondition extends React.Component{
    constructor(props){
        super(props);
        this.selectChange=this.selectChange.bind(this);
        this.switchToMulti=this.switchToMulti.bind(this);
        this.state = {
            selectedValues : "",
            check : false
        }
    }
    switchToMulti(event){


    }
    selectChange(value){
        //let newArray =  update(this.state.selectedValues,{$push: [value]});
        //this.setState({selectedValues : newArray});
        this.setState({selectedValues : value});
    }
    render(){
        let selectStyle = {
            width : "200px",
            padding : "20px"
        };
        let divStyle = {
            width : "800px",
            backgroundColor : "#2E2E2E",
            height : "150px",
            marginTop :"30px",
            position : "absolute",
            top : "700px"
        };
        let selectOption = [{value:"양천", label:"양천"},{value:"경남", label:"경남"},{value:"해운대", label:"해운대"}];
        return(
            <div>
                <SunburstChart selectedValue={this.state.selectedValues}/>
                <div style={divStyle}>
                    <div style={selectStyle}>
                        <Select multi name="지역"
                                options={selectOption}
                                onChange={this.selectChange}
                                value={this.state.selectedValues}/>
                    </div>
                    <div>
                        {this.state.selectedValues.split(',').map((value)=>{
                            return (<div><label><input type='radio' checked={this.state.multi} onChange={this.switchToMulti}/><span>{value}</span></label></div>);
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default SunburstCondition;