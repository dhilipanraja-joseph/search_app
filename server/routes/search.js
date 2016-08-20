const express = require('express');
const router = express.Router();
const axios = require('axios');


router.route('/ebay/:query')
.get((req, res) => {
  axios.get(`http://svcs.sandbox.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=Dhilipan-SearchAp-SBX-e9a67cc35-9b1513f4&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${req.params.query}`)
      .then(response=>{
        //console.log(response.data);
        res.send(response.data)
      })
      .catch(err=>console.log(err))
})



module.exports = router;
