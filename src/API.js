import axios from 'axios'
import AppDispatcher from './AppDispatcher'


const API = {

    getSearch(search){
      function ebay(search){
        return axios.get(`/api/search/ebay/${search}`)
                    .then(res=>res.data)
      }
      function walmart(search){
        return axios.get(`/api/search/walmart/${search}`)
                    .then(res=>res.data)
      }
      function amazon(search){
        return axios.get(`/api/search/amazon/${search}`)
                    .then(res=>res.data)
      }
      function loading(){
        //console.log('loading');
        AppDispatcher.dispatch({
          type: 'GETTING_DATA',
          status : 'Loading...'
        })
      }
      // console.log(axios);
      Promise.all([ebay(search),walmart(search),amazon(search),loading()])
              .then(([result1,result2,result3])=>{
                return result1.concat(result2,result3)
              })
              .then(results=>{
                  AppDispatcher.dispatch({
                    type: 'RECEIVE_RESULTS',
                    results
                  })
              })
              .catch(err=>console.log(err))
      // axios.get(`/api/search/ebay/${search}`)
      //   .then(response=>{
      //     let ebay=response.data,
      //         walmart,aw,
      //         amazon;
      //     axios.get(`/api/search/walmart/${search}`)
      //         .then(res=>{
      //           walmart=res.data;
      //           // console.log('walmart',ew);
      //           axios.get(`/api/search/amazon/${search}`)
      //               .then(a_res=>{
      //                 amazon = a_res.data;
      //                 return ebay.concat(amazon , walmart);
      //               })
      //               .then(results=>{
      //                 //console.log(res.data.findItemsByKeywordsResponse[0].searchResult[0].item);
      //                 //console.log(results);
      //                   AppDispatcher.dispatch({
      //                     type: 'RECEIVE_RESULTS',
      //                     results
      //                     // res.data
      //                   })
      //               })
      //           }
      //         )
      //
      //   })
      //.catch(err=>console.log(err))
    }

}




export default API;
