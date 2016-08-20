const express = require('express');
const router = express.Router();
const axios = require('axios');


router.route('/ebay/:query')
      .get((req, res) => {
        axios.get(`http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=Dhilipan-SearchAp-PRD-c9a67cc35-14bbe1c9&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=25&keywords=${req.params.query}`)
              .then(response=>{
                //console.log(response.data);
                let results = response.data.findItemsByKeywordsResponse[0].searchResult[0].item.map(result=>{
                  let name=result.title,
                      price=result.sellingStatus[0].currentPrice[0].__value__ ,
                      link=result.viewItemURL ,
                      imgLink=result.galleryURL;
                  return { name  , price , link , imgLink , from : 'ebay'}
                });
                res.send(results)
              })
              .catch(err=>console.log(err))
      })

router.route('/amazon/:query')
      .get((req,res)=>{
        axios.get()
              .then(response=>{
                console.log(response.data);
              })
      })

router.route('/walmart/:query')
      .get((req,res)=>{
        axios.get(`http://api.walmartlabs.com/v1/search?apiKey=5qkvyfn3weh6uha8ckesz7yu&numItems=25&query=${req.params.query}`)
              .then(response=>{
                let walmart_results = response.data.items.map(result => {
                  let name =result.name,
                      price = result.salePrice,
                      link = result.productUrl,
                      imgLink = result.mediumImage;
                return { name  , price , link , imgLink , from : 'walmart'}

                })
                res.send(walmart_results);
              })
              .catch(err => console.log(err));
      })

function getSignatureKey(key, dateStamp, regionName, serviceName) {

   var kDate= Crypto.HMAC(Crypto.SHA256, dateStamp, "AWS4" + key, { asBytes: true})
   var kRegion= Crypto.HMAC(Crypto.SHA256, regionName, kDate, { asBytes: true });
   var kService=Crypto.HMAC(Crypto.SHA256, serviceName, kRegion, { asBytes: true });
   var kSigning= Crypto.HMAC(Crypto.SHA256, "aws4_request", kService, { asBytes: true });

   return kSigning;
}

module.exports = router;
