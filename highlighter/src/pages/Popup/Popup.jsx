import React, {useState, useEffect} from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { set } from 'immutable';

const Popup = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['openaiApiKey']).then(({openaiApiKey}) => {
      setApiKey(openaiApiKey);
    }) 
  }, []);
  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="apiKey" className="form-label">API Key</label>
          <input 
            type="text" 
            className="form-control" 
            id="apiKey" 
            name="apiKey" 
            placeholder="OpenAI API Key" 
            value={apiKey} 
            onChange={(e) => {
              setApiKey(e.target.value);
              chrome.storage.local.set({openaiApiKey: e.target.value})
            }} 
          />
          <div id="apiKeyHelp" className="form-text">You can find your API key in your <a href="https://beta.openai.com/account/api-keys" target="_blank">OpenAI account</a>.</div>
        </div>
      </form>
    </div>
  );
};

export default Popup;
