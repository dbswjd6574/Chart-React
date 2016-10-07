import React from 'react';
import update from 'react-addons-update';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';


class LeftArea extends React.Component{
    constructor(props){
        super(props);
        this._onSelect=this._onSelect.bind(this);
        this._isSelected=this._isSelected.bind(this);
        this.state ={
            selectedKey : []
        }
    }
    componentDidMount(){
        console.log(this.props.menuItem);
    }
    _onSelect(key) {
        let index = $.inArray(key, this.state.selectedKey);
        if (index === -1) {
            this.setState({
                selectedKey: update(
                    this.state.selectedKey,
                    {
                        $push: [key]
                    }
                )
            });
        } else {
            this.setState({
                selectedKey: update(
                    this.state.selectedKey,
                    {
                        $splice: [[index, 1]]
                    }
                )
            });
        }
        this.props.changeState(this.state.selectedKey);
    }

    _isSelected(key){
        let index = $.inArray(key, this.state.selectedKey);
        if(index === -1){
            return false;
        }else{
            return true;
        }
    }
    render(){
        let styles={
            margin : "4px"
        };
        return(
            <Drawer zDepth={5} width={250} open={true}>
                <Subheader>List Items</Subheader>
                <ul>
                {this.props.menuItem.map((item, i)=>{
                    return (<HeaderInfo header={item} itemKey={i} onSelect={this._onSelect} isSelected={this._isSelected}/>)
                })}
                </ul>
            </Drawer>
        );
    }
}


class HeaderInfo extends React.Component{
    constructor(props){
        super(props);
        this.liOnClick = this.liOnClick.bind(this);
    }
    liOnClick(event){
        this.props.onSelect(this.props.header);
    }
    render(){
        let getStyle = isSelect => {
            let style;
            if(!isSelect){
                style = {
                    backgroundColor: "rgb(72, 72, 72)",
                    color: "rgba(255, 255, 255, 0.870588)",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "32px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    whiteSpace: "nowrap",
                    float:"left",
                    margin : "10px",
                    borderRadius: "15px"
                };
            } else {
                style = {
                    backgroundColor: "rgb(72, 72, 72)",
                    color: "rgba(220, 255, 122, 0.870588)",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "32px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    whiteSpace: "nowrap",
                    float:"left",
                    margin : "10px",
                    borderRadius: "15px"
                };
            }
            return style;
        };
        return(
            <h1><li style={getStyle(this.props.isSelected(this.props.header))} onClick={this.liOnClick} >{this.props.header}</li></h1>
        );
    }
}

export default LeftArea;