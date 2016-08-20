import axios from 'axios'
import AppDispatcher from './AppDispatcher'


const API = {

    getEbay(search){
      axios.get(`/api/search/ebay/${search}`)
        .then(response=>{
          let ebay=response.data;
          axios.get(`/api/search/walmart/${search}`)
              .then(res=>res.data)
              .then(walmart=>{
                return ebay.concat(walmart);
              })
              .then(results=>{
                //console.log(res.data.findItemsByKeywordsResponse[0].searchResult[0].item);
                //console.log(results);
                AppDispatcher.dispatch({
                  type: 'RECEIVE_RESULTS',
                  results
                // res.data
              })
          }
        )

      })
      .catch(err=>console.log(err))
    }

}




export default API;
