import React, { Component } from 'react';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>

        <nav>
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
        </nav>
      </div>
    );
  }
}

export default Settings;
