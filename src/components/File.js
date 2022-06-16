import React from 'react';
import pdfI from '../imgs/pdf.svg';
import imageIcon from '../imgs/image.svg';
import docI from '../imgs/doc.svg';
import docxI from '../imgs/docx.svg';
import xlsI from '../imgs/xls.svg';
import xlsxI from '../imgs/xlsx.svg';
import txtI from '../imgs/txt.svg';
import notypeI from '../imgs/notype.svg';

export class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            sharing: false,
            downloads: ''
        };
        this.docIconChoosing = this.docIconChoosing.bind(this);
        this.renameFile = this.renameFile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.sharingScreenToggle = this.sharingScreenToggle.bind(this);
        this.floorTheSize = this.floorTheSize.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
    }

    docIconChoosing(type) {
        switch (type.toLowerCase()) {
            case 'pdf':
                return pdfI;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return imageIcon;
            case 'doc':
                return docI;
            case 'docx':
                return docxI;
            case 'xls':
                return xlsI;
            case 'xlsx':
                return xlsxI;
            case 'txt':
                return txtI;
            default:
                return notypeI;
        }
    }
    renameFile(e) {
        if (this.state.edit === true) {
            this.setState({ edit: false });
        } else {
            this.setState({ edit: true });
            const currentFileName = document.getElementById(e.target.id);
            currentFileName.setAttribute("contenteditable", true);
            document.addEventListener('click', (event) => {
                const target = event.target;
                if (target.id !== currentFileName.id) {
                    currentFileName.setAttribute("contenteditable", false);
                }
            });
        }

    }

    downloadFile(e) {
        const filename = e.target.parentElement.getAttribute("name");
        const extention = e.target.parentElement.getAttribute("ext");
        fetch(`http://localhost:9000/testAPI/uploads/${filename}/${extention}`)
            .then(res => {
                let link = document.createElement('a');
                link.href = `http://localhost:9000/testAPI/uploads/${filename}/${extention}`;
                link.target = "_blank";
                link.click();
                if (this.state.downloads !== "") {
                    let downloads = this.state.downloads[filename];
                    this.setState(prev => ({
                        ...prev,
                        downloads: {
                            ...prev.downloads,
                            [filename]: downloads + 1
                        }
                    }))
                } else {
                    this.setState(prev => ({
                        ...prev,
                        downloads: {
                            [filename]: 1
                        }
                    }))
                }

            })
    }
    sharingScreenToggle() {
        if (this.state.sharing === false) {
            this.setState({ sharing: true })
        } else {
            this.setState({ sharing: false })
        }
    }
    floorTheSize(kb) {
        let mb;
        if(kb >= 1024) {
            mb = Math.floor(kb/1024);
        } else {
            return `${kb} KB`;
        }
        
        if(mb >= 1024) {
            let gb = Math.floor(mb/1024);
            return `${gb} GB`
        } else {
            return `${mb} MB`;
        }
        
    }

    formatDate(d) {
        const utc = new Date(d).toUTCString()
        return utc.toLocaleString();
    }
    deleteDocument(e) {
        const id = e.target.parentElement.getAttribute("id");
        fetch(`http://localhost:9000/testAPI/uploads/${id}`, {
            method: 'DELETE'
        });

    }


    render() {
        const type = this.props.type;
        const name = this.props.name;
        const actionForDelete = `http://localhost:9000/testAPI/uploads/${this.props.id}?_method=DELETE`;

        return (<div className='border border-dark rounded m-1 p-1 d-flex flex-column align-items-center justify-content-center'>
            <img className="doc-icon mt-2" src={this.docIconChoosing(type)} alt="pdf-type-icon" />

            <p id={this.props.id} name={this.props.name} onDoubleClick={this.renameFile}>{this.props.name}
                
                <button className='d-block mx-auto mt-1' onClick={this.downloadFile}>Download</button>
                <button className='d-block mx-auto mt-1' onClick={this.sharingScreenToggle}>Share</button>     
            </p><br />
            <form method='POST' action={actionForDelete}>
                <input type="hidden" name="_method" value="DELETE" />
                <button className='d-block mx-auto mt-1 btn btn-danger'>Delete</button>
                </form>
            <p>Dowloaded: {this.state.downloads[name] || 0} time(s)</p>
            <p>Size: {this.floorTheSize(this.props.size)}</p>
            <p>Uploaded: {this.formatDate(this.props.date)}</p>

            <div className={this.state.sharing ? "position-absolute top-50 start-50 translate-middle bg-light w-50 h-50 d-flex justify-content-center align-items-center flex-column" : "d-none"} id='sharing-screen'>
                <h2 className='h1 mx-3'>Share this document via link below</h2>
                <input type="url" className='w-75 h1' value='' readOnly></input>
                <button className='btn btn-dark' onClick={this.sharingScreenToggle}>Done</button>
            </div>
        </div>)
    }
}