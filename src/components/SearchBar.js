import React, { Component } from 'react';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' };
  }

  render() {
    return (
      <div className='bck-light'>
        <input className="" type="text" id="search" name="search" placeholder="Enter the name of your file"></input>

        <button className="search-btn">Search</button>
      </div>
    );
  }
}