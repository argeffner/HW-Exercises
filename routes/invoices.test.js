process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testCompanies;
let testInvoices;
beforeEach(async function() {
    let result = await db.query(`
      INSERT INTO companies (code, name, description)
      VALUES ('tesla', 'Tesla', 'Best electric vehicles'),
             ('gmsp', 'GamesStop', 'sells computer and console games')
      RETURNING code, name, description`);
    testCompanies = result.rows;
    c1 = result.rows[0];
    c2 = result.rows[1];
  
    let inv = await db.query(
      `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
         VALUES ('tesla', 30000, false, '2010-01-01', null),
                ('tesla', 70000, true, '2018-02-01', '2020-02-02'), 
                ('gmsp', 300, false, '2019-03-01', null)
         RETURNING id`);
    testInvoices = inv.rows;
    i1 = inv.rows[0];
    i2 = inv.rows[1];
    i3 = inv.rows[2];
  });
  
  afterEach(async () => {
      await db.query(`DELETE FROM companies`);
      await db.query(`DELETE FROM invoices`);
    });
  
  afterAll(async () => {
      await db.end();
  });


describe('GET /invoices', () => {
    test("get id and comp from invoices table", async () => {
        const res = await request(app).get('/invoices');
        expect(res.body).toEqual({
         "invoices": [
            {id: 1, comp_code: 'tesla'},
            {id: 2, comp_code: 'tesla'},
            {id: 3, comp_code: 'gmsp'},
         ]
        });
    });
});


describe('GET /invoices/id', () => {
    test('retreive invoice by id', async () => {
        const res = await request(app).get(`/invoices/${i1.id}`);
        expect(res.body).toEqual({"invoice": {i1, company: c1}});
    });
    test("Error 404, invoice doesn't exist", async () => {
        const res = await request(app).get(`/invoices/768`);
        expect(res.status).toEqual(404);
    });
});

describe('POST /invoices', () => {
    test('post an invoice', async () => {
        const res = await request(app).post('/invoices')
        .send({amt: 300, comp_code: 'gmsp'});
        expect(res.body).toEqual({
          'invoice': {
            id: 4,
            comp_code: "gmsp",
            amt: 300,
            add_date: expect.any(String),
            paid: false,
            paid_date: null,
          }
        });
    });
});


describe('PUT /invoices/id', () => {
    test('Update an invoice', async () => {
        const res = await request(app).put('/invoices/1')
        .send({amt: 50000, paid: false});
        expect(res.body).toEqual({
            "invoice": {
                id: 1,
                comp_code: "tesla",
                amt: 50000,
                paid: false,
                add_date: expect.any(String),
                paid_date: null,
            }
        });
    });
    test("404 error, invoice doesn't exist", async () => {
        const res = await request(app).put('/invoices/555')
        .send({amt: 60000, paid: false});
        expect(res.status).toEqual(404);
    });
    test("no data passed in", async () => {
        const res = await request(app).put('/invoices/1')
        .send({});
        expect(res.status).toEqual(500);
    });
});


desccribe('DELETE /invoices/id', () => {
    test('delete invoice', async () => {
        const res = await request(app).delete('/invoices/1');
        expect(res.body).toEqual({"status": "Deleted"});
    });
    test("404 error, invoice doesn't exist", async () => {
        const res = await request(app).delete('/invoices/80');
        expect(res.status).toEqual(404);
    });
});