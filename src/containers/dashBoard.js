import React from 'react';
import { TestChart } from 'components';
import { dataRequest } from 'actions/authentication';
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
                if(this.props.status === "SUCCESS") {
                    return true;
                } else {
                    return false;
                }
            }
        );
    }
    render() {
        return (
            <div>
                <TestChart />
                <Button bsStyle="primary" onClick={this.getMongo}>Load</Button>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
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