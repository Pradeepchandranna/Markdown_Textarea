import React, { Component } from 'react'
import './Container.css'
import WikiApi from "../../api/WikiApi"

class NewEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClear(event) {
    this.setState({ value: '' });
    document.getElementById("editor").value = '';
  }

  handleDoubleClick(event) {
    console.log(`Selected text: ${window.getSelection().toString()}`);
    const selectedText = window.getSelection().toString();
    
    WikiApi.getWikiDetails(selectedText).then((data) => {
      if (data) {
        console.log(data);
        var obj = data.query.pages;
        var ob = Object.keys(obj)[0];
        console.log(obj[ob]["extract"]);
      }
    })
  }

  render() {
    return (
      <div className='body-container'>
        <div className='dvEditor'>
          <textarea id="editor" placeholder={this.state.value} onChange={this.handleChange}
            onDoubleClick={this.handleDoubleClick} />
          <input type='button' value='Clear' onClick={this.handleClear}></input>
        </div>
        <div id="preview">{this.state.value}</div>
        {/* <div className="preview">
              <h1>Preview</h1>
              <div>{this.state.value}</div>
            </div> */}
      </div>
    );
  }
}


export default NewEditor;