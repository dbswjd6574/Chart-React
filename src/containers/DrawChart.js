import React from 'react';
import { XAxisPanel, YAxisPanel, Chart } from 'components';
import {Grid, Row, Col, Well, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { dataRequest } from 'actions/authentication';

class DrawChart extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={6} md={4}>
                            <Well bsSize="sm">
                                <YAxisPanel />
                                <XAxisPanel />
                            </Well>
                        </Col>
                        <Col sm={12} md={8}>
                            <Well bsSize="large">
                                <Chart />
                            </Well>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


/*const mapStateToProps = (state) => {
    console.info('mapStateToProps', state.authentication);
        return {
            chartData: state.authentication
        };

};

const mapDispatchToProps = (dispatch) => {
    return {
        dataRequest: () => {
            return dispatch(dataRequest());
        }
    };
};*/

export default DrawChart;
