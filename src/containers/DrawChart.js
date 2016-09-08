import React from 'react';
import { XAxisPanel, YAxisPanel, Chart } from 'components';
import {Grid, Row, Col, Well, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { dataRequest } from 'actions/authentication';

class DrawChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {ChartData:""};
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        return this.props.dataRequest().then(
            (success) => {
                console.info('handleLogin', success);
                //this.setState(state)
                if(success) {
                    browserHistory.push('/');
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
                <Grid>
                    <Row className="show-grid">
                        <Col sm={6} md={4}>
                            <Well bsSize="sm">
                                <YAxisPanel mode={false}/>
                                <XAxisPanel mode={false}/>
                                <Button bsStyle="primary" onClick={this.handleLogin}>Draw</Button>
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


const mapStateToProps = (state) => {
    console.info('mapStateToProps');
    return {
        chartData: state.chartData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dataRequest: () => {
            return dispatch(dataRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawChart);
