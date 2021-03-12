// connect to correct db before loading db.js
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testCompanies;

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
});

afterEach(async () => {
    await db.query(`DELETE FROM companies`);
    await db.query(`DELETE FROM invoices`);
  });

afterAll(async () => {
    await db.end();
});


describe("GET /companies", () => {
    test("Get list of the companies", async () => {
    const res = await request(app).get('/companies')
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({companies: [testCompanies]})
    });
});


describe("GET /companies/code", () => {
    test('Get selected code from company', async () => {
        const res = await request(app).get(`/companies/${c1.code}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"company": {c1, invoices: [1, 2]}})
    });
    test("Respond 404 for wrong code", async () => {
      const res = await request(app).get("/companies/codey")
        expect(res.statusCode).toBe(404);
    });
});


describe("POST /companies", () => {
    test('makes new company with details', async () => {
        const res = await request(app).post('/companies')
        .send({name: "Morty", description: "Ah jeez Rick"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            'company': {
                code: "morty",
                name: "Morty",
                description: "Ah jeez Rick"
            }
        });
    })
    test('500 error, company already in database', async () => {
        const res = await request(app).post("/companies")
        .send({name: "GameStop", description: "Going out of business"});
        expect(res.status).toEqual(500);
    });
});


describe("PUT /companies/code", () => {
    test('update data', async () => {
        const res = await request(app).put('/companies/tesla')
        .send({name:'Tesla', description: "This is not space-X"});
        expect(res.body).toEqual({
            "company": {
                code: 'tesla',
                name: 'Tesla',
                description: "This is not space-X",
            }
        });
    });
    test("company doesn't exist", async () => {
        const res = await request(app).put('/companies/carl')
        .send({name: "Carl", description: "CAARRRRLLLL"});
        expect(res.status).toEqual(404);
    });
    test("no data passed in", async () => {
        const res = await request(app).put('/companies/tesla')
        .send({});
        expect(res.status).toEqual(500);
    });
});


describe("DELETE /companies/code", () => {
    test('delete a company', async () => {
        const res = await request(app).delete('/companies/tesla');
        expect(response.body).toEqual({'status': 'Deleted'});
    })
    test("company doesn't exist", async () => {
        const res = await request(app).delete('/companies/carl');
        expect(response.status).toEqual(404);
    })
})
