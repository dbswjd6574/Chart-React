import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const jumbotronInstance = (
    <Jumbotron>
        <h1>제목</h1>
        <p>설명</p>
    </Jumbotron>
);

class Home extends React.Component {

    render() {
        return (
            <div>

                <MuiThemeProvider>
                    <RaisedButton label='BUTTON'/>
                </MuiThemeProvider>

            </div>

        );
    }
}

export default Home;