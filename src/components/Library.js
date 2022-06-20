import React from 'react';
import { File } from './File';
import { FileUpload } from './FileUpload';

export class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: "",
            checked: []
        };
        this.loadFiles = this.loadFiles.bind(this);
        this.choosingFiles = this.choosingFiles.bind(this);
        this.updatingChecked = this.updatingChecked.bind(this);
        this.downloadMulti = this.downloadMulti.bind(this);
    }

    loadFiles() {
        fetch("http://localhost:9000/testAPI/uploads")
            .then(res => res.json())
            .then(data => this.setState({files: data.documents}))

    }

    componentDidMount() {
        this.loadFiles();
    }

    choosingFiles(id) {
        this.setState(prev => ({
            ...prev,
            checked: [...prev.checked, id]
        }));
    }

    updatingChecked(id) {
        this.setState(prev => ({
            ...prev,
            checked: prev.checked.filter(element => element !== id)
        }));
        console.log(this.state.checked);
    }

    downloadMulti() {
        console.log(this.state.checked);
        for(let i = 0; i < this.state.checked.length; i++) {
            const id = this.state.checked[i];
            let link = document.createElement('a');
            link.href = `http://localhost:9000/testAPI/uploads/${id}`;
            link.target = "_blank";
            link.click();
        }

        
    }
    render() {
        if (this.state.files !== "") {
            return (<div className='ck pt-3'>
                <h2>Your Documents Library</h2>
               {this.state.checked.length > 0 && <p className="btn btn-success" onClick={this.downloadMulti}>Download File(s)</p>}
                <div className='border border-secondary d-flex flex-wrap'>
                    {this.state.files.map(file => {
                        return <File name={file.filename} 
                                     type={file.extention} 
                                     key={file._id} 
                                     id={file._id}
                                     date={file.dateOfUpload}
                                     size={file.size}
                                     downloaded={file.downloaded} 
                                     checkFile={this.choosingFiles}
                                     uncheckFile={this.updatingChecked}/>
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