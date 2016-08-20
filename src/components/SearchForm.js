import React, { Component } from 'react';
import SearchActions from '../actions/SearchActions'

export default class SearchForm extends Component {
  constructor(){
    super();
    this.state = {
      search: ''
    }
    this.changeSearchInput = this.changeSearchInput.bind(this);
    this.submit = this.submit.bind(this);
  }
  changeSearchInput(e){
    let search = e.target.value;
    this.setState({ search });
  }

  submit(e) {
    e.preventDefault();
    let { search } = this.state;
    SearchActions.getEbaySearch(search);
    //console.log('search:',search);
    this.setState({search: ''});
  }

  render(){
    //let { search } = this.state;
    return (
      <div>
        <form onSubmit={this.submit}>
          <input type="text" value={this.state.search} onChange={this.changeSearchInput} placeholder="Search"/>
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}
