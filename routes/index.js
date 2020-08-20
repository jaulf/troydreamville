const express = require('express');
const router = express.Router();
const auth = require('../config/auth');
const fetch = require('node-fetch')


let Transaction =  require('../models/Transaction');
let User = require('../models/User');

// router.get('/dashboard', auth.ensureAuthenticated, (req, res) => {

//     let query = { Transaction_Initiator_email : req.user.email}

//     Transaction.find(query, (err, transaction) => {
//         res.render('transaction', {
//             transaction : transaction
//         })
//     } )

// });

router.get('/trade', (req, res) => {
    res.render('trade')
}) 

router.get('/trade_bitcoin', auth.ensureAuthenticated, (req, res) => {
    res.render('trade_bitcoin', {
    user : req.user})

})

router.post('/trade_bitcoin', (req, res) => {

    const {bitcoin_currency, american_currency, nigerian_currency} = req.body;
    let errors = [];
    let nad = [];
 
    if(!bitcoin_currency) {
        errors.push({ msgbit : "Required"})
    }
    if(!american_currency) {
        errors.push({ msgusd : "Required" })
    }

    if (errors.length > 0) {
        res.render('trade_bitcoin', {
          errors,
          nad,
          american_currency,
          bitcoin_currency,
          nigerian_currency
        });
      } else { 
     
        let date = new Date();

        let transaction = new Transaction();

        transaction.Transaction_Name = 'Buy Bitcoin';
        transaction.Transaction_Initiator_email = req.user.email;
        transaction.Transaction_Initiator_name = req.user.name;
        transaction.Transaction_Bitcoin_Amount = bitcoin_currency;
        transaction.Transaction_Dollar_Amount = american_currency;
        transaction.Transaction_Naira_Amount = nigerian_currency;
        transaction.date = date.toLocaleString();

        transaction.save()
        .then(user => {
            req.flash(
              'success_msg',
              'You are now registered and can log in'
            )
            res.render('trade_bitcoin')
        })
          .catch(err => console.log(err))

    }
})


//ethereum price
// fetch('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=RDIWHAG7A2UMYCN8UIP427Z6J1TT47N9UJ')
// .then(res => res.json())
// .then(resp => console.log("Latest Ethereum Price is " + resp.result.ethusd))

// router.post('/api/submitsell', (req, res) => {
//     console.log(req.body);
// })

module.exports = router;