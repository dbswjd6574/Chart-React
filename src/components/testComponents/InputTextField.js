import React from 'react';
import TextField from 'material-ui/TextField';

class InputTextField extends React.Component {

    render() {

        return (
            <div className="textField">
                <TextField
                    id="rawData"
                    multiLine={true}
                    fullWidth={true}
                    rows={10}/>
            </div>
        )
    }
}

export default InputTextField;