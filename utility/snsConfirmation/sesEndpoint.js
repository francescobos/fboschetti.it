const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
app.use(bodyParser.json());


app.post('/api/sesFeedback', async (req, res) => {
    //console.log(req.body);
    if (req.body.Type === 'SubscriptionConfirmation') {
        const subscribeURL = req.body.SubscribeURL;
        console.log(req.body.SubscribeURL);
        await axios.get(subscribeURL);
        return res.status(200).json({});
      }
});

app.listen(3033, () => {
    console.log('App is listening on port 3033');
});