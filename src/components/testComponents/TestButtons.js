import React from 'react';
import { Panel, Button, FormGroup, FormControl, ControlLabel, Col, Form } from 'react-bootstrap';
import FormInput from './FormInput';
import ReactGridLayout from 'react-grid-layout';
import MuiThemeProvider from '../../../node_modules/material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

class TestButtons extends React.Component {

    constructor(props) {
        super(props);
        this.state = { inputs: undefined };
    }

    render() {
        let container =[];
        let array = this.props.arr; //can be anything array, object

        array.forEach((val,index)=>{
            container.push(<RaisedButton key={index} label={val.name} primary={true} onClick={ () => this.appendInput(val) }/>)
        });

        var layout = [
            {i: 'a', x: 0, y: 0, w: 2, h: 5, static: true},
            {i: 'b', x: 0, y: 5, w: 8, h: 2, minW: 2}
        ];

        return(
            <div>
                <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                    <div key='a'>
                        <Panel  header="Buttons" bsStyle="success">
                                {container}
                        </Panel>
                    </div>
                    <div key='b'>
                        <Panel header="Buttons" bsStyle="success">
                            <Form horizontal>
                                {this.state.inputs === undefined ? <div></div> : this.state.inputs.map((input, i) => <FormInput data={input} key={i}/>)}
                            </Form>
                        </Panel>
                    </div>
                </ReactGridLayout>
            </div>
        );
    }

    appendInput(data) {
        if (this.state.inputs === undefined) {
            this.setState({ inputs: [data]});
        } else {
            this.setState({ inputs: this.state.inputs.concat([data]) });
        }
    }
}

export default TestButtons;