import React from 'react';

export const FileUpload = () => {
    const fileSizeShow = (e) => {
        console.log(e.target.value);
    }



    return (
        <div className='pt-3 d-flex flex-column'>
            <h2>Upload Files</h2>
            <p>You can upload PDF / Excel / Word/ txt/ pictures documents here</p>
            <p>Max size for uploading file is 2MB!</p>

            <div className="input-group mb-3">
                <form id='uploadForm' action='http://localhost:9000/testAPI/upload' method="post" encType="multipart/form-data" className='d-flex justify-content-center'>
                <input type="file" className="form-control border border-dark" id="inputGroupFile02" name="inputGroupFile02" accept=".pdf, application/msexcel, application/msword, .txt, image/*" onChange={fileSizeShow}/>
                <button type="submit" className="btn btn-primary input-group-text my-1" >Upload</button>
                </form>
            </div>


        </div>
    );


};