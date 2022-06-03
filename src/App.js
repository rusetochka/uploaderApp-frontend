import React from 'react';
import './App.css';
//import { SearchBar } from './components/SearchBar';
import { Library } from './components/Library';
import { FileUpload } from './components/FileUpload';

import logo from './logo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentDidMount() {
    this.callAPI();
}
  render() {
    return (
      <div className="App bck-light">
        <header className="App-header text-bg-dark p-3">
        <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
        <img src={logo} alt="logo" width="25" className='m-2'/>
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

        



        <Library apiRes={this.state.apiResponse} />

        <FileUpload />
      </div>
    );
  }
  
}

export default App;
