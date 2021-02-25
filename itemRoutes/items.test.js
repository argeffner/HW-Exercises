process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "goat", price: 4 };

//will make both functions async since tests are async
beforeEach(async function() {
  items.push(item);
});

afterEach(async function() {
  items.length = 0;
  //items =[];   which one is better?
});

// I forgot to put the 404 tests 

// GET /items   returns `{items: [item, ...]}
describe("GET /items", async function() {
  test("Gets a list of items", async function() {
    const response = await request(app).get(`/items`);
    expect(response.statusCode).toBe(200);

    // expect(response.body).toEqual({items: [item]});
    //check that there is only on item
    let { items } = response.body;
    expect(items).toHaveLength(1);
  });
});


// POST /items   make data and return {name: item, price: item}
describe("POST /items", async function() {
  test("Post a new item", async function() {
    const response = await request(app).post(`/items`).send({
      name: "plumbus",
      price: 2
    });
    // console.log("POST", response)
    expect(response.statusCode).toBe(200);

    // where is there a library for the supertest functions?
    expect(response.body.items).toHaveProperty('name');
    expect(response.body.items).toHaveProperty('price');
    expect(response.body.items.name).toEqual("plumbus");
    expect(response.body.items.price).toEqual(2);
  });
});


// GET /items/:name   returns {item: item}
describe("GET /items/:name", async function() {
  test("Gets one item from items list", async function() {
    const response = await request(app).get(`/items/${item.name}`);
    // console.log("GET", response)
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual(item);
    //why doesn't this work?
    // expect(response.body.items).toHaveLength(1);
  });
  test("GET 404 error, item not found", async function() {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  }); 
});


// PATCH /items/:name   replaces item with update {item: item}
describe("PATCH /items/:name", async function() {
  test("Patches one item from items list", async function() {
    const response = await request(app).patch(`/items/${item.name}`)
    .send({ name: "Bro"});
    // console.log("PATCH", response)
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual({name: "Bro"});
  });
  test("GET 404 error, item not found", async function() {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  }); 
});


// PATCH /items/:name   replaces item with update {item: item}
describe("DELETE /items/:name", async function() {
  test("Deletes one item from items list", async function() {
    const response = await request(app).delete(`/items/${item.name}`)
    // you are deleting item from query input don't need to .send data
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({message: "Item deleted"});
  });
  test("GET 404 error, item not found", async function() {
    const response = await request(app).delete(`/items/0`);
    expect(response.statusCode).toBe(404);
  }); 
});

//spent a couple hours debugging. Pay attention to what you write in the router file
// that will impact your test and could be the reason for the problems