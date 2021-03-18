const express = require('express');
const router = express.Router();
const ExpressError = require("../expressError");
const db = require('../db');


// GET / => {industries: [{i_code, i_type, comp_code},..]}
router.get("/", async function (req, res, next) {
    try {
        const results = await db.query(
          `SELECT i_code, i_type, comp_code
           FROM industries
           ORDER BY i_code`);

        return res.json({'industries': results.rows});
    } 
    catch (err) {
        return next (err);
    }
});

// GET /[i_code] => {industry: {i_code, i_type, company: [code, name, description]}}
router.get("/:i_code", async function(req, res, next) {
    try {
        const {i_code} = req.params;
        const resp = await db.query(
        `SELECT  code, name, i_code, i_type, description
        FROM industries INNER JOIN companies
        ON industries.comp_code = companies.code
        FROM industries WHERE i_code=$1`, [i_code]);

        if (resp.rows.length === 0) {
            throw new ExpressError(`industry doesn't exist: ${i_code}`, 404);
        }

        const data = res.rows[0];
        let ind = {
            i_code: data.i_code,
            i_type: data.i_type,
            company: {
              code: data.code,
              name: data.name,
              description: data.description,
            }
        };

        return res.json({"industry": ind});
    }
    catch (err) {
        return next(err)
    }
});


// POST /industries => {industry: {i_code, i_type, comp_code}}
router.post("/", async function(req, res, next) {
    try{
        const {i_code, i_type, comp_code} = req.body;

        const result = await db.query(
            `INSERT INTO industries (i_code, i_type, comp_code)
             VALUES ($1, $2, $3) 
             RETURNING i_code, i_type, comp_code`, 
            [i_code, i_type, comp_code]);

        return res.json({'industry': result.rows[0]})
    }
    catch (err) {
        return next(err); 
    }
});


// PUT /industries => {industry: {i_code, i_type, comp_code}}
router.put("/:i_code", async function(req, res, next) {
    try {
        const {i_type, comp_code} = req.body;
        const i_code = req.params.i_code;

        const result = await db.query(
            `UPDATE industries
             SET i_type=$2, comp_code=$3
             WHERE i_code=$1
             RETURNING i_code, i_type, comp_code`, 
             [i_code, i_type, copm_code]
        )
        if (result.rows.length === 0) {
            throw new ExpressError(`Industry doesn't exist: ${i_code}`, 404);
        } else {
            return res.json({'industry': result.rows[0]})
        }
    }
    catch (err) {
        return next(err);
    }
})


// DELETE /industries/i_code
router.delete('/:i_code', async function(req, res, next){
    try {
        const i_code = req.params.i_code;

        const result = await db.query(
            `DELETE FROM industries 
            WHERE i_code = $1
            RETURNING i_code`, [i_code]);

        if (result.rows.length === 0) {
            throw new ExpressError(`Industry doesn't exist: ${i_code}`, 404);
        } else {
            return res.json({"status": "Deleted"})
        }
    }
    catch (err) {
        return next(err)
    }
});


module.exports = router