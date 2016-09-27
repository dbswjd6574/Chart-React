import React from 'react';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';

class TypeList extends React.Component {

    constructor() {
        super();
    }

    handleTouchTap() {

    }

    render() {
        const chipStyles = {
            chip: {
                width: 100,
                margin: 4
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            label: {
                fontSize: '9px'
            }
        };

        const style = {
            width: '90%',
            height: '100%',
            margin: 20,
            padding: 20,
            display: 'inline-block',
            verticalAlign: 'middle'
        };

        let container =[];
        let array = this.props.arr; //can be anything array, object

        array.forEach((val,index)=>{
            container.push(<Chip style={chipStyles.chip} labelStyle={chipStyles.label} key={index}>{val.name}</Chip>)
        });

        return(
                <Paper style={style} zDepth={2}>
                    VOD 구매로그
                    <div style={chipStyles.wrapper}>
                        {container}
                    </div>
                </Paper>
        );


    }
}

export default TypeList;