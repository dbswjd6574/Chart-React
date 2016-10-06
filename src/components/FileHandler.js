import React from 'react';
import { File } from 'react-router';
import update from 'react-addons-update';
import DashBoardDataGrid from './DashBoardDataGrid';

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
                        let csvFile = e.target.result;
                        let jsonObject = CSV2JSON(csvFile);
                        console.log("converted obj :: ", jsonObject);
                        let titles = csvFile.split(/[\r\n|\n]+/)[0];
                        let titleArray = titles.split(',');
                        for (let i=0;i<titleArray.length;i++){
                            console.log("key", titleArray[i]);
                            this.setState({
                                headerInfo : update(
                                    this.state.headerInfo,{
                                        $push : [{header : titleArray[i]}]
                                    }
                                ),
                                file : jsonObject,
                                dataHeader : titleArray
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
                        let jsonKeys = [];
                        console.log("jsonData :: ", jsonObj);
                        $.each(jsonObj[0], (key, value)=>{
                            jsonKeys.push(key);
                        });
                        for(let i=0;i<jsonKeys.length;i++){
                            //console.log("key", jsonKeys[i]);
                            this.setState({
                                headerInfo : update(
                                    this.state.headerInfo,{
                                        $push : [{header : jsonKeys[i]}]
                                    }
                                ),
                                file:jsonObj,
                                dataHeader:jsonKeys
                            })
                        }
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
        let dataGrid;
        if(this.state.file){
            //console.log("filehandler data :: ", this.state.file);
            //console.log("filehandler head :: ", this.state.dataHeader);
            dataGrid = <DashBoardDataGrid data={this.state.file} dataHeader={this.state.dataHeader} />
        } else {
            dataGrid = "";
        }
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
                <div>
                    {dataGrid}
                </div>
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
                    borderRadius: ".25em",
                    float:"left",
                    margin : "10px"
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
                    borderRadius: ".25em",
                    float:"left",
                    margin : "10px"
                };
            }
            return style;
        };
        return(
            <h1><li style={getStyle(this.props.isSelected(this.props.itemKey))} onClick={this.liOnClick} >{this.props.header}</li></h1>
        );
    }
}


function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
        // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}

function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }
    console.log("jsonStringfy", objArray);
    //var json = JSON.stringify(objArray);
    //var str = json.replace(/},/g, "},\r\n");

    return objArray;
}

export default Condition;