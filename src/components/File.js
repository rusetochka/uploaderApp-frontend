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
            link: '',
            checked: false
        };
        this.docIconChoosing = this.docIconChoosing.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.sharingScreenToggle = this.sharingScreenToggle.bind(this);
        this.floorTheSize = this.floorTheSize.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
        this.shareFile = this.shareFile.bind(this);
        this.chooseFileToggle = this.chooseFileToggle.bind(this);
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

    downloadFile(e) {
        const id = e.target.parentElement.getAttribute("id");
        let link = document.createElement('a');
        link.href = `http://localhost:9000/testAPI/uploads/${id}`;
        link.target = "_blank";
        link.click();
        console.log('Downloading has started');
        setTimeout(() => {
            this.props.updateFiles();
        }, 1000);
        
    }

    sharingScreenToggle(e) {
        const id = e.target.parentElement.getAttribute("id");
        const timestamp = new Date().getTime();
        if (this.state.sharing === false) {
            this.setState({ sharing: true });
            this.shareFile(id, timestamp);
        } else {
            this.setState({ sharing: false })
        }
    }

    shareFile(id, timestamp) {
        console.log(`the file id ${id} timestamp: ${timestamp}`);
        const generatedLink = `http://localhost:9000/testAPI/uploads/${id}/${timestamp}`;
        this.setState({link: generatedLink});
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

    async deleteDocument(e) {
        const id = e.target.parentElement.getAttribute("id");
        await fetch(`http://localhost:9000/testAPI/uploads/${id}`)
            .then(res => {
                if(res.ok) {
                    console.log('done!');
                }
            });
        return this.props.updateFiles();

    }

    chooseFileToggle(e) {
        if(e.target.checked) {
            this.setState({checked: true});
            this.props.checkFile(this.props.id);
        } else {
            this.setState({checked: false});
            this.props.uncheckFile(this.props.id);
        }
    }

    render() {
        const type = this.props.type;
        const actionForDelete = `http://localhost:9000/testAPI/uploads/${this.props.id}?_method=DELETE`;
        const altText = `${this.props.type} icon`;

        return (<div className='border border-dark rounded m-1 p-1 d-flex flex-column align-items-center justify-content-center'>
            <input className="form-check-input align-self-start" type="checkbox" value="" id="chooseFile" onChange={this.chooseFileToggle}/>
            <img className="doc-icon mt-2" src={this.docIconChoosing(type)} alt={altText} data-testid="4"/>

            <p id={this.props.id} name={this.props.name} data-testid='1'>{this.props.name}
                
                <button className='d-block mx-auto mt-1' onClick={this.downloadFile}>Download</button>
                <button className='d-block mx-auto mt-1' onClick={this.sharingScreenToggle} id="share-btn">Share</button>     
            </p><br />
            <form method='POST' action={actionForDelete}>
                <input type="hidden" name="_method" value="DELETE" />
                <button className='d-block mx-auto mt-1 btn btn-danger' data-testid='3'>Delete</button>
                </form>
            <p data-testid='5'>Downloaded: {this.props.downloaded} time(s)</p>
            <p data-testid='6'>Size: {this.floorTheSize(this.props.size)}</p>
            <p>Uploaded: {this.formatDate(this.props.date)}</p>

            <div className={this.state.sharing ? "position-absolute top-50 start-50 translate-middle bg-light w-50 h-50 d-flex justify-content-center align-items-center flex-column" : "d-none"} id='sharing-screen' data-testid='2'>
                <h2 className='h1 mx-3'>Share this document via link below</h2>
                <p>This link is temporary available during 5 minutes</p>
                <input type="url" className='w-75 h3' value={this.state.link} readOnly></input>
                <button className='btn btn-dark' onClick={this.sharingScreenToggle}>Done</button>
            </div>
        </div>)
    }
}