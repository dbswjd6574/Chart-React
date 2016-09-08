import React from 'react';
import { Panel, ListGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class YAxisPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const title = (
            <h3>Y A-xis</h3>
        );

        const aggregations = (
            <FormGroup controlId="formControlsSelect">
                <ControlLabel><h6>Aggregation</h6></ControlLabel>
                <FormControl componentClass="select" placeholder="111">
                    <option value="111">111</option>
                    <option value="222">222</option>
                    <option value="333">333</option>
                </FormControl>
            </FormGroup>
        );

        const field = (
            <FormGroup controlId="formControlsSelect">
                <ControlLabel><h6>Field</h6></ControlLabel>
                <FormControl componentClass="select" placeholder="111">
                    <option value="111">111</option>
                    <option value="222">222</option>
                    <option value="333">333</option>
                </FormControl>
            </FormGroup>
        );

        const group = (
            <ListGroup componentClass="ul">
                <li className="list-group-item">{aggregations}</li>
                <li className="list-group-item">{field}</li>
            </ListGroup>
        );

        const panelInstance = (
            <Panel header={title} bsStyle="success">
                {group}
            </Panel>
        );

        return (
            <div>
                {panelInstance}
            </div>
        );
    }
}

YAxisPanel.propTypes = {
    mode: React.PropTypes.bool
};

YAxisPanel.defaultProps = {
    mode: true
};

export default YAxisPanel;