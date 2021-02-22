// http://localhost:3000/mean?nums=1,3,5,7,7

const express = require('express');
const ExpressError = require('./expressError');
const {turnToNums, getMode, getMedian, getMean} = require('./statistics');
// the freqCount function is used by getMode (Don't need to reference)
const app = express();

app.get('/mode', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('The numbers in query key need to be separated by comas.', 400)
      }
      //separate the numbers in the string
      let string = req.query.nums.split(',');
      // check if for nums only (no words)
      let nums = turnToNums(string);
      // instanceof tests if true or false for constructors
      if (nums instanceof Error) {
        throw new ExpressError(nums.message);
      }
      let result = {
          operation: "mode",
          result: getMode(nums)
      }
    return res.send(result)
});


app.get('/median', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('The numbers in query key need to be separated by comas.', 400)
      }
      //separate the numbers in the string
      let string = req.query.nums.split(',');
      // check if for nums only (no words)
      let nums = turnToNums(string);
      // instanceof tests if true or false for constructors
      if (nums instanceof Error) {
        throw new ExpressError(nums.message);
      }
      let result = {
          operation: "median",
          result: getMedian(nums)
      }
    return res.send(result)
});


app.get('/mean', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('The numbers in query key need to be separated by comas.', 400)
      }
      //separate the numbers in the string
      let string = req.query.nums.split(',');
      // check if for nums only (no words)
      let nums = turnToNums(string);
      // instanceof tests if true or false for constructors
      if (nums instanceof Error) {
        throw new ExpressError(nums.message);
      }
      let result = {
          operation: "mean",
          result: getMean(nums)
      }
    return res.send(result)
});


//404 error hander
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});


  //  generic error handler (longer version)
  app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });                           
  

app.listen(3000, function(){
    console.log('App port 3000');
})