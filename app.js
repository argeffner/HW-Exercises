const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const itemsRoutes = require('./itemRoutes/items');


app.use(express.json());
//request all paths from items.js file
app.use("/items", itemsRoutes);


//404 error hander
app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
  });
  
  
//  generic error handler
app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
      error: {message, status}
    });
});  

module.exports = app