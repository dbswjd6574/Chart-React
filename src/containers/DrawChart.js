import React from 'react';
import { XAxisPanel, YAxisPanel, Chart } from 'components';
import {Grid, Row, Col, Well, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { dataRequest } from 'actions/authentication';

class DrawChart extends React.Component {

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
                                <Chart data={11}/>
                            </Well>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default DrawChart;
