import React, { Component } from 'react'
import SearchActions from '../actions/SearchActions'
import SearchStore from '../stores/SearchStores'
import SearchList from './SearchList'
import uuid from 'uuid'


export default class SearchResult extends Component{
  constructor(){
    super();
    this.state={
      results: SearchStore.getAll(),
      status : SearchStore.getStatus()
    }
    this._onChange = this._onChange.bind(this);
    this.sortByPrice = this.sortByPrice.bind(this);
  }

  sortByPrice(){
    //console.log('sorting:',this.state.results);
    this.setState({
      results : this.state.results.sort((a,b)=>a.price - b.price)
    });

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
      if(this.state.results.length == 0){
        console.log(this.state.status);
        return (
          <div>{this.state.status}</div>
        );
      }else{
        const SearchItems = this.state.results.map(result=>{
          return (
            <SearchList key={uuid()} {...result}/>
          )
        });
        return(
          <table className='table'>
          <thead>
          <tr>
          <th></th>
          <th>Items</th>
          <th onClick={this.sortByPrice}>Price</th>
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
}
