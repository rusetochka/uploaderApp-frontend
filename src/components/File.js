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
        this.state = {edit: false};
        this.docIconChoosing = this.docIconChoosing.bind(this);
        this.renameFile = this.renameFile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
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
        if(this.state.edit === true) {
            this.setState({edit: false});
        } else {
            this.setState({edit: true});
            const currentFileName = document.getElementById(e.target.id);
            currentFileName.setAttribute("contenteditable", true);
            document.addEventListener('click', (event) => {
                const target = event.target;
                if(target.id !== currentFileName.id) {
                    currentFileName.setAttribute("contenteditable", false);
                }
            } );
        }
        
    }

    downloadFile(e) {
        const filename = e.target.parentElement.getAttribute("name");
        const extention = e.target.parentElement.getAttribute("ext");
        fetch(`http://localhost:9000/testAPI/uploads/${filename}/${extention}`)
            .then(res => {
                let link=document.createElement('a');
                link.href = `http://localhost:9000/testAPI/uploads/${filename}/${extention}`;
                link.target = "_blank";
                link.click();
            })
    }

    render() {
        const type = this.props.type;
        const idForP = "file-name-" + this.props.id;
        return (<div className='border border-dark rounded m-1 p-1'>
            <img className="doc-icon" src={this.docIconChoosing(type)} alt="pdf-type-icon" />
            
            <p id={idForP} name={this.props.name} ext={this.props.type} onDoubleClick={this.renameFile}>{this.props.name}
            <button className='d-block mx-auto' onClick={this.downloadFile}>Download</button>
            </p><br />
            
        </div>)
    }
}