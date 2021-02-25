//need to put in super because it's an extension of existing JS error
class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
      console.error(this.stack);
    }
  }
  
  
  module.exports = ExpressError;