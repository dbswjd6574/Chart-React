import React from 'react';
import { File } from 'react-router';
import update from 'react-addons-update';

class Condition extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            fileName : "Unknown",
            headerInfo : [],
            selectedKey : -1
        }
        this._handleChange=this._handleChange.bind(this);
        this._isSelected=this._isSelected.bind(this);
        this._onSelect=this._onSelect.bind(this);
    }

    _onSelect(key){
        if(key == this.state.selectedKey){
            this.setState({selectedKey : -1});
        }

        this.setState({selectedKey : key});
        console.log(key + " is selected!");
    }

    _isSelected(key){
        if(this.state.selectedKey == key){
            return true;
        }else{
            return false;
        }
    }

    _handleChange(event){
        var header = "";
        let f = event.target.files[0];
        let extension = f.name.split('.')[1];
        console.log("extension", extension);
        if(f) {
            let reader = new FileReader();
            if(extension === "csv"){
                reader.onload = (function () {
                    return function (e) {
                        console.log("header", e.target.result.split(/[\r\n|\n]+/)[0]);
                        let titles = e.target.result.split(/[\r\n|\n]+/)[0];
                        let arr = titles.split(',');
                        for (let i=0;i<arr.length;i++){
                            console.log("key", arr[i]);
                            this.setState({
                                headerInfo : update(
                                    this.state.headerInfo,{
                                        $push : [{header : arr[i]}]
                                    }
                                )
                            });
                        }
                    }
                })(f).bind(this);
                reader.readAsText(f);
            } else if(extension === "json"){
                console.log("jsonParsing start!!");
                reader.onload =(()=>{
                    return function(e){
                        let jsonObj = JSON.parse(e.target.result).DATA;
                        console.log(jsonObj);
                        let jsonKeys = [];
                        $.each(jsonObj, (key, value)=>{
                            jsonKeys.push(key);
                        });
                        console.log("jsonResult ::", jsonKeys);
                    }
                })(f).bind(this);
                reader.readAsText(f);
            } else if(extension === "txt"){
                console.log("not yet supported txt extension");
            } else if(extension === "xlsx"){
                console.log("not yet supported xlsx extension");
            } else if(extension === "log"){
                //TODO log
                console.log("not yet supported log extension");
            } else {
                console.log("not supported")
            }
            this.setState({
                fileName :  f.name
            });
        }
    }

    render() {
        return(
            <div>
                <input type='file' onChange={this._handleChange}></input>
                <div>
                    {this.state.fileName}
                </div>
                <ul>
                    {this.state.headerInfo.map((headers, i) =>{
                        return (<HeaderInfo header={headers.header} itemKey={i} onSelect={this._onSelect} isSelected={this._isSelected}/>);
                    })}
                </ul>
            </div>
        );
    }
}

class HeaderInfo extends React.Component{
    constructor(props){
        super(props);
        this.liOnClick = this.liOnClick.bind(this);
    }
    liOnClick(event){
        this.props.onSelect(this.props.itemKey);
    }
    render(){
        let getStyle = isSelect => {
            let style;
            if(!isSelect){
                style = {
                    backgroundColor: "#d9534f",
                    display: "inline",
                    padding: ".2em .6em .3em",
                    fontSize: "75%",
                    color: "#fff",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    verticalAlign: "baseline",
                    borderRadius: ".25em"
                };
            } else {
                style = {
                    backgroundColor: "aqua",
                    display: "inline",
                    padding: ".2em .6em .3em",
                    fontSize: "75%",
                    color: "#fff",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    verticalAlign: "baseline",
                    borderRadius: ".25em"
                };
            }
            return style;
        };
        return(
            <h1><li style={getStyle(this.props.isSelected(this.props.itemKey))} onClick={this.liOnClick} >{this.props.header}</li></h1>
        );
    }
}


export default Condition;