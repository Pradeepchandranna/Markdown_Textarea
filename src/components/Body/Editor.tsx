import React, { BaseSyntheticEvent, useState } from 'react'
import './Container.css'
import WikiApi from "../../api/WikiApi"

const Editor = () => {
  const [preview, setPreview] = useState('');
  const [value, setValue] = useState('');

  const handleChange = (event: BaseSyntheticEvent) => {
    setPreview(event.target.value)
  }

  const handleDoubleClick = (event: BaseSyntheticEvent) => {    
    const isWindowContext = typeof window !== "undefined";
    const selectedText = isWindowContext && window.getSelection()?.toString();

    WikiApi.getWikiDetails(selectedText).then((data) => {
      if (data) {
        var obj = data.query.pages;
        var ob = Object.keys(obj)[0];
        console.log(obj[ob]["extract"]);
        setValue(obj[ob]["extract"]);
      }
    })
  }

  const handleClear = (event: BaseSyntheticEvent) => {
    setPreview('');
  }

  return (
    <div>
      <div className='body-container'>
        <div className='dvEditor'>
          <textarea id="editor" value={preview} onChange={handleChange}
            onDoubleClick={handleDoubleClick} />
          <input type='button' value='Clear' onClick={handleClear}></input>
        </div>
        <div id="preview">{preview}</div>
      </div>
      <div className='dvWikiData'>
        <span>{value}</span>
      </div>
    </div>
  )
}

export default Editor;
