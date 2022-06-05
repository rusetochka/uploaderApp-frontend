import React from 'react';
import './App.css';
//import { SearchBar } from './components/SearchBar';
import { Library } from './components/Library';


import logo from './logo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sharing: false};
    this.sharingScreenToggle = this.sharingScreenToggle.bind(this);
  }

  sharingScreenToggle() {
    if(this.state.sharing) {
      this.setState({sharing: false})
    }
  }

  render() {
    return (
      <div className="App bck-light">
        <header className="App-header text-bg-dark p-3">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <img src={logo} alt="logo" width="25" className='m-2' />
                uploaderApp</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon navbar-dark"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/features">Features</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <Library />
        <div className={this.state.sharing ? "position-absolute top-50 start-50 translate-middle bg-light w-50 h-50 d-flex justify-content-center align-items-center flex-column" : "d-none"} id='sharing-screen'>
          <h2 className='h1 mx-3'>Share this document via link below</h2>
          <input type="url" className='w-75 h1' value='' readOnly></input>
          <button className='btn btn-dark' onClick={this.sharingScreenToggle}>Done</button>
        </div>
      </div>
    );
  }

}

export default App;
