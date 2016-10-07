import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


class LeftDiv extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.handleToggle=this.handleToggle.bind(this);
        this.state = {open : true};
    }
    handleClick(event){
        console.log(event.target);
    }
    handleToggle(item){
        this.setState({open:item.state.open});
    }
    componentDidMount(){
    }
    render(){
        return(
            <Drawer zDepth={5} width={250} open={true}>
                <Subheader>Nested List Items</Subheader>
                <List>
                    {this.props.menuItem.map((menu, i)=>{
                        let list;
                        let children = [];
                        if(menu.hasChild){
                            menu.child.map((child, i)=>{
                                children.push(<ListItem key={i} primaryText={child.name} onClick={this.handleClick}/>);
                            });
                            list = <ListItem open={this.state.open} key={i} onNestedListToggle={this.handleToggle} primaryText={menu.name} nestedItems={children} primaryTogglesNestedList={true}/>
                        } else {
                            list = <ListItem key={i} primaryText={menu.name} onClick={this.handleClick}/>
                        }
                        return list;
                    })}
                </List>
            </Drawer>
        );
    }
}

export default LeftDiv;