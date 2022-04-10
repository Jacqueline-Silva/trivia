import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="settings__parent">
        <div className="settings__choise">
          <h1 data-testid="settings-title">Settings</h1>
          <label htmlFor="category">
            Category
            <select id="category">
              <option>Any</option>
            </select>
          </label>
          <label htmlFor="difficulty">
            Difficulty
            <select id="difficulty">
              <option>Any</option>
            </select>
          </label>
          <label htmlFor="type">
            Type
            <select id="type">
              <option>Any</option>
            </select>
          </label>
          <button type="button">
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
