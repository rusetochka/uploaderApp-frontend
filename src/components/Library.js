import React from 'react';
import { File } from './File';
import { FileUpload } from './FileUpload';

export class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: "",
        };
        this.loadFiles = this.loadFiles.bind(this);
    }

    loadFiles() {
        fetch("http://localhost:9000/testAPI/uploads")
            .then(res => res.json())
            .then(data => this.setState({files: data.documents}))

    }

    componentDidMount() {
        this.loadFiles();
    }

    componentDidUpdate() {

    }

    render() {
        if (this.state.files !== "") {
            return (<div className='ck pt-3'>
                <h2>Your Documents Library</h2>
                <div className='border border-secondary d-flex flex-wrap'>
                    {this.state.files.map(file => {
                        return <File name={file.filename} 
                                     type={file.extention} 
                                     key={file._id} 
                                     id={file._id}
                                     date={file.dateOfUpload}
                                     size={file.size}/>
                    })}
                </div>
                
                <FileUpload files={this.state.files}/>
            </div>)
        } else {
            return (
                <div className='bck pt-3'>
                    <h2>Your Documents Library</h2>
                    <p>Here will be your files</p>
                    <FileUpload />
                </div>
            )
        }

    }
  
}