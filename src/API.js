import axios from 'axios'
import AppDispatcher from './AppDispatcher'


const API = {
  getEbaySearch(search){
    //let query = encodeURI(search);
    axios.get(`/api/search/ebay/${search}`)
        .then(res=>{
          //console.log(res.data.findItemsByKeywordsResponse[0].searchResult[0].item);
          AppDispatcher.dispatch({
            type: 'RECEIVE_RESULTS',
            results : res.data.findItemsByKeywordsResponse[0].searchResult[0].item
          })
        })
        .catch(err=>console.log(err))
  }
}

export default API;
