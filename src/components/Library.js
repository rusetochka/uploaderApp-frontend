import React from 'react';

export class Library extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='lib-section bck pt-3'>
        <h2>Your Documents Library</h2>
        <div className='border border-secondary lib-container'>Here will be your files
        <p>{this.props.apiRes}</p>
        </div>
        
      </div>)
    
    }
  
}