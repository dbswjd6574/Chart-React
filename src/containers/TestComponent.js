import React, {Component}from 'react';
import { Panel, Button, FormGroup, FormControl, ControlLabel, Col, Form } from 'react-bootstrap';
import { TestButtons, RtChart } from 'components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class TestComponent extends Component {
    render() {

        let buttonArray = [{name: '1번', type: 'text'},{name: '2버어어어어언', type: 'select', values: ['하나', '둘', '셋']},{name: '3버넌ㄴ', type:'text'}];

        return(
            <div>

                <MuiThemeProvider>
                    <TestButtons arr={buttonArray}/>
                </MuiThemeProvider>
                <RtChart />

            </div>
        );
    }
}



export default TestComponent;