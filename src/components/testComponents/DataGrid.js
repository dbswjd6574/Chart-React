import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, ButtonGroup } from 'react-bootstrap';

class DataGrid extends React.Component{
    constructor(props){
        super(props);
        this.onRowSelect=this.onRowSelect.bind(this);
        this.state={
            data : [],
            seletedRow : null
        };
        this.handleHostClick=this.handleHostClick.bind(this);
        this.handleDeleteClick=this.handleDeleteClick.bind(this);
    }

    handleHostClick(event){
        console.log('host Clicked!!!');
    }

    handleDeleteClick(event){
        console.log('Delete!!!');

        if(this.state.seletedRow){
            let row = this.state.seletedRow;
            console.log("rowis :: ", row);
        }
    }

    componentDidMount(){
        //$.ajax({
        //    url : "http://localhost:3003",
        //    cache : false,
        //    success:function(data){
        //        this.setState({data: data.DATA});
        //    }.bind(this),
        //    error:function(xhr, status, error){
        //        console.log("error", status, error.toString());
        //    }.bind(this)
        //});
    }

    onRowSelect(row, isSelected){
        console.log(row);
        console.log("selected: " + isSelected);
        if(isSelected){
            this.setState({seletedRow: row})
        }
    }
    render(){
        var products = [{
            no: 1,
            date: "2016-10-02 22:00",
            hostName: "VOD_Service_Log1",
            IpPort : "127.0.0.1:8080",
            description : "VOD 시청 로그1"
        },{
            id: 2,
            date: "2016-10-02 12:00",
            hostName: "VOD_Service_Log2",
            IpPort : "127.0.0.1:8080",
            description : "VOD  시청 로그2"
        },{
            id: 3,
            date: "2016-10-02 12:00",
            hostName: "VOD_Service_Log3",
            IpPort : "127.0.0.1:8080",
            description : "VOD  시청 로그3"
        },{
            id: 4,
            date: "2016-10-02 12:00",
            hostName: "VOD_Service_Log4",
            IpPort : "127.0.0.1:8080",
            description : "VOD  시청 로그4"
        }
        ];

        let selectRow={
            mode : "radio",
            clickToSelect : true,
            bgColor : "rgb(150, 230, 213)",
            onSelect : this.onRowSelect
        };

        let options={
            onDeleteRow:this.handleDeleteClick
        };

        let style={
            width:"90%",
            marginTop:"30px"
        };
        return(
            <div>
                <div>
                    <ButtonGroup style={style}>
                        <Button bsStyle="default">Uploaded File</Button>
                        <Button bsStyle="primary" active onClick={this.handleHostClick}>Linked Host</Button>
                    </ButtonGroup>
                </div>
                <BootstrapTable data={products} striped={true} selectRow={selectRow} deleteRow={true} options={options}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true} >id</TableHeaderColumn>
                    <TableHeaderColumn dataField="date">date</TableHeaderColumn>
                    <TableHeaderColumn dataField="hostName">hostName</TableHeaderColumn>
                    <TableHeaderColumn dataField="IpPort">IP/PORT</TableHeaderColumn>
                    <TableHeaderColumn dataField="description">description</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default DataGrid;