import React,{ Component } from 'react'

export default class SearchList extends Component{
  constructor(){
    super();
  }
  render(){
    let { title  , sellingStatus , viewItemURL } = this.props;
    //console.log(itemId[0]);
    return(
      <tr>
        <td>{title}</td>
        <td>${sellingStatus[0].currentPrice[0].__value__}</td>
        <td><a target="_blank" href={viewItemURL}>LINK</a></td>
      </tr>
    )
  }
}
