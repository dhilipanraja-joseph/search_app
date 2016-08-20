import React,{ Component } from 'react'

export default class SearchList extends Component{
  constructor(){
    super();
  }
  render(){
    let { name  , price , imgLink , link ,from} = this.props;
    //console.log(itemId[0]);
    return(
      <tr>
        <td><img src={imgLink} alt="NO IMAGE IN GALLERY"/></td>
        <td>{name}</td>
        <td>${price}</td>
        <td><a target="_blank" href={link}>{from}</a></td>
      </tr>
    )
  }
}
