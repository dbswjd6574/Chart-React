import React from 'react';
import { Jumbotron } from 'react-bootstrap';
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
                {jumbotronInstance}
            </div>
        );
    }
}

export default Home;