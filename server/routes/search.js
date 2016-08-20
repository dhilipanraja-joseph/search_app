const express = require('express');
const router = express.Router();
const axios = require('axios');
const amazon = require('amazon-product-api');

const client = amazon.createClient({
  awsId :'AKIAIBBXDTUIDKZXHZ3Q',
  awsSecret : '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',
  awsTag : 'dlipnraj-20'
});

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
        client.itemSearch({
          Keywords : req.params.query,
          responseGroup: 'ItemAttributes,Offers,Images'
        })
        .then(a_results=>{
          let results = a_results.map(result=>{
            let price,imgLink,
                name = result.ItemAttributes[0].Title[0],
                link = result.DetailPageURL[0];

            if(!result.MediumImage){
              imgLink = '';
            }else{
              imgLink = result.MediumImage[0].URL[0];
            }

            if(!result.ItemAttributes[0].ListPrice){
              price = 'N/A'
            }else{
              price = Math.floor(result.ItemAttributes[0].ListPrice[0].Amount/100);
            }
            return {name , price , link , imgLink , from : 'amazon'}
          });
          //console.log(results);
          res.send(results);
        })
        .catch(err=>console.log(err))
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


module.exports = router;
