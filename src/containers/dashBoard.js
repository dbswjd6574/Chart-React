import React from 'react';
import { TestChart, FileHandler, DatePicker, Select } from 'components';
import { dataRequest } from 'actions/getMongo';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Dialog from 'react-bootstrap-dialog';


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.getMongo = this.getMongo.bind(this);
        this.showAlert=this.showAlert.bind(this);
    }

    getMongo(){
        //console.log("test");
        return this.props.dataRequest().then(
            () => {
                console.log(this.props.mongoData.mongoData[0].data);
            }
        );
    }
    showAlert(){
        this.refs.dialog.show({
            title:"title",
            body : "Content",
            bsSize:"medium",
            actions:[
                Dialog.CancelAction(),
                Dialog.OKAction()
            ]
        });
    }

    render() {
        return (
            <div>
                <TestChart loadedData={this.props.mongoData.mongoData[0]} />
                <Button bsStyle="primary" onClick={this.getMongo}>Load</Button>
                <Button bsStyle="warning" onClick={this.showAlert}>showAlert</Button>
                <FileHandler/>
                <Select/>
                <Dialog ref='dialog'/>
            </div>
        );
    }
}


const mapStateToProps = (props) => {
    return {
        mongoData: props.mongo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dataRequest: () => {
            return dispatch(dataRequest());
        }
    };
};


DashBoard.defaultProps={
    isDragging:true,
    connectDragSource:()=>{}
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);