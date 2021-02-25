const Item = require('../myItem'); // why do i need ../route as opposed to ./route?
const express = require('express');

const router = express.Router();

// app.use("/items", itemsRoutes) passes '/items' to every route 
// GET /  gets all the items
router.get('', function(req, res, next ) {
    try {
      let allItems = Item.findAll()
      return res.json({items: allItems});
    } catch(err) {
      return next(err)
    }
})

// POST /  post item and price of your choice 
router.post('', function(req, res, next ) {
    try {
      let newItem = new Item(req.body.name, req.body.price);
      return res.json({items: newItem});
    } catch(err) {
      return next(err)
    }
})

// GET/:name find item with name of choice
router.get('/:name', function(req, res, next ) {
    try {
      let selected = Item.find(req.params.name);
      return res.json({items: selected});
    } catch(err) {
      return next(err)
    }
})

// PATCH/:name update name in database
router.patch('/:name', function(req, res, next ) {
    try {
      let selected = Item.update(req.params.name, req.body);
      return res.json({items: selected});
    } catch(err) {
      return next(err)
    }
})

// DELETE/:name delete item
router.delete('/:name', function(req, res, next ) {
    try {
      Item.remove(req.params.name);
      return res.json({message: "Item deleted"});
    } catch(err) {
      return next(err)
    }
})

module.exports = router;