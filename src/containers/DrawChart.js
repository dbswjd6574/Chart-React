import React from 'react';
import { XAxisPanel, YAxisPanel } from 'components';
import {Grid, Row, Col, Well, Button} from 'react-bootstrap';

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
                                <YAxisPanel mode={false}/>
                                <XAxisPanel mode={false}/>
                                <Button bsStyle="primary">Draw</Button>
                            </Well>
                        </Col>
                        <Col sm={12} md={8}>
                            <Well bsSize="large">Chart</Well>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default DrawChart;