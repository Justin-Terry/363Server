const express = require('express');
// Router for handling routes
const router = express.Router();
// Import the model that was set up to define a product for the DB
const mongoose = require('mongoose');
const Credential = require('../models/credential');

router.post('/', (req, res, next) => {
    var credential = new Credential({
        _id: new mongoose.Types.ObjectId(),
        publicKey: req.body.publicKey,
        privateKey: req.body.privateKey
    });
    
    credential.save().then(result =>{
        res.status(201).json({
            message: 'Successfully created credential',
            createdCredential: {
                id: result._id,
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get('/', (req, res, next) => {
    Credential.findById({'_id': '5cc8c9fd88888547d00bbde9'}, 'privateKey publicKey', function(err, doc){
        if(err || !doc){
            res.status(500).json({
                Error: 'No entry found for _id' + req.body._id
            })
        }else{
            return res.send(doc);
        }
    })
})

module.exports = router;