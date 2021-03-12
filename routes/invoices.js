const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');

// GET invoices  => {invoices: [{id, comp_code}, ...]}
router.get("/", async function(req, res, next) {
    try {
      const results = await db.query(
        `SELECT id, comp_code
        FROM invoices
        Order by id` );

      return res.json({'invoices': results.rows});
    }
    catch (err) {
        return next(err);
    }
})


//GET Invoices/id  =>  {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
router.get('/:id', async function(req, res, next) {
    try {
      const {id} = req.params;
      const icRes = await db.query(
        `SELECT invoices.id, invoices.amt, invoices.paid, invoices.add_date, invoices.paid_date,
         invoices.comp_code, companies.code, companies.name, companies.description 
         FROM invoices INNER JOIN companies ON invoices.comp_code = companies.code;
        FROM invoices WHERE id=$1`, [id]);
      
      if (icRes.rows.length === 0) {
            throw new ExpressError(`invoice doesn't exist: ${id}`, 404);
        }

        const data = icRes.rows[0];
        let inv = {
            id: data.id,
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_date: data.paid_date,
            company: {
              code: data.comp_code,
              name: data.name,
              description: data.description,
            }
        }
        return res.json({"Invoice": inv});
    }
    catch (err) {
      return next(err);
    }
})

// POST invoices/id => {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.post("/id", async function(req, res, next) {
    try {
        // Needs to be passed in JSON body of: {comp_code, amt}
        const {comp_code, amt} = res.body;

        const result = await db.query(
            `INSERT INTO (comp_code, amt)
             VALUES ($1, $2)
             RETURNING comp_code, amt`, 
             [comp_code, amt] );
        
        return res.json({"invoice": result.rows[0]})
    }
    catch (err) {
        return next(err);
      }
})

// PUT invoices/id  => {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
/* If paying unpaid invoice: sets paid_date to today
If un-paying: sets paid_date to null
Else: keep current paid_date */
router.put("/:id", async function(req, res, next) {
    try {
        // Needs to be passed in a JSON body of {amt, paid}
        const {amt, paid} = req.body;
        const id = req.params.id;
        let paidDate = null;
        // first select current amt paid
        const firstResult = await db.query(
          `SELECT paid FROM invoices
           WHERE id=$1`, [id]); 

        if (firstResult.rows.length === 0) {
            throw new ExpressError(`Invoice doesn't exist: ${id}`, 404);
        }
        // need to set logic:
        /* If paying unpaid invoice: sets paid_date to today
           If un-paying: sets paid_date to null
           Else: keep current paid_date 
        */
        const firstPaidDate = firstResult.rows[0].paid_date
        if (!firstPaidDate && paid) {
            // use new Date() contructor to get full date
            finalPaidDate = new Date();
        } else if (!paid) {
            finalPaidDate = null;
        } else {
            finalPaidDate = firstPaidDate;
        };
        const finResult = db.query(
          `UPDATE invoices
           SET amt=$2, paid=$3, paid_date=$4
           RETURNING id, comp_code, amt, paid, add_date, paid_date`, 
           [id, amt, finalPaidDate, paid_date]);

        return res.json({"invoice": finResult.rows[0]})
    }
    catch (err) {
        return next(err);
    }
})


// DELETE invoices/id  => {status: "deleted"}
router.delete('/:id', async function(req, res, next) {
    try {
      const result = await db.query(
          `DELETE FROM invoices WHERE id=$1
           RETURNING id`,
          [req.params.id] ); 
        // check if id exist before deleting 
        if (result.rows.length === 0) {
            throw new ExpressError(`Invoice doesn't exist: ${id}`, 404);
        } else {
      return res.json({"status": "Deleted"})
        }
    }
    catch (err) {
        return next(err);
    }
})

module.exports = router