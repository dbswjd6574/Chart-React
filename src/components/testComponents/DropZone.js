import React from 'react';
import DropZone from 'react-dropzone-component';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';

class DropZoneComponent extends React.Component{
    constructor(props){
        super(props);
        this.djsConfig={
          addRemoveLinks:true,
          acceptedFiles:"image/jpeg,image/png,image/gif",
          autoProcessQueue:false
        };
        this.componentConfig={
          iconFiletypes:['.jpg', '.png', '.gif'],
          showFiletypeIcon:true,
          postUrl:'no-url'
        };
    }

    handleFileAdded(file){
        console.log(file);
    }

    render(){
        const config= this.componentConfig;
        const djsConfig = this.djsConfig;
        const eventHandlers = {
            addedfile:this.handleFileAdded.bind(this)
        };

        return(
            <DropZone config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
        );
    }
}

export default DropZoneComponent;