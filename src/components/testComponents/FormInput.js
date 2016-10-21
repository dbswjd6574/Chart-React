import React from 'react';
import { Panel, Button, FormGroup, FormControl, ControlLabel, Col, Form } from 'react-bootstrap';


class FormInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ""};
    }

    handleChange(e) {
        let nextState = {};
        nextState['value'] = e.target.value;
        this.setState(nextState);
    }

    render() {

        let input = [];
        if (this.props.data.type == 'text') {
            input.push(<FormControl type="text" name={this.props.data.name} placeholder={this.props.data.type} value={this.state.value} onChange={this.handleChange.bind(this)}/>);
        } else if (this.props.data.type == 'select') {
            let values = [];
            for (var i = 0; i < this.props.data.values.length; i ++) {
                values.push(<option key={i} value={this.props.data.values[i]}>{this.props.data.values[i]}</option>)
            }
            input.push(<FormControl componentClass="select" name={this.props.data.name} value={this.state.value} onChange={this.handleChange.bind(this)}>
                {values}
            </FormControl>);
        }

        return(
            <div>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        <h6>{this.props.data.name}</h6>
                    </Col>
                    <Col sm={5}>
                        {input}
                    </Col>
                    <Col sm={2}>
                        <Button bsStyle="primary">ADD</Button>
                    </Col>
                </FormGroup>
            </div>
        )
    }

}

export default FormInput;