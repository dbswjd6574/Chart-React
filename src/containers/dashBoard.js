import React from 'react';
import { TestChart } from 'components';
import { dataRequest } from 'actions/getMongo';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.getMongo = this.getMongo.bind(this);
    }

    getMongo(){
        console.log("test");
        return this.props.dataRequest().then(
            () => {
                console.log(this.props.mongoData.mongoData[0].data);
            }
        );
    }
    render() {
        return (
            <div>
                <TestChart loadedData={this.props.mongoData.mongoData[0]} />
                <Button bsStyle="primary" onClick={this.getMongo}>Load</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);