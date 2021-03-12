const express = require('express');
const router = express.Router();
const ExpressError = require("../expressError");
const db = require('../db');
const slugify = require('slugify');

// GET / async function  => {companies: [{code, name}, ...]}
router.get("/", async function (req, res, next) {
    try {
      const results = await db.query(
        `SELECT code, name
         FROM companies
         ORDER BY name`);
  
      return res.json({'companies': results.rows});
    }
    catch (err) {
      return next(err);
    }
  });

  // GET /[code] async function  AND
  // return {company: {code, name, description, invoices: [id, ...]}}
router.get("/:code", async function (req, res, next) {
    try {
      const {code} = req.params;
      const comRes = await db.query(
        `SELECT code FROM companies WHERE code=$1`, [code]);
      // comp_code is connected to primary key code for invoices
      const invRes = await db.query(
        `SELECT id FROM invoices WHERE comp_code=$1`, [code]);
    
      //404 error response (check length of each row)
      if (comRes.rows.length === 0) {
          throw new ExpressError(`Company doesn't exist: ${code}`, 404);
      }

    // return {company: {code, name, descrip, invoices: [id, ...]}}
      const comp = comRes.rows[0];
      const inv = invRes.rows;
      // store so that you get {company: {code, name, descrip, invoices: [id, ...]}}
      comp.inv = inv.map(i => i.id);
      // now pass comp
      return res.json({'company': comp});
    }
  
    catch (err) {
      return next(err);
    }
  });

  // POST /companies => {company: {code, name, description}}
  router.post("/", async function (req, res, next) {
    try {
      // Needs to be given JSON like: {code, name, description}
      const {name, description} = req.body;
      // use slugify to make name string lower case
      const code = slugify(name, {lower: true});
  
      const result = await db.query(
            `INSERT INTO users (code, name, description) 
             VALUES ($1, $2, $3)
             RETURNING code, name, description`,
          [code, name, description]
      );
  
      return res.status(201).json({"company": result.rows[0]});
    }
  
    catch (err) {
      return next(err);
    }
  });


  // PUT /companies/code  => {company: {code, name, description}}
  router.put("/:code", async function(req, res, next) {
      try {
        // Needs to be given JSON like: {name, description}
        const {name, description} = req.body;
        const code = req.params.code;

        const result = await db.query(
           `UPDATE companies
            SET name=$2, description=$3
            WHERE code=$1
            RETURNING code, name, description`,
            [code, name, description]);
        
        if (result.rows.length === 0) {
            throw new ExpressError(`Company doesn't exist: ${code}`, 404);
        } else {
            return res.json({"company": result.rows[0]})
        }
      }
      catch (err) {
        return next(err);
      }
  })


  // DELETE /companies/code
  router.delete('/:code', async function(req, res, next) {
      try {
        const code = req.params.code;

        const result = await db.query(
            `DELETE FROM companies WHERE code = $1"
             RETURNING code`,  
             [code]);
        
        if(result.rows.length === 0){
            throw new ExpressError(`Company doesn't exist: ${code}`, 404);
        } else {
            return res.json({"status": "Deleted"})
        }
      }
      catch (err) {
        return next(err);
      }
  })


module.exports = router