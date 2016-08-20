import axios from 'axios'
import AppDispatcher from './AppDispatcher'


const API = {

    getEbay(search){
      axios.get(`/api/search/ebay/${search}`)
        .then(response=>{
          let ebay=response.data,
              walmart,aw,
              amazon;
          axios.get(`/api/search/walmart/${search}`)
              .then(res=>{
                walmart=res.data;
                // console.log('walmart',ew);
                axios.get(`/api/search/amazon/${search}`)
                    .then(a_res=>{
                      amazon = a_res.data;
                      return ebay.concat(amazon , walmart);
                    })
                    .then(results=>{
                      //console.log(res.data.findItemsByKeywordsResponse[0].searchResult[0].item);
                      //console.log(results);
                        AppDispatcher.dispatch({
                          type: 'RECEIVE_RESULTS',
                          results
                          // res.data
                        })
                    })
                }
              )

        })
        .catch(err=>console.log(err))
    }

}




export default API;
