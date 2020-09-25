// Importing important packages
const express = require('express');

const calendarRoute = express.Router();
 
// Customer module which is required and imported
const resourceModel = require('../Model/Resource');
const eventModel = require('../Model/Event');

calendarRoute.route('/').get(async (_, res) => {
    try {
        const resources = await resourceModel.find({});
        const events = await eventModel.find({});
        res.json({ events: events, resources: resources })
    } catch (err) {
        res.json(err);
    }
});
calendarRoute.route('/').post(async (req, res) => {
    try{
        const {resources, events} = req.body;
        console.log(events)
        if(resources)
            resourceModel.insertMany(resources);
        eventModel.insertMany(events);
        res.sendStatus(202);
    }
    catch (err){
        res.json(err);
    }
})


// To Get List Of Customers


module.exports = calendarRoute;