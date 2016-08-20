import React, { Component } from 'react'
import SearchActions from '../actions/SearchActions'
import SearchStore from '../stores/SearchStores'
import SearchList from './SearchList'
import uuid from 'uuid'


export default class SearchResult extends Component{
  constructor(){
    super();
    this.state={
      results: SearchStore.getAll()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount(){
    SearchStore.stopListening(this._onChange);
  }

  _onChange(){
    this.setState({results: SearchStore.getAll()});
  }

  render(){
    const SearchItems = this.state.results.map(result=>{
      return (
        <SearchList key={uuid()} {...result}/>
      )
    });
    return(
      <table className='table'>
       <thead>
         <tr>
           <th>Searched Results</th>
           <th>Price</th>
           <th>From</th>
         </tr>
       </thead>
       <tbody>
         {SearchItems}
       </tbody>
     </table>
    )
  }
}
