import React, { Component } from 'react';
import SearchForm from './SearchForm'
import SearchResult from './SearchResult'

export default class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <h1 className="text-center">Search App</h1>
        <SearchForm/>
        <SearchResult/>
      </div>
    )
  }
}
