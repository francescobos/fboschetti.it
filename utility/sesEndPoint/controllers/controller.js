const { request } = require("express");

const bodyParser = require('body-parser');

const sesFeedback = (req, res) => { 
  console.log(req.headers, req.body);
  return res.status(200).json({"status": 200});
}

const sesConfirmation = (req, res) => {

const body = req.body;
console.log(body.SubscribeURL);


  // let body = ''

  // req.on('data', (chunk) => {
  //   body += chunk.toString()
  // })
  
  //req.on('end', () => {

    //request("http://www.google.com")
    //let payload = JSON.parse(body);

    //console.log(payload)
    
    // if (payload.Type === 'SubscriptionConfirmation') {
    //   const promise = new Promise((resolve, reject) => {
    //     const url = payload.SubscribeURL
        
    //     request(url, (error, response) => {
    //       if (!error && response.statusCode == 200) {
    //         console.log('Yess! We have accepted the confirmation from AWS')
    //         return resolve()
    //       } else {
    //         return reject()
    //       }
    //     })
    //   })

    //   promise.then(() => {
    //     res.end("ok")
    //   })
    // }
  //});
  return res.status(200).json({"status": 200});
}

module.exports = { 
    sesFeedback,
    sesConfirmation
}